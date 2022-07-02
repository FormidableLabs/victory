const path = require("path");
const BABEL_PATH = path.resolve(__dirname, "babel-native-config.js"); // eslint-disable-line no-undef
const BABEL_TRANSFORM = ["babel-jest", { configFile: BABEL_PATH }];

module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/*/victory-native/**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    // TODO(2215): Switch over to only transpiling from within `/test/`
    // https://github.com/FormidableLabs/victory/issues/2215
    "^.+\\.(js|jsx)$": BABEL_TRANSFORM,
  },
  setupFiles: ["<rootDir>/jest-native-setup.js"],
};
