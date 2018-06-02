/* eslint-disable func-style */
/* eslint-disable no-use-before-define */
import isEqual from "react-fast-compare";

function isNonEmptyArray(collection) {
  return Array.isArray(collection) && collection.length > 0;
}

function containsStrings(collection) {
  return Array.isArray(collection) && collection.some((value) => typeof value === "string");
}

function containsDates(collection) {
  return Array.isArray(collection) && collection.some((value) => value instanceof Date);
}

function containsNumbers(collection) {
  return Array.isArray(collection) && collection.some((value) => typeof value === "number");
}

function containsOnlyStrings(collection) {
  return isNonEmptyArray(collection) &&
    collection.every((value) => typeof value === "string");
}

function isArrayOfArrays(collection) {
  return isNonEmptyArray(collection) && collection.every(Array.isArray);
}

function removeUndefined(arr) {
  return arr.filter((el) => el !== undefined);
}

function getMaxValue(arr, ...values) {
  const array = arr.concat(values);
  return containsDates(array) ?
    new Date(Math.max(...array)) :
    Math.max(...array);
}

function getMinValue(arr, ...values) {
  const array = arr.concat(values);
  return containsDates(array) ?
    new Date(Math.min(...array)) :
    Math.min(...array);
}

/*
`areVictoryPropsEqual` does the following:
  - marks any two Functions as equal
  - returns false when checking the equality of things like `1` vs. `Object(1)`
  (see the tests for more specifics)
*/
function areVictoryPropsEqual(a, b) {
  return isEqual(a, b);
}

export default {
  areVictoryPropsEqual,
  containsDates,
  containsNumbers,
  containsOnlyStrings,
  containsStrings,
  getMaxValue,
  getMinValue,
  isArrayOfArrays,
  removeUndefined
};
