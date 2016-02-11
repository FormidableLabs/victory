/* eslint no-unused-expressions: 0 */
/* global sinon */
import Helpers from "src/components/victory-axis/helper-methods";
import Scale from "src/helpers/scale";
import Axis from "src/helpers/axis";
import Domain from "src/helpers/domain";
import { Chart } from "victory-util";

describe("victory-axis/helper-methods", () => {
  describe("getDomain", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Domain, "getDomainFromTickValues");
      const fakeGetAxis = () => "x";
      sandbox.stub(Helpers, "getAxis", fakeGetAxis);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("determines a domain from props", () => {
      const props = {domain: [1, 2]};
      const domainResult = Helpers.getDomain(props);
      expect(Domain.getDomainFromTickValues).notCalled;
      expect(domainResult).to.eql([1, 2]);
    });

    it("calculates a domain from tickValues", () => {
      const props = {tickValues: [1, 2, 3, 4]};
      const domainResult = Helpers.getDomain(props);
      expect(Domain.getDomainFromTickValues).calledWith(props)
        .and.returned([1, 4]);
      expect(domainResult).to.eql([1, 4]);
    });

    it("returns undefined if the given axis doesn't match this axis", () => {
      const props = {domain: [1, 3]};
      const domainResultX = Helpers.getDomain(props, "x");
      expect(Helpers.getAxis).calledWith(props).and.returned("x");
      expect(domainResultX).to.eql([1, 3]);
      const domainResultY = Helpers.getDomain(props, "y");
      expect(Helpers.getAxis).calledWith(props).and.returned("x");
      expect(domainResultY).to.be.undefined;
    });
  });

  describe("getAxis", () => {
    it("determines the axis based on orientation prop", () => {
      expect(Helpers.getAxis({orientation: "top"})).to.equal("x");
      expect(Helpers.getAxis({orientation: "bottom"})).to.equal("x");
      expect(Helpers.getAxis({orientation: "left"})).to.equal("y");
      expect(Helpers.getAxis({orientation: "right"})).to.equal("y");
    });

    it("determines the axis based on type (dependent / independent)", () => {
      expect(Helpers.getAxis({dependentAxis: true})).to.equal("y");
      expect(Helpers.getAxis({})).to.equal("x");
    });

    it("determines the axis based on type when flipped", () => {
      expect(Helpers.getAxis({dependentAxis: true}, true)).to.equal("x");
      expect(Helpers.getAxis({}, true)).to.equal("y");
    });
  });

  describe("getScale", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Helpers, "getDomain");
      const fakeGetAxis = () => "x";
      sandbox.stub(Helpers, "getAxis", fakeGetAxis);
      sandbox.spy(Scale, "getBaseScale");
      const fakeGetRange = () => [0, 100];
      sandbox.stub(Chart, "getRange", fakeGetRange);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns a scale", () => {
      const props = {domain: [0, 10]};
      const scaleResult = Helpers.getScale(props);
      expect(Helpers.getAxis).calledWith(props).and.returned("x");
      expect(Scale.getBaseScale).calledWith(props, "x");
      expect(Helpers.getDomain).calledWith(props).and.returned([0, 10]);
      expect(Chart.getRange).calledWith(props, "x").and.returned([0, 100]);
      expect(scaleResult.domain()).to.eql([0, 10]);
      expect(scaleResult.range()).to.eql([0, 100]);
    });
  });

  describe("getTicks", () => {
    let sandbox;
    const scale = Scale.getBaseScale({scale: {x: "linear"}}, "x");
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Axis, "stringTicks");
      sandbox.spy(scale, "ticks");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns tickValues from props", () => {
      const props = {tickValues: [1, 2, 3]};
      const tickResult = Helpers.getTicks(props);
      expect(Axis.stringTicks).calledWith(props).and.returned(false);
      expect(tickResult).to.eql(props.tickValues);
    });

    it("returns converts string tickValues to numbers", () => {
      const props = {tickValues: ["a", "b", "c", "d"]};
      const tickResult = Helpers.getTicks(props);
      expect(Axis.stringTicks).calledWith(props).and.returned(true);
      expect(tickResult).to.eql([1, 2, 3, 4]);
    });

    it("calculates tickValues from scale.ticks()", () => {
      const props = {tickCount: 5};
      Helpers.getTicks(props, scale);
      expect(scale.ticks).calledWith(5);
    });

    it("calculates tickValues from scale.ticks(), and removes zero if axes cross", () => {
      const props = {tickCount: 5, crossAxis: true};
      const tickResult = Helpers.getTicks(props, scale);
      expect(scale.ticks).calledWith(5);
      expect(tickResult).to.be.an("array").and.not.have.members([0]);
    });
  });

  describe("getTickFormat", () => {
    let sandbox;
    const scale = Scale.getBaseScale({scale: {x: "linear"}}, "x");
    const ticks = [1, 2, 3, 4, 5];
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Axis, "stringTicks");
      sandbox.spy(scale, "tickFormat");
    });

    afterEach(() => {
      sandbox.restore();
    });

    it("returns tickFormat function from props", () => {
      const props = {tickFormat: (x) => x * 5};
      const tickProps = {scale, ticks};
      const formatResult = Helpers.getTickFormat(props, tickProps);
      expect(Axis.stringTicks).notCalled;
      expect(scale.tickFormat).notCalled;
      expect(formatResult).to.eql(props.tickFormat);
    });

    it("converts tickFormat array from props to a function", () => {
      const props = {tickFormat: [1, 2, 3, 4, 5]};
      const tickProps = {scale, ticks};
      const formatResult = Helpers.getTickFormat(props, tickProps);
      expect(Axis.stringTicks).notCalled;
      expect(scale.tickFormat).notCalled;
      expect(formatResult).to.be.a("function");
    });

    it("converts tickFormat string array from props to a function", () => {
      const props = {tickValues: ["cats", "dogs", "birds"]};
      const tickProps = {scale, ticks};
      const formatResult = Helpers.getTickFormat(props, tickProps);
      expect(Axis.stringTicks).calledWith(props).and.returned(true);
      expect(scale.tickFormat).notCalled;
      expect(formatResult).to.be.a("function");
    });

    it("calculates a tick format from scale", () => {
      const props = {};
      const tickProps = {scale, ticks};
      const formatResult = Helpers.getTickFormat(props, tickProps);
      expect(Axis.stringTicks).calledWith(props).and.returned(false);
      expect(scale.tickFormat).calledWith(ticks.length);
      expect(formatResult).to.be.a("function");
    });
  });
});
