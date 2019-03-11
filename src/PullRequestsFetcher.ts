import Request from "./Request";
import { IUser } from "./User";

export interface IPullRequest {
    links: {
        [key: string]: {
            href: string;
        },
    };
    source: {
        branch: {
            name: string;
        },
    };
}

export interface IPullRequestsAnswer {
    values: IPullRequest[];
    next?: string;
}

export interface IPullRequestsFetcher {
    getAllRequests(): IPullRequest[];
    fetchAllPullRequests(): Promise<void>;
}

export default class PullRequestsFetcher extends Request implements IPullRequestsFetcher {
    private pullRequests: IPullRequest[];

    constructor(user: IUser) {
        super();
        this.setHeaders({
            Authorization: `Bearer ${user.getAccessToken()}`,
        });
        this.pullRequests = [];
        this.setUrl(`https://api.bitbucket.org/2.0/pullrequests/${user.getUserName()}`);
    }

    public async fetchAllPullRequests() {
        const pullRequestsPage: IPullRequestsAnswer = await this.fetchPullRequests();

        const { values, next } = pullRequestsPage;
        this.pullRequests.concat(values);
        if (Boolean(next)) {
            this.setUrl(next);
            this.fetchAllPullRequests();
        }
    }

    public getAllRequests() {
        return this.pullRequests;
    }

    private fetchPullRequests() {
        return this.get<IPullRequestsAnswer>();
    }

}
