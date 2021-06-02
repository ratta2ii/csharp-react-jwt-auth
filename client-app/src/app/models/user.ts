export interface User {
    userName: string;
    displayName: string;
    image?: string;
    token: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}

export interface GoogleCode {
    code: string;
}