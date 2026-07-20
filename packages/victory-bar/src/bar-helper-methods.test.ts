import { getCornerRadius } from "./bar-helper-methods";
import { BarProps } from "./bar";

describe("getCornerRadius", () => {
  const props = {} as BarProps;

  it("returns all-zero corners when cornerRadius is not provided", () => {
    expect(getCornerRadius(undefined, props)).toEqual({
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
    });
  });

  it("applies a numeric cornerRadius to the top corners only", () => {
    expect(getCornerRadius(5, props)).toEqual({
      topLeft: 5,
      topRight: 5,
      bottomLeft: 0,
      bottomRight: 0,
    });
  });

  it("applies a callback that returns a number to the top corners only", () => {
    expect(getCornerRadius(() => 7, props)).toEqual({
      topLeft: 7,
      topRight: 7,
      bottomLeft: 0,
      bottomRight: 0,
    });
  });

  it("supports an object with top/bottom shorthands", () => {
    expect(getCornerRadius({ top: 4, bottom: 2 }, props)).toEqual({
      topLeft: 4,
      topRight: 4,
      bottomLeft: 2,
      bottomRight: 2,
    });
  });

  it("supports an object targeting individual corners", () => {
    expect(getCornerRadius({ topLeft: 3, bottomRight: 6 }, props)).toEqual({
      topLeft: 3,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 6,
    });
  });

  it("supports a callback that returns a top/bottom object", () => {
    expect(getCornerRadius(() => ({ top: 8, bottom: 1 }), props)).toEqual({
      topLeft: 8,
      topRight: 8,
      bottomLeft: 1,
      bottomRight: 1,
    });
  });

  it("supports a callback that returns an object with per-corner values", () => {
    expect(
      getCornerRadius(() => ({ topLeft: 9, bottomLeft: 2 }), props),
    ).toEqual({
      topLeft: 9,
      topRight: 0,
      bottomLeft: 2,
      bottomRight: 0,
    });
  });

  it("evaluates per-corner callbacks returned from a callback", () => {
    expect(
      getCornerRadius(() => ({ top: () => 12, bottom: 3 }), props),
    ).toEqual({
      topLeft: 12,
      topRight: 12,
      bottomLeft: 3,
      bottomRight: 3,
    });
  });

  it("passes props to the cornerRadius callback", () => {
    const cornerRadius = jest.fn(() => 10);
    getCornerRadius(cornerRadius, props);
    expect(cornerRadius).toHaveBeenCalledWith(props);
  });
});
