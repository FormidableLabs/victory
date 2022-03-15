module.exports = {
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx"]
      }
    }
  },
  extends: [
    "formidable/configurations/es6-react",
    "prettier",
    "plugin:react-hooks/recommended"
  ],
  rules: {
    "react/sort-comp": "off",
    "import/no-unresolved": [2, { ignore: ["victory*"] }],
    "max-statements": 0,
    complexity: ["error", { max: 16 }],
    "no-magic-numbers": [
      "error",
      { ignore: [-1, 0, 0.5, 1, 2, 90, 180, 270, 360] }
    ]
  },
  plugins: ["jest"],
  env: {
    "jest/globals": true
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname
      },
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-magic-numbers": "off",
        "import/no-duplicates": "off",
        "react/no-multi-comp": "off",
        "react/sort-comp": "off"
      }
    }
  ]
};
