import { get, isNil, orderBy } from "lodash";
import { Datum, DatumValue } from "../../../types/prop-types";
import { isKeyValueObject } from "../../../victory-util/type-helpers";
import { VictoryProviderProps } from "../types";

type DataProps = Pick<
  VictoryProviderProps,
  "data" | "x" | "y" | "sortKey" | "sortOrder" | "samples"
>;

export interface FormattedDatum {
  x: DatumValue;
  y: DatumValue;
  _x: number | Date;
  _y: number | Date;
  xName?: string;
  yName?: string;
  [key: string]: DatumValue;
}

function getValue(datum: Datum, key: string): DatumValue {
  if (typeof datum === "object") {
    return get(datum, key);
  }
  return datum;
}

function getNumericValue(value: DatumValue, fallback: number): number | Date {
  if (typeof value === "number" || value instanceof Date) {
    return value;
  }
  return fallback;
}

export function getData({
  x: xAccessor = "x",
  y: yAccessor = "y",
  sortKey,
  sortOrder = "ascending",
  data = [],
}: DataProps = {}): FormattedDatum[] {
  const formattedData = data.reduce((nonNullData, datum, index) => {
    const x = getValue(datum, xAccessor);
    const y = getValue(datum, yAccessor);
    if (isNil(x) || isNil(y)) {
      return nonNullData;
    }
    const _x = getNumericValue(x, index + 1);
    const _y = getNumericValue(y, index + 1);

    // TODO: Get this value if it is different
    const xName = typeof x === "string" ? x : undefined;
    const yName = typeof y === "string" ? y : undefined;

    const additionalProperties = isKeyValueObject(datum) ? datum : {};

    return [
      ...nonNullData,
      {
        x,
        y,
        _x,
        _y,
        // Only set these properties if they exist
        ...(xName ? { xName } : {}),
        ...(yName ? { yName } : {}),
        ...additionalProperties,
      },
    ];
  }, [] as FormattedDatum[]);

  if (sortKey) {
    const order = sortOrder === "descending" ? "desc" : "asc";
    return orderBy(formattedData, sortKey, order);
  }

  return formattedData;
}
