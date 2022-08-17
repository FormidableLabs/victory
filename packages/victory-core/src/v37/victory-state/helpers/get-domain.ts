import * as d3Array from "victory-vendor/d3-array";
import { getAxisData } from "./get-axis-data";
import {
  getValueForAxis,
  isDate,
  isTuple,
} from "../../../victory-util/type-helpers";
import { VictoryProviderProps } from "../types";
import {
  Tuple,
  AxisType,
  DomainTuple,
  DomainValue,
} from "../../../types/prop-types";

type DomainProps = Pick<
  VictoryProviderProps,
  "data" | "domain" | "maxDomain" | "minDomain" | "includeZero"
>;

// TODO: What should this default value be?
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1;

function getDomainFromMinMax(
  min: number = DEFAULT_MIN,
  max: number = DEFAULT_MAX,
): Tuple<number> {
  // TODO: Victoy currently has some really specific logic in getDomainFromMinMax
  // that adds or subtracts a very small number from each domain to avoid the min
  // and max being the same value. This has resulted in some weird behavior in the
  // past, so we should revisit this.
  return [min, max];
}

export function getDomain(
  { data = [], includeZero, ...props }: DomainProps,
  axis: AxisType,
): DomainTuple {
  const domainFromProps = getValueForAxis<DomainTuple>(props.domain, axis);
  const axisData = getAxisData(data, axis);

  if (includeZero && axis === "y") {
    axisData.push(0);
  }

  if (isTuple(domainFromProps)) {
    return domainFromProps;
  }

  const [min, max] = d3Array.extent(axisData) as DomainTuple | Tuple<undefined>;

  const minDomain = getValueForAxis<DomainValue>(props.minDomain, axis) || min;
  const maxDomain = getValueForAxis<DomainValue>(props.maxDomain, axis) || max;

  if (isDate(minDomain) && isDate(maxDomain)) {
    return [min, max] as Tuple<Date>;
  }

  // TODO: There might be an edge case here where we have mixed types
  return getDomainFromMinMax(minDomain as number, maxDomain as number);
}
