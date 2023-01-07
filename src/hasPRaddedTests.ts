import { github } from "./octokitClient";
import { getInput } from "@actions/core";
import { Context } from "@actions/github/lib/context";

const testsFilesPatterns = new RegExp(getInput("testFileExtensionPattern"));

export const hasPRaddedTests = (context: Context) => {
  if (context.payload.pull_request) {
    return github.rest.pulls
      .listFiles({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.payload.pull_request.number,
      })
      .then(({ data: files }) =>
        files.some((file) => testsFilesPatterns.test(file.filename))
      )
      .catch(console.log);
  }
};
