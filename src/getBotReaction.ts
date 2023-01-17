import { github } from "./octokitClient";
import { context } from "@actions/github";
import { info } from "@actions/core";

export type BOT_STATUS = "APPROVE" | "REQUEST_CHANGES" | "COMMENT";

type Status_type = {
  [day in BOT_STATUS]: BOT_STATUS;
};

export const STATUS: Status_type = {
  APPROVE: "APPROVE",
  REQUEST_CHANGES: "REQUEST_CHANGES",
  COMMENT: "COMMENT",
};

export const getBotReaction = () => {
  if (context.payload.pull_request) {
    return github.rest.pulls
      .listReviews({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.payload.pull_request.number,
      })
      .then(({ data: reviews }) => {
        const botReview = reviews
          .reverse()
          .find((review) => review.user?.type === "Bot");

        info(`Api bot review status ${botReview}`);

        if (!botReview) {
          return undefined;
        }

        return botReview.state;
      });
  }

  return undefined;
};
