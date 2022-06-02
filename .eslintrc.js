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
    "plugin:react-hooks/recommended",
    "plugin:eslint-comments/recommended"
  ],
  rules: {
    "eslint-comments/disable-enable-pair": "off",
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
        project: ["./tsconfig.base.json"],
        tsconfigRootDir: __dirname
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      rules: {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
          "error",
          {
            // Relax this rule; still prevents errors:
            variables: false,
            classes: false,
            functions: false,
            enums: false,
            typedefs: false
          }
        ],
        "no-invalid-this": "off",
        "@typescript-eslint/no-invalid-this": ["error"],

        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-unsafe-return": "warn",
        "@typescript-eslint/no-unsafe-call": "warn",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        "@typescript-eslint/restrict-template-expressions": "warn",
        "@typescript-eslint/restrict-plus-operands": "warn"
      }
    }
  ]
};
