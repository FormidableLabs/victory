import Style, { sanitizeSvgStyle } from "src/victory-util/style";

describe("sanitizeSvgStyle", () => {
  it("drop invalid svg attributes", () => {
    const data = { tree: "blue", stroke: "#c43a31" };
    expect(sanitizeSvgStyle(data)).to.deep.equal({ stroke: "#c43a31" });
  });
});

describe("toTransformString", () => {
  it("returns an empty string if no transform definitions are given", () => {
    expect(Style.toTransformString({})).to.equal("");
  });

  it("returns a string with two transform instructions when an object is given", () => {
    expect(Style.toTransformString({
      rotate: [45, 0, 1], skewY: [65]
    })).to.equal("rotate(45,0,1) skewY(65)");
  });

  it("returns a string with two transform instructions when two objects are given", () => {
    expect(Style.toTransformString(
      { rotate: [45, 0, 1] }, { skewY: [65] }
    )).to.equal("rotate(45,0,1) skewY(65)");
  });

  it("returns at least the subsequent transforms if the first is undefined", () => {
    expect(Style.toTransformString(
      null, { skewY: [65] }
    )).to.contain("skewY(65)");
  });
});
