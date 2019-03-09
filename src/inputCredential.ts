import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputCredential: (
  credentialsType: string,
) => Promise<string> = (credentialsType) => {
    return new Promise((resolve) => {
        rl.question(credentialsType, (answer: string) => {
            rl.close();
            resolve(answer);
          });
    });
};

export default inputCredential;
