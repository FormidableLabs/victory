"use strict";

const _ = require("lodash");
const base = require("./webpack.config.dev");

// Clone our own module object.
const mod = _.cloneDeep(base.module);
const firstLoader = mod.rules[0];

// Update rules array. First loader needs react-hot-loader.
firstLoader.rules = [require.resolve("react-hot-loader")]
  .concat(firstLoader.loader ? [firstLoader.loader] : [])
  .concat(firstLoader.rules || []);

// Remove single loader if any.
firstLoader.loader = null;

module.exports = _.merge({}, _.omit(base, "entry", "module"), {
  entry: {
    app: [require.resolve("webpack/hot/only-dev-server"), "./demo/js/app"],
  },

  module: mod,
});
