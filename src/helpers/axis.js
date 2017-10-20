import { Collection } from "victory-core";
import {
  identity, isFunction, invert, uniq, range, sortBy, values, includes, without
} from "lodash";
import React from "react";

export default {
  /**
   * Returns the axis (x or y) of a particular axis component
   * @param {Object} props: the props object.
   * @returns {String} the dimension appropriate for the axis given its props
   */
  getAxis(props) {
    if (props.orientation) {
      const vertical = { top: "x", bottom: "x", left: "y", right: "y" };
      return vertical[props.orientation];
    }
    return props.dependentAxis ? "y" : "x";
  },

  /**
   * Returns the given axis or the opposite axis when horizontal
   * @param {string} axis: the given axis, either "x" pr "y"
   * @param {Boolean} horizontal: true when the chart is flipped to the horizontal orientation
   * @returns {String} the dimension appropriate for the axis given its props "x" or "y"
   */
  getCurrentAxis(axis, horizontal) {
    const otherAxis = axis === "x" ? "y" : "x";
    return horizontal ? otherAxis : axis;
  },

  /**
   * Returns a single axis component of the desired axis type (x or y)
   * @param {Array} childComponents: an array of children
   * @param {String} axis: desired axis either "x" or "y".
   * @returns {ReactComponent} an axis component of the desired axis or undefined
   */
  getAxisComponent(childComponents, axis) {
    const matchesAxis = (component) => {
      const type = component.type.getAxis(component.props);
      return type === axis;
    };
    return this.findAxisComponents(childComponents, matchesAxis)[0];
  },

  /**
   * Returns all axis components that pass a given predicate
   * @param {Array} childComponents: an array of children
   * @param {Function} predicate: a predicate function that will be called with each
   * @returns {Array} all axis components that pass the given predicate or []
   */
  findAxisComponents(childComponents, predicate) {
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
  },

  /**
   * Returns all axis components of the desired axis type (x or y) along with any
   * parent components excluding VictoryChart
   * @param {Array} childComponents: an optional array of children.
   * @param {String} type: desired axis either "dependent" or "independent".
   * @returns {ReactComponent} an axis component of the desired type or undefined
   */
  getAxisComponentsWithParent(childComponents, type) {
    const matchesType = (child) => {
      return type === "dependent" ? child.props.dependentAxis : !child.props.dependentAxis;
    };

    const findAxisComponents = (children) => {
      return children.reduce((memo, child) => {
        if (child.type && child.type.role === "axis" && matchesType(child)) {
          return memo.concat(child);
        } else if (child.props && child.props.children) {
          const childAxis = findAxisComponents(React.Children.toArray(child.props.children));
          return childAxis.length > 0 ? memo.concat(child) : memo;
        }
        return memo;
      }, []);
    };

    return findAxisComponents(childComponents);
  },

  getOrigin(domain) {
    const getSingleOrigin = (d) => {
      const domainMin = Math.min(...d);
      const domainMax = Math.max(...d);
      return domainMax < 0 ? domainMax : Math.max(0, domainMin);
    };

    return {
      x: Collection.containsDates(domain.x) ?
        new Date(Math.min(...domain.x)) : getSingleOrigin(domain.x),
      y: Collection.containsDates(domain.y) ?
        new Date(Math.min(...domain.y)) : getSingleOrigin(domain.y)
    };
  },

  getOriginSign(origin, domain) {
    const getSign = () => {
      return origin <= 0 && Math.max(...domain) <= 0 ? "negative" : "positive";
    };
    return Collection.containsDates(domain) ? "positive" : getSign();
  },

  /**
   * @param {ReactComponent} component: a victory axis component.
   * @param {String} axis: desired axis either "x" or "y".
   * @param {String} originSign: "positive" or "negative"
   * @returns {String} the orientation of the axis ("top", "bottom", "left", or "right")
   */
  getOrientation(component, axis, originSign) {
    if (component && component.props && component.props.orientation) {
      return component.props.orientation;
    }
    const sign = originSign || "positive";
    const typicalOrientations = {
      positive: { x: "bottom", y: "left" },
      negative: { x: "top", y: "right" }
    };
    const flippedOrientations = {
      positive: { x: "left", y: "bottom" },
      negative: { x: "right", y: "top" }
    };
    if (!component) {
      return typicalOrientations[sign][axis];
    }
    const dependent = component.props.dependentAxis;
    return (!dependent && axis === "y") || (dependent && axis === "x") ?
      flippedOrientations[sign][axis] : typicalOrientations[sign][axis];
  },

  /**
   * @param {Object} props: axis component props
   * @returns {Boolean} true when the axis is vertical
   */
  isVertical(props) {
    const orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
    const vertical = { top: false, bottom: false, left: true, right: true };
    return vertical[orientation];
  },

  /**
   * @param {Object} props: axis component props
   * @returns {Boolean} true when tickValues contain strings
   */
  stringTicks(props) {
    return props.tickValues !== undefined && Collection.containsStrings(props.tickValues);
  },

  getDefaultTickFormat(props) {
    const { tickValues, stringMap } = props;
    const fallbackFormat = tickValues && !Collection.containsDates(tickValues) ?
      (x) => x : undefined;
    if (!stringMap) {
      return this.stringTicks(props) ? (x, index) => tickValues[index] : fallbackFormat;
    } else {
      const invertedStringMap = stringMap && invert(stringMap);
      const tickValueArray = sortBy(values(stringMap), (n) => n);
      const dataNames = tickValueArray.map((tick) => invertedStringMap[tick]);
      // string ticks should have one tick of padding at the beginning
      const dataTicks = ["", ...dataNames, ""];
      return (x) => dataTicks[x];
    }
  },

  getTickFormat(props, scale) {
    const { tickFormat, stringMap } = props;
    if (!tickFormat) {
      const defaultTickFormat = this.getDefaultTickFormat(props);
      const scaleTickFormat = scale.tickFormat && isFunction(scale.tickFormat) ?
        scale.tickFormat() : (x) => x;
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
  },

  getStringTicks(props) {
    const { stringMap, categories } = props;
    const ticksFromCategories = categories && Collection.containsOnlyStrings(categories) ?
      categories.map((tick) => stringMap[tick]) : undefined;
    const ticksFromStringMap = stringMap && values(stringMap);
    return ticksFromCategories && ticksFromCategories.length !== 0 ?
      ticksFromCategories : ticksFromStringMap;
  },


  getTickArray(props) {
    const { tickValues, tickFormat, stringMap } = props;
    const getTicksFromFormat = () => {
      if (!tickFormat || !Array.isArray(tickFormat)) {
        return undefined;
      }
      return Collection.containsStrings(tickFormat) ? tickFormat.map((t, i) => i) : tickFormat;
    };

    let ticks = tickValues;
    if (stringMap) {
      ticks = this.getStringTicks(props);
    }
    if (tickValues && Collection.containsStrings(tickValues)) {
      ticks = stringMap ?
        tickValues.map((tick) => stringMap[tick]) :
        range(1, tickValues.length + 1);
    }
    const tickArray = ticks ? uniq(ticks) : getTicksFromFormat(props);
    const filterArray = (arr) => {
      const axis = this.getAxis(props);
      const domain = props.domain && props.domain[axis] || props.domain;
      return Array.isArray(domain) ?
        arr.filter((t) => t >= Math.min(...domain) && t <= Math.max(...domain)) : arr;
    };
    return Array.isArray(tickArray) && tickArray.length ? filterArray(tickArray) : undefined;
  },

  downsampleTicks(ticks, tickCount) {
    if (!tickCount || !Array.isArray(ticks) || ticks.length <= tickCount) {
      return ticks;
    }
    const k = Math.floor(ticks.length / tickCount);
    return ticks.filter((d, i) => i % k === 0);
  },

  getTicks(props, scale, filterZero) {
    const { tickCount } = props;
    const tickValues = this.getTickArray(props);
    if (tickValues) {
      return this.downsampleTicks(tickValues, tickCount);
    } else if (scale.ticks && isFunction(scale.ticks)) {
      // eslint-disable-next-line no-magic-numbers
      const defaultTickCount = tickCount || 5;
      const scaleTicks = scale.ticks(defaultTickCount);
      const tickArray = Array.isArray(scaleTicks) && scaleTicks.length ?
        scaleTicks : scale.domain();
      const ticks = this.downsampleTicks(tickArray, tickCount);
      if (filterZero) {
        const filteredTicks = includes(ticks, 0) ? without(ticks, 0) : ticks;
        return filteredTicks.length ? filteredTicks : ticks;
      }
      return ticks;
    }
    return scale.domain();
  }
};
