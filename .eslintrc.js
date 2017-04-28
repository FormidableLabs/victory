/* eslint-disable no-var */
var path = require("path");
var base;
try {
  // Normal resolution
  base = path.dirname(require.resolve("builder-victory-component/package.json"));
} catch (err) {
  // Dev-only resolution
  base = path.dirname(require.resolve("../builder-victory-component/package.json"));
}

module.exports = {
  extends: path.join(base, "config/eslint/.eslintrc-source")
};
