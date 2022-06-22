/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  InterpolatorFactory,
  NumberValue,
  ScaleBand,
  ScaleContinuousNumeric,
  ScaleDiverging,
  ScaleIdentity,
  ScaleLinear,
  ScaleLogarithmic,
  ScaleOrdinal,
  ScalePoint,
  ScalePower,
  ScaleQuantile,
  ScaleQuantize,
  ScaleRadial,
  ScaleSequential,
  ScaleSequentialBase,
  ScaleSequentialQuantile,
  ScaleSymLog,
  ScaleThreshold,
  ScaleTime,
  UnknownReturnType,
  scaleBand,
  scaleDiverging,
  scaleDivergingLog,
  scaleDivergingPow,
  scaleDivergingSqrt,
  scaleDivergingSymlog,
  scaleIdentity,
  scaleImplicit,
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  scalePoint,
  scalePow,
  scaleQuantile,
  scaleQuantize,
  scaleRadial,
  scaleSequential,
  scaleSequentialLog,
  scaleSequentialPow,
  scaleSequentialQuantile,
  scaleSequentialSqrt,
  scaleSequentialSymlog,
  scaleSqrt,
  scaleSymlog,
  scaleThreshold,
  scaleTime,
  scaleUtc,
  tickFormat,
} from "victory-vendor/d3-scale";

describe("d3-scale", () => {
  it("exports valid functions", () => {
    expect(scaleLinear).toBeInstanceOf(Function);
    expect(scaleLog).toBeInstanceOf(Function);
    expect(scalePow).toBeInstanceOf(Function);
    expect(scaleSqrt).toBeInstanceOf(Function);
  });
});
