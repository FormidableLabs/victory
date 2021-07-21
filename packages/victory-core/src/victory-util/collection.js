/* eslint-disable func-style */
/* eslint-disable no-use-before-define */

function isNonEmptyArray(collection) {
  return Array.isArray(collection) && collection.length > 0;
}

export function containsStrings(collection) {
  return (
    Array.isArray(collection) &&
    collection.some((value) => typeof value === "string")
  );
}

export function containsDates(collection) {
  return (
    Array.isArray(collection) &&
    collection.some((value) => value instanceof Date)
  );
}

export function containsNumbers(collection) {
  return (
    Array.isArray(collection) &&
    collection.some((value) => typeof value === "number")
  );
}

export function containsOnlyStrings(collection) {
  return (
    isNonEmptyArray(collection) &&
    collection.every((value) => typeof value === "string")
  );
}

export function isArrayOfArrays(collection) {
  return isNonEmptyArray(collection) && collection.every(Array.isArray);
}

export function removeUndefined(arr) {
  return arr.filter((el) => el !== undefined);
}

export function getMaxValue(arr, ...values) {
  const array = arr.concat(values);
  return containsDates(array)
    ? new Date(Math.max(...array))
    : Math.max(...array);
}

export function getMinValue(arr, ...values) {
  const array = arr.concat(values);
  return containsDates(array)
    ? new Date(Math.min(...array))
    : Math.min(...array);
}
