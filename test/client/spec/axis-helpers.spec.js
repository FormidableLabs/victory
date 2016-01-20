/* eslint no-unused-expressions: 0 */
/* global sinon */
import React from "react";
import AxisHelpers from "src/axis-helpers";
import { VictoryAxis } from "victory-axis";

describe("axis-helpers", () => {
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);

  describe("getAxisOrientation", () => {
    it("returns an orientation from props", () => {
      const props = {orientation: "top"};
      const victoryAxis = getVictoryAxis(props);
      expect(AxisHelpers.getAxisOrientation(victoryAxis, "x")).to.equal("top");
    });

    it("returns a default orientation by axis type", () => {
      const props = {dependentAxis: false};
      const victoryAxis = getVictoryAxis(props);
      expect(AxisHelpers.getAxisOrientation(victoryAxis, "x")).to.equal("bottom");
    });

    it("returns a default flipped orientation by axis type", () => {
      const props = {dependentAxis: true};
      const victoryAxis = getVictoryAxis(props);
      expect(AxisHelpers.getAxisOrientation(victoryAxis, "x")).to.equal("left");
    });
  });
});
