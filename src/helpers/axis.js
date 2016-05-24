import { Collection } from "victory-core";
import React from "react";

export default {

  getAxisComponent(props, axis, childComponents) {
    childComponents = childComponents || React.Children.toArray(props.children);
    const getAxis = (component) => {
      const flipped = childComponents.some((child) => child.props.horizontal);
      return component.type.getAxis(component.props, flipped);
    };
    const axisComponents = this.findAxisComponents(childComponents);
    return axisComponents.filter((component) => getAxis(component) === axis)[0];
  },

  findAxisComponents(childComponents) {
    const findAxes = (children) => {
      return children.reduce((memo, child) => {
        if (child.type && child.type.role === "axis") {
          return memo.concat(child);
        } else if (child.props && child.props.children) {
          return memo.concat(findAxes(React.Children.toArray(child.props.children)));
        }
        return memo;
      }, []);
    };

    return findAxes(childComponents);
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
