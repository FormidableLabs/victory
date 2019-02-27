/* eslint-disable func-style */
import React from "react";
import {
  identity,
  isFunction,
  isObject,
  invert,
  uniq,
  range,
  orderBy,
  values,
  includes,
  without
} from "lodash";
import Collection from "./collection";
import Domain from "./domain";

/**
 * Returns the axis (x or y) of a particular axis component
 * @param {Object} props: the props object.
 * @param {Boolean} horizontal: true for horizontal charts
 * @returns {String} the dimension appropriate for the axis given its props
 */
function getAxis(props) {
  const { dependentAxis } = props;
  return dependentAxis ? "y" : "x";
}

/**
 * Returns all axis components that pass a given predicate
 * @param {Array} childComponents: an array of children
 * @param {Function} predicate: a predicate function that will be called with each
 * @returns {Array} all axis components that pass the given predicate or []
 */
function findAxisComponents(childComponents, predicate) {
  predicate = predicate || identity;
  const findAxes = (children) => {
    return children.reduce((memo, child) => {
      if (child.type && child.type.role === "axis" && predicate(child)) {
        return memo.concat(child);
      } else if (child.props && child.props.children) {
        return memo.concat(findAxes(React.Children.toArray(child.props.children)));
      }
      return memo;
    }, []);
  };

  return findAxes(childComponents);
}

/**
 * Returns a single axis component of the desired axis type (x or y)
 * @param {Array} childComponents: an array of children
 * @param {String} axis: desired axis either "x" or "y".
 * @returns {ReactComponent} an axis component of the desired axis or undefined
 */
function getAxisComponent(childComponents, axis) {
  const matchesAxis = (component) => {
    const type = component.type.getAxis(component.props);
    return type === axis;
  };
  return findAxisComponents(childComponents, matchesAxis)[0];
}

/**
 * Returns all axis components of the desired axis type (x or y) along with any
 * parent components excluding VictoryChart
 * @param {Array} childComponents: an optional array of children.
 * @param {String} type: desired axis either "dependent" or "independent".
 * @returns {ReactComponent} an axis component of the desired type or undefined
 */
function getAxisComponentsWithParent(childComponents, type) {
  const matchesType = (child) => {
    return type === "dependent" ? child.props.dependentAxis : !child.props.dependentAxis;
  };

  const findComponents = (children) => {
    return children.reduce((memo, child) => {
      if (child.type && child.type.role === "axis" && matchesType(child)) {
        return memo.concat(child);
      } else if (child.props && child.props.children) {
        const childAxis = findComponents(React.Children.toArray(child.props.children));
        return childAxis.length > 0 ? memo.concat(child) : memo;
      }
      return memo;
    }, []);
  };

  return findComponents(childComponents);
}

function getOrigin(domain) {
  const getSingleOrigin = (d) => {
    const domainMin = Math.min(...d);
    const domainMax = Math.max(...d);
    return domainMax < 0 ? domainMax : Math.max(0, domainMin);
  };

  return {
    x: Collection.containsDates(domain.x)
      ? new Date(Math.min(...domain.x))
      : getSingleOrigin(domain.x),
    y: Collection.containsDates(domain.y)
      ? new Date(Math.min(...domain.y))
      : getSingleOrigin(domain.y)
  };
}

function getOriginSign(origin, domain) {
  const getSign = () => {
    return origin <= 0 && Math.max(...domain) <= 0 ? "negative" : "positive";
  };
  return Collection.containsDates(domain) ? "positive" : getSign();
}

/**
 * @param {Object} props: axis component props
 * @returns {Boolean} true when the axis is vertical
 */
function isVertical(props) {
  const orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
  const vertical = { top: false, bottom: false, left: true, right: true };
  return vertical[orientation];
}

/**
 * @param {Object} props: axis component props
 * @returns {Boolean} true when tickValues contain strings
 */
function stringTicks(props) {
  return props.tickValues !== undefined && Collection.containsStrings(props.tickValues);
}

function getDefaultTickFormat(props) {
  const { tickValues } = props;
  const axis = getAxis(props);
  const stringMap = props.stringMap && props.stringMap[axis];
  const fallbackFormat = tickValues && !Collection.containsDates(tickValues) ? (x) => x : undefined;
  if (!stringMap) {
    return stringTicks(props) ? (x, index) => tickValues[index] : fallbackFormat;
  } else {
    const invertedStringMap = stringMap && invert(stringMap);
    const tickValueArray = orderBy(values(stringMap), (n) => n);
    const dataNames = tickValueArray.map((tick) => invertedStringMap[tick]);
    // string ticks should have one tick of padding at the beginning
    const dataTicks = ["", ...dataNames, ""];
    return (x) => dataTicks[x];
  }
}

function getTickFormat(props, scale) {
  const { tickFormat } = props;
  const axis = getAxis(props);
  const stringMap = props.stringMap && props.stringMap[axis];
  if (!tickFormat) {
    const defaultTickFormat = getDefaultTickFormat(props);
    const scaleTickFormat =
      scale.tickFormat && isFunction(scale.tickFormat) ? scale.tickFormat() : (x) => x;
    return defaultTickFormat || scaleTickFormat;
  } else if (tickFormat && Array.isArray(tickFormat)) {
    return (x, index) => tickFormat[index];
  } else if (tickFormat && isFunction(tickFormat)) {
    const applyStringTicks = (tick, index, ticks) => {
      const invertedStringMap = invert(stringMap);
      const stringTickArray = ticks.map((t) => invertedStringMap[t]);
      return props.tickFormat(invertedStringMap[tick], index, stringTickArray);
    };
    return stringMap ? applyStringTicks : tickFormat;
  } else {
    return (x) => x;
  }
}

function getStringTicks(props) {
  const axis = getAxis(props);
  const stringMap = props.stringMap && props.stringMap[axis];
  const categories = Array.isArray(props.categories)
    ? props.categories
    : props.categories && props.categories[axis];
  const ticksFromCategories =
    categories && Collection.containsOnlyStrings(categories)
      ? categories.map((tick) => stringMap[tick])
      : undefined;
  const ticksFromStringMap = stringMap && values(stringMap);
  return ticksFromCategories && ticksFromCategories.length !== 0
    ? ticksFromCategories
    : ticksFromStringMap;
}

function getTickArray(props) {
  const { tickValues, tickFormat } = props;
  const axis = getAxis(props);
  const stringMap = props.stringMap && props.stringMap[axis];
  const getTicksFromFormat = () => {
    if (!tickFormat || !Array.isArray(tickFormat)) {
      return undefined;
    }
    return Collection.containsStrings(tickFormat) ? tickFormat.map((t, i) => i) : tickFormat;
  };

  let ticks = tickValues;
  if (stringMap) {
    ticks = getStringTicks(props);
  }
  if (tickValues && Collection.containsStrings(tickValues)) {
    ticks = stringMap ? tickValues.map((tick) => stringMap[tick]) : range(1, tickValues.length + 1);
  }
  const tickArray = ticks ? uniq(ticks) : getTicksFromFormat(props);
  const filterArray = (arr) => {
    const domain = (props.domain && props.domain[axis]) || props.domain;
    return Array.isArray(domain)
      ? arr.filter((t) => t >= Math.min(...domain) && t <= Math.max(...domain))
      : arr;
  };
  return Array.isArray(tickArray) && tickArray.length ? filterArray(tickArray) : undefined;
}

function downsampleTicks(ticks, tickCount) {
  if (!tickCount || !Array.isArray(ticks) || ticks.length <= tickCount) {
    return ticks;
  }
  const k = Math.floor(ticks.length / tickCount);
  return ticks.filter((d, i) => i % k === 0);
}

function getTicks(props, scale, filterZero) {
  const { tickCount } = props;
  const tickValues = getTickArray(props);
  if (tickValues) {
    return downsampleTicks(tickValues, tickCount);
  } else if (scale.ticks && isFunction(scale.ticks)) {
    // eslint-disable-next-line no-magic-numbers
    const defaultTickCount = tickCount || 5;
    const scaleTicks = scale.ticks(defaultTickCount);
    const tickArray = Array.isArray(scaleTicks) && scaleTicks.length ? scaleTicks : scale.domain();
    const ticks = downsampleTicks(tickArray, tickCount);
    if (filterZero) {
      const filteredTicks = includes(ticks, 0) ? without(ticks, 0) : ticks;
      return filteredTicks.length ? filteredTicks : ticks;
    }
    return ticks;
  }
  return scale.domain();
}

/**
 * Returns a domain based tickValues
 * @param {Object} props: the props object
 * @param {String} axis: either x or y
 * @returns {Array} returns a domain from tickValues
 */
//eslint-disable-next-line max-statements
function getDomainFromData(props, axis) {
  const { polar, startAngle = 0, endAngle = 360 } = props;
  const tickValues = getTickArray(props);
  if (!Array.isArray(tickValues)) {
    return undefined;
  }
  const minDomain = Domain.getMinFromProps(props, axis);
  const maxDomain = Domain.getMaxFromProps(props, axis);
  const tickStrings = stringTicks(props);
  const ticks = tickValues.map((value) => +value);
  const defaultMin = tickStrings ? 1 : Collection.getMinValue(ticks);
  const defaultMax = tickStrings ? tickValues.length : Collection.getMaxValue(ticks);
  const min = minDomain !== undefined ? minDomain : defaultMin;
  const max = maxDomain !== undefined ? maxDomain : defaultMax;
  const initialDomain = Domain.getDomainFromMinMax(min, max);
  const domain =
    polar && axis === "x" && Math.abs(startAngle - endAngle) === 360
      ? Domain.getSymmetricDomain(initialDomain, ticks)
      : initialDomain;
  if (isVertical(props) && !polar) {
    domain.reverse();
  }
  return domain;
}

// exposed for use by VictoryChart
function getDomain(props, axis) {
  const inherentAxis = getAxis(props);
  if (axis && axis !== inherentAxis) {
    return undefined;
  }
  return Domain.createDomainFunction(getDomainFromData)(props, inherentAxis);
}

function getAxisValue(props, axis) {
  if (!props.axisValue) {
    return undefined;
  }
  const scaleAxis = axis === "x" ? "y" : "x";
  const scale =
    isObject(props.scale) && isFunction(props.scale[scaleAxis])
      ? props.scale[scaleAxis]
      : undefined;
  if (!scale) {
    return undefined;
  }
  const stringMapAxis = axis === "x" ? "y" : "x";
  const stringMap = isObject(props.stringMap) && props.stringMap[stringMapAxis];
  const axisValue =
    stringMap && typeof props.axisValue === "string" ? stringMap[props.axisValue] : props.axisValue;
  return scale(axisValue);
}

export default {
  getTicks,
  getTickFormat,
  getAxis,
  getAxisComponent,
  getAxisComponentsWithParent,
  findAxisComponents,
  getOrigin,
  getOriginSign,
  getDomain,
  isVertical,
  stringTicks,
  getAxisValue
};
