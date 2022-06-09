import * as d3Array from "victory-vendor/d3-array";
import { Axis, Tuple } from "../types";
import { useAxisData } from "./use-axis-data";
import { getValueForAxis, isTuple } from "../victory-util/type-helpers";
import { DomainTuple, DomainValue } from "../victory-util/types";
import { VictoryProviderProps } from "./types";

type DomainProps = Pick<
  VictoryProviderProps,
  "data" | "domain" | "maxDomain" | "minDomain" | "padding" | "width" | "height"
>;

// TODO: What should this default value be?
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1;

function getDomainFromMinMax(
  min: DomainValue = DEFAULT_MIN,
  max: DomainValue = DEFAULT_MAX
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

  const [min, max] = d3Array.extent(axisData) as Tuple<DomainValue | undefined>;
  const minDomain = getValueForAxis<DomainValue>(props.minDomain, axis) || min;
  const maxDomain = getValueForAxis<DomainValue>(props.maxDomain, axis) || max;

  return getDomainFromMinMax(minDomain, maxDomain);
}
