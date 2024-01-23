/**
 * A point in the 2d plane
 */
export const point = (x: number, y: number) => ({
  x,
  y,
  distance(p1: { x: number; y: number }) {
    return Math.sqrt(Math.pow(this.x - p1.x, 2) + Math.pow(this.y - p1.y, 2));
  },
  // vector addition in 2d plane
  add(p1: { x: number; y: number }) {
    return point(this.x + p1.x, this.y + p1.y);
  },
  // vector subtraction in 2d
  // returns p0 - p1
  subtract(p1: { x: number; y: number }) {
    return point(this.x - p1.x, this.y - p1.y);
  },
  // multiply a 2d point by a scalar
  scalarMult(n: number) {
    return point(this.x * n, this.y * n);
  },
  scalarDivide(n: number) {
    if (n === 0) {
      throw new Error("Division by 0 error");
    }
    return point(this.x / n, this.y / n);
  },
  equals(p1: { x: number; y: number }) {
    return this.x === p1.x && this.y === p1.y;
  },
});

type Center = ReturnType<typeof point>;

/**
 * A circle in the 2d plane
 */
export const circle = (center: Center, radius: number) => ({
  center,
  radius,
  hasIntersection(circle1: { center: Center; radius: number }) {
    const P0 = this.center;
    const P1 = circle1.center;
    const r0 = this.radius;
    const r1 = circle1.radius;
    const d = P0.distance(P1);

    if (d > r0 + r1) {
      return false; // separate circles
    }
    if (d < Math.abs(r0 - r1)) {
      return false; // one circle contains another
    }
    return true;
  },
  equals(circle1: { center: Center; radius: number }) {
    const P0 = this.center;
    const P1 = circle1.center;
    const r0 = this.radius;
    const r1 = circle1.radius;
    return r0 === r1 && P0.equals(P1);
  },
  // Source: http://paulbourke.net/geometry/circlesphere/
  // "Intersection of two circles" by Paul Bourke
  // Left-most point is returned as 0th element of array
  // Right-most point is returned as 1st elemennt of array
  intersection(circle1: { center: Center; radius: number }) {
    // eslint-disable-line max-statements
    const P0 = this.center;
    const P1 = circle1.center;
    const r0 = this.radius;
    const r1 = circle1.radius;
    const d = P0.distance(P1);
    if (!this.hasIntersection(circle1) || this.equals(circle1)) {
      return [];
    }
    const a = (Math.pow(r0, 2) - Math.pow(r1, 2) + Math.pow(d, 2)) / (2 * d);
    const h = Math.sqrt(Math.pow(r0, 2) - Math.pow(a, 2));
    const P2 = P0.add(P1.subtract(P0).scalarMult(a).scalarDivide(d));
    const { x: x0, y: y0 } = P0;
    const { x: x1, y: y1 } = P1;
    const { x: x2, y: y2 } = P2;
    const P3s = [
      point(x2 - (h * (y1 - y0)) / d, y2 + (h * (x1 - x0)) / d),
      point(x2 + (h * (y1 - y0)) / d, y2 - (h * (x1 - x0)) / d),
    ];
    P3s.sort((Point1, Point2) => Point1.x - Point2.x);
    return P3s;
  },
  solveX(y: number) {
    const sqrt = Math.sqrt(
      Math.pow(this.radius, 2) - Math.pow(y - this.center.y, 2),
    );
    return [this.center.x - sqrt, this.center.x + sqrt];
  },
  solveY(x: number) {
    const sqrt = Math.sqrt(
      Math.pow(this.radius, 2) - Math.pow(x - this.center.x, 2),
    );
    return [this.center.y - sqrt, this.center.y + sqrt];
  },
});
