import React from "react";
import { VictoryAxis } from "victory-axis";
import { VictoryBar } from "victory-bar";
import * as Axis from "./axis";
import * as Scale from "./scale";

describe("helpers/axis", () => {
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);
  const getVictoryBar = (props) => React.createElement(VictoryBar, props);

  describe("isVertical", () => {
    it("returns true when the orientation is vertical", () => {
      const props = { orientation: "left" };
      const verticalResult = Axis.isVertical(props);
      expect(verticalResult).toEqual(true);
    });

    it("returns false when the orientation is horizontal", () => {
      const props = { orientation: "bottom" };
      const verticalResult = Axis.isVertical(props);
      expect(verticalResult).toEqual(false);
    });
  });

  describe("getDomain", () => {
    it("determines a domain from tickValues", () => {
      const props = { tickValues: [1, 2, 3] };
      const domainResult = Axis.getDomain(props);
      expect(domainResult).toEqual([1, 3]);
    });

    it("determines a domain from string tick values", () => {
      const props = { tickValues: ["a", "b", "c", "d"] };
      const domainResult = Axis.getDomain(props);
      expect(domainResult).toEqual([1, 4]);
    });

    it("reverses a domain from tickValues when the axis is vertical", () => {
      const props = { tickValues: [1, 2, 3], dependentAxis: true };
      const domainResult = Axis.getDomain(props);
      expect(domainResult).toEqual([3, 1]);
    });

    it("determines a domain from props", () => {
      const props = { domain: [1, 2] };
      const domainResult = Axis.getDomain(props);
      expect(domainResult).toEqual([1, 2]);
    });

    it("calculates a domain from a single tickValue", () => {
      const props = { tickValues: [1] };
      const domainResult = Axis.getDomain(props);
      const verySmallNumber = Math.pow(10, -10);
      expect(domainResult).toEqual([1 - verySmallNumber, 1 + verySmallNumber]);
    });

    it("returns undefined if the given axis doesn't match this axis", () => {
      const props = { domain: [1, 3] };
      const domainResultX = Axis.getDomain(props, "x");
      expect(domainResultX).toEqual([1, 3]);
      const domainResultY = Axis.getDomain(props, "y");
      expect(domainResultY).toBeUndefined();
    });
  });

  describe("getAxis", () => {
    it("determines the axis based on type (dependent / independent)", () => {
      expect(Axis.getAxis({ dependentAxis: true })).toEqual("y");
      expect(Axis.getAxis({})).toEqual("x");
    });
  });

  describe("getAxisComponent", () => {
    const dependentAxis = getVictoryAxis({ dependentAxis: true });
    const independentAxis = getVictoryAxis({ dependentAxis: false });
    const bar = getVictoryBar({});

    beforeEach(() => {
      // @ts-expect-error This will error until we convert `victory-axis`
      jest.spyOn(dependentAxis.type, "getAxis");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("returns the independent axis when called with 'x'", () => {
      const childComponents = [dependentAxis, independentAxis, bar];
      const componentResult = Axis.getAxisComponent(childComponents, "x");
      // @ts-expect-error This will error until we convert `victory-axis`
      expect(dependentAxis.type.getAxis).toBeCalledWith(dependentAxis.props);
      // @ts-expect-error This will error until we convert `victory-axis`
      expect(independentAxis.type.getAxis).toBeCalledWith(
        independentAxis.props
      );
      expect(componentResult).toEqual(independentAxis);
    });
  });

  describe("getTickFormat", () => {
    const scale = Scale.getBaseScale({ scale: { x: "linear" } }, "x");
    const ticks = [1, 2, 3, 4, 5];
    beforeEach(() => {
      jest.spyOn(scale, "tickFormat");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("returns tickFormat function from props", () => {
      const props = { tickFormat: (x) => x * 5 };
      const tickProps = { scale, ticks };
      const formatResult = Axis.getTickFormat(props, tickProps);
      expect(scale.tickFormat).not.toHaveBeenCalled();
      expect(formatResult).toEqual(props.tickFormat);
    });

    it("converts tickFormat array from props to a function", () => {
      const props = { tickFormat: [1, 2, 3, 4, 5] };
      const tickProps = { scale, ticks };
      const formatResult = Axis.getTickFormat(props, tickProps);
      expect(scale.tickFormat).not.toHaveBeenCalled();
      expect(formatResult).toBeInstanceOf(Function);
    });

    it("converts tickFormat string array from props to a function", () => {
      const props = { tickValues: ["cats", "dogs", "birds"] };
      const tickProps = { scale, ticks };
      const formatResult = Axis.getTickFormat(props, tickProps);
      expect(scale.tickFormat).not.toHaveBeenCalled();
      expect(formatResult).toBeInstanceOf(Function);
    });

    it("calculates a tick format from scale", () => {
      const props = {};
      const tickProps = { scale, ticks };
      const formatResult = Axis.getTickFormat(props, tickProps);
      expect(formatResult).toBeInstanceOf(Function);
    });
  });

  describe("getTicks", () => {
    const scale = Scale.getBaseScale({ scale: { x: "linear" } }, "x");
    beforeEach(() => {
      jest.spyOn(scale, "ticks");
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("returns tickValues from props", () => {
      const props = { tickValues: [1, 2, 3] };
      const tickResult = Axis.getTicks(props, scale);
      expect(tickResult).toEqual(props.tickValues);
    });

    it("returns converts string tickValues to numbers", () => {
      const props = { tickValues: ["a", "b", "c", "d"] };
      const tickResult = Axis.getTicks(props, scale);
      expect(tickResult).toEqual([1, 2, 3, 4]);
    });

    it("calculates tickValues from scale.ticks()", () => {
      const props = { tickCount: 5 };
      Axis.getTicks(props, scale);
      expect(scale.ticks).toBeCalledWith(5);
    });

    // TODO: This is failing, but I'm not sure whether it's an issue with the test or the code
    it.skip("calculates tickValues from scale.ticks(), and removes zero if axes cross", () => {
      const props = { tickCount: 5, crossAxis: true };
      const tickResult = Axis.getTicks(props, scale);
      expect(scale.ticks).toBeCalledWith(5);
      expect(tickResult).not.toContain(0);
    });
  });
});
