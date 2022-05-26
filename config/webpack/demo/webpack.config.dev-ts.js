const base = require("./webpack.config.dev");

module.exports = {
  ...base,
  entry: "./demo/ts/app",
  devServer: {
    ...base.devServer,
    static: {
      ...base.devServer.static,
      directory: "./demo/ts"
    }
  }
};
