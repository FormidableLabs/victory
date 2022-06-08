import * as React from "react";
import { Axis, ValueOrAxes } from "../../types";
import { getValueForAxis, isFunction } from "../type-helpers";
import { ScalePropType, D3Scale, DomainValue } from "../types";
import * as d3Scale from "victory-vendor/d3-scale";
import * as Collection from "../collection";
import { useAxisData } from "./use-axis-data";

type Scale = ScalePropType | D3Scale;

interface ScaleProps {
  scale?: ValueOrAxes<ScalePropType | D3Scale>;
  data?: { x: DomainValue; y: DomainValue }[];
}

const DEFAULT_SCALE: D3Scale = d3Scale.scaleLinear();

function isD3Scale(scale?: Scale) {
  return (
    isFunction(scale) &&
    isFunction(scale.copy) &&
    isFunction(scale.domain) &&
    isFunction(scale.range)
  );
}

function getD3ScaleFromString(scale: ScalePropType): D3Scale {
  switch (scale) {
    case "linear":
      return d3Scale.scaleLinear();
    case "time":
      return d3Scale.scaleTime();
    case "log":
      return d3Scale.scaleLog();
    case "sqrt":
      return d3Scale.scaleSqrt();
    default:
      return DEFAULT_SCALE;
  }
}

export function useScale({ data = [], scale }: ScaleProps, axis: Axis) {
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
    return d3Scale.scaleTime();
  }

  return DEFAULT_SCALE;
}
