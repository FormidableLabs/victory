import { Hooks } from "victory-core";
import { renderHook } from "@testing-library/react-hooks";

describe("useRange", () => {
  it("returns a range from props", () => {
    const props = {
      range: [0, 1]
    };
    const { result } = renderHook(() => Hooks.useRange(props, "x"));
    expect(result.current).toEqual([0, 1]);
  });

  it("returns a range based on props and axis", () => {
    const props = {
      width: 100,
      height: 200,
      padding: 0
    };
    const { result: xResult } = renderHook(() => Hooks.useRange(props, "x"));
    const x = xResult.current;
    expect(Array.isArray(x)).toBe(true);
    expect(x).toHaveLength(2);
    expect(x).toEqual([0, 100]);

    const { result: yResult } = renderHook(() => Hooks.useRange(props, "y"));
    const y = yResult.current;
    expect(Array.isArray(y)).toBe(true);
    expect(y).toHaveLength(2);
    expect(y).toEqual([200, 0]);
  });
});
