export interface CreateUserInput {
    username: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    image: string | null;
}


export interface UserInfos {
    id: string;
    username: string;
    email: string;
    password: string;
}
