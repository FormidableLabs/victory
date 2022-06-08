import { Hooks } from "victory-core";
import { renderHook } from "@testing-library/react-hooks";
import * as d3Scale from "victory-vendor/d3-scale";

describe("useScale", () => {
  it("gets the d3 scale from props", () => {
    const props = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      scale: d3Scale.scaleLog()
    };
    const { result } = renderHook(() => Hooks.useScale(props, "x"));
    expect(result.current).toEqual(props.scale);
  });

  it("gets the d3 scale from props for an axis", () => {
    const props = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      scale: { x: d3Scale.scaleLog() }
    };
    const { result } = renderHook(() => Hooks.useScale(props, "x"));
    expect(result.current).toEqual(props.scale.x);
  });

  it("returns a default scale when data is provided", () => {
    const props = {
      data: [{ x: 0, y: 1 }]
    };
    const { result } = renderHook(() => Hooks.useScale(props, "x"));
    expect(result.current).toBeInstanceOf(Function);
    expect(result.current.domain()).toEqual(d3Scale.scaleLinear().domain());
    expect(result.current.range()).toEqual(d3Scale.scaleLinear().range());
  });

  it("returns a default scale when nothing is provided", () => {
    const { result } = renderHook(() => Hooks.useScale({}, "x"));
    expect(result.current).toBeInstanceOf(Function);
    expect(result.current.domain()).toEqual(d3Scale.scaleLinear().domain());
    expect(result.current.range()).toEqual(d3Scale.scaleLinear().range());
  });

  it("returns a scale when a single scale string is provided in props", () => {
    const props = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      scale: "log"
    };
    const { result } = renderHook(() => Hooks.useScale(props, "x"));
    expect(result.current).toBeInstanceOf(Function);
    // Scale should be d3Scale.scaleLog
    expect(result.current.domain()).toEqual(d3Scale.scaleLog().domain());
    expect(result.current.range()).toEqual(d3Scale.scaleLog().range());
  });

  it("returns a scale when a scale string is provided in props for an axis", () => {
    const props = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      scale: { x: "log" }
    };
    const { result } = renderHook(() => Hooks.useScale(props, "x"));
    expect(result.current).toBeInstanceOf(Function);
    // Scale should be d3Scale.scaleLog
    expect(result.current.domain()).toEqual(d3Scale.scaleLog().domain());
    expect(result.current.range()).toEqual(d3Scale.scaleLog().range());
  });

  it("returns a time scale when data contains dates", () => {
    const props = {
      data: [{ x: new Date("2016-01-13"), y: 1 }]
    };
    const { result } = renderHook(() => Hooks.useScale(props, "x"));
    expect(result.current).toBeInstanceOf(Function);
    expect(result.current.domain()).toEqual(d3Scale.scaleTime().domain());
    expect(result.current.range()).toEqual(d3Scale.scaleTime().range());
  });
});
