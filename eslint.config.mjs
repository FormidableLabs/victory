import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import pluginJest from "eslint-plugin-jest";
import pluginPromise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // enforce formatting
  prettier,

  // global ignores
  {
    ignores: [
      "**/*.d.ts",
      "**/.wireit/",
      "**/artifacts/",
      "**/coverage/",
      "**/demo/rn/",
      "**/dist/",
      "**/es/",
      "**/lib/",
      "**/lib-vendor/",
      "**/public/",
      "**/storybook-static/",
      "**/tmp/",
      "website/src/theme/",
      "website/src/plugins/",
    ],
  },

  // Typescript and React Rules
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      pluginPromise.configs["flat/recommended"],
    ],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // eslint overrides
      eqeqeq: "error",
      "max-depth": ["error", 4],
      "max-nested-callbacks": ["error", 3],
      "max-params": ["error", 3],
      "no-console": "error",
      "no-magic-numbers": [
        "error",
        { ignore: [-1, 0, 0.5, 1, 2, 90, 180, 270, 360] },
      ],
      "no-nested-ternary": "error",
      "no-prototype-builtins": "off",
      "no-param-reassign": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["victory*/src", "victory*/src/**"],
              message:
                "Be sure to import directly from Victory packages, not from /src folders!",
            },
          ],
        },
      ],
      "no-shadow": "error",
      "no-undef": "error",
      "no-useless-escape": "off",
      "prefer-arrow-callback": "error",

      // react overrides
      "react/display-name": "off",
      "react/prop-types": "off",
      "react/no-multi-comp": "error",
      ...reactHooks.configs.recommended.rules,

      // @typescript-eslint overrides
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-declaration-merging": "off",
    },
  },

  // Overrides for JS files
  {
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Overrides for Test files
  {
    files: ["**/*.test.*", "**/test/**/*", "**/jest-native-setup.tsx"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      "react/sort-comp": "off",
      "no-magic-numbers": "off",
      "max-statements": "off",
      "import/no-unresolved": "off",
      "no-undef": "off",
      "max-nested-callbacks": "off",
    },
  },

  // Overrides for Demos
  {
    files: ["**/demo/**/*.{ts,tsx}"],
    rules: {
      "no-magic-numbers": "off",
      "prettier/prettier": "off",
      "react/no-multi-comp": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },

  // Overrides for Storybook
  {
    files: ["**/stories/**/*.ts", "**/stories/**/*.stories.tsx"],
    rules: {
      "no-magic-numbers": "off",
      "prettier/prettier": "off",
    },
  },

  // Overrides for Website
  {
    files: ["**/website/**/*.{js,ts,tsx}"],
    rules: {
      "prettier/prettier": "off",
    },
  },
);
