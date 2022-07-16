/* globals __dirname:false */
const path = require("path");
const glob = require("glob");
const ROOT = path.resolve(__dirname, "..");
const PKGS = path.resolve(ROOT, "packages");
const STORIES = path.resolve(ROOT, "stories");

module.exports = {
  webpackFinal: async (config) => {
    // Read all the victory packages and alias.
    // Note: CWD is currently project root.
    glob.sync(path.join(PKGS, "victory*/package.json"))
      .forEach((pkgPath) => {
        const key = path.dirname(path.relative(PKGS, pkgPath));
        config.resolve.alias[key] = path.resolve(path.dirname(pkgPath));
      });

    return config;
  },
  addons: [
    "@storybook/addon-options/register",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.stories\.(jsx?|tsx?)$/],
          include: [STORIES],
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
  // Use glob to locate the stories, because it ignores our circular dependencies.
  stories: glob.sync("../**/*.stories.@(js|jsx|ts|tsx)", { cwd: __dirname }),
};
