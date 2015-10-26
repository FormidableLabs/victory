/* eslint-disable*/
var _ = require("lodash");

module.exports = {
  containsStrings: function (collection) {
    return _.some(collection, function (item) {
      return _.isString(item);
    });
  },

  containsOnlyStrings: function (collection) {
    return _.every(collection, function (item) {
      return _.isString(item);
    });
  },

  isArrayOfArrays: function (collection) {
    return _.isArray(collection) && _.every(collection, function (item) {
      return _.isArray(item);
    });
  },

  removeUndefined: function(arr) {
    return _.filter(arr, (el) => el !== undefined);
  }
};
