module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/jest/**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["victory-native"],
  transform: {
    "^.+/test/.+\\.(ts|tsx|js|jsx)$": [
      "babel-jest",
      { configFile: "./.babelrc.js" }
    ]
  },
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.js"]
};
