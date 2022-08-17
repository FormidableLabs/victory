import * as d3Scale from "victory-vendor/d3-scale";
import { getScale } from "./get-scale";

describe("getScale", () => {
  it("gets the d3 scale from props", () => {
    expect(getScale({ scale: d3Scale.scaleLog }, "x")).toEqual(
      d3Scale.scaleLog,
    );
  });

  it("gets the d3 scale from props for an axis", () => {
    expect(getScale({ scale: { x: d3Scale.scaleLog } }, "x")).toEqual(
      d3Scale.scaleLog,
    );
  });

  it("returns a default scale when data is provided", () => {
    const props = {
      data: [{ x: 0, y: 1 }],
    };
    const scale = getScale(props, "x");
    expect(scale).toBeInstanceOf(Function);
    // Scale should be d3Scale.scaleLinear
    expect(scale().domain()).toEqual(d3Scale.scaleLinear().domain());
    expect(scale().range()).toEqual(d3Scale.scaleLinear().range());
  });

  it("returns a default scale when nothing is provided", () => {
    const scale = getScale({}, "x");
    expect(scale).toBeInstanceOf(Function);
    // Scale should be d3Scale.scaleLinear
    expect(scale().domain()).toEqual(d3Scale.scaleLinear().domain());
    expect(scale().range()).toEqual(d3Scale.scaleLinear().range());
  });

  it("returns a scale when a single scale string is provided in props", () => {
    const scale = getScale({ scale: "log" }, "x");
    expect(scale).toBeInstanceOf(Function);
    // Scale should be d3Scale.scaleLog
    expect(scale().domain()).toEqual(d3Scale.scaleLog().domain());
    expect(scale().range()).toEqual(d3Scale.scaleLog().range());
  });

  it("returns a scale when a scale string is provided in props for an axis", () => {
    const scale = getScale({ scale: { x: "log" } }, "x");
    expect(scale).toBeInstanceOf(Function);
    // Scale should be d3Scale.scaleLog
    expect(scale().domain()).toEqual(d3Scale.scaleLog().domain());
    expect(scale().range()).toEqual(d3Scale.scaleLog().range());
  });

  it("returns a time scale when data contains dates", () => {
    const props = {
      data: [{ x: new Date("2016-01-13"), y: 1 }],
    };
    const scale = getScale(props, "x");
    expect(scale).toBeInstanceOf(Function);
    expect(scale().domain()).toEqual(d3Scale.scaleTime().domain());
    expect(scale().range()).toEqual(d3Scale.scaleTime().range());
  });
});
