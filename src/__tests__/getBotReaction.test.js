const { getBotReaction, STATUS } = require("../getBotReaction");
const { github } = require("../octokitClient");

jest.mock("../octokitClient");
jest.mock("@actions/core");
jest.mock("@actions/github");
describe("getBotReaction", () => {
  it("should return no status when no bot review is found", async () => {
    github.rest = {
      pulls: {
        listReviews: jest.fn().mockResolvedValue({
          data: [
            {
              user: {
                type: undefined,
              },
              state: "APPROVE",
            },
          ],
        }),
      },
    };
    expect(await getBotReaction()).toBeUndefined();
  });

  it("should return APPROVE when bot has approve", async () => {
    github.rest = {
      pulls: {
        listReviews: jest.fn().mockResolvedValue({
          data: [
            {
              user: {
                type: "Bot",
              },
              state: "APPROVE",
            },
          ],
        }),
      },
    };
    expect(await getBotReaction()).toEqual(STATUS.APPROVE);
  });

  it("should return Request change", async () => {
    github.rest = {
      pulls: {
        listReviews: jest.fn().mockResolvedValue({
          data: [
            {
              user: {
                type: "Bot",
              },
              state: "REQUEST_CHANGES",
            },
          ],
        }),
      },
    };
    expect(await getBotReaction()).toEqual(STATUS.REQUEST_CHANGES);
  });
});
