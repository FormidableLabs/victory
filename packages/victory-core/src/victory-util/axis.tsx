import React from "react";
import {
  assign,
  defaults,
  identity,
  isFunction,
  isObject,
  invert,
  uniq,
  range,
  orderBy,
  values,
  includes,
  without,
} from "lodash";
import * as Collection from "./collection";
import * as Domain from "./domain";
import * as Helpers from "./helpers";
import { D3Scale } from "../types/prop-types";

/**
 * Returns the axis (x or y) of a particular axis component
 * @param {Object} props: the props object.
 * @param {Boolean} horizontal: true for horizontal charts
 * @returns {String} the dimension appropriate for the axis given its props
 */
export function getAxis(props) {
  const { dependentAxis } = props;
  return dependentAxis ? "y" : "x";
}

/**
 * Returns all axis components that pass a given predicate
 * @param {Array} childComponents: an array of children
 * @param {Function} predicate: a predicate function that will be called with each
 * @returns {Array} all axis components that pass the given predicate or []
 */
export function findAxisComponents(childComponents, predicate?) {
  predicate = predicate || identity;
  const findAxes = (children) => {
    return children.reduce((memo, child) => {
      if (child.type && child.type.role === "axis" && predicate(child)) {
        return memo.concat(child);
      } else if (child.props && child.props.children) {
        return memo.concat(
          findAxes(React.Children.toArray(child.props.children)),
        );
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
export function getAxisComponent(childComponents, axis) {
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
export function getAxisComponentsWithParent(childComponents, type) {
  const matchesType = (child) => {
    return type === "dependent"
      ? child.props.dependentAxis
      : !child.props.dependentAxis;
  };

  const findComponents = (children) => {
    return children.reduce((memo, child) => {
      if (child.type && child.type.role === "axis" && matchesType(child)) {
        return memo.concat(child);
      } else if (child.props && child.props.children) {
        const childAxis = findComponents(
          React.Children.toArray(child.props.children),
        );
        return childAxis.length > 0 ? memo.concat(child) : memo;
      }
      return memo;
    }, []);
  };

  return findComponents(childComponents);
}

export function getOrigin(domain) {
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
      : getSingleOrigin(domain.y),
  };
}

export function getOriginSign(origin, domain) {
  const getSign = () => {
    return origin <= 0 && Math.max(...domain) <= 0 ? "negative" : "positive";
  };
  return Collection.containsDates(domain) ? "positive" : getSign();
}

/**
 * @param {Object} props: axis component props
 * @returns {Boolean} true when the axis is vertical
 */
export function isVertical(props) {
  const orientation =
    props.orientation || (props.dependentAxis ? "left" : "bottom");
  const vertical = { top: false, bottom: false, left: true, right: true };
  return vertical[orientation];
}

/**
 * @param {Object} props: axis component props
 * @returns {Boolean} true when tickValues contain strings
 */
export function stringTicks(props) {
  return (
    props.tickValues !== undefined &&
    Collection.containsStrings(props.tickValues)
  );
}

function getDefaultTickFormat(props) {
  const { tickValues } = props;
  const axis = getAxis(props);
  const stringMap = props.stringMap && props.stringMap[axis];
  const fallbackFormat =
    tickValues && !Collection.containsDates(tickValues) ? (x) => x : undefined;
  if (!stringMap) {
    return stringTicks(props)
      ? (x, index) => tickValues[index]
      : fallbackFormat;
  }
  const invertedStringMap = stringMap && invert(stringMap);
  const tickValueArray = orderBy(values(stringMap), (n) => n);
  const dataNames = tickValueArray.map((tick) => invertedStringMap[tick]);
  // string ticks should have one tick of padding at the beginning
  const dataTicks = ["", ...dataNames, ""];
  return (x) => dataTicks[x];
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

  if (tickValues?.length === 0) {
    return [];
  }

  const axis = getAxis(props);
  const stringMap = props.stringMap && props.stringMap[axis];
  const getTicksFromFormat = () => {
    if (!tickFormat || !Array.isArray(tickFormat)) {
      return undefined;
    }
    return Collection.containsStrings(tickFormat)
      ? tickFormat.map((t, i) => i)
      : tickFormat;
  };

  let ticks = tickValues;
  if (stringMap) {
    ticks = getStringTicks(props);
  }
  if (tickValues && Collection.containsStrings(tickValues)) {
    ticks = stringMap
      ? tickValues.map((tick) => stringMap[tick])
      : range(1, tickValues.length + 1);
  }
  const tickArray = ticks ? uniq(ticks) : getTicksFromFormat();
  const buildTickArray = (arr: number[]) => {
    const newTickArray = [] as Array<{ value: number; index: number }>;
    const domain = (props.domain && props.domain[axis]) || props.domain;
    if (arr) {
      arr.forEach((t, index) => {
        if (Array.isArray(domain)) {
          if (
            t >= Collection.getMinValue(domain) &&
            t <= Collection.getMaxValue(domain)
          ) {
            newTickArray.push({
              value: t,
              index,
            });
          }
        } else {
          newTickArray.push({
            value: t,
            index,
          });
        }
      });
      return newTickArray;
    }
    return undefined;
  };
  return Array.isArray(tickArray) && tickArray.length
    ? buildTickArray(tickArray)
    : undefined;
}

export function getTickFormat(props, scale) {
  const { tickFormat } = props;
  const axis = getAxis(props);
  const stringMap = props.stringMap && props.stringMap[axis];
  if (!tickFormat) {
    const defaultTickFormat = getDefaultTickFormat(props);
    // If there is no user-provided tick format, we use d3's tickFormat function
    // by default. This changed the default formatting for some scale types when
    // we upgraded to d3-scale@4..
    const scaleTickFormat =
      scale.tickFormat && isFunction(scale.tickFormat)
        ? scale.tickFormat()
        : (x) => x;
    return defaultTickFormat || scaleTickFormat;
  } else if (tickFormat && Array.isArray(tickFormat)) {
    const tickArray = getTickArray(props);
    const tickArrayIndices = tickArray?.map((v) => v.index);
    const filteredTickFormat = tickFormat.filter((t, index) =>
      tickArrayIndices?.includes(index),
    );
    return (x, index) => filteredTickFormat[index];
  } else if (tickFormat && isFunction(tickFormat)) {
    const applyStringTicks = (tick, index, ticks) => {
      const invertedStringMap = invert(stringMap);
      const stringTickArray = ticks.map((t) => invertedStringMap[t]);
      return props.tickFormat(invertedStringMap[tick], index, stringTickArray);
    };
    return stringMap ? applyStringTicks : tickFormat;
  }
  return (x) => x;
}

function downsampleTicks(ticks: number[], tickCount: number) {
  if (!tickCount || !Array.isArray(ticks) || ticks.length <= tickCount) {
    return ticks;
  }
  const k = Math.floor(ticks.length / tickCount);
  return ticks.filter((d, i) => i % k === 0);
}

export function getTicks(props, scale: D3Scale, filterZero = false) {
  const { tickCount } = props;
  const tickArray = getTickArray(props);

  if (tickArray?.length === 0) {
    return [""];
  }

  const tickValues = tickArray ? tickArray.map((v) => v.value) : undefined;
  if (tickValues) {
    return downsampleTicks(tickValues, tickCount);
  } else if (scale.ticks && isFunction(scale.ticks)) {
    // eslint-disable-next-line no-magic-numbers
    const defaultTickCount = tickCount || 5;
    const scaleTicks = scale.ticks(defaultTickCount);
    const scaledTickArray =
      Array.isArray(scaleTicks) && scaleTicks.length
        ? scaleTicks
        : scale.domain();
    const ticks = downsampleTicks(scaledTickArray, tickCount);
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
// eslint-disable-next-line max-statements
function getDomainFromData(props, axis) {
  const { polar, startAngle = 0, endAngle = 360 } = props;
  const tickArray = getTickArray(props);
  const tickValues =
    tickArray && tickArray?.length !== 0
      ? tickArray.map((v) => v.value)
      : undefined;
  if (!Array.isArray(tickValues)) {
    return undefined;
  }
  const minDomain = Domain.getMinFromProps(props, axis);
  const maxDomain = Domain.getMaxFromProps(props, axis);
  const tickStrings = stringTicks(props);
  const ticks = tickValues.map((value) => Number(value));
  const defaultMin = tickStrings ? 1 : Collection.getMinValue(ticks);
  const defaultMax = tickStrings
    ? tickValues.length
    : Collection.getMaxValue(ticks);
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
export function getDomain(props, axis?) {
  const inherentAxis = getAxis(props);
  if (axis && axis !== inherentAxis) {
    return undefined;
  }
  return Domain.createDomainFunction(getDomainFromData)(props, inherentAxis);
}

export function getAxisValue(props, axis) {
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
    stringMap && typeof props.axisValue === "string"
      ? stringMap[props.axisValue]
      : props.axisValue;
  return scale(axisValue);
}

export function modifyProps(props, fallbackProps) {
  if (!isObject(props.theme)) {
    return Helpers.modifyProps(props, fallbackProps, "axis");
  }
  let role = "axis";
  if (props.dependentAxis && props.theme.dependentAxis) {
    role = "dependentAxis";
  } else if (!props.dependentAxis && props.theme.independentAxis) {
    role = "independentAxis";
  }
  if (role === "axis") {
    return Helpers.modifyProps(props, fallbackProps, "axis");
  }
  const axisTheme = defaults({}, props.theme[role], props.theme.axis);
  const theme = assign({}, props.theme, { axis: axisTheme });
  return Helpers.modifyProps(
    assign({}, props, { theme }),
    fallbackProps,
    "axis",
  );
}
