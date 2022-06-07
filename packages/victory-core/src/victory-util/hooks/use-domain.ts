import * as React from "react";
import * as d3Array from "victory-vendor/d3-array";
import { Axis, ForAxes, Tuple, ValueOrAxes } from "../../types";
import { PaddingProps } from "../../victory-theme/victory-theme";
import { DomainTuple, DomainValue } from "../types";

interface DomainProps {
  domain?: ValueOrAxes<DomainTuple>;
  maxDomain?: ValueOrAxes<number>;
  minDomain?: ValueOrAxes<number>;
  domainPadding?: ValueOrAxes<number | Tuple<number>>;
  width?: number;
  height?: number;
  padding?: PaddingProps;
  // This should be a flattened list of all chart data.
  // This data should be cleaned and formatted at the top-level
  // before being passed into this component. Previously there
  // was logic for converting this data back from preformatted
  // data, and it would be better to standardize the data format
  // and share the same formatted data between all modules.
  data?: { x: DomainValue; y: DomainValue }[];
}

function hasValueForAxis<T = unknown>(
  value: unknown | ForAxes<T>,
  axis: Axis
): value is ForAxes<T> {
  if (typeof value === "object" && value !== null) {
    return axis in value;
  }
  return false;
}

function isTuple<T = unknown>(value: unknown): value is Tuple<T> {
  return Array.isArray(value) && value.length === 2;
}

function getValueForAxis<T = unknown>(
  value: T | ForAxes<T> | undefined,
  axis: Axis
): T | undefined {
  if (hasValueForAxis<T>(value, axis)) {
    return value[axis] as T;
  }
  return value;
}

function getDomainFromMinMax(
  min: DomainValue,
  max: DomainValue
): Tuple<DomainValue> {
  // TODO: Victoy currently has some really specific logic in getDomainFromMinMax
  // that adds or subtracts a very small number from each domain to avoid the min
  // and max being the same value. This has resulted in some weird behavior in the
  // past, so we should revisit this.
  return [min, max];
}

export function useDomain(
  { data = [], ...props }: DomainProps,
  axis: Axis,
  includeZero = false
): DomainTuple {
  const allValues = React.useMemo(() => {
    const nonNullValues = data.reduce((acc, datum) => {
      const value = datum[axis];
      if (value) {
        acc.push(value);
      }
      return acc;
    }, [] as DomainValue[]);
    if (includeZero && axis === "y") {
      nonNullValues.push(0);
    }
    return nonNullValues;
  }, [data, axis, includeZero]);

  const [min, max] = React.useMemo(() => {
    // TODO: Get typings for d3Array
    return d3Array.extent(allValues) as Tuple<number> | Tuple<Date>;
  }, [allValues]);

  const minDomain = React.useMemo(() => {
    return getValueForAxis<number>(props.minDomain, axis) || min;
  }, [props.minDomain, axis, min]);

  const maxDomain = React.useMemo(() => {
    return getValueForAxis<number>(props.maxDomain, axis) || max;
  }, [props.maxDomain, axis, max]);

  const domainFromProps = React.useMemo(() => {
    return getValueForAxis<DomainTuple>(props.domain, axis);
  }, [props.domain, axis]);

  if (isTuple(domainFromProps)) {
    return domainFromProps;
  }

  return getDomainFromMinMax(minDomain, maxDomain);
}
