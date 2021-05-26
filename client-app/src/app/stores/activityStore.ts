import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    // new Map<activityId, activity>()
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    //! This must be included to observe changes within the store (works in conjunction with the HOC, "observer", in each component viewing or updating state)
    constructor() {
        makeAutoObservable(this)
    }

    // This will be sure to preserve the date order of our activities when rendering
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, "dd MMMM yyyy h:mm aa");
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch(error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        // activity.date = activity.date.split("T")[0];
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoading(false);
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.setLoading(false);
            })
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }
}




//! A small breakdown of MobX and what is actually happening here
// import { action, makeObservable, observable } from "mobx";
// constructor() {
//     // No AutoObservable in this case
//     makeObservable(this, {
//         title: observable,
//         // bound auto binds this.method to class (or use arrow functions for auto bind)
//         setTitle: action.bound
//     })
// }
// setTitle() {
//     this.title = this.title + "!";
// }