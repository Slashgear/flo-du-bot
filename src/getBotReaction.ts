import { github } from "./octokitClient";
import { Context } from "@actions/github/lib/context";

export type BOT_STATUS = "APPROVE" | "REQUEST_CHANGES" | "COMMENT" | undefined;

export const getBotReaction = (context: Context) => {
  if (context.payload.pull_request) {
    github.rest.pulls
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

        if (botReview.state === "APPROVED") {
          return "APPROVE";
        }

        return "REQUEST_CHANGES";
      });
  }

  return undefined;
};
