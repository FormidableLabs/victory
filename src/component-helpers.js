import some from "lodash/collection/some";

import { Log } from "victory-util";
import React from "react";

module.exports = {
  getAxisType(child) {
    if (!child.type || child.type.role !== "axis") {
      return undefined;
    }
    return child.props.dependentAxis ? "dependent" : "independent";
  },

  getChildComponents(props, defaultData, defaultAxes) {
    // set up a counter for component types
    const count = () => {
      const counts = {};
      return {
        add: (child) => {
          const type = child.type && child.type.role;
          const axis = this.getAxisType(child);
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
          const axis = this.getAxisType(child);
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

  getAxisComponent(childComponents, axis) {
    const getAxis = (component) => {
      const flipped = some(childComponents, (child) => child.props.horizontal);
      return component.type.getAxis(component.props, flipped);
    };
    const axisComponents = childComponents.filter((component) => {
      return component.type.role === "axis" && getAxis(component) === axis;
    });
    return axisComponents[0];
  }
};
