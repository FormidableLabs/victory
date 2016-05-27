import { Collection } from "victory-core";
import { identity } from "lodash";
import React from "react";

export default {
  /**
   * Returns the axis (x or y) of a particular axis component
   * @param {Object} props: the props object.
   * @param {Boolean} flipped: true when the axis component is in an atypical orientation
   * @returns {String} the dimension appropriate for the axis given its props
   */
  getAxis(props, flipped) {
    if (props.orientation) {
      const vertical = {top: "x", bottom: "x", left: "y", right: "y"};
      return vertical[props.orientation];
    }
    const axisType = props.dependentAxis ? "dependent" : "independent";
    const flippedAxis = { dependent: "x", independent: "y"};
    const normalAxis = { independent: "x", dependent: "y"};
    return flipped ? flippedAxis[axisType] : normalAxis[axisType];
  },

  /**
   * Returns a single axis component of the desired axis type (x or y)
   * @param {Array} childComponents: an array of children
   * @param {String} axis: desired axis either "x" or "y".
   * @returns {ReactComponent} an axis component of the desired axis or undefined
   */
  getAxisComponent(childComponents, axis) {
    const matchesAxis = (component) => {
      const flipped = childComponents.some((child) => child.props.horizontal);
      const type = component.type.getAxis(component.props, flipped);
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

  /**
   * @param {ReactComponent} component: a victory axis component.
   * @param {String} axis: desired axis either "x" or "y".
   * @returns {String} the orientation of the axis ("top", "bottom", "left", or "right")
   */
  getOrientation(component, axis) {
    const typicalOrientations = {x: "bottom", y: "left"};
    const flippedOrientations = {x: "left", y: "bottom"};
    if (!component) {
      return typicalOrientations[axis];
    } else if (component.props && component.props.orientation) {
      return component.props.orientation;
    }
    const dependent = component.props.dependentAxis;
    return (dependent && axis === "y") || (!dependent && axis === "x") ?
      typicalOrientations[axis] : flippedOrientations[axis];
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
    const vertical = {top: false, bottom: false, left: true, right: true};
    return vertical[orientation];
  },

  /**
   * @param {Object} props: axis component props
   * @returns {Boolean} true when tickValues contain strings
   */
  stringTicks(props) {
    return props.tickValues !== undefined && Collection.containsStrings(props.tickValues);
  }
};
