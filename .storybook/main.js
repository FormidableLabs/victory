var path = require("path");
var glob = require("glob");

module.exports = {
  addons: [
    "@storybook/addon-options/register",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.stories\.(jsx?|tsx?)$/],
          include: [path.resolve(__dirname, "../stories")],
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
  // Use glob to locate the stories, because it ignores our circular dependencies:
  stories: glob.sync("../**/*.stories.@(js|jsx|ts|tsx)", { cwd: __dirname }),
};
