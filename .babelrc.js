module.exports = {
  "presets": [
    "@babel/preset-react"
  ],
  "plugins": [
    "lodash",
    "@babel/proposal-class-properties",
    "@babel/transform-arrow-functions",
    "@babel/transform-block-scoping",
    "@babel/transform-classes",
    "@babel/transform-computed-properties",
    "@babel/transform-destructuring",
    "@babel/transform-parameters",
    "@babel/transform-shorthand-properties",
    "@babel/transform-spread",
    "@babel/transform-template-literals",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-proposal-export-namespace-from"
  ],
  "env": {
    "commonjs": {
      "plugins": [
        [
          "@babel/transform-modules-commonjs",
          {
            "strict": false,
            "allowTopLevelThis": true
          }
        ]
      ]
    }
  }
};
