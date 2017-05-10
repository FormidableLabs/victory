import { defaults, isFunction, property, omit, reduce } from "lodash";
import Collection from "./collection";
import React from "react";

export default {
  getPadding(props) {
    const padding = typeof props.padding === "number" ? props.padding : 0;
    const paddingObj = typeof props.padding === "object" ? props.padding : {};
    return {
      top: paddingObj.top || padding,
      bottom: paddingObj.bottom || padding,
      left: paddingObj.left || padding,
      right: paddingObj.right || padding
    };
  },

  getStyles(style, defaultStyles) {
    const width = "100%";
    const height = "100%";
    if (!style) {
      return defaults({ parent: { height, width } }, defaultStyles);
    }

    const { data, labels, parent } = style;
    const defaultParent = defaultStyles && defaultStyles.parent || {};
    const defaultLabels = defaultStyles && defaultStyles.labels || {};
    const defaultData = defaultStyles && defaultStyles.data || {};
    return {
      parent: defaults({}, parent, defaultParent, { width, height }),
      labels: defaults({}, labels, defaultLabels),
      data: defaults({}, data, defaultData)
    };
  },

  evaluateProp(prop, data, active) {
    return isFunction(prop) ? prop(data, active) : prop;
  },

  evaluateStyle(style, data, active) {
    if (!style || !Object.keys(style).some((value) => isFunction(style[value]))) {
      return style;
    }
    return Object.keys(style).reduce((prev, curr) => {
      prev[curr] = this.evaluateProp(style[curr], data, active);
      return prev;
    }, {});
  },

  getRange(props, axis) {
    // determine how to lay the axis and what direction positive and negative are
    const isVertical = axis !== "x";
    const padding = this.getPadding(props);
    if (isVertical) {
      return [props.height - padding.bottom, padding.top];
    }
    return [padding.left, props.width - padding.right];
  },

  createAccessor(key) {
    // creates a data accessor function
    // given a property key, path, array index, or null for identity.
    if (isFunction(key)) {
      return key;
    } else if (key === null || typeof key === "undefined") {
      // null/undefined means "return the data item itself"
      return (x) => x;
    }
    // otherwise, assume it is an array index, property key or path (_.property handles all three)
    return property(key);
  },

  modifyProps(props, fallbackProps, role) {
    const theme = props.theme && props.theme[role] ? props.theme[role] : {};
    const themeProps = omit(theme, ["style"]);
    return defaults({}, props, themeProps, fallbackProps);
  },

  // Axis helpers

  /**
   * Returns the given axis or the opposite axis when horizontal
   * @param {string} axis: the given axis, either "x" pr "y"
   * @param {Boolean} horizontal: true when the chart is flipped to the horizontal orientation
   * @returns {String} the dimension appropriate for the axis given its props "x" or "y"
   */
  getCurrentAxis(axis, horizontal) {
    const otherAxis = axis === "x" ? "y" : "x";
    return horizontal ? otherAxis : axis;
  },

  /**
   * @param {Object} props: axis component props
   * @returns {Boolean} true when the axis is vertical
   */
  isVertical(props) {
    const orientation = props.orientation || (props.dependentAxis ? "left" : "bottom");
    const vertical = { top: false, bottom: false, left: true, right: true };
    return vertical[orientation];
  },

  /**
   * @param {Object} props: axis component props
   * @returns {Boolean} true when tickValues contain strings
   */
  stringTicks(props) {
    return props.tickValues !== undefined && Collection.containsStrings(props.tickValues);
  },

  /**
   * @param {Array} children: an array of child components
   * @param {Function} iteratee: a function with arguments "child", "childName", and "parent"
   * @returns {Array} returns an array of results from calling the iteratee on all nested children
   */
  reduceChildren(children, iteratee) {
    let childIndex = 0;
    const traverseChildren = (childArray, parent) => {
      return reduce(childArray, (memo, child) => {
        const childName = child.props.name || childIndex;
        childIndex++;
        if (child.props && child.props.children) {
          const nestedChildren = React.Children.toArray(child.props.children);
          const nestedResults = traverseChildren(nestedChildren, child);
          memo = memo.concat(nestedResults);
        } else {
          const result = iteratee(child, childName, parent);
          memo = result ? memo.concat(result) : memo;
        }
        return memo;
      }, []);
    };
    return traverseChildren(children);
  }
};
