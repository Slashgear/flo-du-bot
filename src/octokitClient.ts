import { getInput } from "@actions/core";
import { getOctokit } from "@actions/github";
export const github = getOctokit(getInput("token"));
