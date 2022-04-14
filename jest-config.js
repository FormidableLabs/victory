module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/jest/**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      { configFile: "./babel-native-config.js" }
    ]
  },
  setupFiles: ["./jest-setup.js"]
};
