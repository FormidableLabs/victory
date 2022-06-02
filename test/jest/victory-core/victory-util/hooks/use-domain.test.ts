// @ts-expect-error No declaration for Hooks
import { Hooks } from "victory-core";
import { renderHook } from "@testing-library/react-hooks";
console.log(Hooks);

describe("useDomain", () => {
  it("returns the domain from props", () => {
    const { result } = renderHook(() =>
      Hooks.useDomain({ domain: [0, 1] }, "x")
    );
    expect(result.current.domain).toEqual([0, 1]);
  });
});
