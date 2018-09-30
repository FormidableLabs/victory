/**
 * A point in the 2d plane
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 */
function Point(x, y) {
  this.x = x;
  this.y = y;
}

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
 * A line in the 2d plane
 * @param {number} m - slope of line
 * @param {number} b - y-intersect
 */
function Line(m, b) {
  this.m = m;
  this.b = b;
}

/**
 * @param {Point} center - center of circle
 * @param {number} radius - radius of circle
 */
function Circle(center, radius) {
  this.center = center;
  this.radius = radius;
}

// Source: http://paulbourke.net/geometry/circlesphere/
// "Intersection of two circles" by Paul Bourke
// Left-most point is returned as 0th element of array
// Right-most point is return as 1st elemennt of array
Circle.prototype.intersection = function (circle1) {
  const P0 = this.center;
  const P1 = circle1.center;
  const r0 = this.radius;
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
    new Point(x2 - h * (y1 - y0) / d, y2 + h * (x1 - x0) / d),
    new Point(x2 + h * (y1 - y0) / d, y2 - h * (x1 - x0) / d)
  ];

  return P3s;
};

// solve for x, given y
Circle.prototype.solveX = function (y) {
  const sqrt = Math.sqrt(this.radius**2 - (y - this.center.y)**2);
  return [ this.center.x - sqrt, this.center.x + sqrt ]
}

export { Circle, Point };
