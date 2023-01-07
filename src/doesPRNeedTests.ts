import { Context } from "@actions/github/lib/context";
import { github } from "./octokitClient";
import { getInput } from "@actions/core";

const filesPatterns = new RegExp(getInput("sourceFilePattern"));

export const doesPRNeedTests = (context: Context) => {
  if (context.payload.pull_request) {
    return github.rest.pulls
      .listFiles({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.payload.pull_request.number,
      })
      .then(({ data: files }) => {
        return files.some((file) => filesPatterns.test(file.filename));
      })
      .catch(console.log);
  }
};
