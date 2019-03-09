import { IDiff, IDiffsFetcher } from "./DiffsFetcher";

export interface IConflict {
    branchName: string;
    link: string;
}

export interface IConflictFinder {
    findAllConflicts(): void;
    getAllConflicts(): IConflict[];
}

export default class ConflictFinder implements IConflictFinder {

    private diffs: IDiff[];
    private conflicts: IConflict[];

    constructor(diffsFetcher: IDiffsFetcher) {
        this.diffs = diffsFetcher.getAllDiffs();
        this.conflicts = [];
    }

    public getAllConflicts() {
        return this.conflicts;
    }

    public findAllConflicts() {
        const diffsWithConflicts: IDiff[] = this.diffs.filter(
            ({diff}) => diff.includes("<<<<<<<"),
        );

        this.conflicts = diffsWithConflicts.map<IConflict>(
            (diff) => ({
                branchName: diff.branchName,
                link: diff.htmlLink,
            }),
        );
    }

}
