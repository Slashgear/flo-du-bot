import { getInput } from "@actions/core";
import { context } from "@actions/github";

export const isPRFixOrFeat = () => {
  const pullRequestTitle = context.payload.pull_request?.title;
  const pattern = new RegExp(getInput("prTitlePattern"));
  return pattern.test(pullRequestTitle);
};
