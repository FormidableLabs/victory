import reduceCSSCalc from "reduce-css-calc";

/**
 * Given an object with CSS/SVG transform definitions, return the string value
 * for use with the `transform` CSS property or SVG attribute. Note that we
 * can't always guarantee the order will match the author's intended order, so
 * authors should only use the object notation if they know that their transform
 * is commutative or that there is only one.
 * @param {Object} obj An object of transform definitions.
 * @returns {String} The generated transform string.
 */
export const toTransformString = function (obj) {
  if (!obj || typeof obj === "string") {
    return obj;
  }
  const transforms = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      transforms.push(`${key}(${value})`);
    }
  }
  return transforms.join(" ");
};

export const calc = function (expr, precision) {
  return reduceCSSCalc(`calc(${expr})`, precision);
};

/**
 * Given the name of a color scale, getColorScale will return an array
 * of 5 hex string values in that color scale. If no 'name' parameter
 * is given, it will return the Victory default grayscale.
 * @param {String} name The name of the color scale to return (optional).
 * @returns {Array} An array of 5 hex string values composing a color scale.
 */
export const getColorScale = function (name) {
  const scales = {
    victory: ["#9f9f9f", "#e0dfe0", "#7e7e7e", "#d3d2d3", "#000000"],
    gray: ["#969696", "#f1f1f1", "#636363", "#cccccc", "#252525"],
    bluePurple: ["#8c96c6", "#edf8fb", "#8856a7", "#b3cde3", "#810f7c"],
    red: ["#de2d26", "#fee5d9", "#fb6a4a", "#fcae91", "#a50f15"],
    yellowBlue: ["#41b6c4", "#ffffcc", "#2c7fb8", "#a1dab4", "#253494"]
  };
  return name ? scales[name] : scales.victory;
};
