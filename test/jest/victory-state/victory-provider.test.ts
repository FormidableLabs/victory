import { useVictoryContext, VictoryProvider } from "victory-core";
import { renderHook } from "@testing-library/react-hooks";

describe("useVictoryContext", () => {
  it("returns default values", () => {
    const { result } = renderHook(() => useVictoryContext(), {
      wrapper: VictoryProvider
    });

    expect(result.current.data).toHaveLength(0);

    const { x, y } = result.current.scale;
    expect(x.domain()).toEqual([0, 1]);
    expect(y.domain()).toEqual([0, 1]);
    expect(x.range()).toEqual([0, 450]);
    expect(y.range()).toEqual([300, 0]);
  });
});
