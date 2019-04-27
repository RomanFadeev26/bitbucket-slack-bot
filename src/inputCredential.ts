import { readFileSync } from "fs";

interface ICredentialsIterator extends Iterable<string> {
  currentIndex: number;
  values: string[];
}

const credentialsIterator: ICredentialsIterator = {
  currentIndex: 0,
  values: readFileSync("credentials.txt", "utf8").split(" "),
  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.currentIndex < this.values.length) {
          // tslint:disable-next-line:no-shadowed-variable
          const value = this.values[this.currentIndex];
          this.currentIndex++;
          return {
            done: false,
            value,
          };
        }
        this.currentIndex = 0;
        const value = this.values[this.currentIndex];
        this.currentIndex++;
        return {
          done: false,
          value,
        };
      },
    };
  },
};

const credentialsGenerator = function *() {
  // tslint:disable-next-line:prefer-const
  for (let cred of credentialsIterator) {
    yield cred;
  }
};

const generator = credentialsGenerator();

const inputCredential: () => Promise<string> = () => Promise.resolve(generator.next().value);

export default inputCredential;
