/* eslint-disable no-unused-expressions */
import { victoryInterpolator } from "victory-core/es/victory-animation/util";

describe("victoryInterpolator", () => {
  it("does not attempt to interpolate identical values", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    expect(victoryInterpolator(3, 3)(0.25920000000000004)).to.equal(3);
  });

  it("does not attempt to interpolate Boolean values", () => {
    // The default interpolator would return 0.5.
    expect(victoryInterpolator(false, true)(0.5)).to.equal(true);
  });

  it("always returns the end value if starting from null", () => {
    const interpolator = victoryInterpolator(null, 5);
    expect(interpolator(0)).to.equal(5);
    expect(interpolator(0.49)).to.equal(5);
    expect(interpolator(0.5)).to.equal(5);
    expect(interpolator(1)).to.equal(5);
  });

  it("always returns the end value if ending on null", () => {
    const interpolator = victoryInterpolator(5, null);
    expect(interpolator(0)).to.be.null;
    expect(interpolator(0.49)).to.be.null;
    expect(interpolator(0.5)).to.be.null;
    expect(interpolator(1)).to.be.null;
  });

  it("always returns the end value if starting from undefined", () => {
    const interpolator = victoryInterpolator(undefined, 5);
    expect(interpolator(0)).to.equal(5);
    expect(interpolator(0.49)).to.equal(5);
    expect(interpolator(0.5)).to.equal(5);
    expect(interpolator(1)).to.equal(5);
  });

  it("always returns the end value if ending on undefined", () => {
    const interpolator = victoryInterpolator(5, undefined);
    expect(interpolator(0)).to.be.undefined;
    expect(interpolator(0.49)).to.undefined;
    expect(interpolator(0.5)).to.be.undefined;
    expect(interpolator(1)).to.be.undefined;
  });

  it("interpolates functions", () => {
    const fromFn = () => 5;
    const toFn = () => 10;
    const interpolator = victoryInterpolator(fromFn, toFn);
    const halfwayFn = interpolator(0.5);
    expect(halfwayFn).to.be.a("function");
    expect(halfwayFn()).to.equal(7.5);
  });

  it("interpolates string values", () => {
    // From https://github.com/d3/d3-interpolate/blob/main/test/value-test.js#L5-L7
    const interpolator = victoryInterpolator("foo", "bar");
    expect(interpolator(0.5)).to.equal("bar");
  });

  it("interpolates color values", () => {
    // From https://github.com/d3/d3-interpolate/blob/main/test/value-test.js#L15
    const interpolator = victoryInterpolator("red", "blue");
    expect(interpolator(0.5)).to.equal("rgb(128, 0, 128)");
  });

  it("interpolates object values", () => {
    // From https://github.com/d3/d3-interpolate/blob/main/test/value-test.js#L44
    const interpolator = victoryInterpolator({ color: "red" }, { color: "blue" });
    expect(interpolator(0.5)).to.eql({ color: "rgb(128, 0, 128)" });
  });
});
