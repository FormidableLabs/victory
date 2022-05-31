/* eslint no-unused-expressions: 0 */
import * as Helpers from "victory-scatter/lib/helper-methods";

describe("victory-scatter/helper-methods", () => {
  describe("getSize", () => {
    beforeEach(() => {
      jest.spyOn(Helpers, "getBubbleSize");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    const data = [
      { x: 1, y: 2, z: 1, t: 4 },
      { x: 2, y: 3, z: 1, t: 2 }
    ];
    const datum = data[0];
    it("returns a size attribute from data", () => {
      const point = { size: 3, ...datum };
      const sizeResult = Helpers.getSize(point, {});
      expect(Helpers.getBubbleSize).not.toHaveBeenCalled();
      expect(sizeResult).toEqual(3);
    });

    it("returns 1 if the size attribute is less than one", () => {
      const point = { size: -2, ...datum };
      const sizeResult = Helpers.getSize(point, {});
      expect(Helpers.getBubbleSize).notCalled;
      expect(sizeResult).toEqual(1);
    });

    it("returns size from props, if no size is set on data", () => {
      const sizeResult = Helpers.getSize(datum, { data, size: 2 });
      expect(Helpers.getBubbleSize).notCalled;
      expect(sizeResult).toEqual(2);
    });

    it("calculates a bubbleSize if a bubbleProperty is specified, and size is not set", () => {
      const sizeResult = Helpers.getSize(datum, { data, z: "t" });
      expect(sizeResult).toEqual(5);
    });
  });

  describe("getBubbleSize", () => {
    it("determines the size of a point", () => {
      const data = [
        { x: 1, y: 2, z: 5 },
        { x: 2, y: 3, z: 1 }
      ];
      const props = { data, z: "z" };
      const sizeResult = Helpers.getBubbleSize(data[0], props);
      expect(sizeResult).toEqual(5);
    });
  });

  describe("getSymbol", () => {
    const data = { symbol: "star" };
    const props = { symbol: "plus" };
    it("returns 'circle' for bubble plots", () => {
      const symbolResult = Helpers.getSymbol(
        {},
        { ...props, bubbleProperty: "z" }
      );
      expect(symbolResult).toEqual("circle");
    });

    it("returns a symbol from data if one is given", () => {
      const symbolResult = Helpers.getSymbol(data, props);
      expect(symbolResult).toEqual("star");
    });

    it("returns a symbol from props if no symbol is found on data", () => {
      const symbolResult = Helpers.getSymbol({}, props);
      expect(symbolResult).toEqual("plus");
    });
  });
});
