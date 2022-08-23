import type { Iterable, Record, List, Map } from "./immutable-types";

export const IMMUTABLE_ITERABLE = "@@__IMMUTABLE_ITERABLE__@@";
export const IMMUTABLE_RECORD = "@@__IMMUTABLE_RECORD__@@";
export const IMMUTABLE_LIST = "@@__IMMUTABLE_LIST__@@";
export const IMMUTABLE_MAP = "@@__IMMUTABLE_MAP__@@";

export function isIterable(x): x is Iterable<unknown, unknown> {
  return !!(x && x[IMMUTABLE_ITERABLE]);
}

export function isRecord(x): x is Record<string, unknown> {
  return !!(x && x[IMMUTABLE_RECORD]);
}

export function isImmutable(
  x,
): x is Iterable<unknown, unknown> | Record<string, unknown> {
  return isIterable(x) || isRecord(x);
}

export function isList(x): x is List<unknown> {
  return !!(x && x[IMMUTABLE_LIST]);
}

export function isMap(x): x is Map<unknown, unknown> {
  return !!(x && x[IMMUTABLE_MAP]);
}

export function shallowToJS(x, whitelist?: Record<string, boolean | unknown>) {
  return isIterable(x)
    ? x.reduce(
        (result: any, curr: any, key: any) => {
          if (whitelist && whitelist[key]) {
            curr = shallowToJS(curr);
          }
          result[key] = curr;
          return result;
        },
        isList(x) ? [] : {},
      )
    : x;
}
