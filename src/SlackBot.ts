import { Block, WebClient } from "@slack/client";
import { IConflict, IConflictFinder } from "./ConflictFinder";
import inputCredential from "./inputCredential";

export interface ISlackBot {
  setCredentials(): Promise<void>;
  sendMessagesAboutConflicts(): void;
}

export default class SlackBot implements ISlackBot {
  private token: string;
  private conversationId: string;
  private conflicts: IConflict[];

  constructor(conflictFinder: IConflictFinder) {
    this.token = "";
    this.conversationId = "";
    this.conflicts = conflictFinder.getAllConflicts();
  }

  public async setCredentials() {
    await this.setToken();
    await this.setConversationId();
  }

  public sendMessagesAboutConflicts() {
    const webClient: WebClient = new WebClient(this.token);

    this.createMessageBlocks().forEach(
      (blocks) => {
        webClient.chat.postMessage({
          as_user: true,
          blocks,
          channel: this.conversationId,
          text: "Найдены конфликты с master",
        });
      },
    );
  }

  private createMessageBlocks(): Block[][] {
    return this.conflicts.map(
      (conflict) => [
        {
            text: {
                text: "\n",
                type: "mrkdwn",
            },
            type: "section",
        },
        {
            text: {
                text: `Обнаружены конфликты, sir! \n\n<${conflict.link}|Перейти в Pull Request>`,
                type: "mrkdwn",
            },
            type: "section",
        },
        {
            elements: [
                {
                    text: conflict.branchName,
                    type: "plain_text",
                },
            ],
            type: "context",
        },
      ],
    );
  }

  private async setToken() {
    this.token = await inputCredential();
  }

  private async setConversationId() {
    this.conversationId = await inputCredential();
  }
}
