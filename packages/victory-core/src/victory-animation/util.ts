import { interpolate } from "victory-vendor/d3-interpolate";
import { isPlainObject, orderBy } from "lodash";

export const isInterpolatable = function (obj) {
  // d3 turns null into 0 and undefined into NaN, which we don't want.
  if (obj !== null) {
    switch (typeof obj) {
      case "undefined":
        return false;
      case "number":
        // The standard `isNaN` is fine in this case since we already know the
        // type is number.
        return (
          !isNaN(obj) &&
          obj !== Number.POSITIVE_INFINITY &&
          obj !== Number.NEGATIVE_INFINITY
        );
      case "string":
        // d3 might not *actually* be able to interpolate the string, but it
        // won't cause any issues to let it try.
        return true;
      case "boolean":
        // d3 turns Booleans into integers, which we don't want. Sure, we could
        // interpolate from 0 -> 1, but we'd be sending a non-Boolean to
        // something expecting a Boolean.
        return false;
      case "object":
        // Don't try to interpolate class instances (except Date or Array).
        return obj instanceof Date || Array.isArray(obj) || isPlainObject(obj);
      case "function":
        // Careful! There may be extra properties on function objects that the
        // component expects to access - for instance, it may be a `d3.scale()`
        // function, which has its own methods attached. We don't know if the
        // component is only going to call the function (in which case it's
        // safely interpolatable) or if it's going to access special properties
        // (in which case our function generated from `interpolateFunction` will
        // most likely cause an error). We could check for enumerable properties
        // on the function object here to see if it's a "plain" function, but
        // let's just require that components prevent such function props from
        // being animated in the first place.
        return true;
    }
  }
  return false;
};

/**
 * Interpolate immediately to the end value at the given step `when`.
 * Some nicer default behavior might be to jump at the halfway point or return
 * `a` if `t` is 0 (instead of always returning `b`). But d3's default
 * interpolator does not do these things:
 *
 *   d3.interpolate('aaa', 'bbb')(0) === 'bbb'
 *
 * ...and things might get wonky if we don't replicate that behavior.
 *
 * @param {any} a - Start value.
 * @param {any} b - End value.
 * @param {Number} when - Step value (0 to 1) at which to jump to `b`.
 * @returns {Function} An interpolation function.
 */
export const interpolateImmediate = function (a, b, when = 0) {
  return function (t) {
    return t < when ? a : b;
  };
};

/**
 * Interpolate to or from a function. The interpolated value will be a function
 * that calls `a` (if it's a function) and `b` (if it's a function) and calls
 * `d3.interpolate` on the resulting values. Note that our function won't
 * necessarily be called (that's up to the component this eventually gets
 * passed to) - but if it does get called, it will return an appropriately
 * interpolated value.
 *
 * @param {any} a - Start value.
 * @param {any} b - End value.
 * @returns {Function} An interpolation function.
 */
export const interpolateFunction = function (a, b) {
  return function (t) {
    if (t >= 1) {
      return b;
    }
    return function (this: unknown) {
      /* eslint-disable no-invalid-this, prefer-rest-params */
      const aval = typeof a === "function" ? a.apply(this, arguments) : a;
      const bval = typeof b === "function" ? b.apply(this, arguments) : b;
      return interpolate(aval, bval)(t);
    };
  };
};

/**
 * Interpolate to or from an object. This method is a modification of the object interpolator in
 * d3-interpolate https://github.com/d3/d3-interpolate/blob/master/src/object.js. This interpolator
 * differs in that it uses our custom interpolators when interpolating the value of each property in
 * an object. This allows the correct interpolation of nested objects, including styles
 *
 * @param {any} startValue - Start value.
 * @param {any} endValue - End value.
 * @returns {Function} An interpolation function.
 */
export const interpolateObject = function (startValue, endValue) {
  const interpolateTypes = (x, y) => {
    if (x === y || !isInterpolatable(x) || !isInterpolatable(y)) {
      return interpolateImmediate(x, y);
    }
    if (typeof x === "function" || typeof y === "function") {
      return interpolateFunction(x, y);
    }
    if (
      (typeof x === "object" && isPlainObject(x)) ||
      (typeof y === "object" && isPlainObject(y))
    ) {
      return interpolateObject(x, y);
    }
    return interpolate(x, y);
  };

  // When the value is an array, attempt to sort by "key" so that animating nodes may be identified
  // based on "key" instead of index
  const keyData = (val) => {
    return Array.isArray(val) ? orderBy(val, "key") : val;
  };

  const i = {};
  const c = {};
  let a = startValue;
  let b = endValue;
  let k;

  if (a === null || typeof a !== "object") {
    a = {};
  }
  if (b === null || typeof b !== "object") {
    b = {};
  }

  for (k in b) {
    if (k in a) {
      i[k] = interpolateTypes(keyData(a[k]), keyData(b[k]));
    } else {
      c[k] = b[k];
    }
  }

  return function (t) {
    for (k in i) {
      c[k] = i[k](t);
    }
    return c;
  };
};

export const interpolateString = function (a, b) {
  const format = (val) => {
    return typeof val === "string" ? val.replace(/,/g, "") : val;
  };

  return interpolate(format(a), format(b));
};

/**
 * By default, the list of interpolators used by `d3.interpolate` has a few
 * downsides:
 *
 * - `null` values get turned into 0.
 * - `undefined`, `function`, and some other value types get turned into NaN.
 * - Boolean types get turned into numbers, which probably will be meaningless
 *   to whatever is consuming them.
 * - It tries to interpolate between identical start and end values, doing
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
 * @returns {Function|undefined} An interpolation function, if necessary.
 */
export const victoryInterpolator = function <T>(a: T, b: T): (t: number) => T {
  // If the values are strictly equal, or either value is not interpolatable,
  // just use either the start value `a` or end value `b` at every step, as
  // there is no reasonable in-between value.
  if (a === b || !isInterpolatable(a) || !isInterpolatable(b)) {
    return interpolateImmediate(a, b);
  }
  if (typeof a === "function" || typeof b === "function") {
    return interpolateFunction(a, b);
  }
  if (isPlainObject(a) || isPlainObject(b)) {
    // @ts-expect-error These generics are tough, but they work :)
    return interpolateObject(a, b);
  }
  if (typeof a === "string" || typeof b === "string") {
    return interpolateString(a, b);
  }
  // @ts-expect-error These generics are tough, but they work :)
  return interpolate(a, b);
};
