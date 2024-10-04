export interface CreateUser {
    email: string;
    password: string;
    authorizationsId: string;
}

export interface UpdateUser {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    picture: string;
    status: string;
    authorizationsId: string;
}