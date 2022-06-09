import * as d3Array from "victory-vendor/d3-array";
import { Axis, Tuple, ValueOrAxes } from "../../types";
import { PaddingProps } from "../../victory-theme/victory-theme";
import { getValueForAxis, isTuple } from "../type-helpers";
import { DomainTuple, DomainValue } from "../types";
import { useAxisData } from "./use-axis-data";

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
  const domainFromProps = getValueForAxis<DomainTuple>(props.domain, axis);
  const axisData = useAxisData(data, axis);

  if (includeZero && axis === "y") {
    axisData.push(0);
  }

  if (isTuple(domainFromProps)) {
    return domainFromProps;
  }

  const [min, max] = d3Array.extent(axisData) as Tuple<number> | Tuple<Date>;
  const minDomain = getValueForAxis<number>(props.minDomain, axis) || min;
  const maxDomain = getValueForAxis<number>(props.maxDomain, axis) || max;

  return getDomainFromMinMax(minDomain, maxDomain);
}
