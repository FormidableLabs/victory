/* eslint-disable func-style */
export const IMMUTABLE_ITERABLE = "@@__IMMUTABLE_ITERABLE__@@";
export const IMMUTABLE_RECORD = "@@__IMMUTABLE_RECORD__@@";
export const IMMUTABLE_LIST = "@@__IMMUTABLE_LIST__@@";
export const IMMUTABLE_MAP = "@@__IMMUTABLE_MAP__@@";

export function isIterable(x) {
  return !!(x && x[IMMUTABLE_ITERABLE]);
}

export function isRecord(x) {
  return !!(x && x[IMMUTABLE_RECORD]);
}

export function isImmutable(x) {
  return isIterable(x) || isRecord(x);
}

export function isList(x) {
  return !!(x && x[IMMUTABLE_LIST]);
}

export function isMap(x) {
  return !!(x && x[IMMUTABLE_MAP]);
}

export function shallowToJS(x, whitelist) {
  return isIterable(x)
    ? x.reduce(
        (prev, curr, key) => {
          if (whitelist && whitelist[key]) {
            curr = shallowToJS(curr);
          }
          prev[key] = curr;
          return prev;
        },
        isList(x) ? [] : {}
      )
    : x;
}
