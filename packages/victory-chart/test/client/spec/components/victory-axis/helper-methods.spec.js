/* eslint no-unused-expressions: 0 */
import { getScale } from "src/components/victory-axis/helper-methods";

describe("victory-axis/helper-methods", () => {

  describe("getScale", () => {
    it("returns a scale", () => {
      const props = { domain: [0, 10], range: [0, 100] };
      const scaleResult = getScale(props);
      expect(scaleResult.domain()).to.eql([0, 10]);
      expect(scaleResult.range()).to.eql([0, 100]);
    });
  });
});
