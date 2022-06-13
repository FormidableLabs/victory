import { orderBy } from "lodash";
import * as React from "react";
import { Datum, DatumValue } from "../types/prop-types";
import { VictoryProviderProps } from "./types";

type DataProps = Pick<
  VictoryProviderProps,
  "data" | "x" | "y" | "sortKey" | "sortOrder" | "samples"
>;

export interface FormattedDatum extends Datum {
  x: number;
  y: number;
  _x: number;
  _y: number;
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
  x: xAccessor = "x",
  y: yAccessor = "y",
  sortKey,
  sortOrder = "ascending",
  ...props
}: DataProps) {
  const data = React.useMemo<Datum[]>(() => {
    if (props.data) {
      return props.data;
    }
    return [];
  }, [props.data]);

  const formattedData = React.useMemo<FormattedDatum[]>(() => {
    return data.map((datum, index) => {
      const x = getValue(datum, xAccessor) as number;
      const y = getValue(datum, yAccessor) as number;
      const _x = getNumericValue(x, index + 1) as number;
      const _y = getNumericValue(y, index + 1) as number;
      // TODO: Get this value if it is different
      const xName = typeof x === "string" ? x : undefined;
      const yName = typeof y === "string" ? y : undefined;
      return {
        x,
        y,
        _x,
        _y,
        ...(xName ? { xName } : {}),
        ...(yName ? { yName } : {}),
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
