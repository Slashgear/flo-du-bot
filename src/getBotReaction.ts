import { github } from "./octokitClient";
import { context } from "@actions/github";

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

        if (!botReview) {
          return undefined;
        }

        if (botReview.state === STATUS.APPROVE) {
          return STATUS.APPROVE;
        }

        return STATUS.REQUEST_CHANGES;
      });
  }

  return undefined;
};
