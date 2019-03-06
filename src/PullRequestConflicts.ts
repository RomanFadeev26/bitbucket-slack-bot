import { IPullRequest } from "./FetcherPullRequests";

interface IPullRequestConflict {
    branchName: string;
    link: string;
}

interface IPullRequestConflicts {
    findAllConflicts(): void;
    getAllConflicts(): IPullRequestConflict[];
}

export default class PullRequestConflicts implements IPullRequestConflicts {

    private pullRequests: IPullRequest[];
    private conflicts: IPullRequestConflict[];

    constructor(pullRequests: IPullRequest[]) {
        this.pullRequests = pullRequests;
        this.conflicts = [];
    }

    public getAllConflicts() {
        return this.conflicts;
    }

    public findAllConflicts() {
        return;
    }

}
