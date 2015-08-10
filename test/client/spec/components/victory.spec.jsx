/**
 * Client tests
 */
import Component from "src/components/victory";

describe("components/victory", function () {

  it("has expected properties", function () {
    expect(Component.victoryLine).not.to.equal(undefined);
    expect(Component.victoryPie).not.to.equal(undefined);
    expect(Component.victoryAnimation).not.to.equal(undefined);
    expect(Component.victoryAxis).not.to.equal(undefined);
  });
});
