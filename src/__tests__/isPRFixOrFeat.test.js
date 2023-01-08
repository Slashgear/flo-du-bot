const { isPRFixOrFeat } = require("../isPRFixOrFeat");
const { getInput } = require("@actions/core");

describe("isPRFixOrFeat", () => {
  it("should consider Pull request has feat of fix when title match regexp", () => {
    getInput.mockReturnValue("foo");
    expect(isPRFixOrFeat()).toBeTruthy();
  });

  it("should ignore Pull request when title does not match input regexp", () => {
    getInput.mockReturnValue("bar");
    expect(isPRFixOrFeat()).toBeFalsy();
  });
});
