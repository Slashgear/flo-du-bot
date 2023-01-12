import { doesPRNeedTests } from "../doesPRNeedTests";
import { hasPRaddedTests } from "../hasPRaddedTests";
import { run } from "../run";
import { getInput } from "@actions/core";
import { handleReview } from "../handleReview";
import { context } from "@actions/github";
import { isPRFixOrFeat } from "../isPRFixOrFeat";

jest.mock("../doesPRNeedTests");
jest.mock("../hasPRaddedTests");
jest.mock("../handleReview");
jest.mock("../isPRFixOrFeat");
describe("run", () => {
  beforeEach(() => {
    context.eventName = "pull_request";
    (doesPRNeedTests as jest.Mock).mockResolvedValue(true);
    (getInput as jest.Mock).mockReturnValue("FOO");
    (isPRFixOrFeat as jest.Mock).mockReturnValue(true);
  });

  it(`should set status to Request Change when PR need test and don't have test`, async () => {
    (hasPRaddedTests as jest.Mock).mockResolvedValue(false);
    await run();

    expect(handleReview).toHaveBeenCalledWith("REQUEST_CHANGES");
  });

  it("should set status to Approved when PR have need and have test ", async () => {
    (hasPRaddedTests as jest.Mock).mockResolvedValue(true);
    await run();
    expect(handleReview).toHaveBeenCalledWith("APPROVE");
  });
});
