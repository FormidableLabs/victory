// http://www.pearsonified.com/2012/01/characters-per-line.php
/*eslint-disable no-magic-numbers */
import { merge, defaults, toString } from "lodash";

const fontDictionary = {
  "American Typewriter": 2.09,
  "Baskerville": 2.51,
  "Georgia": 2.27,
  "Hoefler Text": 2.39,
  "Palatino": 2.26,
  "Times New Roman": 2.48,
  "Arial": 2.26,
  "Gill Sans": 2.47,
  "Gill Sans 300": 2.58,
  "Helvetica Neue": 2.24,
  "Lucida Grande": 2.05,
  "Tahoma": 2.25,
  "Trebuchet MS": 2.2,
  "Verdana": 1.96,
  "Courier New": 1.67,
  "cursive": 1.84,
  "fantasy": 2.09,
  "monospace": 1.81,
  "serif": 2.04,
  "sans-serif": 1.89
};
//https://developer.mozilla.org/en/docs/Web/CSS/length
// Absolute sizes in pixels for obsolete measurement units.
const absoluteMeasurementUnitsToPixels = {
  "mm": 3.8,
  "sm": 38,
  "pt": 1.33,
  "pc": 16,
  "in": 96,
  "px": 1
};
const relativeMeasurementUnitsCoef = {
  "em": 1,
  "ex": 0.5
};

const coefficients = {
  averageFontConstant: 2.1675, // Average pixels per glyph in existing font.
  widthOverlapCoef: 1.25, // Coefficient for width value to prevent overlap.
  heightOverlapCoef: 1.05, // Coefficient for height value to prevent overlap.
  lineCapitalCoef: 1.15, // Coefficient for height value. Reserve space for capital chars.
  lineSpaceHeightCoef: 0.2 // Coefficient for height value. Reserve space between lines.
};
const defaultStyle = {
  lineHeight: 1,
  letterSpacing: "0px",
  fontSize: 0,
  angle: 0,
  fontFamily: ""
};

const _degreeToRadian = (angle) => angle * Math.PI / 180;

const _getFontCharacterConstant = (fontFamily) => {
  const firstFont = fontFamily.split(",")[0].replace(/'|"/g, "");
  return fontDictionary[firstFont] || coefficients.averageFontConstant;
};

const _splitToLines = (text) => {
  return Array.isArray(text) ? text : text.toString().split(/\r\n|\r|\n/g);
};

const _getSizeWithRotate = (axisSize, dependentSize, angle) => {
  const angleInRadian = _degreeToRadian(angle);
  return Math.abs(Math.cos(angleInRadian) * axisSize)
    + Math.abs(Math.sin(angleInRadian) * dependentSize);
};

/**
 * Convert length-type parameters from specific measurement units to pixels
 * @param  {string} length Css length string value.
 * @param  {number} fontSize Current text font-size.
 * @returns {number} Approximate Css length in pixels.
*/
const convertLengthToPixels = (length, fontSize) => {
  const attribute = length.match(/[a-zA-Z%]+/)[0];
  const value = length.match(/[0-9.,]+/);
  let result;
  if (absoluteMeasurementUnitsToPixels.hasOwnProperty(attribute)) {
    result = value * absoluteMeasurementUnitsToPixels[attribute];
  } else if (relativeMeasurementUnitsCoef.hasOwnProperty(attribute)) {
    result = (fontSize ? value * fontSize : value * defaultStyle.fontSize)
      * relativeMeasurementUnitsCoef[attribute];
  } else {
    result = value;
  }
  return result;
};

const _prepareParams = (inputStyle, index) => {
  const lineStyle = Array.isArray(inputStyle) ? inputStyle[index] : inputStyle;
  const style = defaults({}, lineStyle, defaultStyle);
  return merge({}, style, {
    characterConstant: style.characterConstant || _getFontCharacterConstant(style.fontFamily),
    letterSpacing: convertLengthToPixels(style.letterSpacing, style.fontSize),
    fontSize: typeof (style.fontSize) === "number"
      ? style.fontSize
      : convertLengthToPixels(String(style.fontSize))
  });
};

const _approximateTextWidthInternal = (text, style) => {
  const widths = _splitToLines(text).map((line, index) => {
    const len = line.toString().length;
    const { fontSize, characterConstant, letterSpacing } = _prepareParams(style, index);
    return (len * fontSize / characterConstant) + letterSpacing * (Math.max(len - 1, 0));
  });
  return Math.max(...widths);
};

const _approximateTextHeightInternal = (text, style) => {
  return _splitToLines(text).reduce((total, line, index) => {
    const lineStyle = _prepareParams(style, index);
    const containsCaps = toString(line).match(/[(A-Z)(0-9)]/);
    const height = containsCaps ?
      lineStyle.fontSize * coefficients.lineCapitalCoef : lineStyle.fontSize;
    const emptySpace = index === 0 ? 0 : lineStyle.fontSize * coefficients.lineSpaceHeightCoef;
    return total + lineStyle.lineHeight * (height + emptySpace);
  }, 0);
};

/**
 * Predict text size by font params.
 * @param {string} text Content for width calculation.
 * @param {Object} style Text styles, ,fontFamily, fontSize, etc.
 * @param {string} style.fontFamily Text fontFamily.
 * @param {(number|string)} style.fontSize Text fontSize.
 * @param {number} style.angle Text rotate angle.
 * @param {string} style.letterSpacing Text letterSpacing(space between letters).
 * @param {number} style.characterConstant Average pixels per glyph.
 * @param {number} style.lineHeight Line height coefficient.
 * @returns {number} Approximate text label height.
*/
const approximateTextSize = (text, style) => {
  const angle = Array.isArray(style) ? style[0] && style[0].angle : style && style.angle;
  const height = _approximateTextHeightInternal(text, style);
  const width = _approximateTextWidthInternal(text, style);
  const widthWithRotate = angle ? _getSizeWithRotate(width, height, angle) : width;
  const heightWithRotate = angle ? _getSizeWithRotate(height, width, angle) : height;
  return {
    width: widthWithRotate * coefficients.widthOverlapCoef,
    height: heightWithRotate * coefficients.heightOverlapCoef
  };
};

export default {
  approximateTextSize,
  convertLengthToPixels
};
