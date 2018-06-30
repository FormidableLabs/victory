/* global sinon */
/* eslint-disable no-unused-expressions,react/no-multi-comp */
import {
  getChildComponents
} from "packages/victory-chart/src/components/victory-chart/helper-methods";
import React from "react";
import { VictoryAxis, VictoryLine } from "packages/victory-chart/src/index";
import { Log } from "packages/victory-core/src/index";

describe("victory-chart/helpers-methods", () => {
  const getVictoryLine = (props) => React.createElement(VictoryLine, props);
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);

  describe("getChildComponents", () => {
    const defaultAxes = {
      independent: getVictoryAxis({}),
      dependent: getVictoryAxis({ dependentAxis: true })
    };
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Log, "warn");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns a pair of default axes when no children are given", () => {
      const children = [];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(2);
      expect(result).to.deep.include.members([defaultAxes.independent, defaultAxes.dependent]);
    });

    it("adds default axes when none of the children are axis components", () => {
      const line = getVictoryLine({});
      const children = [line];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(3);
      expect(result).to.deep.include.members([
        defaultAxes.independent, defaultAxes.dependent
      ]);
    });

    it("does not add default axes if axis any axis components exist in children", () => {
      const axis = getVictoryAxis({});
      const children = [axis];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(1);
      expect(result[0].props).to.eql(axis.props);
    });

    it("only ever returns one independent axis", () => {
      const children = [
        getVictoryAxis({ orientation: "top" }),
        getVictoryAxis({ orientation: "right" })
      ];
      const result = getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(1);
      expect(result[0].props).to.eql(children[0].props);
    });
  });
});
