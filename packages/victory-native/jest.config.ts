const BABEL_TRANSFORM = [
  "babel-jest",
  { configFile: "../../.babelrc.native.js" },
];

const jestConfig = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/src/**/?(*.)+(spec|test).[jt]s?(x)"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["node_modules", "config", "/es/", "/lib/"],
  transform: {
    // TODO(2215): Switch over to only transpiling from within `/test/`
    // https://github.com/FormidableLabs/victory/issues/2215
    "^.+\\.(js|jsx)$": BABEL_TRANSFORM,
  },
  transformIgnorePatterns: ["/node_modules/", "/lib/"],
  setupFiles: ["./jest-native-setup.tsx"],
};

export default jestConfig;
