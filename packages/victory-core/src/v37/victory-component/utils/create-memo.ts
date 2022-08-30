import memoize from "memoize-weak";

/**
 * The returned `memo` function can be used to memoize other methods.
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
  type Memoizer = <TMethod>(method: TMethod) => TMethod;
  const memo: Memoizer = memoize((method) => memoize(method));
  return memo;
}
