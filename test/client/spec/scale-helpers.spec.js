/* eslint no-unused-expressions: 0 */
/* global sinon */
import React from "react";
import ScaleHelpers from "src/scale-helpers";
import { VictoryAxis } from "victory-axis";

describe("scale-helpers", () => {
  describe("getScale", () => {
    const axisProps = {scale: "log"};
    const victoryAxis = React.createElement(VictoryAxis, axisProps);

    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(victoryAxis.type, "getScale");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns a scale from props", () => {
      const props = {scale: {x: "linear"}};
      const scaleResult = ScaleHelpers.getScale(props, victoryAxis, "x");
      expect(scaleResult).to.be.a.function;
      // this is a ducktype check for log scales
      expect(scaleResult.base).not.to.be.a.function;
    });

    it("returns the result of calling getScale on an axis component", () => {
      const props = {};
      const scaleResult = ScaleHelpers.getScale(props, victoryAxis, "x");
      expect(victoryAxis.type.getScale).calledWith(victoryAxis.props);
      expect(scaleResult).to.be.a.function;
      // this is a ducktype check for log scales
      expect(scaleResult.base).to.be.a.function;
    });
  });
});
