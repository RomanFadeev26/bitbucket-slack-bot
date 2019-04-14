import { readFileSync } from "fs";
import { createInterface } from "readline";
import LinkedList, { ILinkedList } from "./LinkedList/LinkedList";

const credentialsGenerator = function *() {
    const fileContent = readFileSync("credentials.txt", "utf8").split(" ");
    // tslint:disable-next-line:prefer-const
    for (let cred of fileContent ) {
      yield cred;
    }
};

const generator = credentialsGenerator();

const inputCredential: (
  credentialsType: string,
) => Promise<string> = () => Promise.resolve(generator.next().value);

export default inputCredential;
