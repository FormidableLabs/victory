/**
 * A point in the 2d plane
 * @param {number} x
 * @param {number} y
 */
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.distance = function (p1) {
  const p0 = this;
  return Math.sqrt((p0.x - p1.x) ** 2 + (p0.y - p1.y) ** 2);
};

// vector addition in 2d plane
Point.prototype.add = function (p1) {
  const p0 = this;
  return new Point(p0.x + p1.x, p0.y + p1.y);
};

// vector subtraction in 2d
// returns p0 - p1
Point.prototype.subtract = function (p1) {
  const p0 = this;
  return new Point(p0.x - p1.x, p0.y - p1.y);
};

// multiply a 2d point by a scalar
Point.prototype.scalarMult = function (n) {
  const p0 = this;
  return new Point(p0.x * n, p0.y * n);
};

Point.prototype.scalarDivide = function (n) {
  if (n === 0) {
    throw new Error("Division by 0 error");
  }
  const p0 = this;
  return new Point(p0.x / n, p0.y / n);
};

Point.prototype.equals = function (p1) {
  const p0 = this;
  return p0.x === p1.x && p0.y === p1.y;
};

/**
 * @param {Point} center
 * @param {number} radius
 */
function Circle(center, radius) {
  this.center = center;
  this.radius = radius;
}

// Source: http://paulbourke.net/geometry/circlesphere/
// "Intersection of two circles" by Paul Bourke
Circle.prototype.intersection = function (circle1) {
  const circle0 = this;
  const P0 = circle0.center;
  const P1 = circle1.center;
  const r0 = circle0.radius;
  const r1 = circle1.radius;
  const d = P0.distance(P1);

  if (d > r0 + r1) {
    return []; // separate circles
  }
  if (d < Math.abs(r0 - r1)) {
    return []; // one circle contains another
  }
  if (d === 0 && r0 === r1) {
    return []; // same circles, infinite solutions
  }

  const a = (r0 ** 2 - r1 ** 2 + d ** 2) / (2 * d);
  const h = Math.sqrt(r0 ** 2 - a ** 2);
  const P2 = P0.add(P1.subtract(P0).scalarMult(a).scalarDivide(d));
  const { x: x0, y: y0 } = P0;
  const { x: x1, y: y1 } = P1;
  const { x: x2, y: y2 } = P2;
  const P3s = [
    new Point(x2 + h * (y1 - y0) / d, y2 - h * (x1 - x0) / d),
    new Point(x2 - h * (y1 - y0) / d, y2 + h * (x1 - x0) / d)
  ];

  return (P3s[0].equals(P3s[1])) ? [ P3s[0] ] : P3s;

};

export { Circle, Point };
