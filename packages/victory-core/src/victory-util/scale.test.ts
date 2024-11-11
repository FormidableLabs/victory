import * as d3Scale from "victory-vendor/d3-scale";

import * as Scale from "./scale";

describe("victory-util/scale", () => {
  describe("getBaseScale", () => {
    it("returns a scale from `getScaleFromProps` when string props are provided", () => {
      const props = { scale: "log" };
      const baseScale = Scale.getBaseScale(props, "x");
      expect(baseScale).toBeInstanceOf(Function);
      expect(baseScale.base).toBeInstanceOf(Function);
    });

    it("returns a scale from `getScaleFromProps` when a d3 scale is provided", () => {
      const props = { scale: d3Scale.scaleLog() };
      const baseScale = Scale.getBaseScale(props, "x");
      expect(baseScale).toBeInstanceOf(Function);
      expect(baseScale.base).toBeInstanceOf(Function);
    });

    it("returns a default scale when data is provided", () => {
      const props = { data: [{ x: 0, y: 1 }] };
      const baseScale = Scale.getBaseScale(props, "x");
      expect(baseScale).toBeInstanceOf(Function);
      expect(baseScale.domain).toBeInstanceOf(Function);
    });

    it("returns a default scale when nothing is provided", () => {
      const baseScale = Scale.getBaseScale({}, "x");
      expect(baseScale).toBeInstanceOf(Function);
      expect(baseScale.domain).toBeInstanceOf(Function);
    });
  });

  describe("getScaleFromProps", () => {
    it("returns a scale when a single scale is provided in props", () => {
      const props = { scale: "log" };
      const propsScale = Scale.getScaleFromProps(props, "x")!;
      expect(propsScale).toBeInstanceOf(Function);
      expect(propsScale.base).toBeInstanceOf(Function);
    });

    it("returns a scale when a scale object contains a scale for an axis", () => {
      const props = { scale: { x: "log" } };
      const propsScale = Scale.getScaleFromProps(props, "x")!;
      expect(propsScale).toBeInstanceOf(Function);
      expect(propsScale.base).toBeInstanceOf(Function);
    });

    it("returns undefined when a scale object does not contain a scale for an axis", () => {
      const props = { scale: { y: "log" } };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(propsScale).toBeUndefined();
    });

    it("returns undefined when an invalid scale is provided in props", () => {
      const props = { scale: "foo" };
      const propsScale = Scale.getScaleFromProps(props, "x");
      expect(propsScale).toBeUndefined();
    });

    it("returns undefined when no scale prop is provided", () => {
      const propsScale = Scale.getScaleFromProps({}, "x");
      expect(propsScale).toBeUndefined();
    });
  });

  describe("getScaleType", () => {
    it("returns 'log' for log scales", () => {
      const props = { scale: { x: d3Scale.scaleLog() } };
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).toEqual("log");
    });

    it("returns a string value given a string prop", () => {
      const props = { scale: { x: "linear" } };
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).toEqual("linear");
    });

    it("uses data to distinguish between time and linear scales", () => {
      const props = { scale: { x: d3Scale.scaleLinear() } };
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).toEqual("linear");
    });

    it("returns 'linear' when no scale is set", () => {
      const props = {};
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).toEqual("linear");
    });

    it("returns 'time' when no scale is set, and data contains dates", () => {
      const props = {
        x: "x",
        y: "y",
        data: [{ x: new Date("2016-01-13"), y: 1 }],
      };
      const scaleType = Scale.getScaleType(props, "x");
      expect(scaleType).toEqual("time");
    });
  });

  describe("getType", () => {
    it("returns undefined on unknown function type", () => {
      // TODO: For some reason this test file doesn't respect the eslint override for this rule.

      const scaleType = Scale.getType(() => {});
      expect(scaleType).toBeUndefined();
    });

    it("returns a string value given a string prop", () => {
      const scaleType = Scale.getType("linear");
      expect(scaleType).toEqual("linear");
    });

    it("returns 'log' for log scales", () => {
      const scaleType = Scale.getType(d3Scale.scaleLog());
      expect(scaleType).toEqual("log");
    });

    it("matches 'quantile'", () => {
      const scaleType = Scale.getType(d3Scale.scaleQuantile());
      expect(scaleType).toEqual("quantile");
    });

    it("returns undefined for scaleLinear", () => {
      const scaleType = Scale.getType(d3Scale.scaleLinear());
      expect(scaleType).toBeUndefined();
    });
  });
});
