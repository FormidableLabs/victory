import {
  scaleLinear,
  scaleTime,
  scaleLog,
  scaleSqrt,
} from "victory-vendor/d3-scale";
import { AxisType, D3ScaleFn, ScalePropType } from "../../../types/prop-types";
import * as Collection from "../../../victory-util/collection";
import {
  getValueForAxis,
  isFunction,
} from "../../../victory-util/type-helpers";
import { VictoryProviderProps } from "../types";
import { getAxisData } from "./get-axis-data";

type Scale = ScalePropType | D3ScaleFn;

type ScaleProps = Pick<VictoryProviderProps, "data" | "scale">;

const DEFAULT_SCALE = scaleLinear;

function isD3Scale(scale?: unknown): scale is D3ScaleFn {
  return (
    isFunction(scale) &&
    isFunction(scale().copy) &&
    isFunction(scale().domain) &&
    isFunction(scale().range)
  );
}

function getD3ScaleFromString(scale: ScalePropType): D3ScaleFn {
  switch (scale) {
    case "linear":
      return scaleLinear;
    case "time":
      return scaleTime;
    case "log":
      return scaleLog;
    case "sqrt":
      return scaleSqrt;
    default:
      return DEFAULT_SCALE;
  }
}

export function getScale(
  { data = [], ...props }: ScaleProps,
  axis: AxisType,
): D3ScaleFn {
  const scale = getValueForAxis<Scale>(props.scale, axis);

  if (isD3Scale(scale)) {
    return scale;
  }

  if (typeof scale === "string") {
    return getD3ScaleFromString(scale);
  }

  const axisData = getAxisData(data, axis);

  if (Collection.containsDates(axisData)) {
    return scaleTime;
  }

  return DEFAULT_SCALE;
}
