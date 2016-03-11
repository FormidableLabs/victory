import { Style } from "src/index";

describe("toTransformString", () => {
  it("returns an empty string if no transform definitions are given", () => {
    expect(Style.toTransformString({})).to.equal("");
  });
});
