import { info, setFailed, debug, getInput } from "@actions/core";
import { Context } from "@actions/github/lib/context";
import { isPRFixOrFeat } from "./isPRFixOrFeat";
import { doesPRNeedTests } from "./doesPRNeedTests";
import { hasPRaddedTests } from "./hasPRaddedTests";
import { BOT_STATUS, getBotReaction } from "./getBotReaction";
import { publishReview } from "./publishReview";

const handleReview = async (context: Context, newStatus: BOT_STATUS) => {
  const currentBotStatus = await getBotReaction(context);

  debug(`Current Bot Review is ${currentBotStatus}`);

  if (currentBotStatus === newStatus) {
    info("Nothing has changed on the PR sadly 🥲");
  } else {
    info(
      `Status of test addition have changed, publishing new review ${newStatus}`
    );
    await publishReview(context, newStatus);
  }
};

export const run = async (context: Context) => {
  const { eventName } = context;
  info(`Event name: ${eventName}`);

  if (eventName !== "pull_request") {
    setFailed(`Invalid event: ${eventName}, it should be use on pull_request`);
    return;
  }

  if (!isPRFixOrFeat(context)) {
    info("Pull request is not under flo-du-bot watch 😎");

    return;
  }

  const needTests = await doesPRNeedTests(context);
  const prAddedTest = await hasPRaddedTests(context);

  info(`Does PR need test: ${needTests}`);
  info(`Does PR add test: ${prAddedTest}`);

  const newStatus = needTests && !prAddedTest ? "REQUEST_CHANGES" : "APPROVE";
  debug(`New status ${newStatus}`);

  if (getInput("reviewEvent") !== "NONE") {
    await handleReview(context, newStatus);
  }

  if (!newStatus) {
    setFailed("Pull request need test addition or modification to be valid!");
  }
};
