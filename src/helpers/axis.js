import without from "lodash/array/without";
import includes from "lodash/collection/includes";
import range from "lodash/utility/range";
import some from "lodash/collection/some";

module.exports = {
  getAxisType(component) {
    if (!component.type || component.type.role !== "axis") {
      return undefined;
    }
    return component.props.dependentAxis ? "dependent" : "independent";
  },

  getAxisComponent(childComponents, axis) {
    const getAxis = (component) => {
      const flipped = some(childComponents, (child) => child.props.horizontal);
      return component.type.getAxis(component.props, flipped);
    };
    const axisComponents = childComponents.filter((component) => {
      return component.type.role === "axis" && getAxis(component) === axis;
    });
    return axisComponents[0];
  },

  getOrientation(component, axis) {
    if (component.props.orientation) {
      return component.props.orientation;
    }
    const typicalOrientations = {x: "bottom", y: "left"};
    const flippedOrientations = {x: "left", y: "bottom"};
    const dependent = component.props.dependentAxis;
    return (dependent && axis === "y") || (!dependent && axis === "x") ?
      typicalOrientations[axis] : flippedOrientations[axis];
  },

  getAxisOrientations(childComponents) {
    return {
      x: this.getOrientation(this.getAxisComponent(childComponents, "x"), "x"),
      y: this.getOrientation(this.getAxisComponent(childComponents, "y"), "y"),
    };
  }
};
