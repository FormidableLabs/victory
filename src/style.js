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
    greyscale: [
      "#7d7d7d", "#5e5e5e", "#404040", "#969696",
      "#2b2b2b", "#bdbdbd", "d6d6d6", "#000000"
    ],
    qualitative: [
      "#334D5C", "#45B29D", "#EFC94C", "#E27A3F", "#DF5A49",
      "#4F7DA1", "#55DBC1", "#EFDA97", "#E2A37F", "#DF948A"
    ],
    diverging: [
      "#A83800", "#D64700", "#D66C00", "#FFB403", "#C6B403",
      "#36A69A", "#297F8D", "#17576D", "#073C58", "#002A4A"
    ],
    diverging2: [
      "#7E1E28", "#962E3D", "#B5374E", "#E54663",
      "#0368F5", "#0229AB", "#011454", "#000133"
    ],
    heatmap: ["#BE2805", "#EC5519", "#DC8505", "#717400", "#32450C"],
    warm: ["#5C110F", "#901811", "#BF5C00", "#E2AD3B", "#F0C755"],
    cool: ["#272433", "#343F4F", "#3D6066", "#77994C", "#B2D249"],
    red: ["#360000", "#600000", "#790000", "#AD1414", "#D91919"],
    blue: ["#00295A", "#00427D", "#006ECF", "#3590DE", "#65B4F4"],
    green: ["#28361A", "#354C25", "#4A6B33", "#678544", "#8BA663"]
  };
  return name ? scales[name] : scales.victory;
};
