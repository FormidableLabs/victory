import * as React from "react";
import { Axis } from "../../types";
import { DomainValue } from "../types";

export function useAxisData(
  data: { x: DomainValue; y: DomainValue }[],
  axis: Axis
) {
  const axisData = React.useMemo(() => {
    const nonNullValues = data.reduce((acc, datum) => {
      const value = datum[axis];
      if (value) {
        acc.push(value);
      }
      return acc;
    }, [] as DomainValue[]);
    return nonNullValues;
  }, [data, axis]);
  return axisData;
}
