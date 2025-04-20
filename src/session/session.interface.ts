export interface PostSessionRequest {
    userId: string;
    refreshToken: string;
    userAgent: string;
    ipAddress: string;
}

export interface PostSessionResponse {
    id: string;
    username: string;
    refreshToken: string;
    accessToken: string;
}
