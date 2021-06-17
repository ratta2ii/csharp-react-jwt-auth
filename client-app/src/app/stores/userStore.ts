import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { GoogleCode, User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
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
            console.log({ "Error in userStore > getUser()": error });
            throw error;
        }
    }

    register = async (cred: UserFormValues) => {
        try {
            const user = await agent.Account.register(cred);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push("/");
            // history.push(`/dashboard/user/${user.userName}`);
            store.modalStore.closeModal();
        }
        catch (error) {
            console.log({ "Error in userStore > register()": error });
            throw error;
        }
    }

    login = async (cred: UserFormValues) => {
        try {
            const user = await agent.Account.login(cred);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push("/");
            // history.push(`/dashboard/user/${user.userName}`);
            store.modalStore.closeModal();
        }
        catch (error) {
            console.log({ "Error in userStore > login()": error });
            throw error;
        }
    }

    googleLogin = async (code: GoogleCode) => {
        const user = await agent.Account.googleLogin(code);
        // TODO: There is currently no route in the back-end controller. Add a route in the account controller that accepts the google auth code, verifies the code w/ google, which in turn returns tokens and user profile from google. Create a user on the backend, adding token property userDto, and send userDto back to client. Once here, login user, add token to localStorage, etc. 
        console.log("user in googleLogin() response: ", user);
    };

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem("jwt");
        runInAction(() => this.user = null);
        history.push("/about");
    }
}

/*

? If a "jwt" token already exists in localStorage:
* When the app is first init (App.tsx), it looks for a token in the localStorage. If token exists,
* getUser() is called, which calls the API on backend, verifies token, then returns the user DTO.

? If a user has to login through entering email and password:
* User will be created on the server-side, with an access token (stored on userDto), and then sent
* back to the client. The data from the userDto, including the token, are stored on the client.
* During this transaction, the token is stored in a (global state), as well as the localStorage.
* The access token is then added to Authorization Headers on all subsequent server calls in order
* to access authorized endpoints.
* The token is also used to retrieve logged in users on client app reloads or return visitors.

*/