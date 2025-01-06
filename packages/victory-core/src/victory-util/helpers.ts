import React, { isValidElement } from "react";
import defaults from "lodash/defaults";
import property from "lodash/property";
import pick from "lodash/pick";

import { ValueOrAccessor } from "../types/prop-types";

export type ElementPadding = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type MaybePointData = {
  x?: number;
  x0?: number;
  x1?: number;
  y?: number;
  y0?: number;
  y1?: number;
  _x?: number;
  _x0?: number;
  _x1?: number;
  _y?: number;
  _y0?: number;
  _y1?: number;
  _voronoiX?: number;
  _voronoiY?: number;
};

/**
 * Determine the range of a cartesian axis
 */
function getCartesianRange(options: {
  axis: "x" | "y";
  height: number;
  width: number;
  padding: ElementPadding;
}): [number, number] {
  const vertical = options.axis !== "x";
  if (vertical) {
    return [options.height - options.padding.bottom, options.padding.top];
  }
  return [options.padding.left, options.width - options.padding.right];
}

/**
 * Determine the range of a polar axis in radians
 */
function getPolarRange(options: {
  axis: "x" | "y";
  innerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  padding: ElementPadding;
  height: number;
  width: number;
}): [number, number] {
  if (options.axis === "x") {
    const startAngle = degreesToRadians(options.startAngle || 0);
    const endAngle = degreesToRadians(options.endAngle || 360);
    return [startAngle, endAngle];
  }
  return [
    options.innerRadius || 0,
    getRadius({
      height: options.height,
      width: options.width,
      padding: options.padding,
    }),
  ];
}

/**
 * Creates an object composed of the inverted keys and values of object.
 * If object contains duplicate values, subsequent values overwrite property assignments of previous values.
 */
export function invert(original: Record<string, string | number>) {
  return Object.entries(original).reduce((acc, current) => {
    acc[current[1]] = current[0];
    return acc;
  }, {});
}

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

/**
 * Coalesce the x and y values from a data point
 */
export function getPoint(datum: MaybePointData): MaybePointData {
  const { _x, _x1, _x0, _voronoiX, _y, _y1, _y0, _voronoiY } = datum;
  const defaultX = _x1 ?? _x;
  const defaultY = _y1 ?? _y;

  const point = {
    x: _voronoiX ?? defaultX,
    x0: _x0 ?? _x,
    y: _voronoiY ?? defaultY,
    y0: _y0 ?? _y,
  };

  return defaults({}, point, datum);
}

/**
 * Scale a point based on the origin, direction, and given scale function
 */
export function scalePoint(
  props: {
    scale: { x: (x?: number) => number; y: (y?: number) => number };
    polar?: boolean;
    horizontal?: boolean;
    origin?: { x: number; y: number };
  },
  datum: MaybePointData,
) {
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

/**
 * Returns a padding value from a number or partial padding values
 */
export function getPadding(
  padding?: number | Partial<ElementPadding>,
): ElementPadding {
  const paddingVal = typeof padding === "number" ? padding : 0;
  const paddingObj = typeof padding === "object" ? padding : {};
  return {
    top: paddingObj.top || paddingVal,
    bottom: paddingObj.bottom || paddingVal,
    left: paddingObj.left || paddingVal,
    right: paddingObj.right || paddingVal,
  };
}

/**
 * Returns true if the component is defined as a tooltip
 */
export function isTooltip(component?: { type?: { role?: string } }) {
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

/**
 * Returns the value of a prop or accessor function with the given props
 */
export function evaluateProp<TValue>(
  prop: ValueOrAccessor<TValue, Record<string, any>>,
  props: Record<string, any>,
): TValue {
  return isFunction(prop) ? prop(props) : prop;
}

export function evaluateStyle(style, props) {
  if (props.disableInlineStyles) {
    return {};
  }
  if (!style || !Object.keys(style).some((value) => isFunction(style[value]))) {
    return style;
  }
  return Object.keys(style).reduce((prev, curr) => {
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

/**
 * Get the maximum radius that will fit in the container
 */
export function getRadius(options: {
  height: number;
  width: number;
  padding: ElementPadding;
}) {
  const { width, height, padding } = options;
  const { left, right, top, bottom } = padding;
  return Math.min(width - left - right, height - top - bottom) / 2;
}

/**
 * Returns the origin for a polar chart within the padded area
 */
export function getPolarOrigin(props: {
  height: number;
  width: number;
  padding: ElementPadding;
}): { x: number; y: number } {
  const { width, height } = props;
  const { top, bottom, left, right } = getPadding(props.padding);
  const radius = Math.min(width - left - right, height - top - bottom) / 2;
  const offsetWidth = width / 2 + left - right;
  const offsetHeight = height / 2 + top - bottom;
  return {
    x: offsetWidth + radius > width ? radius + left - right : offsetWidth,
    y: offsetHeight + radius > height ? radius + top - bottom : offsetHeight,
  };
}

/**
 * Determine the range of an axis based on the given props
 */
export function getRange(
  props: {
    range?: [number, number];
    polar?: boolean;
    innerRadius?: number;
    startAngle?: number;
    endAngle?: number;
    height: number;
    width: number;
    padding: number | Partial<ElementPadding>;
  },
  axis: "x" | "y",
) {
  if (props.range && props.range[axis]) {
    return props.range[axis];
  } else if (props.range && Array.isArray(props.range)) {
    return props.range;
  }
  return props.polar
    ? getPolarRange({
        axis,
        innerRadius: props.innerRadius,
        startAngle: props.startAngle,
        endAngle: props.endAngle,
        height: props.height,
        width: props.width,
        padding: getPadding(props.padding),
      })
    : getCartesianRange({
        axis,
        height: props.height,
        width: props.width,
        padding: getPadding(props.padding),
      });
}

/**
 * Checks if `value` is `null` or `undefined`.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 */
export function isNil(value: any): boolean {
  // eslint-disable-next-line eqeqeq
  return value == null;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @since 0.1.0
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 */
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === "function";
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
 * Creates an object with the same keys as object and values generated by running
 * each own enumerable string keyed property of object through the function fn
 */
export function mapValues<T>(
  values: T,
  fn: (value?: any) => any,
): T | undefined {
  if (values) {
    return Object.keys(values).reduce((acc, key) => {
      acc[key] = fn(values[key]);
      return acc;
    }, {} as T);
  }
}

/**
 * Creates an array of numbers (positive and/or negative) progressing
 * from start up to, but not including, end.
 * A step of -1 is used if a negative start is specified without an end or step.
 * If end is not specified, it's set to start with start then set to 0.
 *
 * @param start The length of the array to create, or the start value
 * @param end [The end value] If this is defined, start is the start value
 * @returns An array of the given length
 */
export function range(start: number, end?: number, increment?: number) {
  // when the end index is not given, start from 0
  const startIndex = end ? start : 0;

  // when the end index is not given, the end of the range is the start index
  let endIndex = end ? end : start;

  // ensure endIndex is not a falsy value
  if (!endIndex) endIndex = 0;

  const k = endIndex - startIndex; // the value range
  const length = Math.abs(k); //      the length of the range
  const sign = k / length || 1; //    the sign of the range (negative or positive)
  const inc = increment || 1; //      the step size of each increment

  // normalize the array length when dealing with floating point values
  const arrayLength = Math.max(Math.ceil(length / inc), 0);

  return Array.from(Array(arrayLength), (_, i) => startIndex + i * sign * inc);
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
      let newMemo = memo;
      const childRole = child.type && child.type.role;
      const childName = child.props.name || `${childRole}-${names[index]}`;
      if (child.props && child.props.children) {
        const childProps = Object.assign(
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
                const nestedChildProps = Object.assign(
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
        newMemo = combine(newMemo, nestedResults);
      } else {
        const result = iteratee(child, childName, parent);
        if (result) {
          newMemo = combine(newMemo, result);
        }
      }
      return newMemo;
    }, initialMemo);
  };

  const validChildren = children.filter(isValidElement);
  const childNames = validChildren.map((c, i) => i);
  return traverseChildren(validChildren, childNames);
}

/**
 * @param {Object} props: the props object
 * @returns {Boolean} returns true if the props object contains `horizontal: true` of if any
 * children or nested children are horizontal
 */
export function isHorizontal(props: {
  horizontal?: boolean;
  children?: React.ReactNode;
}) {
  if (props.horizontal !== undefined || !props.children) {
    return props.horizontal;
  }
  const traverseChildren = (childArray) => {
    return childArray.reduce((memo, child) => {
      const childProps = child.props || {};
      if (memo || childProps.horizontal || !childProps.children) {
        return memo || childProps.horizontal;
      }
      return traverseChildren(React.Children.toArray(childProps.children));
    }, false);
  };
  return traverseChildren(React.Children.toArray(props.children));
}
