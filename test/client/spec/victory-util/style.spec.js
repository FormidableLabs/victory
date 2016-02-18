import { toTransformString } from "src/victory-util/style";

describe("toTransformString", () => {
  it("returns an empty string if no transform definitions are given", () => {
    expect(toTransformString({})).to.equal("");
  });
});
