import { useVictoryContext, VictoryProvider } from "victory-core";
import { renderHook } from "@testing-library/react-hooks";

describe("useVictoryContext", () => {
  it("returns default values", () => {
    const { result } = renderHook(() => useVictoryContext(), {
      wrapper: VictoryProvider
    });

    expect(result.current.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "_x": 0,
          "_y": 0,
          "x": 0,
          "y": 0,
        },
        Object {
          "_x": 1,
          "_y": 1,
          "x": 1,
          "y": 1,
        },
      ]
    `);

    const { x, y } = result.current.scale;
    expect(x.domain()).toEqual([0, 1]);
    expect(y.domain()).toEqual([0, 1]);
    expect(x.range()).toEqual([0, 450]);
    expect(y.range()).toEqual([300, 0]);
  });
});
