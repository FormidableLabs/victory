module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: ["@babel/plugin-proposal-export-namespace-from"],
  env: {
    commonjs: {
      plugins: [
        [
          "@babel/transform-modules-commonjs",
          {
            strict: false,
            allowTopLevelThis: true
          }
        ],
        [
          "module-resolver",
          {
            alias: {
              "^victory-(.+)/es/(.+)": "^victory-\\1/src/\\2"
            }
          }
        ]
      ]
    }
  }
};
