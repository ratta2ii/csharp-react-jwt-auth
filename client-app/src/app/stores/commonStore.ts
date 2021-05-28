import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    token: string | null = window.localStorage.getItem("jwt");
    error: ServerError | null = null;
    appLoaded: boolean = false;

    constructor()  {
        makeAutoObservable(this);

        // NOTE: This "reaction" does not run when the store is initialized, but only when 
        // there has been a change to the "token" state slice. 
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem("jwt", token);
                } else {
                    window.localStorage.removeItem("jwt");
                }
            }
        )
    }

    setToken = (token: string | null) => {
        // if (token) window.localStorage.setItem("jwt", token);
        this.token = token;
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setAppLoaded = () => {
            this.appLoaded = true;
    }

}