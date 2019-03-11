import AuthorizationRequest, { IAuthorization } from "./AuthorizationRequest";
import ConflictFinder, { IConflictFinder } from "./ConflictFinder";
import DiffsFetcher, { IDiffsFetcher } from "./DiffsFetcher";
import PullRequestsFetcher, { IPullRequestsFetcher } from "./PullRequestsFetcher";
import SlackBot, { ISlackBot } from "./SlackBot";
import User, { IUser } from "./User";

interface IAlfred {
    run(): Promise<void>;
}

export default class Alfred implements IAlfred {

    public async run(): Promise<void> {

        const user: IUser = new User();
        await user.setCredetials();
        const authRequest: IAuthorization = new AuthorizationRequest(user);
        await authRequest.authorize();
        const pullReqFetcher: IPullRequestsFetcher = new PullRequestsFetcher(user);
        await pullReqFetcher.fetchAllPullRequests();
        const diffsFetcher: IDiffsFetcher = new DiffsFetcher(pullReqFetcher, user);
        await diffsFetcher.fetchAllDiffs();
        const conflictFinder: IConflictFinder = new ConflictFinder(diffsFetcher);
        await conflictFinder.findAllConflicts();

        const bot: ISlackBot = new SlackBot(conflictFinder);
        await bot.setCredentials();
        bot.sendMessagesAboutConflicts();
    }
}
