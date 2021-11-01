module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.(js|jsx)$": ["babel-jest", { configFile: "./babel.config.js" }]
  }
};
