/* global sinon */
/* eslint-disable no-unused-expressions,react/no-multi-comp */
import { getChildComponents } from "victory-chart/es/helper-methods";
import React from "react";
import { VictoryAxis } from "victory-axis";
import { VictoryLine } from "victory-line";
import { Log as _Log } from "victory-core";

// The updated module export syntax doesn't work well with sinon
const Log = Object.assign({}, _Log);

describe("victory-chart/helpers-methods", () => {
  const getVictoryLine = (props) => React.createElement(VictoryLine, props);
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);

  describe("getChildComponents", () => {
    const defaultAxes = {
      independent: getVictoryAxis({}),
      dependent: getVictoryAxis({ dependentAxis: true })
    };
    let spy;
    beforeEach(() => {
      spy = sinon.spy(Log, "warn");
    });

    afterEach(() => {
      spy.restore();
    });

    it("returns a pair of default axes when no children are given", () => {
      const children = [];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(2);
      expect(result).to.deep.include.members([
        defaultAxes.independent,
        defaultAxes.dependent
      ]);
    });

    it("adds default axes when none of the children are axis components", () => {
      const line = getVictoryLine({});
      const children = [line];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(3);
      expect(result).to.deep.include.members([
        defaultAxes.independent,
        defaultAxes.dependent
      ]);
    });

    it("does not add default axes if axis any axis components exist in children", () => {
      const axis = getVictoryAxis({});
      const children = [axis];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(1);
      expect(result[0].props).to.eql(axis.props);
    });
  });
});
