/* eslint no-unused-expressions: 0 */
/* global sinon */
import React from "react";
import { VictoryAxis, VictoryLine, VictoryBar } from "src/index";
import { Log } from "victory-util";
import ChartHelpers from "src/helpers/chart";
import Domain from "src/helpers/domain";

describe("helpers/chart", () => {
  const getVictoryLine = (props) => React.createElement(VictoryLine, props);
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);
  const getVictoryBar = (props) => React.createElement(VictoryBar, props);

  describe("getChildComponents", () => {
    const defaultAxes = {
      independent: getVictoryAxis({}),
      dependent: getVictoryAxis({dependentAxis: true})
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
      expect(ChartHelpers.getChildComponents({}, defaultAxes))
        .to.eql([defaultAxes.independent, defaultAxes.dependent]);
    });

    it("adds a default axis so that there are always two axes", () => {
      const children = [getVictoryAxis({dependentAxis: true})];
      expect(ChartHelpers.getChildComponents({children}, defaultAxes))
        .to.eql([children[0], defaultAxes.independent]);
    });

    it("only ever returns one axis of a particular type", () => {
      const children = [
        getVictoryAxis({dependentAxis: true}),
        getVictoryAxis({dependentAxis: true, orientation: "right"})
      ];
      const componentResult = ChartHelpers.getChildComponents({children}, defaultAxes);
      expect(componentResult).to.have.length(2)
        .and.to.eql([children[0], defaultAxes.independent]);
      expect(Log.warn).calledOnce;
    });

    it("only returns one the first bar component", () => {
      const children = [
        getVictoryBar({categories: [1, 2, 3]}),
        getVictoryBar({categories: [4, 5, 6]})
      ];
      const componentResult = ChartHelpers.getChildComponents({children}, defaultAxes);
      expect(componentResult).to.have.length(3)
        .and.to.eql([children[0], defaultAxes.independent, defaultAxes.dependent]);
      expect(Log.warn).calledOnce;
    });
  });

  describe("getDataComponents", () => {
    const bar = getVictoryBar({});
    const line = getVictoryLine({});
    const axis = getVictoryAxis({});
    const childComponents = [bar, line, axis];

    it("returns only grouped data components (bar) when called with 'grouped'", () => {
      const componentResult = ChartHelpers.getDataComponents(childComponents, "grouped");
      expect(componentResult).to.eql([bar]);
    });

    it("returns only single data components (not bar) when called with 'data'", () => {
      const componentResult = ChartHelpers.getDataComponents(childComponents, "data");
      expect(componentResult).to.eql([line]);
    });

    it("returns all single data components when called with 'all'", () => {
      const componentResult = ChartHelpers.getDataComponents(childComponents, "all");
      expect(componentResult).to.have.members([bar, line]);
    });
  });

  describe("getDomain", () => {
    const victoryLine = getVictoryLine({domain: [0, 3]});
    const xAxis = getVictoryAxis({dependentAxis: false});
    const yAxis = getVictoryAxis({dependentAxis: true});
    const childComponents = [victoryLine, xAxis, yAxis];
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Domain, "padDomain");
      sandbox.spy(victoryLine.type, "getDomain");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("calculates a domain from props", () => {
      const props = {domain: {x: [1, 2], y: [2, 3]}};
      const domainResultX = ChartHelpers.getDomain(props, childComponents, "x");
      expect(Domain.padDomain).calledWith([1, 2], props, "x").and.returned([1, 2]);
      expect(victoryLine.type.getDomain).notCalled;
      expect(domainResultX).to.eql([1, 2]);
    });

    it("calculates a domain from child components", () => {
      const props = {};
      const domainResultX = ChartHelpers.getDomain(props, childComponents, "x");
      expect(victoryLine.type.getDomain).calledWith(victoryLine.props, "x");
      expect(Domain.padDomain).calledWith(victoryLine.props.domain, props, "x")
        .and.returned(victoryLine.props.domain);
      expect(domainResultX).to.eql(victoryLine.props.domain);
    });
  });
});
