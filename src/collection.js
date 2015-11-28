import _ from "lodash";

export const containsStrings = function (collection) {
  return _.some(collection, (item) => {
    return _.isString(item);
  });
};

export const containsOnlyStrings = function (collection) {
  return _.every(collection, (item) => {
    return _.isString(item);
  });
};

export const isArrayOfArrays = function (collection) {
  return _.isArray(collection) && _.every(collection, (item) => {
    return _.isArray(item);
  });
};

export const removeUndefined = function (arr) {
  return _.filter(arr, (el) => el !== undefined);
};
