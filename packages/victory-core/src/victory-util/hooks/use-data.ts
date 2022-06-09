import { orderBy } from "lodash";
import * as React from "react";
import { Datum, DatumValue } from "../../types";

interface DataProps {
  data?: Datum[];
  x?: string;
  y?: string;
  sortKey?: string;
  sortOrder?: "ascending" | "descending";
}

interface FormattedDatum extends Datum {
  x: DatumValue;
  y: DatumValue;
  _x: number | Date;
  _y: number | Date;
  xName?: string;
  yName?: string;
}

function getValue(datum: Datum, key: keyof Datum) {
  return datum[key];
}

function getNumericValue(value: DatumValue, fallback: number): number | Date {
  if (typeof value === "number" || value instanceof Date) {
    return value;
  }
  return fallback;
}

export function useData({
  data = [],
  x: xAccessor = "x",
  y: yAccessor = "y",
  sortKey,
  sortOrder = "ascending"
}: DataProps) {
  const formattedData = React.useMemo<FormattedDatum[]>(() => {
    return data.map((datum, index) => {
      const x = getValue(datum, xAccessor);
      const y = getValue(datum, yAccessor);
      const _x = getNumericValue(x, index + 1);
      const _y = getNumericValue(y, index + 1);
      const xName = typeof x === "string" ? x : undefined;
      const yName = typeof y === "string" ? y : undefined;
      return {
        x,
        y,
        _x,
        _y,
        ...(xName && { xName }),
        ...(yName && { yName }),
        ...datum
      };
    });
  }, [data, xAccessor, yAccessor]);

  if (sortKey) {
    const order = sortOrder === "descending" ? "desc" : "asc";
    return orderBy(formattedData, sortKey, order);
  }

  return formattedData;
}
