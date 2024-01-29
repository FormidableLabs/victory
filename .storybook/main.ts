import type { StorybookConfig } from "@storybook/react-webpack5";

/* globals __dirname:false */
const path = require("path");
const glob = require("glob");
const ROOT = path.resolve(__dirname, "..");
const PKGS = path.resolve(ROOT, "packages");
const STORIES = path.resolve(ROOT, "stories");

const wrapForPnp = (packageName) =>
  path.dirname(require.resolve(path.join(packageName, "package.json")));

const config: StorybookConfig = {
  webpackFinal: async (config) => {
    // Read all the victory packages and alias.
    glob.sync(path.join(PKGS, "victory*/package.json")).forEach((pkgPath) => {
      const key = path.dirname(path.relative(PKGS, pkgPath));
      if (config?.resolve?.alias) {
        config.resolve.alias[key] = path.resolve(path.dirname(pkgPath));
      }
    });

    return config;
  },

  addons: [
    "@storybook/addon-essentials",
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
  stories: glob.sync("../**/*.stories.@(js|jsx|ts|tsx)", {
    cwd: __dirname,
  }),

  framework: {
    name: wrapForPnp("@storybook/react-webpack5"),
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  typescript: {
    // typescript compilation check is disabled until we upgrade the babel version
    // which is required for the latest version of storybook to do typechecking
    // https://github.com/FormidableLabs/victory/issues/2746
    check: false,
    checkOptions: {
      typescript: {
        configFile: path.join(__dirname, "../tsconfig.base.json"),
      },
    },
  },
};

export default config;
