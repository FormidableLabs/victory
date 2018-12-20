/**
 * Given an object with CSS/SVG transform definitions, return the string value
 * for use with the `transform` CSS property or SVG attribute. Note that we
 * can't always guarantee the order will match the author's intended order, so
 * authors should only use the object notation if they know that their transform
 * is commutative or that there is only one.
 * @param {Object} obj An object of transform definitions.
 * @returns {String} The generated transform string.
 */
const toTransformString = function(obj, ...more) {
  if (more.length > 0) {
    return more
      .reduce((memo, currentObj) => {
        return [memo, toTransformString(currentObj)].join(" ");
      }, toTransformString(obj))
      .trim();
  } else {
    if (obj === undefined || obj === null || typeof obj === "string") {
      return obj;
    }
    const transforms = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        transforms.push(`${key}(${value})`);
      }
    }
    return transforms.join(" ").trim();
  }
};

export default {
  toTransformString,

  /**
   * Given the name of a color scale, getColorScale will return an array
   * of 5 hex string values in that color scale. If no 'name' parameter
   * is given, it will return the Victory default grayscale.
   * @param {String} name The name of the color scale to return (optional).
   * @returns {Array} An array of 5 hex string values composing a color scale.
   */
  getColorScale(name) {
    const scales = {
      grayscale: ["#cccccc", "#969696", "#636363", "#252525"],
      qualitative: [
        "#334D5C",
        "#45B29D",
        "#EFC94C",
        "#E27A3F",
        "#DF5A49",
        "#4F7DA1",
        "#55DBC1",
        "#EFDA97",
        "#E2A37F",
        "#DF948A"
      ],
      heatmap: ["#428517", "#77D200", "#D6D305", "#EC8E19", "#C92B05"],
      warm: ["#940031", "#C43343", "#DC5429", "#FF821D", "#FFAF55"],
      cool: ["#2746B9", "#0B69D4", "#2794DB", "#31BB76", "#60E83B"],
      red: ["#FCAE91", "#FB6A4A", "#DE2D26", "#A50F15", "#750B0E"],
      blue: ["#002C61", "#004B8F", "#006BC9", "#3795E5", "#65B4F4"],
      green: ["#354722", "#466631", "#649146", "#8AB25C", "#A9C97E"]
    };
    return name ? scales[name] : scales.grayscale;
  }
};
