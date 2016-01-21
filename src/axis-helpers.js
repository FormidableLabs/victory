import invert from "lodash/object/invert";
import sortBy from "lodash/collection/sortBy";
import values from "lodash/object/values";
import identity from "lodash/utility/identity";

import { Collection } from "victory-util";

module.exports = {
  getAxisOffset(props, calculatedProps) {
    const {axisComponents, domain, axisOrientations, scale} = calculatedProps;
    // make the axes line up, and cross when appropriate
    const origin = {
      x: Math.max(Math.min(...domain.x), 0),
      y: Math.max(Math.min(...domain.y), 0)
    };
    const orientationOffset = {
      x: axisOrientations.y === "left" ? 0 : props.width,
      y: axisOrientations.x === "bottom" ? props.height : 0
    };
    const calculatedOffset = {
      x: Math.abs(orientationOffset.x - scale.x.call(null, origin.x)),
      y: Math.abs(orientationOffset.y - scale.y.call(null, origin.y))
    };
    return {
      x: axisComponents.x.offsetX || calculatedOffset.x,
      y: axisComponents.y.offsetY || calculatedOffset.y
    };
  },

  getTicksFromData(calculatedProps, axis) {
    const stringMap = calculatedProps.stringMap[axis];
    // if tickValues are defined for an axis component use them
    const categoryArray = calculatedProps.categories[axis];
    const ticksFromCategories = categoryArray && Collection.containsOnlyStrings(categoryArray) ?
      categoryArray.map((tick) => stringMap[tick]) : categoryArray;
    const ticksFromStringMap = stringMap && values(stringMap);
    // when ticks is undefined, axis will determine it's own ticks
    return ticksFromCategories || ticksFromStringMap;
  },

  getTicksFromAxis(calculatedProps, axis, component) {
    const tickValues = component.props.tickValues;
    if (!tickValues) {
      return undefined;
    }
    const stringMap = calculatedProps.stringMap[axis];
    return Collection.containsOnlyStrings(tickValues) && stringMap ?
      tickValues.map((tick) => stringMap[tick]) : tickValues;
  },

  getTicks(...args) {
    return this.getTicksFromAxis(...args) || this.getTicksFromData(...args);
  },

  getTickFormat(component, axis, calculatedProps) {
    const tickValues = component.props.tickValues;
    const stringMap = calculatedProps.stringMap[axis];
    if (tickValues && !Collection.containsStrings(tickValues)) {
      return identity;
    } else if (stringMap !== null) {
      const tickValueArray = sortBy(values(stringMap), (n) => n);
      const invertedStringMap = invert(stringMap);
      const dataNames = tickValueArray.map((tick) => invertedStringMap[tick]);
      // string ticks should have one tick of padding at the beginning
      const dataTicks = ["", ...dataNames, ""];
      return (x) => dataTicks[x];
    } else {
      return calculatedProps.scale[axis].tickFormat() || identity;
    }
  },

  getAxisOrientation(component, axis) {
    if (component.props.orientation) {
      return component.props.orientation;
    }
    const typicalOrientations = {x: "bottom", y: "left"};
    const flippedOrientations = {x: "left", y: "bottom"};
    const dependent = component.props.dependentAxis;
    return (dependent && axis === "y") || (!dependent && axis === "x") ?
      typicalOrientations[axis] : flippedOrientations[axis];
  }
};
