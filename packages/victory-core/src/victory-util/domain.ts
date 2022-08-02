/* eslint-disable no-use-before-define */
import React from "react";
import {
  flatten,
  isPlainObject,
  sortedUniq,
  isFunction,
  includes,
  isDate,
} from "lodash";
import * as Data from "./data";
import * as Scale from "./scale";
import * as Helpers from "./helpers";
import * as Collection from "./collection";

// Private Methods

function cleanDomain(domain, props, axis) {
  const scaleType = Scale.getScaleType(props, axis);

  if (scaleType !== "log") {
    return domain;
  }

  const rules = (dom) => {
    const almostZero =
      dom[0] < 0 || dom[1] < 0
        ? -1 / Number.MAX_SAFE_INTEGER
        : 1 / Number.MAX_SAFE_INTEGER;
    const domainOne = dom[0] === 0 ? almostZero : dom[0];
    const domainTwo = dom[1] === 0 ? almostZero : dom[1];
    return [domainOne, domainTwo];
  };

  return rules(domain);
}

function getDomainPadding(props, axis) {
  const formatPadding = (padding) => {
    return Array.isArray(padding)
      ? { left: padding[0], right: padding[1] }
      : { left: padding, right: padding };
  };

  return isPlainObject(props.domainPadding)
    ? formatPadding(props.domainPadding[axis])
    : formatPadding(props.domainPadding);
}

function getFlatData(dataset, axis: "x" | "y") {
  const axisKey = `_${axis}`;
  return flatten(dataset).map((datum: any) => {
    return datum[axisKey] && datum[axisKey][1] !== undefined
      ? datum[axisKey][1]
      : datum[axisKey];
  });
}

function getExtremeFromData(dataset, axis, type = "min") {
  const getExtreme = (arr) =>
    type === "max" ? Math.max(...arr) : Math.min(...arr);
  const initialValue = type === "max" ? -Infinity : Infinity;
  let containsDate = false;
  const result = flatten(dataset).reduce((memo: number, datum: any) => {
    const current0 =
      datum[`_${axis}0`] !== undefined ? datum[`_${axis}0`] : datum[`_${axis}`];
    const current1 =
      datum[`_${axis}1`] !== undefined ? datum[`_${axis}1`] : datum[`_${axis}`];
    const current = getExtreme([current0, current1]);
    containsDate =
      containsDate || current0 instanceof Date || current1 instanceof Date;
    return getExtreme([memo, current]);
  }, initialValue);
  return containsDate ? new Date(result) : result;
}

// eslint-disable-next-line max-statements
function padDomain(domain, props, axis) {
  if (!props.domainPadding) {
    return domain;
  }

  const minDomain = getMinFromProps(props, axis);
  const maxDomain = getMaxFromProps(props, axis);
  const padding = getDomainPadding(props, axis);
  if (!padding.left && !padding.right) {
    return domain;
  }

  const min = Collection.getMinValue(domain);
  const max = Collection.getMaxValue(domain);
  const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
  const range = Helpers.getRange(props, currentAxis);
  const rangeExtent = Math.abs(range[0] - range[1]);

  const paddedRangeExtent = Math.max(
    rangeExtent - padding.left - padding.right,
    1,
  );
  const paddedDomainExtent =
    (Math.abs(max.valueOf() - min.valueOf()) / paddedRangeExtent) * rangeExtent;

  const simplePadding = {
    left: (paddedDomainExtent * padding.left) / rangeExtent,
    right: (paddedDomainExtent * padding.right) / rangeExtent,
  };

  let paddedDomain = {
    min: min.valueOf() - simplePadding.left,
    max: max.valueOf() + simplePadding.right,
  };

  const singleQuadrantDomainPadding = isPlainObject(
    props.singleQuadrantDomainPadding,
  )
    ? props.singleQuadrantDomainPadding[axis]
    : props.singleQuadrantDomainPadding;

  const addsQuadrants =
    (min >= 0 && paddedDomain.min <= 0) || (max <= 0 && paddedDomain.max >= 0);

  const adjust = (val, type) => {
    const coerce =
      (type === "min" && min >= 0 && val <= 0) ||
      (type === "max" && max <= 0 && val >= 0);
    return coerce ? 0 : val;
  };

  if (addsQuadrants && singleQuadrantDomainPadding !== false) {
    // Naive initial padding calculation
    const initialPadding = {
      // @ts-expect-error `max/min` might be dates
      left: (Math.abs(max - min) * padding.left) / rangeExtent,
      // @ts-expect-error `max/min` might be dates
      right: (Math.abs(max - min) * padding.right) / rangeExtent,
    };

    // Adjust the domain by the initial padding
    const adjustedDomain = {
      min: adjust(min.valueOf() - initialPadding.left, "min"),
      max: adjust(max.valueOf() + initialPadding.right, "max"),
    };

    // re-calculate padding, taking the adjusted domain into account
    const finalPadding = {
      left:
        (Math.abs(adjustedDomain.max - adjustedDomain.min) * padding.left) /
        rangeExtent,
      right:
        (Math.abs(adjustedDomain.max - adjustedDomain.min) * padding.right) /
        rangeExtent,
    };

    // Adjust the domain by the final padding
    paddedDomain = {
      min: adjust(min.valueOf() - finalPadding.left, "min"),
      max: adjust(max.valueOf() + finalPadding.right, "max"),
    };
  }

  // default to minDomain / maxDomain if they exist
  const finalDomain = {
    min: minDomain !== undefined ? minDomain : paddedDomain.min,
    max: maxDomain !== undefined ? maxDomain : paddedDomain.max,
  };

  return min instanceof Date || max instanceof Date
    ? getDomainFromMinMax(new Date(finalDomain.min), new Date(finalDomain.max))
    : getDomainFromMinMax(finalDomain.min, finalDomain.max);
}

// Public Methods

/**
 * Returns a getDomain function
 * @param {Function} getDomainFromDataFunction: a function that takes props and axis and
 * returns a domain based on data
 * @param {Function} formatDomainFunction: a function that takes domain, props, and axis and
 * returns a formatted domain
 * @returns {Function} a function that takes props and axis and returns a formatted domain
 */
export function createDomainFunction(
  getDomainFromDataFunction?,
  formatDomainFunction?,
) {
  getDomainFromDataFunction = isFunction(getDomainFromDataFunction)
    ? getDomainFromDataFunction
    : getDomainFromData;
  formatDomainFunction = isFunction(formatDomainFunction)
    ? formatDomainFunction
    : formatDomain;
  return (props, axis) => {
    const propsDomain = getDomainFromProps(props, axis);
    if (propsDomain) {
      return formatDomainFunction(propsDomain, props, axis);
    }
    const categories = Data.getCategories(props, axis);
    const domain = categories
      ? getDomainFromCategories(props, axis, categories)
      : getDomainFromDataFunction(props, axis);
    return domain ? formatDomainFunction(domain, props, axis) : undefined;
  };
}

/**
 * Returns a formatted domain.
 * @param {Array} domain: a domain in the form of a two element array
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Array} a domain in the form of a two element array
 */
export function formatDomain(domain, props, axis) {
  return cleanDomain(padDomain(domain, props, axis), props, axis);
}

/**
 * Returns a domain for a given axis based on props, category, or data
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Array} the domain for the given axis
 */
export function getDomain(props, axis) {
  return createDomainFunction()(props, axis);
}

/**
 * Returns a domain based on categories if they exist
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @param {Array} categories: an array of categories corresponding to a given axis
 * @returns {Array|undefined} returns a domain from categories or undefined
 */
export function getDomainFromCategories(props, axis, categories?) {
  categories = categories || Data.getCategories(props, axis);
  const { polar, startAngle = 0, endAngle = 360 } = props;
  if (!categories) {
    return undefined;
  }
  const minDomain = getMinFromProps(props, axis);
  const maxDomain = getMaxFromProps(props, axis);
  const stringArray = Collection.containsStrings(categories)
    ? Data.getStringsFromCategories(props, axis)
    : [];
  const stringMap =
    stringArray.length === 0
      ? null
      : stringArray.reduce((memo, string, index) => {
          memo[string] = index + 1;
          return memo;
        }, {});
  const categoryValues = stringMap
    ? categories.map((value) => stringMap[value])
    : categories;
  const min =
    minDomain !== undefined
      ? minDomain
      : Collection.getMinValue(categoryValues);
  const max =
    maxDomain !== undefined
      ? maxDomain
      : Collection.getMaxValue(categoryValues);
  const categoryDomain = getDomainFromMinMax(min, max);
  return polar && axis === "x" && Math.abs(startAngle - endAngle) === 360
    ? getSymmetricDomain(categoryDomain, categoryValues)
    : categoryDomain;
}

/**
 * Returns a domain from a dataset for a given axis
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @param {Array} dataset: an array of data
 * @returns {Array} the domain based on data
 */
export function getDomainFromData(props, axis, dataset) {
  dataset = dataset || Data.getData(props);
  const { polar, startAngle = 0, endAngle = 360 } = props;
  const minDomain = getMinFromProps(props, axis);
  const maxDomain = getMaxFromProps(props, axis);
  if (dataset.length < 1) {
    return minDomain !== undefined && maxDomain !== undefined
      ? getDomainFromMinMax(minDomain, maxDomain)
      : undefined;
  }
  const min =
    minDomain !== undefined
      ? minDomain
      : getExtremeFromData(dataset, axis, "min");
  const max =
    maxDomain !== undefined
      ? maxDomain
      : getExtremeFromData(dataset, axis, "max");
  const domain = getDomainFromMinMax(min, max);
  return polar && axis === "x" && Math.abs(startAngle - endAngle) === 360
    ? getSymmetricDomain(domain, getFlatData(dataset, axis))
    : domain;
}

/**
 * Returns a domain in the form of a two element array given a min and max value.
 * @param {Number|Date} min: the props object
 * @param {Number|Date} max: the current axis
 * @returns {Array} the minDomain based on props
 */
export function getDomainFromMinMax(min, max) {
  const getSinglePointDomain = (val) => {
    // d3-scale does not properly resolve very small differences.
    const verySmallNumber =
      // eslint-disable-next-line no-magic-numbers
      val === 0 ? 2 * Math.pow(10, -10) : Math.pow(10, -10);
    const verySmallDate = 1;
    const minVal =
      val instanceof Date
        ? new Date(Number(val) - verySmallDate)
        : Number(val) - verySmallNumber;
    const maxVal =
      val instanceof Date
        ? new Date(Number(val) + verySmallDate)
        : Number(val) + verySmallNumber;
    return val === 0 ? [0, maxVal] : [minVal, maxVal];
  };
  return Number(min) === Number(max) ? getSinglePointDomain(max) : [min, max];
}

/**
 * Returns a the domain for a given axis if domain is given in props
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Array|undefined} the domain based on props
 */
export function getDomainFromProps(props, axis) {
  const minDomain = getMinFromProps(props, axis);
  const maxDomain = getMaxFromProps(props, axis);
  if (isPlainObject(props.domain) && props.domain[axis]) {
    return props.domain[axis];
  } else if (Array.isArray(props.domain)) {
    return props.domain;
  } else if (minDomain !== undefined && maxDomain !== undefined) {
    return getDomainFromMinMax(minDomain, maxDomain);
  }
  return undefined;
}

/**
 * Returns a domain for a given axis. This method forces the domain to include
 * zero unless the domain is explicitly specified in props.
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Array} the domain for the given axis
 */
export function getDomainWithZero(props, axis) {
  const propsDomain = getDomainFromProps(props, axis);
  if (propsDomain) {
    return propsDomain;
  }

  const dataset = Data.getData(props);
  const y0Min = dataset.reduce(
    (min, datum) => (datum._y0 < min ? datum._y0 : min),
    Infinity,
  );

  const ensureZero = (domain) => {
    if (axis === "x") {
      return domain;
    }

    const defaultMin = y0Min !== Infinity ? y0Min : 0;
    const maxDomainProp = getMaxFromProps(props, axis);
    const minDomainProp = getMinFromProps(props, axis);
    const max =
      maxDomainProp !== undefined
        ? maxDomainProp
        : Collection.getMaxValue(domain, defaultMin);
    const min =
      minDomainProp !== undefined
        ? minDomainProp
        : Collection.getMinValue(domain, defaultMin);

    return getDomainFromMinMax(min, max);
  };

  const getDomainFunction = () => {
    return getDomainFromData(props, axis, dataset);
  };

  const formatDomainFunction = (domain) => {
    return formatDomain(ensureZero(domain), props, axis);
  };

  return createDomainFunction(getDomainFunction, formatDomainFunction)(
    props,
    axis,
  );
}

/**
 * Returns the maxDomain from props if it exists
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Number|Date|undefined} the maxDomain based on props
 */
export function getMaxFromProps(props, axis) {
  if (isPlainObject(props.maxDomain) && props.maxDomain[axis] !== undefined) {
    return props.maxDomain[axis];
  }
  return typeof props.maxDomain === "number" || isDate(props.maxDomain)
    ? props.maxDomain
    : undefined;
}

/**
 * Returns the minDomain from props if it exists
 * @param {Object} props: the props object
 * @param {String} axis: the current axis
 * @returns {Number|Date|undefined} the minDomain based on props
 */
export function getMinFromProps(props, axis) {
  if (isPlainObject(props.minDomain) && props.minDomain[axis] !== undefined) {
    return props.minDomain[axis];
  }
  return typeof props.minDomain === "number" || isDate(props.minDomain)
    ? props.minDomain
    : undefined;
}

/**
 * Returns a symmetrically padded domain for polar charts
 * @param {Array} domain: the original domain
 * @param {Array} values: a flat array of values corresponding to either tickValues, or data values
 * for a given dimension i.e. only x values.
 * @returns {Array} the symmetric domain
 */
export function getSymmetricDomain(domain, values: number[]) {
  const processedData = sortedUniq(values.sort((a, b) => a - b));
  const step = processedData[1] - processedData[0];
  return [domain[0], domain[1] + step];
}

/**
 * Checks whether a given component can be used to calculate domain
 * @param {Component} component: a React component instance
 * @returns {Boolean} Returns true if the given component has a role included in the whitelist
 */
export function isDomainComponent(component) {
  const getRole = (child) => {
    return child && child.type ? child.type.role : "";
  };
  let role = getRole(component);
  if (role === "portal") {
    const children = React.Children.toArray(component.props.children);
    role = children.length ? getRole(children[0]) : "";
  }
  const whitelist = [
    "area",
    "axis",
    "bar",
    "boxplot",
    "candlestick",
    "errorbar",
    "group",
    "histogram",
    "line",
    "pie",
    "scatter",
    "stack",
    "voronoi",
  ];
  return includes(whitelist, role);
}
