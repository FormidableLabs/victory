import { ForAxes, Axis, Tuple } from "../types";

export function hasValueForAxis<T = unknown>(
  value: unknown | ForAxes<T>,
  axis: Axis
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
  axis: Axis
): T | undefined {
  if (hasValueForAxis<T>(value, axis)) {
    return value[axis] as T;
  }
  return value;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T = Function>(func?: unknown): func is T {
  return typeof func === "function";
}
