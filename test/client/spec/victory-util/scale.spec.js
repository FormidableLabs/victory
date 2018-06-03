/* eslint no-unused-expressions: 0 */

import { Scale } from "src/index";
import * as d3Scale from "d3-scale";

describe("victory-util/scale", () => {
  describe("getBaseScale", () => {

    it("returns a scale from `getScaleFromProps` when string props are provided", () => {
      const props = { scale: "log" };
      const baseScale = Scale.getBaseScale(props, "x");
      expect(baseScale).to.be.a.function;
      expect(baseScale.base).to.be.a.function; // This is a unique check for log scales
    });

    it("returns a scale from `getScaleFromProps` when a d3 scale is provided", () => {
      const props = { scale: d3Scale.scaleLog() };
      const baseScale = Scale.getBaseScale(props, "x");
      expect(baseScale).to.be.a.function;
      expect(baseScale.base).to.be.a.function; // This is a unique check for log scales
    });

    it("returns a default scale when data is provided", () => {
      const props = { data: [{ x: 0, y: 1 }] };
      const baseScale = Scale.getBaseScale(props, "x");
      expect(baseScale).to.be.a.function;
      expect(baseScale.domain).to.be.a.function;
    });

    it("returns a default scale when nothing is provided", () => {
      const baseScale = Scale.getBaseScale({}, "x");
      expect(baseScale).to.be.a.function;
      expect(baseScale.domain).to.be.a.function;
    });
  });

  describe("getScaleFromProps", () => {
    it("returns a scale when a single scale is provided in props", () => {
      const props = { scale: "log" };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(propsScale).to.be.a.function;
      expect(propsScale.base).to.be.a.function; // This is a unique check for log scales
    });

    it("returns a scale when a scale object contains a scale for an axis", () => {
      const props = { scale: { x: "log" } };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(propsScale).to.be.a.function;
      expect(propsScale.base).to.be.a.function; // This is a unique check for log scales
    });

    it("returns undefined when a scale object does not contain a scale for an axis", () => {
      const props = { scale: { y: "log" } };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(propsScale).to.be.undefined;
    });

    it("returns undefined when an invalid scale is provided in props", () => {
      const props = { scale: "foo" };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(propsScale).to.be.undefined;
    });

    it("returns undefined when no scale prop is provided", () => {
      const propsScale = Scale.getScaleFromProps({}, "x");
      expect(propsScale).to.be.undefined;
    });
  });

  describe("getScaleType", () => {
    it("returns 'log' for log scales", () => {
      const props = { scale: { x: d3Scale.scaleLog() } };
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).to.equal("log");
    });

    it("returns a string value given a string prop", () => {
      const props = { scale: { x: "linear" } };
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).to.equal("linear");
    });

    it("uses data to distinguish between time and linear scales", () => {
      const props = { scale: { x: d3Scale.scaleLinear() } };
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).to.equal("linear");
    });

    it("returns 'linear' when no scale is set", () => {
      const props = {};
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).to.equal("linear");
    });

    it("returns 'time' when no scale is set, and data contains dates", () => {
      const props = { x: "x", y: "y", data: [{ x: new Date("2016-01-13"), y: 1 }] };
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).to.equal("time");
    });
  });
});
