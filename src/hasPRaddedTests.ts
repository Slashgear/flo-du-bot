import { github } from "./octokitClient";
import { getInput } from "@actions/core";
import { context } from "@actions/github";

export const hasPRaddedTests = () => {
  const testsFilesPatterns = new RegExp(getInput("testFileExtensionPattern"));

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
