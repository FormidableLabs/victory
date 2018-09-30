/**
 * A point in the 2d plane
 * @constructor
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 */
const Point = function (x, y) {
  this.x = x; // eslint-disable-line no-invalid-this
  this.y = y; // eslint-disable-line no-invalid-this
};

Point.prototype.distance = function (p1) {
  return Math.sqrt((this.x - p1.x) ** 2 + (this.y - p1.y) ** 2);
};

// vector addition in 2d plane
Point.prototype.add = function (p1) {
  return new Point(this.x + p1.x, this.y + p1.y);
};

// vector subtraction in 2d
// returns p0 - p1
Point.prototype.subtract = function (p1) {
  return new Point(this.x - p1.x, this.y - p1.y);
};

// multiply a 2d point by a scalar
Point.prototype.scalarMult = function (n) {
  return new Point(this.x * n, this.y * n);
};

Point.prototype.scalarDivide = function (n) {
  if (n === 0) {
    throw new Error("Division by 0 error");
  }
  return new Point(this.x / n, this.y / n);
};

Point.prototype.equals = function (p1) {
  return this.x === p1.x && this.y === p1.y;
};

/**
 * @constructor
 * @param {Point} center - center of circle
 * @param {number} radius - radius of circle
 */
const Circle = function (center, radius) {
  this.center = center; // eslint-disable-line no-invalid-this
  this.radius = radius; // eslint-disable-line no-invalid-this
};

Circle.prototype.hasIntersection = function (circle1) {
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
};

Circle.prototype.equals = function (circle1) {
  const P0 = this.center;
  const P1 = circle1.center;
  const r0 = this.radius;
  const r1 = circle1.radius;
  return r0 === r1 && P0.equals(P1);
};

// Source: http://paulbourke.net/geometry/circlesphere/
// "Intersection of two circles" by Paul Bourke
// Left-most point is returned as 0th element of array
// Right-most point is returned as 1st elemennt of array
Circle.prototype.intersection = function (circle1) { // eslint-disable-line max-statements
  const P0 = this.center;
  const P1 = circle1.center;
  const r0 = this.radius;
  const r1 = circle1.radius;
  const d = P0.distance(P1);
  if (!this.hasIntersection(circle1) || this.equals(circle1)) {
    return [];
  }
  const a = (r0 ** 2 - r1 ** 2 + d ** 2) / (2 * d);
  const h = Math.sqrt(r0 ** 2 - a ** 2);
  const P2 = P0.add(P1.subtract(P0).scalarMult(a).scalarDivide(d));
  const { x: x0, y: y0 } = P0;
  const { x: x1, y: y1 } = P1;
  const { x: x2, y: y2 } = P2;
  const P3s = [
    new Point(x2 - h * (y1 - y0) / d, y2 + h * (x1 - x0) / d),
    new Point(x2 + h * (y1 - y0) / d, y2 - h * (x1 - x0) / d)
  ];
  P3s.sort((Point1, Point2) => Point1.x - Point2.x);
  return P3s;
};

Circle.prototype.solveX = function (y) {
  const sqrt = Math.sqrt(this.radius ** 2 - (y - this.center.y) ** 2);
  return [ this.center.x - sqrt, this.center.x + sqrt ];
};

export { Circle, Point };
