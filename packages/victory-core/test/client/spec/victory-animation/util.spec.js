/* eslint-disable no-unused-expressions */
import { victoryInterpolator } from "src/victory-animation/util";

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
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = victoryInterpolator(null, 5);
    expect(interpolator(0)).to.equal(5);
    expect(interpolator(0.49)).to.equal(5);
    expect(interpolator(0.5)).to.equal(5);
    expect(interpolator(1)).to.equal(5);
  });

  it("always returns the end value if ending on null", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = victoryInterpolator(5, null);
    expect(interpolator(0)).to.be.null;
    expect(interpolator(0.49)).to.be.null;
    expect(interpolator(0.5)).to.be.null;
    expect(interpolator(1)).to.be.null;
  });

  it("always returns the end value if starting from undefined", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = victoryInterpolator(undefined, 5);
    expect(interpolator(0)).to.equal(5);
    expect(interpolator(0.49)).to.equal(5);
    expect(interpolator(0.5)).to.equal(5);
    expect(interpolator(1)).to.equal(5);
  });

  it("always returns the end value if ending on undefined", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = victoryInterpolator(5, undefined);
    expect(interpolator(0)).to.be.undefined;
    expect(interpolator(0.49)).to.undefined;
    expect(interpolator(0.5)).to.be.undefined;
    expect(interpolator(1)).to.be.undefined;
  });

  it("interpolates functions", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const fromFn = () => 5;
    const toFn = () => 10;
    const interpolator = victoryInterpolator(fromFn, toFn);
    const halfwayFn = interpolator(0.5);
    expect(halfwayFn).to.be.a("function");
    expect(halfwayFn()).to.equal(7.5);
  });
});
