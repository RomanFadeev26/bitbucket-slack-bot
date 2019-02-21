export interface IAuthorizationRequestAnswer {
    "access_token": string;
    "scopes": string;
    "expires_in": number;
    "refresh_token": string;
    "token_type": string;
}

export type credentials = "clientId" | "secret";
