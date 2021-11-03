import * as React from "react";
/**
 * creates an object with some keys excluded
 * replacement for lodash.omit for performance. does not mimick the entire lodash.omit api
 * @param {Object} originalObject: created object will be based on this object
 * @param {Array<String>} keys: an array of keys to omit from the new object
 * @returns {Object} new object with same properties as originalObject
 */
export const omit = (originalObject, keys = []) => {
  // code based on babel's _objectWithoutProperties
  const newObject = {};
  for (const key in originalObject) {
    if (keys.indexOf(key) >= 0) {
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(originalObject, key)) {
      continue;
    }
    newObject[key] = originalObject[key];
  }
  return newObject;
};

const unsupportedProps = ["pointerEvents", "x", "y", "_x", "_y", "userSelect"];
const unsupportedAndStrokeProps = [
  "stroke",
  "strokeWidth",
  "strokeOpacity",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  ...unsupportedProps
];

const getStyle = (style, extraOmitProperties) => {
  if (!style) {
    return undefined;
  }
  // TODO: more style fixes for Native?
  const omitProperties =
    style.stroke === "none" || style.stroke === "transparent"
      ? unsupportedAndStrokeProps
      : unsupportedProps;
  return extraOmitProperties
    ? omit(style, [...omitProperties, ...extraOmitProperties])
    : omit(style, omitProperties);
};

export default {
  getStyle
};

export const useGetNativeStyle = (style, extraOmitProperties) => {
  return React.useMemo(
    () => getStyle(style, extraOmitProperties),
    [style, extraOmitProperties]
  );
};
