import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
    // activities: Activity[] = [];
    // Instead of (above) we are using Map instead -"activityRegistry"
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    //! This must be included to observe changes within the store (works in conjunction with the HOC, "observer", in each component viewing or updating state)
    constructor() {
        makeAutoObservable(this)
    }

    // This will be sure to preserve the date order of our activities when rendering
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split("T")[0];
                // this.activities.push(activity);
                // Instead of (above) we are simply adding a key value pair using a Map
                this.activityRegistry.set(activity.id, activity);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    selectActivity = (id: string) => {
        // this.selectedActivity = this.activities.find(a => a.id === id);
        // Instead of (above) we are using Map instead -"activityRegistry"
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        activity.id = uuid();
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
                // this.activities =
                //     [...this.activities.filter(a => a.id !== activity.id), activity];
                // Instead of (above) we are using Map instead -"activityRegistry"
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
                // this.activities = [...this.activities.filter(a => a.id !== id)];
                // Instead of (above) we are using Map instead -"activityRegistry"
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