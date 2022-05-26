var path = require("path");
module.exports = {
  addons: [
    "storybook-addon-performance/register",
    "@storybook/addon-options/register",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.stories\.(jsx?|tsx?)$/],
          include: [path.resolve(__dirname, "../stories")]
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false }
        }
      }
    }
  ],
  stories: ["../stories/*.stories.(js|jsx|ts|tsx)"]
};
