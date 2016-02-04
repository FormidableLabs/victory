/* eslint no-unused-expressions: 0 */
/* global sinon */
import React from "react";
import AxisHelpers from "src/components/victory-chart/axis-helpers";
import { VictoryAxis } from "victory-axis";
import { Scale } from "victory-util";
import identity from "lodash/utility/identity";


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

  describe("getTickFormat", () => {
    const stringMap = {x: {"a": 1, "b": 2, "c": 3}};
    const scale = {x: Scale.getBaseScale({scale: "linear"}, "x")};

    it("returns the identity function when tickValues are not strings", () => {
      const props = {tickValues: [1, 2, 3]};
      const victoryAxis = getVictoryAxis(props);
      const formatResult = AxisHelpers.getTickFormat(victoryAxis, "x", {stringMap, scale});
      expect(formatResult).to.eql(identity);
    });

    it("returns a function from a string map", () => {
      const victoryAxis = getVictoryAxis({});
      const formatResult = AxisHelpers.getTickFormat(victoryAxis, "x", {stringMap, scale});
      expect(formatResult).to.be.a("function");
      expect(formatResult(1)).to.equal("a");
    });

    it("returns the tickFormat function from scale", () => {
      const victoryAxis = getVictoryAxis({});
      const formatResult = AxisHelpers.getTickFormat(
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
      sandbox.stub(AxisHelpers, "getTicksFromAxis", fakeTicks);
      sandbox.stub(AxisHelpers, "getTicksFromData", fakeTicks);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns the result of getTicksFromAxis if truthy", () => {
      expect(AxisHelpers.getTicks(true)).to.eql(true);
      expect(AxisHelpers.getTicksFromAxis).calledWith(true).and.returned(true);
      expect(AxisHelpers.getTicksFromData).notCalled;
    });

    it("returns the result of getTicksFromData if getTicksFromAxis didnt return ticks", () => {
      expect(AxisHelpers.getTicks(false)).to.eql(false);
      expect(AxisHelpers.getTicksFromAxis).calledWith(false).and.returned(false);
      expect(AxisHelpers.getTicksFromData).calledWith(false).and.returned(false);
    });
  });

  describe("getTicksFromAxis", () => {
    const stringMap = {x: {"a": 1, "b": 2, "c": 3}};

    it("returns numeric tickValues from a child component props", () => {
      const props = {tickValues: [1, 2, 3]};
      const victoryAxis = getVictoryAxis(props);
      const tickResult = AxisHelpers.getTicksFromAxis({stringMap}, "x", victoryAxis);
      expect(tickResult).to.eql(props.tickValues);
    });

    it("converts string tickValues to numbers", () => {
      const props = {tickValues: ["a", "b", "c"]};
      const victoryAxis = getVictoryAxis(props);
      const tickResult = AxisHelpers.getTicksFromAxis({stringMap}, "x", victoryAxis);
      expect(tickResult).to.eql([1, 2, 3]);
    });

    it("converts returns undefined if tickValues is not given", () => {
      const victoryAxis = getVictoryAxis({});
      const tickResult = AxisHelpers.getTicksFromAxis({stringMap}, "x", victoryAxis);
      expect(tickResult).to.be.undefined;
    });
  });

  describe("getTicksFromData", () => {

    it("returns a category array if there is one", () => {
      const categories = {x: [1, 2, 3]};
      const stringMap = {x: {"a": 1, "b": 2, "c": 3}};
      const tickResult = AxisHelpers.getTicksFromData({categories, stringMap}, "x");
      expect(tickResult).to.eql(categories.x);
    });

    it("returns the values from a string map if categories are not given", () => {
      const stringMap = {x: {"a": 1, "b": 2, "c": 3}};
      const categories = {};
      const tickResult = AxisHelpers.getTicksFromData({categories, stringMap}, "x");
      expect(tickResult).to.eql([1, 2, 3]);
    });

    it("returns undefined if neither a string map or categories are given", () => {
      const stringMap = {};
      const categories = {};
      const tickResult = AxisHelpers.getTicksFromData({categories, stringMap}, "x");
      expect(tickResult).to.be.undefined;
    });
  });

});
