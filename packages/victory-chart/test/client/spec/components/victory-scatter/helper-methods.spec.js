/* eslint no-unused-expressions: 0 */
/* global sinon */
import { getSize, getBubbleSize, getSymbol } from "src/components/victory-scatter/helper-methods";

describe("victory-scatter/helper-methods", () => {
  describe("getSize", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(getBubbleSize);
    });

    afterEach(() => {
      sandbox.restore();
    });
    const data = [{ x: 1, y: 2, z: 1, t: 4 }, { x: 2, y: 3, z: 1, t: 2 }];
    const datum = data[0];
    it("returns a size attribute from data", () => {
      const point = { size: 3, ...datum };
      const sizeResult = getSize(point, {});
      expect(getBubbleSize).notCalled;
      expect(sizeResult).to.equal(3);
    });

    it("returns 1 if the size attribute is less than one", () => {
      const point = { size: -2, ...datum };
      const sizeResult = getSize(point, {});
      expect(getBubbleSize).notCalled;
      expect(sizeResult).to.equal(1);
    });

    it("returns size from props, if no size is set on data", () => {
      const sizeResult = getSize(datum, { data, size: 2 });
      expect(getBubbleSize).notCalled;
      expect(sizeResult).to.equal(2);
    });

    it("calculates a bubbleSize if a bubbleProperty is specified, and size is not set", () => {
      const sizeResult = getSize(datum, { data, z: "t" });
      expect(sizeResult).to.equal(5);
    });
  });

  describe("getBubbleSize", () => {
    it("determines the size of a point", () => {
      const data = [{ x: 1, y: 2, z: 5 }, { x: 2, y: 3, z: 1 }];
      const props = { data, z: "z" };
      const sizeResult = getBubbleSize(data[0], props);
      expect(sizeResult).to.equal(5);
    });
  });

  describe("getSymbol", () => {
    const data = { symbol: "star" };
    const props = { symbol: "plus" };
    it("returns 'circle' for bubble plots", () => {
      const symbolResult = getSymbol({}, { ...props, bubbleProperty: "z" });
      expect(symbolResult).to.equal("circle");
    });

    it("returns a symbol from data if one is given", () => {
      const symbolResult = getSymbol(data, props);
      expect(symbolResult).to.equal("star");
    });

    it("returns a symbol from props if no symbol is found on data", () => {
      const symbolResult = getSymbol({}, props);
      expect(symbolResult).to.equal("plus");
    });
  });
});
