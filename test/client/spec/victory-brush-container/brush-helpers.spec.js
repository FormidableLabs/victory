/* eslint-disable no-unused-expressions,react/no-multi-comp */
import { BrushHelpers } from "packages/victory-brush-container/src/index";

describe("containers/brush-helpers", () => {
  describe("withinBounds", () => {
    it("returns true when within bounds", () => {
      const point = { x: 1, y: 1 };
      const bounds = { x1: 0, x2: 2, y1: 0, y2: 2 };
      const isWithinBoundsResults = BrushHelpers.withinBounds(point, bounds);
      expect(isWithinBoundsResults).to.eql(true);
    });

    it("returns false when not within bounds", () => {
      const point = { x: 10, y: 1 };
      const bounds = { x1: 0, x2: 2, y1: 0, y2: 2 };
      const isWithinBoundsResults = BrushHelpers.withinBounds(point, bounds);
      expect(isWithinBoundsResults).to.eql(false);
    });

    it("returns true when within bounds using dates", () => {
      const point = { x: new Date("1/2/2017"), y: 1 };
      const bounds = { x1: new Date("1/1/2017"), x2: new Date("2/1/2017"), y1: 0, y2: 2 };
      const isWithinBoundsResults = BrushHelpers.withinBounds(point, bounds);
      expect(isWithinBoundsResults).to.eql(true);
    });

    it("returns false when not within bounds using dates", () => {
      const point = { x: new Date("3/2/2017"), y: 1 };
      const bounds = { x1: new Date("1/1/2017"), x2: new Date("2/1/2017"), y1: 0, y2: 2 };
      const isWithinBoundsResults = BrushHelpers.withinBounds(point, bounds);
      expect(isWithinBoundsResults).to.eql(false);
    });
  });

  describe("constrainBox", () => {
    it("returns correct box", () => {
      const fullDomainBox = { x1: 0, x2: 2, y1: 0, y2: 2 };
      const box = { x1: 1, x2: 2, y1: 1, y2: 2 };
      const constrainBoxResult = BrushHelpers.constrainBox(box, fullDomainBox);
      expect(constrainBoxResult).to.eql({ x1: 1, y1: 1, x2: 2, y2: 2 });
    });

    it("returns correct box when x axis is dates", () => {
      const fullDomainBox = {
        x1: new Date("1/2/2017 PST"),
        x2: new Date("2/1/2017 PST"),
        y1: 0,
        y2: 2
      };
      const box = { x1: new Date("1/1/2017 PST"), x2: new Date("1/10/2017 PST"), y1: 1, y2: 2 };
      const constrainBoxResult = BrushHelpers.constrainBox(box, fullDomainBox);
      expect(constrainBoxResult).to.eql({ x1: 1483344000000, y1: 1, x2: 1484121600000, y2: 2 });
    });
  });
});
