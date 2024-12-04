import type { StorybookConfig } from "@storybook/react-webpack5";

/* globals __dirname:false */
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const STORIES = path.resolve(ROOT, "stories");

const getAbsolutePath = (packageName: string): any =>
  path.dirname(require.resolve(path.join(packageName, 'package.json')));

const config: StorybookConfig = {
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
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
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    getAbsolutePath("@chromatic-com/storybook"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {
      builder: {},
    },
  },

  stories: ["../stories/**/*.stories.tsx"],

  typescript: {
    check: false,
    checkOptions: {
      typescript: {
        configFile: path.resolve(ROOT, "tsconfig.storybook.json"),
      },
    },
  },

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../packages"),
      };
    }
    return config;
  },
};

export default config;
