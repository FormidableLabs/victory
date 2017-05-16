/* global sinon */
/* eslint-disable no-unused-expressions,react/no-multi-comp */
import Helpers from "src/components/victory-chart/helper-methods";
import React from "react";
import { VictoryAxis, VictoryLine, VictoryBar } from "src/index";
import { Log, Data, Scale } from "victory-core";
import Wrapper from "src/helpers/wrapper";

describe("victory-chart/helpers-methods", () => {
  const getVictoryLine = (props) => React.createElement(VictoryLine, props);
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);
  const getVictoryBar = (props) => React.createElement(VictoryBar, props);

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
      const result = Helpers.getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(2);
      expect(result).to.deep.include.members([defaultAxes.independent, defaultAxes.dependent]);
    });

    it("adds default axes when none of the children are axis components", () => {
      const line = getVictoryLine({});
      const children = [line];
      const result = Helpers.getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(3);
      expect(result).to.deep.include.members([
        defaultAxes.independent, defaultAxes.dependent
      ]);
    });

    it("does not add default axes if axis any axis components exist in children", () => {
      const axis = getVictoryAxis({});
      const children = [axis];
      const result = Helpers.getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(1);
      expect(result[0].props).to.eql(axis.props);
    });

    it("only ever returns one axis of a particular type", () => {
      const children = [
        getVictoryAxis({ dependentAxis: true }),
        getVictoryAxis({ dependentAxis: true, orientation: "right" })
      ];
      const result = Helpers.getChildComponents({ children }, defaultAxes);
      expect(result).to.have.length(1);
      expect(result[0].props).to.eql(children[0].props);
    });
  });

  describe("getDataComponents", () => {
    const bar = getVictoryBar({});
    const line = getVictoryLine({});
    const axis = getVictoryAxis({});
    const childComponents = [bar, line, axis];

    it("returns data components but not axis components", () => {
      const componentResult = Helpers.getDataComponents(childComponents);
      expect(componentResult).to.have.members([bar, line]);
      expect(componentResult).not.to.have.members([axis]);
    });
  });

  describe("getDomain", () => {
    const victoryLine = getVictoryLine({ domain: [0, 3] });
    const xAxis = getVictoryAxis({ dependentAxis: false });
    const yAxis = getVictoryAxis({ dependentAxis: true });
    const childComponents = [victoryLine, xAxis, yAxis];
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Wrapper, "getDomain");
      sandbox.spy(victoryLine.type, "getDomain");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("calculates a domain from props", () => {
      const props = { domain: { x: [1, 2], y: [2, 3] } };
      const domainResultX = Helpers.getDomain(props, "x", childComponents);
      expect(Wrapper.getDomain).calledWith(props, "x", childComponents).and.returned([1, 2]);
      expect(victoryLine.type.getDomain).notCalled;
      expect(domainResultX).to.eql([1, 2]);
    });

    it("calculates a domain from child components", () => {
      const props = {};
      const domainResultX = Helpers.getDomain(props, "x", childComponents);
      expect(Wrapper.getDomain).calledWith(props, "x", childComponents);
      expect(victoryLine.type.getDomain).calledWith(victoryLine.props);
      expect(domainResultX).to.eql(victoryLine.props.domain);
    });
  });

  describe("createStringMap", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Data, "getStringsFromAxes");
      sandbox.spy(Wrapper, "getStringsFromCategories");
      sandbox.spy(Wrapper, "getStringsFromData");
      sandbox.spy(Wrapper, "getStringsFromChildren");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns a stringMap from axis tickValues", () => {
      const props = {};
      const axisComponent = getVictoryAxis({ tickValues: ["a", "b", "c"] });
      const childComponents = [axisComponent];
      const stringResult = Helpers.createStringMap(props, "x", childComponents);
      expect(Wrapper.getStringsFromChildren).calledWith(props, "x", childComponents)
        .and.returned(["a", "b", "c"]);
      expect(Data.getStringsFromAxes).calledWith(axisComponent.props, "x")
        .and.returned(["a", "b", "c"]);
      expect(Wrapper.getStringsFromCategories).calledWith(childComponents, "x")
        .and.returned([]);
      expect(Wrapper.getStringsFromData).calledWith(childComponents, "x")
        .and.returned([]);
      expect(stringResult).to.eql({ a: 1, b: 2, c: 3 });
    });

    it("returns a stringMap from axis tickValues, and string data", () => {
      const props = {};
      const axisComponent = getVictoryAxis({ tickValues: ["c", "d"] });
      const lineComponent = getVictoryLine({ data: [{ x: "a", y: 1 }, { x: "b", y: 1 }] });
      const childComponents = [axisComponent, lineComponent];
      const stringResult = Helpers.createStringMap(props, "x", childComponents);
      expect(Wrapper.getStringsFromChildren).calledWith(props, "x", childComponents)
        .and.returned(["a", "b", "c", "d"]);
      expect(Data.getStringsFromAxes).calledWith(axisComponent.props, "x")
        .and.returned(["c", "d"]);
      expect(Wrapper.getStringsFromCategories).calledWith(childComponents, "x")
        .and.returned([]);
      expect(Wrapper.getStringsFromData).calledWith(childComponents, "x")
        .and.returned(["a", "b"]);
      expect(stringResult).to.eql({ a: 1, b: 2, c: 3, d: 4 });
    });
  });

  describe("getTickFormat", () => {
    const stringMap = { x: { "a": 1, "b": 2, "c": 3 } };
    const nullStringMap = { x: null };
    const scale = { x: { tickFormat: () => (tick) => "scaleFormatTick" } };

    it("returns the identity function when tickValues are numerical", () => {
      const props = { tickValues: [1, 2, 3] };
      const victoryAxis = getVictoryAxis(props);
      const formatResult = Helpers.getTickFormat(victoryAxis, "x", { stringMap: nullStringMap });
      const val = 2;
      expect(formatResult).to.be.a("function");
      expect(formatResult(val)).to.equal(val);
    });

    it("returns a function from a string map", () => {
      const victoryAxis = getVictoryAxis({});
      const formatResult = Helpers.getTickFormat(victoryAxis, "x", { stringMap });
      expect(formatResult).to.be.a("function");
      expect(formatResult(1)).to.equal("a");
    });

    it("returns the tickFormat function from scale", () => {
      const victoryAxis = getVictoryAxis({});
      const formatResult = Helpers.getTickFormat(
        victoryAxis, "x", { stringMap: nullStringMap, scale }
      );
      expect(formatResult(1)).to.equal("scaleFormatTick");
    });

    it("uses custom tickFormat", () => {
      const props = { tickFormat: (tick) => tick + 1 };
      const victoryAxis = getVictoryAxis(props);
      const formatResult = Helpers.getTickFormat(victoryAxis, "x", { stringMap: nullStringMap });
      expect(formatResult).to.be.a("function");
      expect(formatResult(1)).to.equal(2);
    });

    it("passes string map result to custom tickFormat prop", () => {
      const props = { tickFormat: (tick) => tick + " yo" };
      const victoryAxis = getVictoryAxis(props);
      const formatResult = Helpers.getTickFormat(victoryAxis, "x", { stringMap });
      expect(formatResult).to.be.a("function");
      expect(formatResult(1)).to.equal("a yo");
    });

    it("uses string array tickValues for tick formatting", () => {
      const props = { tickValues: ["orange", "banana", "apple"] };
      const victoryAxis = getVictoryAxis(props);
      const formatResult = Helpers.getTickFormat(victoryAxis, "x", { stringMap: nullStringMap });
      expect(formatResult).to.be.a("function");
      expect(formatResult(5, 0)).to.equal("orange");
      expect(formatResult(5, 2)).to.equal("apple");
    });

    it("uses string array tickFormat for tick formatting", () => {
      const props = { tickFormat: ["orange", "banana", "apple"] };
      const victoryAxis = getVictoryAxis(props);
      const formatResult = Helpers.getTickFormat(victoryAxis, "x", { stringMap: nullStringMap });
      expect(formatResult).to.be.a("function");
      expect(formatResult(5, 0)).to.equal("orange");
      expect(formatResult(5, 2)).to.equal("apple");
    });

    it("uses tickFormat array over tickValues", () => {
      const props = { tickValues: [1, 2, 3], tickFormat: ["orange", "banana", "apple"] };
      const victoryAxis = getVictoryAxis(props);
      const formatResult = Helpers.getTickFormat(victoryAxis, "x", { stringMap: nullStringMap });
      expect(formatResult).to.be.a("function");
      expect(formatResult(5, 0)).to.equal("orange");
      expect(formatResult(5, 2)).to.equal("apple");
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
    const stringMap = { x: { "a": 1, "b": 2, "c": 3 } };

    it("returns numeric tickValues from a child component props", () => {
      const props = { tickValues: [1, 2, 3] };
      const victoryAxis = getVictoryAxis(props);
      const tickResult = Helpers.getTicksFromAxis({ stringMap }, "x", victoryAxis);
      expect(tickResult).to.eql(props.tickValues);
    });

    it("converts string tickValues to numbers", () => {
      const props = { tickValues: ["a", "b", "c"] };
      const victoryAxis = getVictoryAxis(props);
      const tickResult = Helpers.getTicksFromAxis({ stringMap }, "x", victoryAxis);
      expect(tickResult).to.eql([1, 2, 3]);
    });

    it("converts returns undefined if tickValues is not given", () => {
      const victoryAxis = getVictoryAxis({});
      const tickResult = Helpers.getTicksFromAxis({ stringMap }, "x", victoryAxis);
      expect(tickResult).to.be.undefined;
    });
  });

  describe("getTicksFromData", () => {

    it("returns a category array if there is one", () => {
      const categories = { x: [1, 2, 3] };
      const stringMap = { x: { "a": 1, "b": 2, "c": 3 } };
      const tickResult = Helpers.getTicksFromData({ categories, stringMap }, "x");
      expect(tickResult).to.eql(categories.x);
    });

    it("returns the values from a string map if categories are not given", () => {
      const stringMap = { x: { "a": 1, "b": 2, "c": 3 } };
      const categories = {};
      const tickResult = Helpers.getTicksFromData({ categories, stringMap }, "x");
      expect(tickResult).to.eql([1, 2, 3]);
    });

    it("returns undefined if neither a string map or categories are given", () => {
      const stringMap = {};
      const categories = {};
      const tickResult = Helpers.getTicksFromData({ categories, stringMap }, "x");
      expect(tickResult).to.be.undefined;
    });
  });
});
