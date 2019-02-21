import readline from "readline";
import { credentials } from "./types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputCredential: (
  credentialsType: credentials,
) => Promise<string> = (credentialsType) => {
    return new Promise((resolve) => {
        rl.question(credentialsType, (answer: string) => {
            rl.close();
            resolve(answer);
          });
    });
};

export default inputCredential;
