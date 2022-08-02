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
    "react/sort-comp": "off",
    "import/no-unresolved": [2, { ignore: ["victory*"] }],
    "max-statements": 0,
    complexity: ["error", { max: 16 }],
    "no-magic-numbers": [
      "error",
      { ignore: [-1, 0, 0.5, 1, 2, 90, 180, 270, 360] },
    ],
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      configFile: BABEL_PATH,
    }
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
        "no-magic-numbers": 0,
        "max-statements": 0,
        "import/no-unresolved": 0,
        "no-undef": "off",
        "max-nested-callbacks": "off",
        "@typescript-eslint/no-empty-function": "off",
        "react/prop-types": "off",
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
