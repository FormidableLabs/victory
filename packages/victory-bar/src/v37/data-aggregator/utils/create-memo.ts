import memoize from "memoize-weak";

/**
 * The returned `memo` function can be used to memoize other functions.
 *
 * @example
 * const tuple = (a, b) => [a, b];
 *
 * // Normally, the results are calculated twice:
 * tuple(1, 2) !== tuple(1, 2);
 *
 * // But if we memoize the method, the results are only calculated once:
 * memo(tuple)(1, 2) === memo(tuple)(1, 2)
 */
export function createMemo() {
  const map = new WeakMap();
  return function memo<TCallback extends object>(
    callback: TCallback,
  ): TCallback {
    let memoized: TCallback = map.get(callback);
    if (!memoized) {
      memoized = memoize(callback);
      map.set(callback, memoized);
    }
    return memoized;
  };
}
