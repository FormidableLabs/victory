/* global sinon */
/* eslint-disable no-unused-expressions,react/no-multi-comp */
import Axis from "packages/victory-chart/src/helpers/axis";
import { Scale } from "packages/victory-core/src/index";
import React from "react";
import { VictoryAxis, VictoryBar } from "packages/victory-chart/src/index";

describe("helpers/axis", () => {
  const getVictoryAxis = (props) => React.createElement(VictoryAxis, props);
  const getVictoryBar = (props) => React.createElement(VictoryBar, props);

  describe("isVertical", () => {
    it("returns true when the orientation is vertical", () => {
      const props = { orientation: "left" };
      const verticalResult = Axis.isVertical(props);
      expect(verticalResult).to.equal(true);
    });

    it("returns false when the orientation is horizontal", () => {
      const props = { orientation: "bottom" };
      const verticalResult = Axis.isVertical(props);
      expect(verticalResult).to.equal(false);
    });
  });

  describe("getDomain", () => {
    it("determines a domain from tickValues", () => {
      const props = { tickValues: [1, 2, 3] };
      const domainResult = Axis.getDomain(props);
      expect(domainResult).to.eql([1, 3]);
    });

    it("determines a domain from string tick values", () => {
      const props = { tickValues: ["a", "b", "c", "d"] };
      const domainResult = Axis.getDomain(props);
      expect(domainResult).to.eql([1, 4]);
    });

    it("reverses a domain from tickValues when the axis is vertical", () => {
      const props = { tickValues: [1, 2, 3], dependentAxis: true };
      const domainResult = Axis.getDomain(props);
      expect(domainResult).to.eql([3, 1]);
    });

    it("determines a domain from props", () => {
      const props = { domain: [1, 2] };
      const domainResult = Axis.getDomain(props);
      expect(domainResult).to.eql([1, 2]);
    });


    it("calculates a domain from a single tickValue", () => {
      const props = { tickValues: [1] };
      const domainResult = Axis.getDomain(props);
      const verySmallNumber = Math.pow(10, -10);
      expect(domainResult).to.eql([1 - verySmallNumber, 1 + verySmallNumber]);
    });

    it("returns undefined if the given axis doesn't match this axis", () => {
      const props = { domain: [1, 3] };
      const domainResultX = Axis.getDomain(props, "x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = Axis.getDomain(props, "y");
      expect(domainResultY).to.be.undefined;
    });
  });

  describe("getAxis", () => {
    it("determines the axis based on orientation prop", () => {
      expect(Axis.getAxis({ orientation: "top" })).to.equal("x");
      expect(Axis.getAxis({ orientation: "bottom" })).to.equal("x");
      expect(Axis.getAxis({ orientation: "left" })).to.equal("y");
      expect(Axis.getAxis({ orientation: "right" })).to.equal("y");
    });

    it("determines the axis based on type (dependent / independent)", () => {
      expect(Axis.getAxis({ dependentAxis: true })).to.equal("y");
      expect(Axis.getAxis({})).to.equal("x");
    });
  });

  describe("getAxisComponent", () => {
    const dependentAxis = getVictoryAxis({ dependentAxis: true });
    const independentAxis = getVictoryAxis({ dependentAxis: false });
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

  describe("getTickFormat", () => {
    let sandbox;
    const scale = Scale.getBaseScale({ scale: { x: "linear" } }, "x");
    const ticks = [1, 2, 3, 4, 5];
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.stub(scale, "tickFormat");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns tickFormat function from props", () => {
      const props = { tickFormat: (x) => x * 5 };
      const tickProps = { scale, ticks };
      const formatResult = Axis.getTickFormat(props, tickProps);
      expect(scale.tickFormat).notCalled;
      expect(formatResult).to.eql(props.tickFormat);
    });

    it("converts tickFormat array from props to a function", () => {
      const props = { tickFormat: [1, 2, 3, 4, 5] };
      const tickProps = { scale, ticks };
      const formatResult = Axis.getTickFormat(props, tickProps);
      expect(scale.tickFormat).notCalled;
      expect(formatResult).to.be.a("function");
    });

    it("converts tickFormat string array from props to a function", () => {
      const props = { tickValues: ["cats", "dogs", "birds"] };
      const tickProps = { scale, ticks };
      const formatResult = Axis.getTickFormat(props, tickProps);
      expect(scale.tickFormat).notCalled;
      expect(formatResult).to.be.a("function");
    });

    it("calculates a tick format from scale", () => {
      const props = {};
      const tickProps = { scale, ticks };
      const formatResult = Axis.getTickFormat(props, tickProps);
      expect(formatResult).to.be.a("function");
    });
  });

  describe("getTicks", () => {
    let sandbox;
    const scale = Scale.getBaseScale({ scale: { x: "linear" } }, "x");
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(scale, "ticks");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns tickValues from props", () => {
      const props = { tickValues: [1, 2, 3] };
      const tickResult = Axis.getTicks(props);
      expect(tickResult).to.eql(props.tickValues);
    });

    it("returns converts string tickValues to numbers", () => {
      const props = { tickValues: ["a", "b", "c", "d"] };
      const tickResult = Axis.getTicks(props);
      expect(tickResult).to.eql([1, 2, 3, 4]);
    });

    it("calculates tickValues from scale.ticks()", () => {
      const props = { tickCount: 5 };
      Axis.getTicks(props, scale);
      expect(scale.ticks).calledWith(5);
    });

    it("calculates tickValues from scale.ticks(), and removes zero if axes cross", () => {
      const props = { tickCount: 5, crossAxis: true };
      const tickResult = Axis.getTicks(props, scale);
      expect(scale.ticks).calledWith(5);
      expect(tickResult).to.be.an("array").and.not.have.members([0]);
    });
  });
});
