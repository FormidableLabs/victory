/* eslint no-unused-expressions: 0 */
/* global sinon */

import Axis from "src/helpers/axis";
import React from "react";
import { VictoryAxis, VictoryBar } from "src/index";

describe("helpers/axis", () => {
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);
  const getVictoryBar = (props) => React.createElement(VictoryBar, props);

  describe("isVertical", () => {
    it("returns true when the orientation is vertical", () => {
      const props = {orientation: "left"};
      const verticalResult = Axis.isVertical(props);
      expect(verticalResult).to.equal(true);
    });

    it("returns false when the orientation is horizontal", () => {
      const props = {orientation: "bottom"};
      const verticalResult = Axis.isVertical(props);
      expect(verticalResult).to.equal(false);
    });
  });

  describe("getAxisComponent", () => {
    const dependentAxis = getVictoryAxis({dependentAxis: true});
    const independentAxis = getVictoryAxis({dependentAxis: false});
    const bar = getVictoryBar({});

    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(dependentAxis.type, "getAxis");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns the independent axis when called with 'x'", () => {
      const childComponents = [dependentAxis, independentAxis, bar];
      const componentResult = Axis.getAxisComponent(childComponents, "x");
      expect(dependentAxis.type.getAxis).calledWith(dependentAxis.props)
        .and.returned("y");
      expect(independentAxis.type.getAxis).calledWith(independentAxis.props)
        .and.returned("x");
      expect(componentResult).to.eql(independentAxis);
    });
  });
});
