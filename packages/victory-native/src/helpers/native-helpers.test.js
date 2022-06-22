import { NativeHelpers } from "victory-native";

describe("getStyle", () => {
  it("should return undefined if not called with any arguments", () => {
    expect(NativeHelpers.getStyle()).toEqual(undefined);
  });

  it("removes all unsupported props and leaves others, including stroke props", () => {
    expect(
      NativeHelpers.getStyle({
        fill: "black",
        stroke: "grey",
        pointerEvents: "auto",
        x: 0,
        y: 0,
        _x: 0,
        _y: 0,
        userSelect: "none",
        strokeWidth: 1,
        strokeOpacity: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1,
        strokeLinecap: 1,
        strokeLinejoin: 1,
      }),
    ).toEqual({
      fill: "black",
      stroke: "grey",
      strokeWidth: 1,
      strokeOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeLinecap: 1,
      strokeLinejoin: 1,
    });
  });

  it("removes all unsupported and stroke props when stroke is transparent", () => {
    expect(
      NativeHelpers.getStyle({
        stroke: "transparent",
        fill: "black",
        pointerEvents: "auto",
        x: 0,
        y: 0,
        _x: 0,
        _y: 0,
        userSelect: "none",
        strokeWidth: 1,
        strokeOpacity: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1,
        strokeLinecap: 1,
        strokeLinejoin: 1,
      }),
    ).toEqual({ fill: "black" });
  });

  it("removes all unsupported and stroke props when stroke is 'none'", () => {
    expect(
      NativeHelpers.getStyle({
        stroke: "none",
        fill: "black",
        pointerEvents: "auto",
        x: 0,
        y: 0,
        _x: 0,
        _y: 0,
        userSelect: "none",
        strokeWidth: 1,
        strokeOpacity: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1,
        strokeLinecap: 1,
        strokeLinejoin: 1,
      }),
    ).toEqual({ fill: "black" });
  });

  it("removes extra properties if given", () => {
    expect(
      NativeHelpers.getStyle({ width: 100, height: 100, depth: 100 }, [
        "width",
        "depth",
      ]),
    ).toEqual({ height: 100 });
  });
});
