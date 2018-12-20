import { circle, point } from "packages/victory-bar/src/geometry-helper-methods";

const epsilon = 0.01; // float imprecision

describe("point", () => {
  it("calculates distance correctly for positive coordinates", () => {
    const p0 = point(1, 2);
    const p1 = point(2, 3);
    const answer = Math.sqrt(2);
    expect(p0.distance(p1)).to.be.within(answer - epsilon, answer + epsilon);
  });
  it("calculates distance correctly for negative coordinates", () => {
    const p0 = point(-1, -2);
    const p1 = point(-2, -3);
    const answer = Math.sqrt(2);
    expect(p0.distance(p1)).to.be.within(answer - epsilon, answer + epsilon);
  });
  it("calculates distance correctly for zero coordinates", () => {
    const p0 = point(0, 0);
    const p1 = point(0, 0);
    const answer = 0;
    expect(p0.distance(p1)).to.be.within(answer - epsilon, answer + epsilon);
  });
  it("can add correctly", () => {
    const p0 = point(1, 1);
    const p1 = point(2, 3);
    const { x, y } = p0.add(p1);
    expect(x).to.equal(3);
    expect(y).to.equal(4);
  });
  it("can subtract correctly", () => {
    const p0 = point(1, 1);
    const p1 = point(2, 3);
    const { x, y } = p1.subtract(p0);
    expect(x).to.equal(1);
    expect(y).to.equal(2);
  });
  it("can scalar multiply correctly", () => {
    const p = point(3, 4);
    const { x, y } = p.scalarMult(-2);
    expect(x).to.equal(-6);
    expect(y).to.equal(-8);
  });
  it("can scalar divide correctly", () => {
    const p = point(3, 4);
    const { x, y } = p.scalarDivide(2);
    const answerX = 1.5;
    const answerY = 2;
    expect(x).to.be.within(answerX - epsilon, answerX + epsilon);
    expect(y).to.be.within(answerY - epsilon, answerY + epsilon);
  });
  it("throws when dividing by zero", () => {
    const p = point(3, 4);
    expect(() => p.scalarDivide(0)).to.throw();
  });
  it("can check for equality correctly", () => {
    const p0 = point(3, 4);
    const p1 = point(3, 4);
    expect(p0.equals(p1)).to.equal(true);
  });
});

describe("circle", () => {
  describe("calculates circle-circle intersection correctly", () => {
    it("handles separate circles", () => {
      const c0 = circle(point(0, 0), 1);
      const c1 = circle(point(0, 10), 1);
      expect(c0.intersection(c1)).to.eql([]);
    });
    it("handles one circle containing another", () => {
      const c0 = circle(point(0, 0), 2);
      const c1 = circle(point(0, 0), 10);
      expect(c0.intersection(c1)).to.eql([]);
    });
    it("handles same circle case", () => {
      const c0 = circle(point(0, 0), 1);
      const c1 = circle(point(0, 0), 1);
      expect(c0.intersection(c1)).to.eql([]);
    });
    it("handles circles of zero radius", () => {
      // I chose to define the intersection as 'none'
      // instead of point(0, 0) to stay consistent with
      // the "handles same circle case" above
      const c0 = circle(point(0, 0), 0);
      const c1 = circle(point(0, 0), 0);
      expect(c0.intersection(c1)).to.eql([]);

      const c2 = circle(point(0, 0), 0);
      const c3 = circle(point(0, 1), 0);
      expect(c2.intersection(c3)).to.eql([]);
    });
    it("handles circles meeting at exactly one point", () => {
      const c0 = circle(point(0, 0), 1);
      const c1 = circle(point(0, 2), 1);
      const [{ x: x0, y: y0 }, { x: x1, y: y1 }] = c0.intersection(c1);
      expect(x0).to.equal(0);
      expect(x1).to.equal(0);
      expect(y0).to.equal(1);
      expect(y1).to.equal(1);
    });
    it("handles circles meeting at two points", () => {
      const c0 = circle(point(2, 3), 3);
      const c1 = circle(point(1, -1), 4);
      const [{ x: x0, y: y0 }, { x: x1, y: y1 }] = c0.intersection(c1);
      expect(x0).to.be.within(-0.96 - epsilon, -0.96 + epsilon);
      expect(y0).to.be.within(2.49 - epsilon, 2.49 + epsilon);
      expect(x1).to.be.within(4.37 - epsilon, 4.37 + epsilon);
      expect(y1).to.be.within(1.16 - epsilon, 1.16 + epsilon);
    });
    it("the left-most point is the 0th element, the right-most is the 1st", () => {
      const c0 = circle(point(2, 3), 3);
      const c1 = circle(point(1, -1), 4);
      const [{ x: x0 }, { x: x1 }] = c0.intersection(c1);
      expect(x0 <= x1).to.equal(true);
    });
  });
});
