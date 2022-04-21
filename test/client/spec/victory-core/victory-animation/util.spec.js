/* eslint-disable no-unused-expressions */
import { victoryInterpolator } from "packages/victory-core/src/victory-animation/util";

describe.only("victoryInterpolator", () => {
  it("does not attempt to interpolate identical values", async () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = await victoryInterpolator(3, 3);
    expect(interpolator(0.25920000000000004)).to.equal(3);
  });

  it("does not attempt to interpolate Boolean values", async () => {
    // The default interpolator would return 0.5.
    const interpolator = await victoryInterpolator(false, true);
    expect(interpolator(0.5)).to.equal(true);
  });

  it("always returns the end value if starting from null", async () => {
    // This case fails with the default interpolator, returning *almost* 3.
    const interpolator = await victoryInterpolator(null, 5);
    expect(interpolator(0)).to.equal(5);
    expect(interpolator(0.49)).to.equal(5);
    expect(interpolator(0.5)).to.equal(5);
    expect(interpolator(1)).to.equal(5);
  });

  it("always returns the end value if ending on null", async () => {
    const interpolator = await victoryInterpolator(5, null);
    expect(interpolator(0)).to.be.null;
    expect(interpolator(0.49)).to.be.null;
    expect(interpolator(0.5)).to.be.null;
    expect(interpolator(1)).to.be.null;
  });

  it("always returns the end value if starting from undefined", async () => {
    const interpolator = await victoryInterpolator(undefined, 5);
    expect(interpolator(0)).to.equal(5);
    expect(interpolator(0.49)).to.equal(5);
    expect(interpolator(0.5)).to.equal(5);
    expect(interpolator(1)).to.equal(5);
  });

  it("always returns the end value if ending on undefined", async () => {
    const interpolator = await victoryInterpolator(5, undefined);
    expect(interpolator(0)).to.be.undefined;
    expect(interpolator(0.49)).to.undefined;
    expect(interpolator(0.5)).to.be.undefined;
    expect(interpolator(1)).to.be.undefined;
  });

  it("interpolates functions", async () => {
    const fromFn = () => 5;
    const toFn = () => 10;
    const interpolator = await victoryInterpolator(fromFn, toFn);
    const halfwayFn = interpolator(0.5);
    expect(halfwayFn).to.be.a("function");
    expect(halfwayFn()).to.equal(7.5);
  });

  it("interpolates string values", async () => {
    // From https://github.com/d3/d3-interpolate/blob/main/test/value-test.js#L5-L7
    const interpolator = await victoryInterpolator("foo", "bar");
    expect(interpolator(0.5)).to.equal("bar");
  });

  it("interpolates color values", async () => {
    // From https://github.com/d3/d3-interpolate/blob/main/test/value-test.js#L15
    const interpolator = await victoryInterpolator("red", "blue");
    expect(interpolator(0.5)).to.equal("rgb(128, 0, 128)");
  });
});
