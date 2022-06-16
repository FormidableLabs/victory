module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [
    "victory-native",
    "node_modules",
    "config",
    "/es/",
    "/lib/"
  ],
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { configFile: "./.babelrc.js" }]
  },
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.js"]
};
