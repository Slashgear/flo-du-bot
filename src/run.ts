import { info, setFailed, debug, getInput } from "@actions/core";
import { context } from "@actions/github";
import { isPRFixOrFeat } from "./isPRFixOrFeat";
import { doesPRNeedTests } from "./doesPRNeedTests";
import { hasPRaddedTests } from "./hasPRaddedTests";
import { BOT_STATUS, STATUS } from "./getBotReaction";
import { handleReview } from "./handleReview";

export const run = async () => {
  const { eventName } = context;
  info(`Event name: ${eventName}`);

  if (eventName !== "pull_request") {
    setFailed(`Invalid event: ${eventName}, it should be use on pull_request`);
    return;
  }

  if (!isPRFixOrFeat()) {
    info("Pull request is not under flo-du-bot watch 😎");

    return;
  }

  const needTests = await doesPRNeedTests();
  const prAddedTest = await hasPRaddedTests();

  info(`Does PR need test: ${needTests}`);
  info(`Does PR add test: ${prAddedTest}`);

  const newStatus =
    needTests && !prAddedTest ? STATUS.REQUEST_CHANGES : STATUS.APPROVE;
  debug(`New status ${newStatus}`);

  if (getInput("reviewEvent") !== "NONE") {
    await handleReview(newStatus as BOT_STATUS);
  }

  if (!newStatus) {
    setFailed("Pull request need test addition or modification to be valid!");
  }
};
