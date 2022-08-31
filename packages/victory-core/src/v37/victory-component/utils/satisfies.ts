/**
 * Similar to TypeScript's proposed `satisfies` operator.
 *
 * Allows you to specify that a value satisfies a wider type, but keeps its narrow type.
 *
 * @example
 *
 * const value = satisfies<Record<string, number>>()({
 *   one: 1,
 *   two: 2,
 * })
 * // value is { one: number, two: number }, not Record<string, number>
 *
 */
export const satisfies =
  <TConstraint>() =>
  <TActual extends TConstraint>(actual: TActual) =>
    actual;
