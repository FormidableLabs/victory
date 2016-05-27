import { Collection } from "victory-core";
import { identity } from "lodash";
import React from "react";

export default {
  getAxisType(component) {
    if (!component.type || component.type.role !== "axis") {
      return undefined;
    }
    return component.props.dependentAxis ? "dependent" : "independent";
  },

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
   * Returns a single AxisComponent of the desired axis type (x or y)
   * @param {Object} props: the props object.
   * @param {String} axis: desired axis either "x" or "y".
   * @param {Array} childComponents: an optional array of children.
   * @returns {ReactComponent} an AxisComponent of the desired type or undefined
   */
  getAxisComponent(props, axis, childComponents) {
    childComponents = childComponents || React.Children.toArray(props.children);
    const getAxis = (component) => {
      const flipped = childComponents.some((child) => child.props.horizontal);
      return component.type.getAxis(component.props, flipped);
    };
    const axisComponents = this.findAxisComponentsByType(childComponents);
    return axisComponents.filter((component) => getAxis(component) === axis)[0];
  },


  /**
   * Returns a single AxisComponent of the desired axis type (x or y)
   * @param {Object} props: the props object.
   * @param {String} axis: desired axis either "x" or "y".
   * @param {Array} childComponents: an optional array of children.
   * @returns {ReactComponent} an AxisComponent of the desired type or undefined
   */
  findAxisComponentsByType(props, type, childComponents) {
    childComponents = childComponents || React.Children.toArray(childComponents);
    const predicate = (child) => {
      return type === "dependent" ? child.props.dependentAxis : !child.props.dependentAxis;
    };
    return this.findAxisComponents(childComponents, predicate);
  },

  /**
   * Returns a single AxisComponent of the desired axis type (x or y)
   * @param {Object} props: the props object.
   * @param {String} axis: desired axis either "x" or "y".
   * @param {Array} childComponents: an optional array of children.
   * @returns {ReactComponent} an AxisComponent of the desired type or undefined
   */
  findAxisComponentsByAxis(props, axis, childComponents) {
    childComponents = childComponents || React.Children.toArray(childComponents);
    const predicate = (child) => {
      const childAxis = child.type.getAxis(child.props);
      return axis === childAxis;
    };
    return this.findAxisComponents(childComponents, predicate);
  },

  findAxisComponents(childComponents, predicate) {
    predicate = predicate || identity;
    const findAxes = (children) => {
      return children.reduce((memo, child) => {
        if (child.type && child.type.role === "axis") {
          if (predicate(child)) {
            return memo.concat(child);
          }
          return memo;
        } else if (child.props && child.props.children) {
          return memo.concat(findAxes(React.Children.toArray(child.props.children)));
        }
        return memo;
      }, []);
    };

    return findAxes(childComponents);
  },

  /**
   * Returns all AxisComponents of the desired axis type (x or y) along with any
   * parent components excluding VictoryChart
   * @param {Object} props: the props object.
   * @param {String} type: desired axis either "dependent" or "independent".
   * @param {Array} childComponents: an optional array of children.
   * @returns {ReactComponent} an AxisComponent of the desired type or undefined
   */
  getAxisComponentsWithParent(props, type, childComponents) {
    childComponents = childComponents || React.Children.toArray(childComponents);
    const matchesType = (child) => {
      return type === "dependent" ? child.props.dependentAxis : !child.props.dependentAxis;
    };

    const findAxisComponents = (children) => {
      return children.reduce((memo, child) => {
        if (child.type && child.type.role === "axis") {
          if (matchesType(child)) {
            return memo.concat(child);
          }
          return memo;
        } else if (child.props && child.props.children) {
          const childAxis = findAxisComponents(React.Children.toArray(child.props.children));
          return childAxis.length > 0 ? memo.concat(child) : memo;
        }
        return memo;
      }, []);
    };

    return findAxisComponents(childComponents);
  },

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

  getAxisOrientations(props) {
    return {
      x: this.getOrientation(this.getAxisComponent(props, "x"), "x"),
      y: this.getOrientation(this.getAxisComponent(props, "y"), "y")
    };
  },

  isVertical(props) {
    const orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
    const vertical = {top: false, bottom: false, left: true, right: true};
    return vertical[orientation];
  },

  stringTicks(props) {
    return props.tickValues !== undefined && Collection.containsStrings(props.tickValues);
  }
};
