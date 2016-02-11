import flatten from "lodash/array/flatten";
import isEmpty from "lodash/lang/isEmpty";
import Domain from "./domain";
import Axis from "./axis";
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
  }
};
