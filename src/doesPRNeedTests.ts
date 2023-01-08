import { getInput } from "@actions/core";
import { context } from "@actions/github";

import { github } from "./octokitClient";
export const doesPRNeedTests = () => {
  const filesPatterns = new RegExp(getInput("sourceFilePattern"));

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
