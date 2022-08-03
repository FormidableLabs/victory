/* eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }] */
/* eslint-disable max-params */

import { find, isRegExp } from "lodash";
import * as Log from "./log";
import PropTypes from "prop-types";
import * as Scale from "./scale";
import { D3Scale, ScaleName } from "../types/prop-types";

/**
 * Return a new validator based on `validator` but with the option to chain
 * `isRequired` onto the validation. This is nearly identical to how React
 * does it internally, but they don't expose their helper for us to use.
 * @param {Function} validator Validation function.
 * @returns {Function} Validator with `isRequired` option.
 */
const makeChainable = function <T>(validator: PropTypes.Validator<T>) {
  const createChainable =
    (isRequired: boolean): PropTypes.Validator<T | undefined> =>
    (props, propName, componentName, ...rest) => {
      const value = props[propName];
      if (value === undefined || value === null) {
        if (isRequired) {
          return new Error(
            `Required \`${propName}\` was not specified in \`${componentName}\`.`,
          );
        }
        return null;
      }
      return validator(props, propName, componentName, ...rest);
    };
  const chainable = Object.assign(createChainable(false), {
    isRequired: createChainable(true),
  });
  return chainable as PropTypes.Requireable<T | undefined>;
};

const nullConstructor = () => null;
const undefinedConstructor = () => undefined;

/**
 * Get the constructor of `value`. If `value` is null or undefined, return the
 * special singletons `nullConstructor` or `undefinedConstructor`, respectively.
 * @param {*} value Instance to return the constructor of.
 * @returns {Function} Constructor of `value`.
 */
const getConstructor = (value) => {
  if (value === undefined) {
    return undefinedConstructor;
  } else if (value === null) {
    return nullConstructor;
  }
  return value.constructor;
};

/**
 * Get the name of the constructor used to create `value`, using
 * `Object.prototype.toString`. If the value is null or undefined, return
 * "null" or "undefined", respectively.
 * @param {*} value Instance to return the constructor name of.
 * @returns {String} Name of the constructor.
 */
const getConstructorName = (value) => {
  if (value === undefined) {
    return "undefined";
  } else if (value === null) {
    return "null";
  }
  return Object.prototype.toString.call(value).slice(8, -1); // eslint-disable-line no-magic-numbers
};

/**
 * Return a new validator based on `propType` but which logs a `console.error`
 * with `explanation` if used.
 * @param {Function} propType The old, deprecated propType.
 * @param {String} explanation The message to provide the user of the deprecated propType.
 * @returns {Function} Validator which logs usage of this propType
 */
export function deprecated<T>(
  propType: PropTypes.Validator<T>,
  explanation: string,
): PropTypes.Validator<T> {
  return (props, propName, componentName) => {
    const value = props[propName];
    if (value !== null && value !== undefined) {
      Log.warn(
        `"${propName}" property of "${componentName}" has been deprecated ${explanation}`,
      );
    }
    PropTypes.checkPropTypes(
      { [propName]: propType },
      props,
      propName,
      componentName,
    );
    return null;
  };
}

/**
 * Return a new validator which returns true
 * if and only if all validators passed as arguments return true.
 * Like React.propTypes.oneOfType, except "all" instead of "any"
 * @param {Array} validators Validation functions.
 * @returns {Function} Combined validator function
 */
export function allOfType<T>(validators: Array<PropTypes.Validator<T>>) {
  return makeChainable<T>((props, propName, componentName, ...rest) => {
    return validators.reduce<null | Error>(
      (result, validator) =>
        result || validator(props, propName, componentName, ...rest),
      null,
    );
  });
}

/**
 * Check that the value is a non-negative number.
 */
export const nonNegative = makeChainable<number>(
  (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== "number" || value < 0) {
      return new Error(
        `\`${propName}\` in \`${componentName}\` must be a non-negative number.`,
      );
    }
    return null;
  },
);

/**
 * Check that the value is an integer.
 */
export const integer = makeChainable<number>(
  (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== "number" || value % 1 !== 0) {
      return new Error(
        `\`${propName}\` in \`${componentName}\` must be an integer.`,
      );
    }
    return null;
  },
);

/**
 * Check that the value is greater than zero.
 */
export const greaterThanZero = makeChainable<number>(
  (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== "number" || value <= 0) {
      return new Error(
        `\`${propName}\` in \`${componentName}\` must be a number greater than zero.`,
      );
    }
    return null;
  },
);

/**
 * Check that the value is an Array of two unique values.
 */
export const domain = makeChainable<[number, number]>(
  (props, propName, componentName) => {
    const value = props[propName];
    if (!Array.isArray(value) || value.length !== 2 || value[1] === value[0]) {
      return new Error(
        `\`${propName}\` in \`${componentName}\` must be an array of two unique numeric values.`,
      );
    }
    return null;
  },
);

/**
 * Check that the value looks like a d3 `scale` function.
 */
export const scale = makeChainable<ScaleName | D3Scale>(
  (props, propName, componentName) => {
    const value = props[propName];
    if (!Scale.validScale(value)) {
      return new Error(
        `\`${propName}\` in \`${componentName}\` must be a d3 scale.`,
      );
    }
    return null;
  },
);

/**
 * Check that an array contains items of the same type.
 */
export const homogeneousArray = makeChainable<unknown[]>(
  (props, propName, componentName) => {
    const values = props[propName];
    if (!Array.isArray(values)) {
      return new Error(
        `\`${propName}\` in \`${componentName}\` must be an array.`,
      );
    }

    if (values.length < 2) {
      return null;
    }

    const comparisonConstructor = getConstructor(values[0]);

    const typeMismatchedValue = find(values, (value) => {
      return comparisonConstructor !== getConstructor(value);
    });

    if (typeMismatchedValue) {
      const constructorName = getConstructorName(values[0]);
      const otherConstructorName = getConstructorName(typeMismatchedValue);

      return new Error(
        `Expected \`${propName}\` in \`${componentName}\` to be a ` +
          `homogeneous array, but found types \`${constructorName}\` and ` +
          `\`${otherConstructorName}\`.`,
      );
    }
    return null;
  },
);

/**
 * Check that array prop length matches props.data.length
 */
export const matchDataLength = makeChainable<unknown[]>((props, propName) => {
  if (
    props[propName] &&
    Array.isArray(props[propName]) &&
    props[propName].length !== props.data.length
  ) {
    return new Error(`Length of data and ${propName} arrays must match.`);
  }
  return null;
});

/**
 * Check that the value is a regular expression
 */
export const regExp = makeChainable<RegExp>(
  (props, propName, componentName) => {
    if (props[propName] && !isRegExp(props[propName])) {
      return new Error(
        `\`${propName}\` in \`${componentName}\` must be a regular expression.`,
      );
    }
    return null;
  },
);
