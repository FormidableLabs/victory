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
 * Given a string description of what is to be colored by the function,
 * grayscaleColors will return a string hex value as chosen by the Victory
 * default styles.
 * @param {String} name A string saying what is to be colored.
 * @returns {String} The hex value representing the color.
 */
export const grayscaleColors = function(name) {
  const grayscale = {
    bar: "#9f9f9f",
    axisLabel: "7e7e7e",
    line: "#000000"
  }
  return name === 'axisLine' ? grayscale.bar : grayscale[name];
};

// this method is intended to generate a color scale
// it can be called with a "name" parameter to request a specific scale
// but if there is no param, it will return a random scale (eventually)
// returns an array of 5 strings of hex values
export const generateColorScale = function(name) {
  const scales = {
    formidable: ["#e0dfe0", "#d3d2d3", "#9f9f9f", "#7e7e7e", "#000000"],
    grayscale: ["#f7f7f7", "#cccccc", "#9696996", "#636363", "#252525"],
    bluePurple: ["#edf8fb", "#b3cde3", "#8c96c6", "#8856a7", "#810f7c"],
    red: ["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"],
    yellowBlue: ["#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"]
  }
  return scales[name];
};
