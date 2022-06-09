import * as React from "react";
import { AxisType, Datum, DomainValue } from "../types/prop-types";

export function useAxisData(data: Datum[], axis: AxisType) {
  const axisData = React.useMemo(() => {
    const nonNullValues = data.reduce((acc, datum) => {
      const value = datum[axis];
      if (value && typeof value !== "string") {
        acc.push(value);
      }
      return acc;
    }, [] as DomainValue[]);
    return nonNullValues;
  }, [data, axis]);
  return axisData;
}
