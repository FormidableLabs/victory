import * as React from "react";
import * as d3Array from "victory-vendor/d3-array";
import { PaddingProps } from "../../victory-theme/victory-theme";

// TODO: Move this to ../types.ts
type ForAxes<T> = T | { x?: T; y?: T };
type Tuple<T> = [T, T];
type Axis = "x" | "y";
type ValueOrAxesObject<T> = T | ForAxes<T>;

// TODO: There may be other types of data
type Datum = number | Date;
type Dataset = { x: Datum; y: Datum }[];
type DomainTuple = Tuple<Datum>;

interface DomainProps {
  domain?: ValueOrAxesObject<DomainTuple>;
  maxDomain?: ValueOrAxesObject<number>;
  minDomain?: ValueOrAxesObject<number>;
  domainPadding?: ValueOrAxesObject<number | Tuple<number>>;
  width?: number;
  height?: number;
  padding?: PaddingProps;
  // This should be a flattened list of all chart data.
  // This data should be cleaned and formatted at the top-level
  // before being passed into this component. Previously there
  // was logic for converting this data back from preformatted
  // data, and it would be better to standardize the data format
  // and share the same formatted data between all modules.
  data?: Dataset;
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

function getDomainFromMinMax(min: Datum, max: Datum): Tuple<Datum> {
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
    }, [] as Datum[]);
    if (includeZero && axis === "y") {
      nonNullValues.push(0);
    }
    return nonNullValues;
  }, [data, axis, includeZero]);

  const [min, max] = React.useMemo(() => {
    return d3Array.extent(allValues) as Tuple<number> | Tuple<Date>;
  }, [allValues]);

  const minDomain = React.useMemo(() => {
    return getValueForAxis<number>(props.minDomain, axis) || min;
  }, [props.minDomain, axis, min]);

  const maxDomain = React.useMemo(() => {
    return getValueForAxis(props.maxDomain, axis) || max;
  }, [props.maxDomain, axis, max]);

  const domainFromProps = React.useMemo(() => {
    return getValueForAxis<DomainTuple>(props.domain, axis);
  }, [props.domain, axis]);

  if (isTuple(domainFromProps)) {
    return domainFromProps;
  }

  return getDomainFromMinMax(minDomain, maxDomain);
}
