const path = require("path");
const BABEL_PATH = path.resolve(__dirname, ".babelrc.js"); // eslint-disable-line no-undef
const BABEL_TRANSFORM = ["babel-jest", { configFile: BABEL_PATH }];

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [
    "victory-native",
    "node_modules",
    "config",
    "/es/",
    "/lib/",
  ],
  transform: {
    "^.+test\\.*[jt]sx?$": BABEL_TRANSFORM,
    ".*/test/.+\\.*[jt]sx?$": BABEL_TRANSFORM,
  },
  transformIgnorePatterns: ["/node_modules/", "/es/", "/lib/"],
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.js"],
};
