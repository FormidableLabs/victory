/**
 * Client tests
 */
import Component from "src/components/victory";

describe("components/victory", function () {

  it("has expected properties", function () {
    expect(Component.victoryLine).not.to.equal(undefined);
    expect(Component.victoryScatter).not.to.equal(undefined);
    expect(Component.victoryBar).not.to.equal(undefined);
    expect(Component.victoryChart).not.to.equal(undefined);
    expect(Component.victoryAnimation).not.to.equal(undefined);
    expect(Component.victoryAxis).not.to.equal(undefined);
  });
});
