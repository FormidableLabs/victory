import { renderHook } from "@testing-library/react-hooks";
import { useScale } from "victory-core";
import * as d3Scale from "victory-vendor/d3-scale";

describe("useScale", () => {
  it("gets the d3 scale from props", () => {
    const { result } = renderHook(() =>
      useScale({ scale: d3Scale.scaleLog }, "x")
    );
    expect(result.current).toEqual(d3Scale.scaleLog);
  });

  it("gets the d3 scale from props for an axis", () => {
    const { result } = renderHook(() =>
      useScale({ scale: { x: d3Scale.scaleLog } }, "x")
    );
    expect(result.current).toEqual(d3Scale.scaleLog);
  });

  it("returns a default scale when data is provided", () => {
    const props = {
      data: [{ x: 0, y: 1 }]
    };
    const { result } = renderHook(() => useScale(props, "x"));
    expect(result.current).toBeInstanceOf(Function);
    expect(result.current().domain()).toEqual(d3Scale.scaleLinear().domain());
    expect(result.current().range()).toEqual(d3Scale.scaleLinear().range());
  });

  it("returns a default scale when nothing is provided", () => {
    const { result } = renderHook(() => useScale({}, "x"));
    expect(result.current).toBeInstanceOf(Function);
    expect(result.current().domain()).toEqual(d3Scale.scaleLinear().domain());
    expect(result.current().range()).toEqual(d3Scale.scaleLinear().range());
  });

  it("returns a scale when a single scale string is provided in props", () => {
    const { result } = renderHook(() => useScale({ scale: "log" }, "x"));
    expect(result.current).toBeInstanceOf(Function);
    // Scale should be d3Scale.scaleLog
    expect(result.current().domain()).toEqual(d3Scale.scaleLog().domain());
    expect(result.current().range()).toEqual(d3Scale.scaleLog().range());
  });

  it("returns a scale when a scale string is provided in props for an axis", () => {
    const { result } = renderHook(() => useScale({ scale: { x: "log" } }, "x"));
    expect(result.current).toBeInstanceOf(Function);
    // Scale should be d3Scale.scaleLog
    expect(result.current().domain()).toEqual(d3Scale.scaleLog().domain());
    expect(result.current().range()).toEqual(d3Scale.scaleLog().range());
  });

  it("returns a time scale when data contains dates", () => {
    const props = {
      data: [{ x: new Date("2016-01-13"), y: 1 }]
    };
    const { result } = renderHook(() => useScale(props, "x"));
    expect(result.current).toBeInstanceOf(Function);
    expect(result.current().domain()).toEqual(d3Scale.scaleTime().domain());
    expect(result.current().range()).toEqual(d3Scale.scaleTime().range());
  });
});
