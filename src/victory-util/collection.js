
const isNonEmptyArray = function (collection) {
  return Array.isArray(collection) && collection.length > 0;
};

const containsStrings = function (collection) {
  return Array.isArray(collection) && collection.some((value) => typeof value === "string");
};

const containsDates = function (collection) {
  return Array.isArray(collection) && collection.some((value) => value instanceof Date);
};

const containsOnlyStrings = function (collection) {
  return isNonEmptyArray(collection) && collection.every((value) => typeof value === "string");
};

const isArrayOfArrays = function (collection) {
  return isNonEmptyArray(collection) && collection.every(Array.isArray);
};

const removeUndefined = function (arr) {
  return arr.filter((el) => el !== undefined);
};

export default {
  isNonEmptyArray,
  containsStrings,
  containsDates,
  containsOnlyStrings,
  isArrayOfArrays,
  removeUndefined
};
