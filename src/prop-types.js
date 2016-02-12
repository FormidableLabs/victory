import bind from "lodash/function/bind";
import includes from "lodash/collection/includes";
import isFunction from "lodash/lang/isFunction";

import { PropTypes } from "react";
import { getConstructor, getConstructorName } from "./type";

/**
 * Return a new validator based on `validator` but with the option to chain
 * `isRequired` onto the validation. This is nearly identical to how React
 * does it internally, but they don't expose their helper for us to use.
 * @param {Function} validator Validation function.
 * @returns {Function} Validator with `isRequired` option.
 */
export const makeChainable = function (validator) {
  /* eslint-disable max-params */
  const _chainable = function (isRequired, props, propName, componentName) {
    const value = props[propName];
    if (typeof value === "undefined" || value === null) {
      if (isRequired) {
        return new Error(
          `Required \`${propName}\` was not specified in \`${componentName}\`.`
        );
      }
      return null;
    }
    return validator(props, propName, componentName);
  };
  const chainable = bind(_chainable, null, false);
  chainable.isRequired = bind(_chainable, null, true);
  return chainable;
};

/**
 * Return a new validator which returns true
 * if and only if all validators passed as arguments return true.
 * Like React.propTypes.oneOfType, except "all" instead of "any"
 * @param {Array} validators Validation functions.
 * @returns {Function} Combined validator function
 */
export const allOfType = function (validators) {
  return makeChainable((props, propName, componentName) => {
    const error = validators.reduce((result, validator) => {
      return result || validator(props, propName, componentName);
    }, undefined);
    if (error) {
      return error;
    }
  });
};

/**
 * Check that the value is a non-negative number.
 */
export const nonNegative = makeChainable((props, propName, componentName) => {
  const error = PropTypes.number(props, propName, componentName);
  if (error) {
    return error;
  }
  const value = props[propName];
  if (value < 0) {
    return new Error(
      `\`${propName}\` in \`${componentName}\` must be non-negative.`
    );
  }
});

/**
 * Check that the value is an integer.
 */
export const integer = makeChainable((props, propName, componentName) => {
  const error = PropTypes.number(props, propName, componentName);
  if (error) {
    return error;
  }
  const value = props[propName];
  if (value % 1 !== 0) {
    return new Error(
      `\`${propName}\` in \`${componentName}\` must be an integer.`
    );
  }
});

/**
 * Check that the value is an Array of two unique values.
 */
export const domain = makeChainable((props, propName, componentName) => {
  const error = PropTypes.array(props, propName, componentName);
  if (error) {
    return error;
  }
  const value = props[propName];
  if (value.length !== 2 || value[1] === value[0]) {
    return new Error(
      `\`${propName}\` in \`${componentName}\` must be an array of two unique numeric values.`
    );
  }
});

/**
 * Check that the value looks like a d3 `scale` function.
 */
export const scale = makeChainable((props, propName, componentName) => {
  const supportedScaleStrings = ["linear", "time", "log", "sqrt"];
  const validScale = (scl) => {
    if (isFunction(scl)) {
      return (isFunction(scl.copy) && isFunction(scl.domain) && isFunction(scl.range));
    } else if (typeof scl === "string") {
      return includes(supportedScaleStrings, scl);
    }
    return false;
  };

  const value = props[propName];
  if (!validScale(value)) {
    return new Error(
      `\`${propName}\` in \`${componentName}\` must be a d3 scale.`
    );
  }
});

/**
 * Check that an array contains items of the same type.
 */
export const homogeneousArray = makeChainable((props, propName, componentName) => {
  const error = PropTypes.array(props, propName, componentName);
  if (error) {
    return error;
  }
  const value = props[propName];
  if (value.length > 1) {
    const constructor = getConstructor(value[0]);
    for (let i = 1; i < value.length; i++) {
      const otherConstructor = getConstructor(value[i]);
      if (constructor !== otherConstructor) {
        const constructorName = getConstructorName(value[0]);
        const otherConstructorName = getConstructorName(value[i]);
        return new Error(
          `Expected \`${propName}\` in \`${componentName}\` to be a ` +
          `homogeneous array, but found types \`${constructorName}\` and ` +
          `\`${otherConstructorName}\`.`
        );
      }
    }
  }
});
