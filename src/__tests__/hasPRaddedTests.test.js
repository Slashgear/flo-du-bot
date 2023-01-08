const { getInput } = require("@actions/core");
const { github } = require("../octokitClient");
const { hasPRaddedTests } = require("../hasPRaddedTests");

jest.mock("../octokitClient");
jest.mock("@actions/core");
jest.mock("@actions/github");

describe("hasPRaddedTests", () => {
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

  it("PR need test if files modify tests files that match input regexp", async () => {
    getInput.mockReturnValue("foo");

    expect(await hasPRaddedTests()).toBeTruthy();
  });

  it("PR did not modify any test file", async () => {
    getInput.mockReturnValue("antoine");

    expect(await hasPRaddedTests()).toBeFalsy();
  });
});
