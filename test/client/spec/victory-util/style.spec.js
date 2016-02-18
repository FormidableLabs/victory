import { toTransformString } from "src/style";

describe("toTransformString", () => {
  it("returns an empty string if no transform definitions are given", () => {
    expect(toTransformString({})).to.equal("");
  });
});
