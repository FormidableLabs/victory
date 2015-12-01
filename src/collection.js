import _ from "lodash";

export const isNonEmptyArray = function (collection) {
  return _.isArray(collection) && collection.length > 0;
};

export const containsStrings = function (collection) {
  return _.some(collection, _.isString);
};

export const containsOnlyStrings = function (collection) {
  return isNonEmptyArray(collection) && _.every(collection, _.isString);
};

export const isArrayOfArrays = function (collection) {
  return isNonEmptyArray(collection) && _.every(collection, _.isArray);
};

export const removeUndefined = function (arr) {
  return _.filter(arr, (el) => el !== undefined);
};
