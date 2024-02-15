import * as Style from "./style";

describe("toTransformString", () => {
  it("returns an empty string if no transform definitions are given", () => {
    expect(Style.toTransformString({})).toEqual("");
  });

  it("returns a string with two transform instructions when an object is given", () => {
    expect(
      Style.toTransformString({
        rotate: [45, 0, 1],
        skewY: [65],
      }),
    ).toEqual("rotate(45,0,1) skewY(65)");
  });

  it("returns a string with two transform instructions when two objects are given", () => {
    expect(
      Style.toTransformString({ rotate: [45, 0, 1] }, { skewY: [65] }),
    ).toEqual("rotate(45,0,1) skewY(65)");
  });

  it("returns at least the subsequent transforms if the first is undefined", () => {
    expect(Style.toTransformString(undefined, { skewY: [65] })).toEqual(
      "skewY(65)",
    );
  });
});
