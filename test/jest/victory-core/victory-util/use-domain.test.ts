/* eslint-disable max-nested-callbacks */
import { Hooks } from "victory-core";
import { renderHook } from "@testing-library/react-hooks";

describe("useDomain", () => {
  describe("domain from props", () => {
    it("returns the domain a single domain prop", () => {
      const props = {
        domain: [0, 1]
      };
      const { result } = renderHook(() => Hooks.useDomain(props));
      expect(result.current.x).toEqual([0, 1]);
      expect(result.current.y).toEqual([0, 1]);
    });

    it("returns the domain from props for x and y", () => {
      const props = {
        domain: { x: [0, 1], y: [0, 2] }
      };
      const { result } = renderHook(() => Hooks.useDomain(props));
      expect(result.current.x).toEqual([0, 1]);
      expect(result.current.y).toEqual([0, 2]);
    });

    it("returns a domain from minDomain and maxDomain if both are defined", () => {
      const props = { minDomain: 1, maxDomain: 10 };
      const { result } = renderHook(() => Hooks.useDomain(props));
      expect(result.current.x).toEqual([1, 10]);
      expect(result.current.y).toEqual([1, 10]);
    });

    it("returns a domain from minDoman and maxDomain if both are defined for x and y", () => {
      const props = {
        minDomain: { x: 1, y: 2 },
        maxDomain: { x: 10, y: 20 }
      };
      const { result } = renderHook(() => Hooks.useDomain(props));
      expect(result.current.x).toEqual([1, 10]);
      expect(result.current.y).toEqual([2, 20]);
    });
  });
});
