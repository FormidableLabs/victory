import invert from "lodash/object/invert";
import sortBy from "lodash/collection/sortBy";
import values from "lodash/object/values";
import identity from "lodash/utility/identity";
import compact from "lodash/array/compact";
import flatten from "lodash/array/flatten";
import isEmpty from "lodash/lang/isEmpty";
import sum from "lodash/math/sum";
import uniq from "lodash/array/uniq";
import zipObject from "lodash/array/zipObject";
import Axis from "../../helpers/axis";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import React from "react";
import { Collection, Log } from "victory-util";

module.exports = {
  getChildComponents(props, defaultAxes) {
    // set up a counter for component types
    const counts = {};
    const addChild = (child) => {
      const type = child.type && child.type.role;
      const axis = Axis.getAxisType(child);
      if (!counts[type]) {
        counts[type] = axis ? {independent: 0, dependent: 0} : 0;
      }
      if (axis) {
        counts[type][axis] = counts[type][axis] += 1;
      } else {
        counts[type] = counts[type] += 1;
      }
    };

    const limitReached = (child) => {
      const type = child.type && child.type.role;
      const axis = Axis.getAxisType(child);
      if (!counts[type]) {
        return false;
      } else if (axis) {
        return counts[type][axis] >= 1;
      } else if (type === "bar") {
        // TODO: should we remove the limit on grouped data types?
        return counts[type] >= 1;
      }
      return false;
    };

    const total = (type, axis) => {
      const totalCount = (axis && counts[type]) ?
        counts[type][axis] : counts[type];
      return totalCount || 0;
    };

    if (!props.children) {
      return [defaultAxes.independent, defaultAxes.dependent];
    }
    const childComponents = [];
    // loop through children, and add each child to the childComponents array
    // unless the limit for that child type has already been reached.
    React.Children.forEach(props.children, (child) => {
      if (!child || !child.type) { return; }
      const type = child.type && child.type.role;
      if (limitReached(child)) {
        const msg = type === "axis" ?
          `Only one VictoryAxis component of each axis type is allowed when using the ` +
          `VictoryChart wrapper. Only the first axis will be used. Please compose ` +
          `multi-axis charts manually` :
          `Only one " + type + "component is allowed per chart. If you are trying ` +
          `to plot several datasets, please pass an array of data arrays directly ` +
          `into ${type}.`;
        Log.warn(msg);
      } else {
        childComponents.push(child);
      }
      addChild(child);
    });

    // Add default axis components if necessary
    // TODO: should we add both axes by default?
    if (total("axis", "independent") < 1) {
      childComponents.push(defaultAxes.independent);
    }
    if (total("axis", "dependent") < 1) {
      childComponents.push(defaultAxes.dependent);
    }
    return childComponents;
  },

  getDataComponents(childComponents, type) {
    const predicate = {
      all: (role) => role !== "axis",
      data: (role) => role !== "axis" && role !== "bar",
      grouped: (role) => role === "bar"
    };
    return childComponents.filter((child) => {
      const role = child.type && child.type.role;
      return predicate[type].call(null, role);
    });
  },

  getDomain(props, childComponents, axis) {
    let domain;
    if (props.domain && (Array.isArray(props.domain) || props.domain[axis])) {
      domain = Array.isArray(props.domain) ? props.domain : props.domain[axis];
    } else {
      const childDomains = childComponents.map((component) => {
        return component.type.getDomain(component.props, axis);
      });
      const allDomains = Collection.removeUndefined(flatten(childDomains));
      domain = isEmpty(allDomains) ? [0, 1] : [Math.min(...allDomains), Math.max(...allDomains)];
    }
    const paddedDomain = Domain.padDomain(domain, props, axis);
    const orientations = Axis.getAxisOrientations(childComponents);
    return Domain.orientDomain(paddedDomain, orientations, axis);
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

  createStringMap(childComponents, axis) {
    const axisComponent = Axis.getAxisComponent(childComponents, axis);
    const tickStrings = Data.getStringsFromAxes(axisComponent.props, axis);

    const categoryStrings = compact(flatten(childComponents.map((component) => {
      return Data.getStringsFromCategories(component.props, axis);
    })));
    const dataStrings = compact(flatten(childComponents.map((child) => {
      return Data.getStringsFromData(child.props, axis);
    })));
    const allStrings = uniq(compact([...tickStrings, ...categoryStrings, ...dataStrings]));

    return isEmpty(allStrings) ? null :
      zipObject(allStrings.map((string, index) => [string, index + 1]));
  },

  getCategories(childComponents) {
    const groupedComponents = this.getDataComponents(childComponents, "grouped");
    if (isEmpty(groupedComponents)) {
      return undefined;
    }
    // otherwise, create a set of groupedComponent categories
    const allCategories = groupedComponents.map((component) => {
      const categories = component.props.categories;
      return categories && Collection.isArrayOfArrays(categories) ?
        categories.map((arr) => (sum(arr) / arr.length)) : categories;
    });
    const uniqueCategories = compact(uniq(flatten(allCategories)));
    return isEmpty(uniqueCategories) ? undefined : uniqueCategories;
  }
};
