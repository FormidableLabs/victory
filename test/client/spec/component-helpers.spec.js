/* eslint no-unused-expressions: 0 */
/* global sinon */
import React from "react";
import { VictoryAxis } from "victory-axis";
import { VictoryLine } from "victory-line";
import { VictoryBar } from "victory-bar";
import { Log } from "victory-util";
import ComponentHelpers from "src/component-helpers";

describe("component-helpers", () => {
  const getVictoryLine = (props) => React.createElement(VictoryLine, props);
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);
  const getVictoryBar = (props) => React.createElement(VictoryBar, props);

  describe("getAxisType", () => {
    it("returns dependent or independent for an axis component", () => {
      const child = getVictoryAxis({dependentAxis: true});
      expect(ComponentHelpers.getAxisType(child)).to.equal("dependent")
    });

    it("returns undefined for other components", () => {
      const child = getVictoryLine({});
      expect(ComponentHelpers.getAxisType(child)).to.be.undefined
    });
  });

  describe("getChildComponents", () => {
    const defaultAxes = {
      independent: getVictoryAxis({}),
      dependent: getVictoryAxis({dependentAxis: true}),
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
      expect(ComponentHelpers.getChildComponents({},  defaultAxes))
        .to.eql([defaultAxes.independent, defaultAxes.dependent]);
    });

    it("adds a default axis so that there are always two axes", () => {
      const children = [getVictoryAxis({dependentAxis: true})];
      expect(ComponentHelpers.getChildComponents({children},  defaultAxes))
        .to.eql([children[0], defaultAxes.independent]);
    });
  });
});
