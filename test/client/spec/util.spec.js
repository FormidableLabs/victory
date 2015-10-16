/* eslint-disable no-unused-expressions */
import { victoryInterpolator } from "src/util";

describe("victoryInterpolator", () => {
  it("does not attempt to interpolate identical values", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    expect(victoryInterpolator(3, 3)(0.25920000000000004)).to.equal(3);
  });

  it("switches from null at the halfway point", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = victoryInterpolator(null, 5);
    expect(interpolator(0)).to.be.null;
    expect(interpolator(0.49)).to.be.null;
    expect(interpolator(0.5)).to.equal(5);
    expect(interpolator(1)).to.equal(5);
  });

  it("switches to null at the halfway point", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = victoryInterpolator(5, null);
    expect(interpolator(0)).to.equal(5);
    expect(interpolator(0.49)).to.equal(5);
    expect(interpolator(0.5)).to.be.null;
    expect(interpolator(1)).to.be.null;
  });

  it("switches from undefined at the halfway point", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = victoryInterpolator(undefined, 5);
    expect(interpolator(0)).to.be.undefined;
    expect(interpolator(0.49)).to.be.undefined;
    expect(interpolator(0.5)).to.equal(5);
    expect(interpolator(1)).to.equal(5);
  });

  it("switches to undefined at the halfway point", () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = victoryInterpolator(5, undefined);
    expect(interpolator(0)).to.equal(5);
    expect(interpolator(0.49)).to.equal(5);
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
