const path = require("path");
const BABEL_PATH = path.resolve(__dirname, ".babelrc.js"); // eslint-disable-line no-undef

module.exports = {
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx"],
      },
    },
  },
  extends: [
    "formidable/configurations/es6-react",
    "plugin:react-hooks/recommended",
    "plugin:eslint-comments/recommended",
    "prettier",
  ],
  rules: {
    "eslint-comments/disable-enable-pair": "off",
    "func-style": "off",
    "arrow-body-style": "off",
    "consistent-return": "off", // we're migrating to TS and this is more properly handled there.
    "react/sort-comp": "off",
    "import/no-unresolved": ["error", { ignore: ["victory*"] }],
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
    "max-statements": "off",
    complexity: ["error", { max: 16 }],
    "no-magic-numbers": [
      "error",
      { ignore: [-1, 0, 0.5, 1, 2, 90, 180, 270, 360] },
    ],
    "no-param-reassign": "error",
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      configFile: BABEL_PATH,
    },
  },
  plugins: ["jest"],
  env: {
    "jest/globals": true,
  },
  overrides: [
    {
      files: ["**/*.test.*", "./test/**/*"],
      rules: {
        "react/sort-comp": "off",
        "no-magic-numbers": "off",
        "max-statements": "off",
        "import/no-unresolved": "off",
        "no-undef": "off",
        "max-nested-callbacks": "off",
        "@typescript-eslint/no-empty-function": "off",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: ["*.d.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.base.json"],
        // eslint-disable-next-line no-undef
        tsconfigRootDir: __dirname,
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "react/prop-types": "off",
        "no-use-before-define": "off",
        "valid-jsdoc": "off",
        "@typescript-eslint/no-use-before-define": [
          "error",
          {
            // Relax this rule; still prevents errors:
            variables: false,
            classes: false,
            functions: false,
            enums: false,
            typedefs: false,
          },
        ],
        "no-invalid-this": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-invalid-this": ["error"],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
      },
    },
  ],
};
