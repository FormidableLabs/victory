import _ from "lodash";

export const containsStrings = function (collection) {
  return _.some(collection, _.isString);
};

export const containsOnlyStrings = function (collection) {
  return _.isArray(collection) && _.every(collection, _.isString);
};

export const isArrayOfArrays = function (collection) {
  return _.isArray(collection) && _.every(collection, _.isArray);
};

export const removeUndefined = function (arr) {
  return _.filter(arr, (el) => el !== undefined);
};
