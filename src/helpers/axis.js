import { Collection } from "victory-core";
import { identity, isFunction, invert } from "lodash";
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
   * @param {Array} childComponents: an array of children
   * @returns {Object} an object with orientations specified for x and y
   */
  getAxisOrientations(childComponents) {
    return {
      x: this.getOrientation(this.getAxisComponent(childComponents, "x"), "x"),
      y: this.getOrientation(this.getAxisComponent(childComponents, "y"), "y")
    };
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

  getTickFormat(props, scale, stringMap) {
    const stringTicks = this.stringTicks(props);
    const axis = this.getAxis(props);
    const applyStringTicks = (tick, index, ticks) => {
      const invertedStringMap = invert(stringMap[axis]);
      const stringTickArray = ticks.map((t) => invertedStringMap[t]);
      return props.tickFormat(invertedStringMap[tick], index, stringTickArray);
    };
    if (props.tickFormat && isFunction(props.tickFormat)) {
      return stringMap && stringMap[axis] ? applyStringTicks : props.tickFormat;
    } else if (props.tickFormat && Array.isArray(props.tickFormat)) {
      return (x, index) => props.tickFormat[index];
    } else if (stringTicks) {
      return (x, index) => props.tickValues[index];
    } else if (scale.tickFormat && isFunction(scale.tickFormat)) {
      return scale.tickFormat();
    } else {
      return (x) => x;
    }
  }
};
