module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        exclude: [
          // only enabled in commonjs targets
          // see the section on `env` below
          "@babel/plugin-transform-modules-commonjs",

          // do not use this plugin with webpack
          // ref: https://babeljs.io/docs/babel-plugin-proposal-dynamic-import
          "@babel/plugin-proposal-dynamic-import",
        ],
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  ignore: ["**/*.d.ts"],
  env: {
    commonjs: {
      plugins: [
        [
          "@babel/transform-modules-commonjs",
          {
            strict: false,
            allowTopLevelThis: true,
          },
        ],
      ],
    },
  },
};
