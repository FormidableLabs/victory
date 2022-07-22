const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const BABEL_PATH = path.resolve(ROOT, ".babelrc.native.js"); // eslint-disable-line no-undef
const BABEL_TRANSFORM = ["babel-jest", { configFile: BABEL_PATH }];

module.exports = {
  rootDir: ROOT,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["node_modules", "config", "/es/", "/lib/"],
  transform: {
    // TODO(2215): Switch over to only transpiling from within `/test/`
    // https://github.com/FormidableLabs/victory/issues/2215
    "^.+\\.(js|jsx)$": BABEL_TRANSFORM,
  },
  transformIgnorePatterns: ["/node_modules/", "/lib/"],
  setupFiles: ["<rootDir>/test/jest-native-setup.js"],
};
