import {
  ForAxes,
  AxisType,
  Tuple,
  Datum,
  DatumValue,
} from "../types/prop-types";

export function hasValueForAxis<T = unknown>(
  value: unknown | ForAxes<T>,
  axis: AxisType,
): value is ForAxes<T> {
  if (typeof value === "object" && value !== null) {
    return axis in value;
  }
  return false;
}

export function isTuple<T = unknown>(value: unknown): value is Tuple<T> {
  return Array.isArray(value) && value.length === 2;
}

export function getValueForAxis<T = unknown>(
  value: T | ForAxes<T> | undefined,
  axis: AxisType,
): T | undefined {
  if (hasValueForAxis<T>(value, axis)) {
    return value[axis] as T;
  }
  return value;
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isKeyValueObject(
  datum: Datum,
): datum is { [key: string]: DatumValue } {
  return (
    typeof datum === "object" &&
    !Array.isArray(datum) &&
    !(datum instanceof Date)
  );
}
