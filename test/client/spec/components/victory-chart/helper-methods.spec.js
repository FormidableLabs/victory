/* eslint no-unused-expressions: 0 */
/* global sinon */
import Helpers from "src/components/victory-chart/helper-methods";
import React from "react";
import { VictoryAxis, VictoryLine, VictoryBar } from "src/index";
import { Log } from "victory-util";
import Data from "src/helpers/data";
import Domain from "src/helpers/domain";
import Axis from "src/helpers/axis";
import Scale from "src/helpers/scale";
import identity from "lodash/utility/identity";

describe("victory-chart/helpers-methods", () => {
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
      expect(Helpers.getChildComponents({}, defaultAxes))
        .to.eql([defaultAxes.independent, defaultAxes.dependent]);
    });

    it("adds a default axis so that there are always two axes", () => {
      const children = [getVictoryAxis({dependentAxis: true})];
      expect(Helpers.getChildComponents({children}, defaultAxes))
        .to.eql([children[0], defaultAxes.independent]);
    });

    it("only ever returns one axis of a particular type", () => {
      const children = [
        getVictoryAxis({dependentAxis: true}),
        getVictoryAxis({dependentAxis: true, orientation: "right"})
      ];
      const componentResult = Helpers.getChildComponents({children}, defaultAxes);
      expect(componentResult).to.have.length(2)
        .and.to.eql([children[0], defaultAxes.independent]);
      expect(Log.warn).calledOnce;
    });

    it("only returns one the first bar component", () => {
      const children = [
        getVictoryBar({categories: [1, 2, 3]}),
        getVictoryBar({categories: [4, 5, 6]})
      ];
      const componentResult = Helpers.getChildComponents({children}, defaultAxes);
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
      const componentResult = Helpers.getDataComponents(childComponents, "grouped");
      expect(componentResult).to.eql([bar]);
    });

    it("returns only single data components (not bar) when called with 'data'", () => {
      const componentResult = Helpers.getDataComponents(childComponents, "data");
      expect(componentResult).to.eql([line]);
    });

    it("returns all single data components when called with 'all'", () => {
      const componentResult = Helpers.getDataComponents(childComponents, "all");
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
      const domainResultX = Helpers.getDomain(props, childComponents, "x");
      expect(Domain.padDomain).calledWith([1, 2], props, "x").and.returned([1, 2]);
      expect(victoryLine.type.getDomain).notCalled;
      expect(domainResultX).to.eql([1, 2]);
    });

    it("calculates a domain from child components", () => {
      const props = {};
      const domainResultX = Helpers.getDomain(props, childComponents, "x");
      expect(victoryLine.type.getDomain).calledWith(victoryLine.props, "x");
      expect(Domain.padDomain).calledWith(victoryLine.props.domain, props, "x")
        .and.returned(victoryLine.props.domain);
      expect(domainResultX).to.eql(victoryLine.props.domain);
    });
  });

  describe("createStringMap", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Axis, "getAxisComponent");
      sandbox.spy(Data, "getStringsFromAxes");
      sandbox.spy(Data, "getStringsFromCategories");
      sandbox.spy(Data, "getStringsFromData");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns a stringMap from axis tickValues", () => {
      const axisComponent = getVictoryAxis({tickValues: ["a", "b", "c"]});
      const childComponents = [axisComponent];
      const stringResult = Helpers.createStringMap(childComponents, "x");
      expect(Axis.getAxisComponent).calledWith(childComponents, "x")
        .and.returned(axisComponent);
      expect(Data.getStringsFromAxes).calledWith(axisComponent.props, "x")
        .and.returned(["a", "b", "c"]);
      expect(Data.getStringsFromCategories).calledWith(axisComponent.props, "x").and.returned([]);
      expect(Data.getStringsFromData).calledWith(axisComponent.props, "x").and.returned([]);
      expect(stringResult).to.eql({a: 1, b: 2, c: 3});
    });

    it("returns a stringMap from axis tickValues, and string data", () => {
      const axisComponent = getVictoryAxis({tickValues: ["a", "b", "c"]});
      const lineComponent = getVictoryLine({data: [
        {x: "b", y: 1}, {x: "c", y: 1}, {x: "d", y: 1}
      ]});
      const childComponents = [axisComponent, lineComponent];
      const stringResult = Helpers.createStringMap(childComponents, "x");

      expect(Axis.getAxisComponent).calledWith(childComponents, "x")
        .and.returned(axisComponent);
      expect(Data.getStringsFromAxes).calledWith(axisComponent.props, "x")
        .and.returned(["a", "b", "c"]);
      expect(Data.getStringsFromCategories).calledWith(axisComponent.props, "x").and.returned([]);
      expect(Data.getStringsFromCategories).calledWith(lineComponent.props, "x").and.returned([]);
      expect(Data.getStringsFromData).calledWith(axisComponent.props, "x").and.returned([]);
      expect(Data.getStringsFromData).calledWith(lineComponent.props, "x")
        .and.returned(["b", "c", "d"]);
      expect(stringResult).to.eql({a: 1, b: 2, c: 3, d: 4});
    });
  });

  describe("getCategories", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Helpers, "getDataComponents");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns a set of categories from a component", () => {
      const victoryBar = getVictoryBar({categories: [1, 2, 3]});
      const childComponents = [victoryBar];
      const categoryResult = Helpers.getCategories(childComponents);
      expect(Helpers.getDataComponents).calledWith(childComponents, "grouped")
        .and.returned([victoryBar]);
      expect(categoryResult).to.eql(victoryBar.props.categories);
    });

    it("returns undefined if no categories are defined", () => {
      const victoryBar = getVictoryBar({});
      const childComponents = [victoryBar];
      const categoryResult = Helpers.getCategories(childComponents);
      expect(Helpers.getDataComponents).calledWith(childComponents, "grouped")
        .and.returned([victoryBar]);
      expect(categoryResult).to.be.undefined;
    });

    it("returns undefined if no grouped data components are found", () => {
      const victoryLine = getVictoryLine({});
      const childComponents = [victoryLine];
      const categoryResult = Helpers.getCategories(childComponents);
      expect(Helpers.getDataComponents).calledWith(childComponents, "grouped")
        .and.returned([]);
      expect(categoryResult).to.be.undefined;
    });
  });

  describe("getTickFormat", () => {
    const stringMap = {x: {"a": 1, "b": 2, "c": 3}};
    const scale = {x: Scale.getBaseScale({scale: "linear"}, "x")};

    it("returns the identity function when tickValues are not strings", () => {
      const props = {tickValues: [1, 2, 3]};
      const victoryAxis = getVictoryAxis(props);
      const formatResult = Helpers.getTickFormat(victoryAxis, "x", {stringMap, scale});
      expect(formatResult).to.eql(identity);
    });

    it("returns a function from a string map", () => {
      const victoryAxis = getVictoryAxis({});
      const formatResult = Helpers.getTickFormat(victoryAxis, "x", {stringMap, scale});
      expect(formatResult).to.be.a("function");
      expect(formatResult(1)).to.equal("a");
    });

    it("returns the tickFormat function from scale", () => {
      const victoryAxis = getVictoryAxis({});
      const formatResult = Helpers.getTickFormat(
        victoryAxis, "x", { stringMap: {x: null}, scale }
      );
      expect(formatResult(1)).to.equal(scale.x.tickFormat()(1));
    });
  });

  describe("getTicks", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      const fakeTicks = (bool) => bool;
      sandbox.stub(Helpers, "getTicksFromAxis", fakeTicks);
      sandbox.stub(Helpers, "getTicksFromData", fakeTicks);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns the result of getTicksFromAxis if truthy", () => {
      expect(Helpers.getTicks(true)).to.eql(true);
      expect(Helpers.getTicksFromAxis).calledWith(true).and.returned(true);
      expect(Helpers.getTicksFromData).notCalled;
    });

    it("returns the result of getTicksFromData if getTicksFromAxis didnt return ticks", () => {
      expect(Helpers.getTicks(false)).to.eql(false);
      expect(Helpers.getTicksFromAxis).calledWith(false).and.returned(false);
      expect(Helpers.getTicksFromData).calledWith(false).and.returned(false);
    });
  });

  describe("getTicksFromAxis", () => {
    const stringMap = {x: {"a": 1, "b": 2, "c": 3}};

    it("returns numeric tickValues from a child component props", () => {
      const props = {tickValues: [1, 2, 3]};
      const victoryAxis = getVictoryAxis(props);
      const tickResult = Helpers.getTicksFromAxis({stringMap}, "x", victoryAxis);
      expect(tickResult).to.eql(props.tickValues);
    });

    it("converts string tickValues to numbers", () => {
      const props = {tickValues: ["a", "b", "c"]};
      const victoryAxis = getVictoryAxis(props);
      const tickResult = Helpers.getTicksFromAxis({stringMap}, "x", victoryAxis);
      expect(tickResult).to.eql([1, 2, 3]);
    });

    it("converts returns undefined if tickValues is not given", () => {
      const victoryAxis = getVictoryAxis({});
      const tickResult = Helpers.getTicksFromAxis({stringMap}, "x", victoryAxis);
      expect(tickResult).to.be.undefined;
    });
  });

  describe("getTicksFromData", () => {

    it("returns a category array if there is one", () => {
      const categories = {x: [1, 2, 3]};
      const stringMap = {x: {"a": 1, "b": 2, "c": 3}};
      const tickResult = Helpers.getTicksFromData({categories, stringMap}, "x");
      expect(tickResult).to.eql(categories.x);
    });

    it("returns the values from a string map if categories are not given", () => {
      const stringMap = {x: {"a": 1, "b": 2, "c": 3}};
      const categories = {};
      const tickResult = Helpers.getTicksFromData({categories, stringMap}, "x");
      expect(tickResult).to.eql([1, 2, 3]);
    });

    it("returns undefined if neither a string map or categories are given", () => {
      const stringMap = {};
      const categories = {};
      const tickResult = Helpers.getTicksFromData({categories, stringMap}, "x");
      expect(tickResult).to.be.undefined;
    });
  });
});
