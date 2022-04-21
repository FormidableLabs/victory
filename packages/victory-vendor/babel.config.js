{
  "only": [
    ".*\/src\/.*"
  ],
  "plugins": [
    [
      "@babel/transform-modules-commonjs",
      {
        "strict": false,
        "allowTopLevelThis": true
      }
    ],
    [
      "module-resolver",
      {
        "root": ["./"],
        "alias": {
          "^d3-([^\/]+)(.*)": "../lib-vendor/d3-\\1/\\2"
        }
      }
    ]
  ]
}
