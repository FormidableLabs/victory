var path = require("path");
var base = path.dirname(require.resolve("builder-victory-component/package.json"));

module.exports = {
  extends: path.join(base, "config/eslint/.eslintrc-source")
};
