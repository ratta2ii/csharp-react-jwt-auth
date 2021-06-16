import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { GoogleCode, User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

// loading indicator
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Up to this point, the interceptors are reacting to response after call
axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === "development") await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            toast.error('Status 400 Bad Request');
            break;
        case 401:
            toast.error('Status 401 Unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            toast.error('Status 500 Server Error');
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Account = {
    current: () => requests.get<User>("/account"),
    register: (user: UserFormValues) => requests.post<User>("/account/register", user),
    login: (user: UserFormValues) => requests.post<User>("/account/login", user),
    googleLogin: (code: GoogleCode) => requests.post<User>("/account/auth/google", code),
}

const TestAuth = {
    test: () => requests.get<any>("/testauth")
}

const agent = {
    Account,
    TestAuth
}

export default agent;