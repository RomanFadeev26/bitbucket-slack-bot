import Request from "./Request";
import { IUser } from "./User";

// "<<<<<<<" Только так можно определить конфликты

interface IAuthorizationRequestAnswer {
    "access_token": string;
    "scopes": string;
    "expires_in": number;
    "refresh_token": string;
    "token_type": string;
}

export interface IAuthorization {
    authorize(): Promise<void>;
}

export default class AuthorizationRequest extends Request implements IAuthorization {

    private credentials: string;
    private user: IUser;

    constructor(user: IUser) {
        super();
        this.user = user;
        this.credentials = user.getCredentials();
        this.setHeaders({
            "Authorization": `Basic ${user.getEncodeCredentials()}`,
            "content-type": "application/x-www-form-urlencoded",
        });
        this.setUrl(`https://${this.credentials}@bitbucket.org/site/oauth2/access_token`);
        this.setParameters({
            grant_type: "client_credentials",
        });
    }

    public async authorize() {
        const response = await this.post<IAuthorizationRequestAnswer>();
        const { access_token } = response;
        this.user.setAccessToken(access_token);
    }
}
