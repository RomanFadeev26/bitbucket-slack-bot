import inputCredential from "./inputCredential";
import { credentials } from "./types";

interface IUser {
    getClientId(): string;
    getSecret(): string;
    getCredentials(): string;
    getEncodeCredentials(): string;
    setAccessToken(token: string): void;
    getAccessToken(): string;
    getUserName(): string;
    promptParameter(parameterName: credentials): void;
}

export default class User implements IUser {
    private clientId: string;
    private secret: string;
    private accessToken: string;
    private username: string;

    constructor() {
        this.clientId = "";
        this.secret = "";
        this.accessToken = "";
        this.username = "";
    }

    public getClientId() {
        return this.clientId;
    }

    public getSecret() {
        return this.secret;
    }

    public getCredentials() {
        return `${this.clientId}:${this.secret}`;
    }

    public getEncodeCredentials() {
        return Buffer.from(`${this.clientId}:${this.secret}`).toString("base64");
    }

    public getAccessToken() {
        return this.accessToken;
    }

    public setAccessToken(token: string) {
        this.accessToken = token;
    }

    public getUserName() {
        return this.username;
    }

    public async promptParameter(parameterName: credentials) {
        this[parameterName] = await inputCredential(parameterName);
    }
}
