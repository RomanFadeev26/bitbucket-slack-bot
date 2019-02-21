import inputCredential from "./inputCredential";
import { credentials } from "./types";

interface IUser {
    getClientId(): string;
    getSecret(): string;
    promptParameter(parameterName: credentials): void;
}

export default class User implements IUser {
    private clientId: string;
    private secret: string;

    constructor() {
        this.clientId = "";
        this.secret = "";
    }

    public getClientId() {
        return this.clientId;
    }

    public getSecret() {
        return this.secret;
    }

    public async promptParameter(parameterName: credentials) {
        this[parameterName] = await inputCredential(parameterName);
    }
}
