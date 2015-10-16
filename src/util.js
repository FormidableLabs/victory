import d3 from "d3";

let interpolatorAdded = false;

/**
 * By default, `d3.interpolate` (which cycles through a list of interpolators)
 * has a few downsides:
 *
 * - `null` values get turned into 0.
 * - `undefined`, `function`, and some other value types get turned into NaN.
 * - It tries to interpolate between identical start->end values, doing
 *   unnecessary calculations that sometimes result in floating point rounding
 *   errors.
 *
 * If only the default interpolators are used, `VictoryAnimation` will happily
 * pass down NaN (and other bad) values as props to the wrapped component.
 * The component will then either use the incorrect values or complain that it
 * was passed props of the incorrect type. This custom interpolator is added
 * using the `d3.interpolators` API, and prevents such cases from happening
 * for most values.
 *
 * @param {any} a - Start value.
 * @param {any} b - End value.
 * @returns {Function} Returns an interpolation function, if possible.
 */
export const victoryInterpolator = function (a, b) {
  // If the values are strictly equal, or either value is null or undefined,
  // just use the start value `a` or end value `b` at every step, as there is
  // no reasonable in-between value. The value will jump, but we can try to
  // jump at a good time (like the halfway point).
  if (a === b || a == null || b == null) {
    return function (t) {
      // Switch to `b` halfway through the interpolation.
      return (t < 0.5) ? a : b;
    };
  }
  if (typeof a === "function" || typeof b === "function") {
    return function (t) {
      // We're interpolating to or from a function. The interpolated value will
      // be a function that calls `a` (if it's a function) and `b` (if it's a
      // function) and calls `d3.interpolate` on the resulting values.
      // Note that our function won't necessarily be called (that's up to the
      // component) - but if it does get called, it will return an
      // appropriately interpolated value.
      return function () {
        const aval = (typeof a === "function") ? a.apply(this, arguments) : a;
        const bval = (typeof b === "function") ? b.apply(this, arguments) : b;
        return d3.interpolate(aval, bval)(t);
      };
    };
  }
};

export const addVictoryInterpolator = function () {
  if (!interpolatorAdded) {
    d3.interpolators.push(victoryInterpolator);
    interpolatorAdded = true;
  }
};
