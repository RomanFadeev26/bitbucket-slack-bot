import readline from "readline";

const inputCredential: (
  credentialsType: string,
) => Promise<string> = (credentialsType) => {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(`${credentialsType}: `, (answer: string) => {
            rl.close();
            resolve(answer);
          });
    });
};

export default inputCredential;
