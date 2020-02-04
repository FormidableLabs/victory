module.exports = {
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: ["formidable/configurations/es6-react", "prettier"],
  rules: {
    "react/sort-comp": "off",
    "import/no-unresolved": [2, { ignore: ["victory*"] }],
    "max-statements": 0,
    complexity: ["error", { max: 16 }],
    "no-magic-numbers": ["error", { ignore: [-1, 0, 0.5, 1, 2, 90, 180, 270, 360] }]
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
