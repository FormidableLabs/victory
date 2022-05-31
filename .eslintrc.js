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
    "func-style": "off",
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
      excludedFiles: ["*.d.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off"
      }
    }
  ]
};
