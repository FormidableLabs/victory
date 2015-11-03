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
