import { Context } from "@actions/github/lib/context";
import { getInput } from "@actions/core";

export const isPRFixOrFeat = (context: Context) => {
  const pullRequestTitle = context.payload.pull_request?.title;
  const pattern = new RegExp(getInput("prTitlePattern"));
  return pattern.test(pullRequestTitle);
};
