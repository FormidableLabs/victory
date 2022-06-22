import { circle, point } from "victory-bar/lib/geometry-helper-methods";

describe("point", () => {
  describe("calculates distances", () => {
    const expectDistanceToBeClose = (p0, p1, answerRoot = 2) => {
      const answer = Math.sqrt(answerRoot);
      expect(p0.distance(p1)).toBeCloseTo(answer);
    };

    it("between positive coordinates", () => {
      const p0 = point(1, 2);
      const p1 = point(2, 3);
      expectDistanceToBeClose(p0, p1);
    });

    it("between negative coordinates", () => {
      const p0 = point(-1, -2);
      const p1 = point(-2, -3);
      expectDistanceToBeClose(p0, p1);
    });

    it("between zero, zero coordinates", () => {
      const p0 = point(0, 0);
      const p1 = point(0, 0);
      expectDistanceToBeClose(p0, p1, 0);
    });
  });

  it("can add correctly", () => {
    const p0 = point(1, 1);
    const p1 = point(2, 3);
    const { x, y } = p0.add(p1);
    expect(x).toEqual(3);
    expect(y).toEqual(4);
  });

  it("can subtract correctly", () => {
    const p0 = point(1, 1);
    const p1 = point(2, 3);
    const { x, y } = p1.subtract(p0);
    expect(x).toEqual(1);
    expect(y).toEqual(2);
  });

  it("can scalar multiply correctly", () => {
    const p = point(3, 4);
    const { x, y } = p.scalarMult(-2);
    expect(x).toEqual(-6);
    expect(y).toEqual(-8);
  });

  it("can scalar divide correctly", () => {
    const p = point(3, 4);
    const { x, y } = p.scalarDivide(2);
    const answerX = 1.5;
    const answerY = 2;
    expect(x).toBeCloseTo(answerX);
    expect(y).toBeCloseTo(answerY);
  });

  it("throws when dividing by zero", () => {
    const p = point(3, 4);
    expect(() => p.scalarDivide(0)).toThrow();
  });

  it("can check for equality correctly", () => {
    const p0 = point(3, 4);
    const p1 = point(3, 4);
    expect(p0.equals(p1)).toBeTruthy();
  });
});

describe("circle", () => {
  describe("calculates circle-circle intersection correctly", () => {
    it("handles separate circles", () => {
      const c0 = circle(point(0, 0), 1);
      const c1 = circle(point(0, 10), 1);
      expect(c0.intersection(c1)).toEqual([]);
    });

    it("handles one circle containing another", () => {
      const c0 = circle(point(0, 0), 2);
      const c1 = circle(point(0, 0), 10);
      expect(c0.intersection(c1)).toEqual([]);
    });

    it("handles same circle case", () => {
      const c0 = circle(point(0, 0), 1);
      const c1 = circle(point(0, 0), 1);
      expect(c0.intersection(c1)).toEqual([]);
    });

    it("handles circles of zero radius", () => {
      const c0 = circle(point(0, 0), 0);
      const c1 = circle(point(0, 0), 0);
      expect(c0.intersection(c1)).toEqual([]);

      const c2 = circle(point(0, 0), 0);
      const c3 = circle(point(0, 1), 0);
      expect(c2.intersection(c3)).toEqual([]);
    });

    it("handles circles meeting at exactly one point", () => {
      const c0 = circle(point(0, 0), 1);
      const c1 = circle(point(0, 2), 1);
      const [{ x: x0, y: y0 }, { x: x1, y: y1 }] = c0.intersection(c1);
      expect(x0).toEqual(0);
      expect(x1).toEqual(0);
      expect(y0).toEqual(1);
      expect(y1).toEqual(1);
    });

    it("handles circles meeting at two points", () => {
      const c0 = circle(point(2, 3), 3);
      const c1 = circle(point(1, -1), 4);
      const [{ x: x0, y: y0 }, { x: x1, y: y1 }] = c0.intersection(c1);
      expect(x0).toBeCloseTo(-0.96);
      expect(y0).toBeCloseTo(2.49);
      expect(x1).toBeCloseTo(4.37);
      expect(y1).toBeCloseTo(1.16);
    });

    it("the left-most point is the 0th element, the right-most is the 1st", () => {
      const c0 = circle(point(2, 3), 3);
      const c1 = circle(point(1, -1), 4);
      const [{ x: x0 }, { x: x1 }] = c0.intersection(c1);
      expect(x0 <= x1).toBeTruthy();
    });
  });
});
