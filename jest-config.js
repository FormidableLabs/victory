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
    "^.+test.*[jt]sx?$": ["babel-jest", { configFile: "./.babelrc.js" }]
  },
  transformIgnorePatterns: ["/node_modules/", "/es/", "/lib/"],
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.js"]
};
