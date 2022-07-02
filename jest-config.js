const path = require("path");
const BABEL_TRANSFORM = ["babel-jest", { configFile: path.resolve(__dirname, ".babelrc.js") }];

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
    ".*\/test\/.+\\.*[jt]sx?$": BABEL_TRANSFORM
  },
  transformIgnorePatterns: ["/node_modules/", "/es/", "/lib/"],
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.js"],
};
