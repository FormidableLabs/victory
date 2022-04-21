const path = require("path");

module.exports = {
  "only": [
    "**/src/**/*.js"
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
        // "alias": {
        //   "^d3-([^\/]+)(.*)": "./lib-vendor/d3-\\1/\\2"
        // }
        resolvePath(sourcePath, currentFile) {
          const d3pattern = /^d3-(?<pkg>[^\/]+)(?<path>.*)/;
          const match = d3pattern.exec(sourcePath);
          if (match) {
            // We're assuming a common shape of d3 packages:
            // - Only top level imports "d3-<whatever>"
            // - With no path components (like "d3-<whatever>/path/to.js")
            if (match.groups.path) {
              throw new Error(`Unable to process ${sourcePath} import in ${currentFile}`);
            }

            // Get Vendor package path.
            const vendorPkg = `lib-vendor/d3-${match.groups.pkg}/src/index.js`;

            // Derive relative path to vendor lib to have a file like move from:
            // - 'node_modules/d3-interpolate/src/rgb.js'
            // - 'lib-vendor/d3-interpolate/src/rgb.js'
            // and have an import transform like:
            // - `d3-color`
            // - `../../d3-color`
            const currentFileVendor = currentFile.replace(/^node_modules/, "lib-vendor");
            const relPathToPkg = path.relative(path.dirname(currentFileVendor), vendorPkg);

            console.log("TODO HERE", {
              vendorPkg,
              currentFile,
              currentFileVendor,
              relPathToPkg
            });

            return relPathToPkg;
          }

          return sourcePath;
        }
      }
    ]
  ]
};
