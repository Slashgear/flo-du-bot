import { publishReview } from "../publishReview";
import { github } from "../octokitClient";
import { getInput } from "@actions/core";

describe("publishReview", () => {
  beforeEach(() => {
    github.rest = {
      pulls: {
        // @ts-ignore
        createReview: jest.fn(),
      },
    };
  });

  it("should use status COMMENT when user decide to use comment instead of REQUEST_CHANE", async () => {
    (getInput as jest.Mock).mockReturnValue("COMMENT");
    await publishReview("REQUEST_CHANGES");
    expect(github.rest.pulls.createReview).toBeCalledWith(
      expect.objectContaining({ event: "COMMENT" })
    );
  });
});
