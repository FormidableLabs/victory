import { BrushHelpers } from "./brush-helpers";

describe("containers/brush-helpers", () => {
  const { withinBounds, constrainBox } = BrushHelpers;
  describe("withinBounds", () => {
    it("returns true when within bounds", () => {
      const point = { x: 1, y: 1 };
      const bounds = { x1: 0, x2: 2, y1: 0, y2: 2 };
      const isWithinBoundsResults = withinBounds(point, bounds);

      expect(isWithinBoundsResults).toBeTruthy();
    });

    it("returns false when not within bounds", () => {
      const point = { x: 10, y: 1 };
      const bounds = { x1: 0, x2: 2, y1: 0, y2: 2 };
      const isWithinBoundsResults = withinBounds(point, bounds);

      expect(isWithinBoundsResults).toBeFalsy();
    });

    it("returns true when within bounds using dates", () => {
      const point = { x: new Date("1/2/2022"), y: 1 };
      const bounds = {
        x1: new Date("1/1/2022"),
        x2: new Date("2/1/2022"),
        y1: 0,
        y2: 2,
      };
      const isWithinBoundsResults = withinBounds(point, bounds);

      expect(isWithinBoundsResults).toBeTruthy();
    });

    it("returns false when not within bounds using dates", () => {
      const point = { x: new Date("3/2/2022"), y: 1 };
      const bounds = {
        x1: new Date("1/1/2022"),
        x2: new Date("2/1/2022"),
        y1: 0,
        y2: 2,
      };
      const isWithinBoundsResults = withinBounds(point, bounds);

      expect(isWithinBoundsResults).toBeFalsy();
    });
  });

  describe("constrainBox", () => {
    it("returns the correct box", () => {
      const fullDomainBox = { x1: 0, x2: 2, y1: 0, y2: 2 };
      const box = { x1: 1, x2: 2, y1: 1, y2: 2 };
      const constrainBoxResult = constrainBox(box, fullDomainBox);

      expect(constrainBoxResult).toEqual({ x1: 1, y1: 1, x2: 2, y2: 2 });
    });

    it("returns the correct box when x axis consists of dates", () => {
      const fullDomainBox = {
        x1: new Date("1/2/2022 PST"),
        x2: new Date("2/1/2022 PST"),
        y1: 0,
        y2: 2,
      };
      const box = {
        x1: new Date("1/1/2022 PST"),
        x2: new Date("1/10/2022 PST"),
        y1: 1,
        y2: 2,
      };
      const constrainBoxResult = constrainBox(box, fullDomainBox);

      expect(constrainBoxResult).toEqual({
        x1: 1641110400000,
        y1: 1,
        x2: 1641888000000,
        y2: 2,
      });
    });
  });
});
