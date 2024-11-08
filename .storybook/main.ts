import type { StorybookConfig } from "@storybook/react-webpack5";

/* globals __dirname:false */
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const STORIES = path.resolve(ROOT, "stories");

const config: StorybookConfig = {
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
    "@storybook/addon-webpack5-compiler-swc",
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "@storybook/react-webpack5",
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
