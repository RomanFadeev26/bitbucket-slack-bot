import { IPullRequest, IPullRequestsFetcher } from "./PullRequestsFetcher";
import Request from "./Request";
import { IUser } from "./User";

export interface IDiff {
    branchName: string;
    htmlLink: string;
    diff: string;
}

export interface IDiffsFetcher {
    fetchAllDiffs(): void;
    getAllDiffs(): IDiff[];
}

export default class DiffsFetcher extends Request implements IDiffsFetcher {
    private pullRequests: IPullRequest[];
    private diffs: IDiff[];

    constructor(pullRequestsFetcher: IPullRequestsFetcher, user: IUser) {
        super();
        this.pullRequests = pullRequestsFetcher.getAllRequests();
        this.diffs = [];
        this.addHeaders({
            Authorization: `Bearer ${user.getAccessToken()}`,
        });
    }

    public async fetchAllDiffs() {
        this.diffs = await Promise.all(
            this.getAllDiffsWithLinks().map(
                async ({
                    diff: diffLink,
                    ...restParams
                }: IDiff) => {
                    this.setUrl(diffLink);
                    const diff: string = await this.get<string>();
                    console.log("DIFFS FETCHED");
                    return {
                        diff,
                        ...restParams,
                    };
                },
            ),
        );
    }

    public getAllDiffs() {
        return this.diffs;
    }

    public getAllDiffsWithLinks(): IDiff[] {
        return this.pullRequests.map(
            ({
                links: {
                    diff: {
                        href: diffLink,
                    },
                    html: {
                        href: htmlLink,
                    },
                },
                source: {
                    branch: {
                        name,
                    },
                },
            }) => ({
                branchName: name,
                diff: diffLink,
                htmlLink,
            }),
        );
    }

}
