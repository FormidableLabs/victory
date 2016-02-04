/* eslint no-unused-expressions: 0 */
/* global sinon */
import React from "react";
import { VictoryAxis, VictoryLine, VictoryBar } from "src/index";
import { Log } from "victory-util";
import ComponentHelpers from "src/components/victory-chart/component-helpers";

describe("component-helpers", () => {
  const getVictoryLine = (props) => React.createElement(VictoryLine, props);
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);
  const getVictoryBar = (props) => React.createElement(VictoryBar, props);

  describe("getAxisType", () => {
    it("returns dependent or independent for an axis component", () => {
      const child = getVictoryAxis({dependentAxis: true});
      expect(ComponentHelpers.getAxisType(child)).to.equal("dependent");
    });

    it("returns undefined for other components", () => {
      const child = getVictoryLine({});
      expect(ComponentHelpers.getAxisType(child)).to.be.undefined;
    });
  });

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
      expect(ComponentHelpers.getChildComponents({}, defaultAxes))
        .to.eql([defaultAxes.independent, defaultAxes.dependent]);
    });

    it("adds a default axis so that there are always two axes", () => {
      const children = [getVictoryAxis({dependentAxis: true})];
      expect(ComponentHelpers.getChildComponents({children}, defaultAxes))
        .to.eql([children[0], defaultAxes.independent]);
    });

    it("only ever returns one axis of a particular type", () => {
      const children = [
        getVictoryAxis({dependentAxis: true}),
        getVictoryAxis({dependentAxis: true, orientation: "right"})
      ];
      const componentResult = ComponentHelpers.getChildComponents({children}, defaultAxes);
      expect(componentResult).to.have.length(2)
        .and.to.eql([children[0], defaultAxes.independent]);
      expect(Log.warn).calledOnce;
    });

    it("only returns one the first bar component", () => {
      const children = [
        getVictoryBar({categories: [1, 2, 3]}),
        getVictoryBar({categories: [4, 5, 6]})
      ];
      const componentResult = ComponentHelpers.getChildComponents({children}, defaultAxes);
      expect(componentResult).to.have.length(3)
        .and.to.eql([children[0], defaultAxes.independent, defaultAxes.dependent]);
      expect(Log.warn).calledOnce;
    });
  });

  describe("getAxisComponent", () => {
    const dependentAxis = getVictoryAxis({dependentAxis: true});
    const independentAxis = getVictoryAxis({dependentAxis: false});
    const bar = getVictoryBar({});
    const horizontalBar = getVictoryBar({horizontal: true});

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
      const componentResult = ComponentHelpers.getAxisComponent(childComponents, "x");
      expect(dependentAxis.type.getAxis).calledWith(dependentAxis.props, false)
        .and.returned("y");
      expect(independentAxis.type.getAxis).calledWith(independentAxis.props, false)
        .and.returned("x");
      expect(componentResult).to.eql(independentAxis);
    });

    it("returns the dependent axis when called with 'x' and flipped data", () => {
      const childComponents = [dependentAxis, independentAxis, horizontalBar];
      const componentResult = ComponentHelpers.getAxisComponent(childComponents, "x");
      expect(dependentAxis.type.getAxis).calledWith(dependentAxis.props, true)
        .and.returned("x");
      expect(independentAxis.type.getAxis).calledWith(independentAxis.props, true)
        .and.returned("y");
      expect(componentResult).to.eql(dependentAxis);
    });
  });

  describe("getDataComponents", () => {
    const bar = getVictoryBar({});
    const line = getVictoryLine({});
    const axis = getVictoryAxis({});
    const childComponents = [bar, line, axis];

    it("returns only grouped data components (bar) when called with 'grouped'", () => {
      const componentResult = ComponentHelpers.getDataComponents(childComponents, "grouped");
      expect(componentResult).to.eql([bar]);
    });

    it("returns only single data components (not bar) when called with 'data'", () => {
      const componentResult = ComponentHelpers.getDataComponents(childComponents, "data");
      expect(componentResult).to.eql([line]);
    });

    it("returns all single data components when called with 'all'", () => {
      const componentResult = ComponentHelpers.getDataComponents(childComponents, "all");
      expect(componentResult).to.have.members([bar, line]);
    });
  });
});
