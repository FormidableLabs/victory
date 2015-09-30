var _ = require("lodash");

module.exports = {
  containsStrings: function (collection) {
    return _.some(collection, function (item) {
      return _.isString(item);
    })
  }
};