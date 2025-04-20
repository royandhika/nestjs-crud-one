export interface GetUserByEmailInput {
    email: string;
}

export interface GetUserByUsernameInput {
    username: string;
}

export interface GetUserOutput {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface PostUserInput {
    username: string;
    email: string;
    hashedPassword: string;
}

export interface PostUserOutput {
    id: string;
    username: string;
    email: string;
}

export interface PostUserResponse {
    id: string;
    username: string;
    email: string;
}
