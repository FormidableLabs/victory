/* eslint-disable func-style */
/* eslint-disable no-use-before-define */

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
  return isNonEmptyArray(collection) && collection.every((value) => typeof value === "string");
}

function isArrayOfArrays(collection) {
  return isNonEmptyArray(collection) && collection.every(Array.isArray);
}

function removeUndefined(arr) {
  return arr.filter((el) => el !== undefined);
}

function getMaxValue(arr, ...values) {
  const array = arr.concat(values);
  return containsDates(array) ? new Date(Math.max(...array)) : Math.max(...array);
}

function getMinValue(arr, ...values) {
  const array = arr.concat(values);
  return containsDates(array) ? new Date(Math.min(...array)) : Math.min(...array);
}

export default {
  containsDates,
  containsNumbers,
  containsOnlyStrings,
  containsStrings,
  getMaxValue,
  getMinValue,
  isArrayOfArrays,
  removeUndefined
};
