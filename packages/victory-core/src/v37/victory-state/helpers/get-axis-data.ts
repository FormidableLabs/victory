import { AxisType, Datum, DomainValue } from "../../../types/prop-types";
import { isKeyValueObject } from "../../../victory-util/type-helpers";

export function getAxisData(data: Datum[], axis: AxisType) {
  return data.reduce((acc, datum) => {
    if (isKeyValueObject(datum)) {
      const value = datum[axis];
      if (value && typeof value !== "string") {
        acc.push(value);
      }
    }
    return acc;
  }, [] as DomainValue[]);
}
