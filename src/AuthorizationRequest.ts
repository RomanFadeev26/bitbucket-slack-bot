import Request from "./Request";
import User from "./User";

interface IAuthorizationRequestAnswer {
    "access_token": string;
    "scopes": string;
    "expires_in": number;
    "refresh_token": string;
    "token_type": string;
}

interface IAuthorization {
    authorize(): void;
}

export default class AuthorizationRequest extends Request implements IAuthorization {

    private credentials: string;
    private user: User;

    constructor(user: User) {
        super();
        this.user = user;
        this.credentials = user.getCredentials();
        this.addHeaders({
            Authorization: user.getEncodeCredentials(),
        });
        this.setUrl(`https://${this.credentials}@bitbucket.org/site/oauth2/access_token`);
        this.setParameters({
            grant_type: "client_credentials",
        });
    }

    public authorize() {
        this.post<IAuthorizationRequestAnswer>().then(({access_token}) => this.user.setAccessToken(access_token));
    }
}
