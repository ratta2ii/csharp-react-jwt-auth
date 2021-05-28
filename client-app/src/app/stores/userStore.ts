import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor()  {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        // "!!" is a fancy way to return "this.user" as a boolean
        return !!this.user;
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log({"Error in userStore > getUser()": error});
            throw error;
        }
    }

    register = async (cred: UserFormValues) => {
        try {
            const user = await agent.Account.register(cred);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push("/activities");
            store.modalStore.closeModal();
        }
        catch (error) {
            console.log({"Error in userStore > register()": error});
            throw error;
        }
    }

    login = async (cred: UserFormValues) => {
        try {
            const user = await agent.Account.login(cred);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push("/activities");
            store.modalStore.closeModal();
        }
        catch (error) {
            console.log({"Error in userStore > login()": error});
            throw error;
        }
    }
    
    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem("jwt");
        runInAction(() => this.user = null);
        history.push("/");
    }
}

/*

? If a "jwt" token already exists in localStorage:
* When the app is first init (App.tsx), it looks for a token in the localStorage. If token exists,
* getUser() is called, which calls the API on backend to verify, then return the current user.

? If a user has to login through entering email and password:
* A user will then be created on the server-side -with a TOKEN (stored on user obj)- and then sent
* back to the client. The data is the extracted from the userDto and stored on the client. During
* this transaction, the token from the userDto is stored to both the global state, as well as the
* localStorage. 
* The token can then be used to access authorized endpoints, or be used again on subsequent visits.

*/