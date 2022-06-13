import * as React from "react";
import {
  scaleLinear,
  scaleTime,
  scaleLog,
  scaleSqrt
} from "victory-vendor/d3-scale";
import { AxisType, D3Scale, ScalePropType } from "../types/prop-types";
import * as Collection from "../victory-util/collection";
import { getValueForAxis, isFunction } from "../victory-util/type-helpers";
import { VictoryProviderProps } from "./types";
import { useAxisData } from "./use-axis-data";

type Scale = ScalePropType | D3Scale;

type ScaleProps = Pick<VictoryProviderProps, "data" | "scale">;

const DEFAULT_SCALE = scaleLinear;

function isD3Scale(scale?: Scale): scale is D3Scale {
  return (
    isFunction(scale) &&
    // @ts-expect-error TODO: fix d3 scale definition
    isFunction(scale().copy) &&
    // @ts-expect-error TODO: fix d3 scale definition
    isFunction(scale().domain) &&
    // @ts-expect-error TODO: fix d3 scale definition
    isFunction(scale().range)
  );
}

function getD3ScaleFromString(scale: ScalePropType): D3Scale {
  switch (scale) {
    case "linear":
      // @ts-expect-error TODO: fix d3 scale definition
      return scaleLinear;
    case "time":
      // @ts-expect-error TODO: fix d3 scale definition
      return scaleTime;
    case "log":
      // @ts-expect-error TODO: fix d3 scale definition
      return scaleLog;
    case "sqrt":
      // @ts-expect-error TODO: fix d3 scale definition
      return scaleSqrt;
    default:
      // @ts-expect-error TODO: fix d3 scale definition
      return DEFAULT_SCALE;
  }
}

export function useScale(
  { data = [], scale }: ScaleProps,
  axis: AxisType
): D3Scale {
  const axisData = useAxisData(data, axis);

  const scaleFromProps = React.useMemo(() => {
    return getValueForAxis<Scale>(scale, axis);
  }, [scale, axis]);

  if (isD3Scale(scaleFromProps)) {
    return scaleFromProps;
  }

  if (typeof scaleFromProps === "string") {
    return getD3ScaleFromString(scaleFromProps);
  }

  if (Collection.containsDates(axisData)) {
    // @ts-expect-error TODO: fix d3 scale definition
    return scaleTime;
  }

  // @ts-expect-error TODO: fix d3 scale definition
  return DEFAULT_SCALE;
}
