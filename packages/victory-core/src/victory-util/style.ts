import {
  VictoryTheme,
  VictoryThemeDefinition,
} from "../victory-theme/victory-theme";

/**
 * Given an object with CSS/SVG transform definitions, return the string value
 * for use with the `transform` CSS property or SVG attribute. Note that we
 * can't always guarantee the order will match the author's intended order, so
 * authors should only use the object notation if they know that their transform
 * is commutative or that there is only one.
 * @param {Object} obj An object of transform definitions.
 * @returns {String} The generated transform string.
 */
export const toTransformString = function (obj, ...more) {
  if (more.length > 0) {
    return more
      .reduce((memo, currentObj) => {
        return [memo, toTransformString(currentObj)].join(" ");
      }, toTransformString(obj))
      .trim();
  }
  if (obj === undefined || obj === null || typeof obj === "string") {
    return obj;
  }
  const transforms = [] as string[];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      transforms.push(`${key}(${value})`);
    }
  }
  return transforms.join(" ").trim();
};

/**
 * Given the name of a color scale, getColorScale will return an array
 * of 5 hex string values in that color scale. If no 'name' parameter
 * is given, it will return the Victory default grayscale.
 * @param {String} name The name of the color scale to return (optional).
 * @param {Object} theme The theme object to retrieve the color scale from (optional).
 * @returns {Array} An array of 5 hex string values composing a color scale.
 */
export function getColorScale(
  name?: string,
  theme: VictoryThemeDefinition = VictoryTheme.material,
) {
  const {
    palette: {
      grayscale = ["#cccccc", "#969696", "#636363", "#252525"],
      qualitative = [],
      heatmap = [],
      warm = [],
      cool = [],
      red = [],
      blue = [],
      green = [],
    } = {},
  } = theme;

  const scales: Record<string, string[]> = {
    grayscale,
    qualitative,
    heatmap,
    warm,
    cool,
    red,
    blue,
    green,
  };

  const selectedScale =
    name && scales[name]?.length ? scales[name] : scales.grayscale;

  return selectedScale;
}
