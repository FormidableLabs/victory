/**
 * Client tests
 */
import * as Victory from "src/index";

describe("victory", () => {

  it("has expected properties", () => {
    expect(Victory.VictoryAnimation).not.to.equal(undefined);
    expect(Victory.VictoryAxis).not.to.equal(undefined);
    expect(Victory.VictoryArea).not.to.equal(undefined);
    expect(Victory.VictoryBar).not.to.equal(undefined);
    expect(Victory.VictoryChart).not.to.equal(undefined);
    expect(Victory.VictoryLine).not.to.equal(undefined);
    expect(Victory.VictoryLabel).not.to.equal(undefined);
    expect(Victory.VictoryPie).not.to.equal(undefined);
    expect(Victory.VictoryScatter).not.to.equal(undefined);
  });
});
