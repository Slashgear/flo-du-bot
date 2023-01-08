const { doesPRNeedTests } = require("../doesPRNeedTests");
const { getInput } = require("@actions/core");
const { github } = require("../octokitClient");

jest.mock("../octokitClient");
jest.mock("@actions/core");
jest.mock("@actions/github");

describe("doesPRNeedTests", () => {
  beforeEach(() => {
    github.rest = {
      pulls: {
        listFiles: jest.fn().mockResolvedValue({
          data: [
            {
              filename: "foo",
            },
            {
              filename: "bar",
            },
          ],
        }),
      },
    };
  });

  it("PR need test if files modify files that match input regexp", async () => {
    getInput.mockReturnValue("foo");

    expect(await doesPRNeedTests()).toBeTruthy();
  });

  it("PR don' require tests when not modifying input regexp matching files", async () => {
    getInput.mockReturnValue("antoine");

    expect(await doesPRNeedTests()).toBeFalsy();
  });
});
