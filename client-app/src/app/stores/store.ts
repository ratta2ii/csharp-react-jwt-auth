import { createContext, useContext } from "react";
import UserStore from "./userStore";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

interface Store {
    userStore: UserStore;
    activityStore: ActivityStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
}

export const store: Store = {
    userStore: new UserStore(),
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store);

// Custom hook
export const useStore = () => {
    return useContext(StoreContext);
}
