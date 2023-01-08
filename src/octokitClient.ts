import { getInput } from "@actions/core";
import GithubActionUtils from "@actions/github";
export const github = GithubActionUtils.getOctokit(getInput("token"));
