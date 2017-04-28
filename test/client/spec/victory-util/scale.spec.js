/* eslint no-unused-expressions: 0 */
/* global sinon */

import { Scale } from "src/index";
import * as d3Scale from "d3-scale";

describe("helpers/scale", () => {
  describe("getBaseScale", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Scale, "getScaleFromProps");
      sandbox.spy(Scale, "getScaleTypeFromData");
    });
    afterEach(() => {
      sandbox.restore();
    });

    it("returns a scale from `getScaleFromProps` when string props are provided", () => {
      const props = { scale: "log" };
      const baseScale = Scale.getBaseScale(props, "x");
      expect(Scale.getScaleFromProps).to.be.calledOnce;
      expect(Scale.getScaleTypeFromData).not.to.be.called;
      expect(baseScale).to.be.a.function;
      expect(baseScale.base).to.be.a.function; // This is a unique check for log scales
    });

    it("returns a scale from `getScaleFromProps` when a d3 scale is provided", () => {
      const props = { scale: d3Scale.scaleLog() };
      const baseScale = Scale.getBaseScale(props, "x");
      expect(Scale.getScaleFromProps).to.be.calledOnce;
      expect(Scale.getScaleTypeFromData).not.to.be.called;
      expect(baseScale).to.be.a.function;
      expect(baseScale.base).to.be.a.function; // This is a unique check for log scales
    });

    it("returns a default scale when data is provided", () => {
      const props = { data: [{ x: 0, y: 1 }] };
      const baseScale = Scale.getBaseScale(props, "x");
      expect(Scale.getScaleFromProps).to.be.calledOnce;
      expect(Scale.getScaleTypeFromData).to.be.calledOnce;
      expect(baseScale).to.be.a.function;
      expect(baseScale.domain).to.be.a.function;
    });

    it("returns a default scale when nothing is provided", () => {
      const baseScale = Scale.getBaseScale({}, "x");
      expect(Scale.getScaleFromProps).to.be.calledOnce;
      expect(Scale.getScaleTypeFromData).to.be.calledOnce;
      expect(baseScale).to.be.a.function;
      expect(baseScale.domain).to.be.a.function;
    });
  });

  describe("getScaleFromProps", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Scale, "isScaleDefined");
      sandbox.spy(Scale, "validScale");
    });
    afterEach(() => {
      sandbox.restore();
    });

    it("returns a scale when a single scale is provided in props", () => {
      const props = { scale: "log" };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(Scale.isScaleDefined).calledWith(props, "x").and.returned(true);
      expect(propsScale).to.be.a.function;
      expect(propsScale.base).to.be.a.function; // This is a unique check for log scales
    });

    it("returns a scale when a scale object contains a scale for an axis", () => {
      const props = { scale: { x: "log" } };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(Scale.isScaleDefined).calledWith(props, "x").and.returned(true);
      expect(propsScale).to.be.a.function;
      expect(propsScale.base).to.be.a.function; // This is a unique check for log scales
    });

    it("returns undefined when a scale object does not contain a scale for an axis", () => {
      const props = { scale: { y: "log" } };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(Scale.isScaleDefined).calledWith(props, "x").and.returned(false);
      expect(propsScale).to.be.undefined;
    });

    it("returns undefined when an invalid scale is provided in props", () => {
      const props = { scale: "foo" };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(Scale.isScaleDefined).calledWith(props, "x").and.returned(true);
      expect(Scale.validScale).calledWith(props.scale).and.returned(false);
      expect(propsScale).to.be.undefined;
    });

    it("returns undefined when no scale prop is provided", () => {
      const propsScale = Scale.getScaleFromProps({}, "x");
      expect(Scale.isScaleDefined).calledWith({}, "x").and.returned(false);
      expect(propsScale).to.be.undefined;
    });
  });

  describe("getScaleType", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Scale, "getScaleTypeFromProps");
      sandbox.spy(Scale, "getScaleTypeFromData");
    });
    afterEach(() => {
      sandbox.restore();
    });

    it("returns 'log' for log scales", () => {
      const props = { scale: { x: d3Scale.scaleLog() } };
      const scaleType = Scale.getScaleType(props, "x");
      expect(Scale.getScaleTypeFromProps).calledWith(props, "x").and.returned("log");
      expect(Scale.getScaleTypeFromData).not.called;
      expect(scaleType).to.equal("log");
    });

    it("returns a string value given a string prop", () => {
      const props = { scale: { x: "linear" } };
      const scaleType = Scale.getScaleType(props, "x");
      expect(Scale.getScaleTypeFromProps).calledWith(props, "x").and.returned(props.scale.x);
      expect(Scale.getScaleTypeFromData).not.called;
      expect(scaleType).to.equal("linear");
    });

    it("uses data to distinguish between time and linear scales", () => {
      const props = { scale: { x: d3Scale.scaleLinear() } };
      const scaleType = Scale.getScaleType(props, "x");
      expect(Scale.getScaleTypeFromProps).calledWith(props, "x").and.returned(undefined);
      expect(Scale.getScaleTypeFromData).calledWith(props, "x").and.returned("linear");
      expect(scaleType).to.equal("linear");
    });

    it("returns 'linear' when no scale is set", () => {
      const props = {};
      const scaleType = Scale.getScaleType(props, "x");
      expect(Scale.getScaleTypeFromProps).calledWith(props, "x").and.returned(undefined);
      expect(Scale.getScaleTypeFromData).calledWith(props, "x").and.returned("linear");
      expect(scaleType).to.equal("linear");
    });

    it("returns 'time' when no scale is set, and data contains dates", () => {
      const props = { x: "x", y: "y", data: [{ x: new Date("2016-01-13"), y: 1 }] };
      const scaleType = Scale.getScaleType(props, "x");
      expect(Scale.getScaleTypeFromProps).calledWith(props, "x").and.returned(undefined);
      expect(Scale.getScaleTypeFromData).calledWith(props, "x").and.returned("time");
      expect(scaleType).to.equal("time");
    });
  });

  describe("validScale", () => {
    it("returns true for valid scale functions", () => {
      expect(Scale.validScale(d3Scale.scaleLog())).to.equal(true);
    });

    it("returns true for strings corresponding to valid scales", () => {
      expect(Scale.validScale("linear")).to.equal(true);
    });

    it("returns false for non-scale functions", () => {
      const badFunction = () => {
        return {
          domain: "foo",
          range: () => "bar"
        };
      };
      expect(Scale.validScale(badFunction)).to.equal(false);
    });

    it("returns false for strings that dont correspond to scales", () => {
      expect(Scale.validScale("foo")).to.equal(false);
    });
  });
});
