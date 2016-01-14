import compact from "lodash/array/compact";
import flatten from "lodash/array/flatten";
import invert from "lodash/object/invert";
import isEmpty from "lodash/lang/isEmpty";
import some from "lodash/collection/some";
import sortBy from "lodash/collection/sortBy";
import sum from "lodash/math/sum";
import uniq from "lodash/array/uniq";
import values from "lodash/object/values";
import zipObject from "lodash/array/zipObject";

import { Collection, Log, Data, Domain, Scale } from "victory-util";
import React from "react";

const getAxisType = (child) => {
  if (!child.type || child.type.role !== "axis") {
    return undefined;
  }
  return child.props.dependentAxis ? "dependent" : "independent";
};

const getDataComponents = (childComponents, type) => {
  const predicate = {
    all: (role) => role !== "axis",
    data: (role) => role !== "axis" && role !== "bar",
    grouped: (role) => role === "bar"
  };
  return childComponents.filter((child) => {
    const role = child.type && child.type.role;
    return predicate[type].call(null, role);
  });
};

const getChildComponents = (props, defaultData, defaultAxes) => {
  // set up a counter for component types
  const count = () => {
    const counts = {};
    return {
      add: (child) => {
        const type = child.type && child.type.role;
        const axis = getAxisType(child);
        if (!counts[type]) {
          counts[type] = axis ? {independent: 0, dependent: 0} : 0;
        }
        if (axis) {
          counts[type][axis] = counts[type][axis] += 1;
        } else {
          counts[type] = counts[type] += 1;
        }
      },
      limitReached: (child) => {
        const type = child.type && child.type.role;
        const axis = getAxisType(child);
        if (!counts[type]) {
          return false;
        } else if (axis) {
          return counts[type][axis] > 1;
        } else if (type === "bar") {
          // TODO: should we remove the limit on grouped data types?
          return counts[type] > 1;
        }
        return false;
      },
      total: (type, axis) => {
        const totalCount = (axis && counts[type]) ?
          counts[type][axis] : counts[type];
        return totalCount || 0;
      }
    };
  }();

  if (!props.children) {
    return [defaultData, defaultAxes.independent, defaultAxes.dependent];
  }
  const childComponents = [];
  // loop through children, and add each child to the childComponents array
  // unless the limit for that child type has already been reached.
  React.Children.forEach(props.children, (child) => {
    if (!child || !child.type) { return; }
    const type = child.type && child.type.role;
    if (count.limitReached(child)) {
      const msg = type === "axis" ?
        `Only one VictoryAxis component of each axis type is allowed when using the ` +
        `VictoryChart wrapper. Only the first axis will be used. Please compose ` +
        `multi-axis charts manually` :
        `Only one " + type + "component is allowed per chart. If you are trying ` +
        `to plot several datasets, please pass an array of data arrays directly ` +
        `into ${type}.`;
      Log.warn(msg);
    }
    childComponents.push(child);
    count.add(child);
  });

  // Add default axis components if necessary
  // TODO: should we add both axes by default?
  if (count.total("axis", "independent") < 1) {
    childComponents.push(defaultAxes.independent);
  }
  if (count.total("axis", "dependent") < 1) {
    childComponents.push(defaultAxes.dependent);
  }

  // Add defaut data if no data is provided
  const dataComponents = childComponents.filter((child) => {
    const type = child.type && child.type.role;
    return type !== "axis";
  });

  if (dataComponents.length === 0) { childComponents.push(defaultData); }
  return childComponents;
};

const getAxisComponent = (childComponents, axis) => {
  const getAxis = (component) => {
    const flipped = some(childComponents, (child) => child.props.horizontal);
    return component.type.getAxis(component.props, flipped);
  };
  const axisComponents = childComponents.filter((component) => {
    return component.type.role === "axis" && getAxis(component) === axis;
  });
  return axisComponents[0];
};

const _getStringsFromData = (childComponents, axis) => {
  // Collect strings from dataComponents and groupedDataComponents props.data
  const xyStrings = childComponents.map((child) => Data.getStringsFromXY(child, axis));
  const dataStrings = childComponents.map((child) => Data.getStringsFromData(child, axis));
  const allStrings = compact(flatten([...xyStrings, ...dataStrings]));
  return uniq(allStrings);
};

const createStringMap = (childComponents, categories, axis) => {
  const axisComponent = getAxisComponent(childComponents, axis);
  const tickStrings = Data.getStringsFromAxes(axisComponent.props, axis);

  const categoryStrings = compact(flatten(childComponents.map((component) => {
    return Data.getStringsFromCategories(component.props, axis);
  })));

  const dataStrings = _getStringsFromData(childComponents, axis);

  const allStrings = uniq(compact([...tickStrings, ...categoryStrings, ...dataStrings]));

  return isEmpty(allStrings) ? null :
    zipObject(allStrings.map((string, index) => [string, index + 1]));
};

const getScale = (props, axisComponent, axis) => {
  const propsScale = Scale.getScaleFromProps(props, axis);
    // otherwise use whatever scale the axis uses, (default: d3.scale.linear)
  const axisScale = axisComponent.type.getScale(axisComponent.props);
  return propsScale || axisScale;
};

const getAxisOffset = (props, calculatedProps) => {
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
};

const getCategories = (childComponents) => {
  const groupedComponents = getDataComponents(childComponents, "grouped");
  if (isEmpty(groupedComponents)) {
    return undefined;
  }
  // otherwise, create a set of tickValues base on groupedData categories
  const allCategories = groupedComponents.map((component) => {
    const categories = component.props.categories;
    return categories && Collection.isArrayOfArrays(categories) ?
      categories.map((arr) => (sum(arr) / arr.length)) : categories;
  });
  const uniqueCategories = compact(uniq(flatten(allCategories)));
  return isEmpty(uniqueCategories) ? undefined : uniqueCategories;
};

const getTicksFromData = (component, axis, calculatedProps) => {
  const stringMap = calculatedProps.stringMap[axis];
  // if tickValues are defined for an axis component use them
  const categoryArray = calculatedProps.categories[axis];
  const ticksFromCategories = categoryArray && Collection.containsOnlyStrings(categoryArray) ?
    categoryArray.map((tick) => stringMap[tick]) : categoryArray;
  const ticksFromStringMap = stringMap && values(stringMap);
  // when ticks is undefined, axis will determine it's own ticks
  return ticksFromCategories || ticksFromStringMap;
};

const getTicksFromAxis = (component, axis, calculatedProps) => {
  const tickValues = component.props.tickValues;
  if (!tickValues) {
    return undefined;
  }
  const stringMap = calculatedProps.stringMap[axis];
  return Collection.containsOnlyStrings(tickValues) && stringMap ?
    tickValues.map((tick) => stringMap[tick]) : tickValues;
};

const getTicks = (...args) => {
  return getTicksFromAxis(...args) || getTicksFromData(...args);
};

const getTickFormat = (component, axis, calculatedProps) => {
  const tickValues = component.props.tickValues;
  const stringMap = calculatedProps.stringMap[axis];
  if (tickValues && !Collection.containsStrings(tickValues)) {
    return (x) => x;
  } else if (stringMap !== null) {
    const tickValueArray = sortBy(values(stringMap), (n) => n);
    const invertedStringMap = invert(stringMap);
    const dataNames = tickValueArray.map((tick) => invertedStringMap[tick]);
    // string ticks should have one tick of padding at the beginning
    const dataTicks = ["", ...dataNames, ""];
    return (x) => dataTicks[x];
  } else {
    return calculatedProps.scale[axis].tickFormat();
  }
};

const getAxisOrientation = (component, axis) => {
  if (component.props.orientation) {
    return component.props.orientation;
  }
  const typicalOrientations = {x: "bottom", y: "left"};
  const flippedOrientations = {x: "left", y: "bottom"};
  const dependent = component.props.dependentAxis;
  return (dependent && axis === "y") || (!dependent && axis === "x") ?
    typicalOrientations[axis] : flippedOrientations[axis];
};

const orientDomain = (domain, orientation, axis) => {
  // If the other axis is in a reversed orientation, the domain of this axis
  // needs to be reversed
  const otherAxis = axis === "x" ? "y" : "x";
  const defaultOrientation = otherAxis === "x" ? "bottom" : "left";
  const standardOrientation = orientation[otherAxis] === defaultOrientation;
  const flippedAxis = orientation.x === "left" || orientation.x === "right";
  if (flippedAxis) {
    return standardOrientation ?
      domain.concat().reverse() : domain;
  } else {
    return standardOrientation ?
      domain : domain.concat().reverse();
  }
};

/*eslint-disable max-params */
const getDomain = (props, childComponents, orientations, axis) => {
  let domain;
  if (props.domain && (Array.isArray(props.domain) || props.domain[axis])) {
    domain = Array.isArray(props.domain) ? props.domain : props.domain[axis];
  } else {
    const childDomains = childComponents.map((component) => {
      return component.type.getDomain(component.props, axis);
    });
    const allDomains = Collection.removeUndefined(flatten(childDomains));
    domain = [Math.min(...allDomains), Math.max(...allDomains)];
  }
  const paddedDomain = Domain.padDomain(domain, props, axis);
  return orientDomain(paddedDomain, orientations, axis);
};
/*eslint-enable max-params */

export default {
  createStringMap,
  getAxisComponent,
  getAxisOffset,
  getAxisOrientation,
  getCategories,
  getChildComponents,
  getDataComponents,
  getDomain,
  getScale,
  getTicks,
  getTickFormat,
  orientDomain
};
