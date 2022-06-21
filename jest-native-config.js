module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/*/victory-native/**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    // TODO(2215): Switch over to only transpiling from within `/test/`
    // https://github.com/FormidableLabs/victory/issues/2215
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      { configFile: "./babel-native-config.js" }
    ]
  },
  setupFiles: ["./jest-native-setup.js"]
};
