/* eslint-disable no-use-before-define */
import React from "react";
import { defaults, isFunction, property, pick, assign, keys } from "lodash";
import { CallbackArgs } from "../types/callbacks";
import { ValueOrAccessor } from "../types/prop-types";

// Private Functions

function getCartesianRange(props, axis) {
  // determine how to lay the axis and what direction positive and negative are
  const vertical = axis !== "x";
  const padding = getPadding(props);
  if (vertical) {
    return [props.height - padding.bottom, padding.top];
  }
  return [padding.left, props.width - padding.right];
}

function getPolarRange(props, axis) {
  if (axis === "x") {
    const startAngle = degreesToRadians(props.startAngle || 0);
    const endAngle = degreesToRadians(props.endAngle || 360);
    return [startAngle, endAngle];
  }
  return [props.innerRadius || 0, getRadius(props)];
}

// Exported Functions

/**
 * creates an object with some keys excluded
 * replacement for lodash.omit for performance. does not mimic the entire lodash.omit api
 * @param {Object} originalObject: created object will be based on this object
 * @param {Array<String>} ks: an array of keys to omit from the new object
 * @returns {Object} new object with same properties as originalObject
 */
export function omit<T, Keys extends keyof T>(
  originalObject: T,
  ks: Array<Keys> = [],
): Omit<T, Keys> {
  // code based on babel's _objectWithoutProperties
  const newObject = {} as T;
  for (const key in originalObject) {
    // @ts-expect-error String is not assignable to Key
    if (ks.indexOf(key) >= 0) {
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(originalObject, key)) {
      continue;
    }
    newObject[key] = originalObject[key];
  }
  return newObject;
}

export function getPoint(datum) {
  const exists = (val) => val !== undefined;
  const { _x, _x1, _x0, _voronoiX, _y, _y1, _y0, _voronoiY } = datum;
  const defaultX = exists(_x1) ? _x1 : _x;
  const defaultY = exists(_y1) ? _y1 : _y;
  const point = {
    x: exists(_voronoiX) ? _voronoiX : defaultX,
    x0: exists(_x0) ? _x0 : _x,
    y: exists(_voronoiY) ? _voronoiY : defaultY,
    y0: exists(_y0) ? _y0 : _y,
  };
  return defaults({}, point, datum);
}

export function scalePoint(props, datum) {
  const { scale, polar, horizontal } = props;
  const d = getPoint(datum);
  const origin = props.origin || { x: 0, y: 0 };
  const x = horizontal ? scale.y(d.y) : scale.x(d.x);
  const x0 = horizontal ? scale.y(d.y0) : scale.x(d.x0);
  const y = horizontal ? scale.x(d.x) : scale.y(d.y);
  const y0 = horizontal ? scale.x(d.x0) : scale.y(d.y0);
  return {
    x: polar ? y * Math.cos(x) + origin.x : x,
    x0: polar ? y0 * Math.cos(x0) + origin.x : x0,
    y: polar ? -y * Math.sin(x) + origin.y : y,
    y0: polar ? -y0 * Math.sin(x0) + origin.x : y0,
  };
}

export function getPadding(props, name = "padding") {
  const padding = props[name];
  const paddingVal = typeof padding === "number" ? padding : 0;
  const paddingObj = typeof padding === "object" ? padding : {};
  return {
    top: paddingObj.top || paddingVal,
    bottom: paddingObj.bottom || paddingVal,
    left: paddingObj.left || paddingVal,
    right: paddingObj.right || paddingVal,
  };
}

export function isTooltip(component) {
  const labelRole = component && component.type && component.type.role;
  return labelRole === "tooltip";
}

export function getDefaultStyles(props, role) {
  const { theme = {}, labelComponent } = props;
  const defaultStyles = (theme[role] && theme[role].style) || {};
  if (!isTooltip(labelComponent)) {
    return defaultStyles;
  }
  const tooltipStyle = (theme.tooltip && theme.tooltip.style) || {};
  const labelStyle = defaults({}, tooltipStyle, defaultStyles.labels);
  return defaults({}, { labels: labelStyle }, defaultStyles);
}

export function getStyles(style, defaultStyles) {
  const width = "100%";
  const height = "100%";
  if (!style) {
    return defaults({ parent: { height, width } }, defaultStyles);
  }
  const { data, labels, parent } = style;
  const defaultParent = (defaultStyles && defaultStyles.parent) || {};
  const defaultLabels = (defaultStyles && defaultStyles.labels) || {};
  const defaultData = (defaultStyles && defaultStyles.data) || {};
  return {
    parent: defaults({}, parent, defaultParent, { width, height }),
    labels: defaults({}, labels, defaultLabels),
    data: defaults({}, data, defaultData),
  };
}

export function evaluateProp<TValue>(
  prop: ValueOrAccessor<TValue, CallbackArgs>,
  props: CallbackArgs,
): TValue {
  return isFunction(prop) ? prop(props) : prop;
}

export function evaluateStyle(style, props) {
  if (props.disableInlineStyles) {
    return {};
  }
  if (!style || !keys(style).some((value) => isFunction(style[value]))) {
    return style;
  }
  return keys(style).reduce((prev, curr) => {
    prev[curr] = evaluateProp(style[curr], props);
    return prev;
  }, {});
}

export function degreesToRadians(degrees) {
  return typeof degrees === "number" ? degrees * (Math.PI / 180) : degrees;
}

export function radiansToDegrees(radians) {
  return typeof radians === "number" ? radians / (Math.PI / 180) : radians;
}

export function getRadius(props) {
  const { left, right, top, bottom } = getPadding(props);
  const { width, height } = props;
  return Math.min(width - left - right, height - top - bottom) / 2;
}

export function getPolarOrigin(props) {
  const { width, height } = props;
  const { top, bottom, left, right } = getPadding(props);
  const radius = Math.min(width - left - right, height - top - bottom) / 2;
  const offsetWidth = width / 2 + left - right;
  const offsetHeight = height / 2 + top - bottom;
  return {
    x: offsetWidth + radius > width ? radius + left - right : offsetWidth,
    y: offsetHeight + radius > height ? radius + top - bottom : offsetHeight,
  };
}

export function getRange(props, axis) {
  if (props.range && props.range[axis]) {
    return props.range[axis];
  } else if (props.range && Array.isArray(props.range)) {
    return props.range;
  }
  return props.polar
    ? getPolarRange(props, axis)
    : getCartesianRange(props, axis);
}

export function createAccessor(key) {
  // creates a data accessor function
  // given a property key, path, array index, or null for identity.
  if (isFunction(key)) {
    return key;
  } else if (key === null || key === undefined) {
    // null/undefined means "return the data item itself"
    return (x) => x;
  }
  // otherwise, assume it is an array index, property key or path (_.property handles all three)
  return property(key);
}

export function modifyProps(props, fallbackProps?, role?) {
  const theme = props.theme && props.theme[role] ? props.theme[role] : {};
  const themeProps = omit(theme, ["style"]);
  const horizontal = isHorizontal(props);
  const defaultObject = horizontal === undefined ? {} : { horizontal };
  return defaults(defaultObject, props, themeProps, fallbackProps);
}

/**
 * Returns the given axis or the opposite axis when horizontal
 * @param {string} axis: the given axis, either "x" pr "y"
 * @param {Boolean} horizontal: true when the chart is flipped to the horizontal orientation
 * @returns {String} the dimension appropriate for the axis given its props "x" or "y"
 */
export function getCurrentAxis(axis, horizontal) {
  const otherAxis = axis === "x" ? "y" : "x";
  return horizontal ? otherAxis : axis;
}

/**
 * @param {Array} children: an array of child components
 * @param {Function} iteratee: a function with arguments "child", "childName", and "parent"
 * @param {Object} parentProps: props from the parent that are applied to children
 * @param {any}  initialMemo: The object in which the iteration results are combined.
 * @param {Function} combine: Combines the result of the iteratee with the current memo
 *   to the memo for the next iteration step
 * @returns {Array} returns an array of results from calling the iteratee on all nested children
 */
/* eslint-disable max-params */
export function reduceChildren<
  TChildren extends React.ReactNode,
  TItem,
  TResult = TItem[],
>(
  children: TChildren[],
  iteratee: (
    child: TChildren,
    childName: string,
    parent?: TChildren,
  ) => TItem | null,
  parentProps = {},
  // @ts-expect-error These defaults are hard to type
  initialMemo: TResult = [],
  combine: (memo: TResult, item: TItem) => TResult = (memo, item) =>
    // @ts-expect-error These defaults are hard to type
    memo.concat(item),
): TResult {
  const sharedProps = [
    "data",
    "domain",
    "categories",
    "polar",
    "startAngle",
    "endAngle",
    "minDomain",
    "maxDomain",
    "horizontal",
  ];
  const traverseChildren = (childArray, names, parent?) => {
    return childArray.reduce((memo, child, index) => {
      const childRole = child.type && child.type.role;
      const childName = child.props.name || `${childRole}-${names[index]}`;
      if (child.props && child.props.children) {
        const childProps = assign(
          {},
          child.props,
          pick(parentProps, sharedProps),
        );

        const nestedChildren =
          child.type &&
          child.type.role === "stack" &&
          isFunction(child.type.getChildren)
            ? child.type.getChildren(childProps)
            : (
                React.Children.toArray(
                  child.props.children,
                ) as Array<React.ReactElement>
              ).map((c) => {
                const nestedChildProps = assign(
                  {},
                  c.props,
                  pick(childProps, sharedProps),
                );
                return React.cloneElement(c, nestedChildProps);
              });

        const childNames = nestedChildren.map((c, i) => `${childName}-${i}`);
        const nestedResults = traverseChildren(
          nestedChildren,
          childNames,
          child,
        );
        memo = combine(memo, nestedResults);
      } else {
        const result = iteratee(child, childName, parent);
        if (result) {
          memo = combine(memo, result);
        }
      }
      return memo;
    }, initialMemo);
  };
  const childNames = children.map((c, i) => i);
  return traverseChildren(children, childNames);
}

/**
 * @param {Object} props: the props object
 * @returns {Boolean} returns true if the props object contains `horizontal: true` of if any
 * children or nested children are horizontal
 */
export function isHorizontal(props) {
  if (props.horizontal !== undefined || !props.children) {
    return props.horizontal;
  }
  const traverseChildren = (childArray) => {
    return childArray.reduce((memo, child) => {
      const childProps = child.props || {};
      if (memo || childProps.horizontal || !childProps.children) {
        memo = memo || childProps.horizontal;
        return memo;
      }
      return traverseChildren(React.Children.toArray(childProps.children));
    }, false);
  };
  return traverseChildren(React.Children.toArray(props.children));
}
