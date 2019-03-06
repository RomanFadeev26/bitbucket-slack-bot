import { IPullRequest } from "./PullRequestsFetcher";
import Request from "./Request";
import { IUser } from "./User";

interface IDiff {
    branchName: string;
    htmlLink: string;
    diff: string;
}

interface IDiffsFetcher {
    fetchAllDiffs(): void;
    getAllDiffs(): IDiff[];
}

export default class DiffsFetcher extends Request implements IDiffsFetcher {
    private pullRequests: IPullRequest[];
    private diffs: IDiff[];
    private user: IUser;

    constructor(pullRequests: IPullRequest[], user: IUser) {
        super();
        this.pullRequests = pullRequests;
        this.diffs = [];
        this.user = user;
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
                    const diff: string = await this.get();
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

    private getAllDiffsWithLinks(): IDiff[] {
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
