import * as React from "react";
import * as d3Scale from "victory-vendor/d3-scale";
import { Axis } from "../types";
import * as Collection from "../victory-util/collection";
import { getValueForAxis, isFunction } from "../victory-util/type-helpers";
import { D3Scale, ScalePropType } from "../victory-util/types";
import { VictoryProviderProps } from "./types";
import { useAxisData } from "./use-axis-data";

type Scale = ScalePropType | D3Scale;

type ScaleProps = Pick<VictoryProviderProps, "data" | "scale">;

const DEFAULT_SCALE: D3Scale = d3Scale.scaleLinear;

function isD3Scale(scale?: Scale): scale is D3Scale {
  return (
    isFunction(scale) &&
    // @ts-expect-error fix scale type
    isFunction(scale().copy) &&
    // @ts-expect-error fix scale type
    isFunction(scale().domain) &&
    // @ts-expect-error fix scale type
    isFunction(scale().range)
  );
}

function getD3ScaleFromString(scale: ScalePropType): D3Scale {
  switch (scale) {
    case "linear":
      return d3Scale.scaleLinear;
    case "time":
      return d3Scale.scaleTime;
    case "log":
      return d3Scale.scaleLog;
    case "sqrt":
      return d3Scale.scaleSqrt;
    default:
      return DEFAULT_SCALE;
  }
}

export function useScale(
  { data = [], scale }: ScaleProps,
  axis: Axis
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
    return d3Scale.scaleTime;
  }

  return DEFAULT_SCALE;
}
