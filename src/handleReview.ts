import { BOT_STATUS, getBotReaction } from "./getBotReaction";
import { debug, info } from "@actions/core";
import { publishReview } from "./publishReview";

export const handleReview = async (newStatus?: BOT_STATUS) => {
  const currentBotStatus = await getBotReaction();

  debug(`Current Bot Review is ${currentBotStatus}`);

  if (currentBotStatus === newStatus) {
    info("Nothing has changed on the PR sadly 🥲");
  } else {
    info(
      `Status of test addition have changed, publishing new review ${newStatus}`
    );
    await publishReview(newStatus);
  }
};
