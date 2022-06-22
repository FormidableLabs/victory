import { useVictoryContext, VictoryProvider } from "victory-core";
import { act, renderHook } from "@testing-library/react-hooks";

describe("Victory Provider", () => {
  it("returns default values", () => {
    const { result } = renderHook(() => useVictoryContext((c) => c), {
      wrapper: VictoryProvider,
    });

    expect(result.current.data).toHaveLength(0);

    // @ts-expect-error I have no idea why x and y do not exist on this type
    const { x, y } = result.current.scale;
    expect(x.domain()).toEqual([0, 1]);
    expect(y.domain()).toEqual([0, 1]);
    expect(x.range()).toEqual([0, 450]);
    expect(y.range()).toEqual([300, 0]);
  });

  it("syncs the child props with the provider state", () => {
    const { result } = renderHook(() => useVictoryContext((c) => c), {
      wrapper: VictoryProvider,
    });

    act(() => {
      result.current.setChildProps("chart-1", {
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      });
    });
    act(() => {
      result.current.setChildProps("chart-2", {
        data: [
          { x: 3, y: 3 },
          { x: 4, y: 4 },
        ],
      });
    });

    expect(result.current.domain).toEqual({ x: [1, 4], y: [1, 4] });
  });
});
