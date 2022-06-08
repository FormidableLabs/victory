import { Hooks } from "victory-core";
import { renderHook } from "@testing-library/react-hooks";

describe("usePadding", () => {
  it("sets padding from a single number", () => {
    const padding = 40;
    const { result } = renderHook(() => Hooks.usePadding(padding));
    expect(result.current).toEqual({
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    });
  });

  it("sets padding from a complete object", () => {
    const padding = { top: 20, bottom: 40, left: 60, right: 80 };
    const { result } = renderHook(() => Hooks.usePadding(padding));
    expect(result.current).toEqual(padding);
  });

  it("fills missing values with 0", () => {
    const padding = { top: 40, bottom: 40 };
    const { result } = renderHook(() => Hooks.usePadding(padding));
    expect(result.current).toEqual({
      top: 40,
      bottom: 40,
      left: 0,
      right: 0
    });
  });
});
