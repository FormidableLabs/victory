import invert from "lodash/invert";
import sortBy from "lodash/sortBy";
import values from "lodash/values";
import identity from "lodash/identity";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import Axis from "../../helpers/axis";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Wrapper from "../../helpers/wrapper";
import React from "react";
import { Collection, Log } from "victory-core";

export default {
  getChildComponents(props, defaultAxes) {
    const childComponents = React.Children.toArray(props.children);
    if (childComponents.length === 0) {
      return [defaultAxes.independent, defaultAxes.dependent];
    }

    const axisComponents = childComponents.filter((component) => {
      return component.type && component.type.role === "axis";
    });

    if (axisComponents.length === 0) {
      return childComponents.concat(defaultAxes.independent, defaultAxes.dependent);
    }
    const dependentAxes = axisComponents.filter((component) => component.props.dependentAxis);
    const independentAxes = axisComponents.filter((component) => !component.props.dependentAxis);
    if (dependentAxes.length > 1 || independentAxes.length > 1) {
      const msg = `Only one VictoryAxis component of each axis type is allowed when` +
        `using the VictoryChart wrapper. Only the first axis will be used. Please compose ` +
        `multi-axis charts manually`;
      Log.warn(msg);
      const dataComponents = childComponents.filter((component) => {
        return component.type && component.type.role !== "axis";
      });

      return Collection.removeUndefined(
        dataComponents.concat(independentAxes[0], dependentAxes[0])
      );
    }
    return childComponents;
  },

  getDataComponents(childComponents) {
    return childComponents.filter((child) => {
      const role = child.type && child.type.role;
      return role !== "axis";
    });
  },

  getDomain(props, childComponents, axis) {
    const domain = Wrapper.getDomainFromChildren(props, axis);
    const orientations = Axis.getAxisOrientations(childComponents);
    return Domain.orientDomain(domain, orientations, axis);
  },

  getAxisOffset(props, calculatedProps) {
    const {axisComponents, domain, scale} = calculatedProps;
    // make the axes line up, and cross when appropriate
    const origin = {
      x: Math.max(Math.min(...domain.x), 0),
      y: Math.max(Math.min(...domain.y), 0)
    };
    const axisOrientations = {
      x: Axis.getOrientation(axisComponents.x, "x"),
      y: Axis.getOrientation(axisComponents.y, "y")
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
      x: axisComponents.x && axisComponents.x.offsetX || calculatedOffset.x,
      y: axisComponents.y && axisComponents.y.offsetY || calculatedOffset.y
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
    return ticksFromCategories && ticksFromCategories.length !== 0 ?
      ticksFromCategories : ticksFromStringMap;
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

  getStringsFromChildData(child, axis) {
    if (!child.props.data && !child.type.getData) {
      return [];
    }
    if (child.props.data) {
      return Data.getStringsFromData(child.props, axis);
    }
    const data = flatten(child.type.getData(child.props));
    const attr = axis === "x" ? "xName" : "yName";
    return data.reduce((prev, datum) => {
      return datum[attr] ? prev.concat(datum[attr]) : prev;
    }, []);
  },

  createStringMap(childComponents, axis) {
    const axisComponent = Axis.getAxisComponent(childComponents, axis);
    const tickStrings = axisComponent ? Data.getStringsFromAxes(axisComponent.props, axis) : [];

    const categoryStrings = childComponents.reduce((prev, component) => {
      const categoryData = Data.getStringsFromCategories(component.props, axis);
      return categoryData ? prev.concat(categoryData) : prev;
    }, []);
    const dataStrings = childComponents.reduce((prev, component) => {
      const stringData = this.getStringsFromChildData(component, axis);
      return stringData ? prev.concat(stringData) : prev;
    }, []);
    const allStrings = uniq(flatten([...tickStrings, ...categoryStrings, ...dataStrings]));
    return allStrings.length === 0 ? null :
      allStrings.reduce((memo, string, index) => {
        memo[string] = index + 1;
        return memo;
      }, {});
  }
};
