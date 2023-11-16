/**
 * Transform d3 ESM libraries to vendored CommonJS libraries
 *
 * This produces `lib-vendor/d3-<package name>/src` files that have
 * internally consistent references to other d3 packages. It is only meant
 * to be used for the CommonJS import path.
 */
const path = require("path");

module.exports = {
  only: ["node_modules/*/src/**/*.js"],
  plugins: [
    [
      "@babel/transform-modules-commonjs",
      {
        strict: false,
        allowTopLevelThis: true,
      },
    ],
    [
      "module-resolver",
      {
        // Convert all imports for _other_ d3 dependencies to the relative
        // path in our vendor package.
        resolvePath(sourcePath, currentFile) {
          const d3pattern = /^(?<pkg>(d3-[^\/]+|internmap))(?<path>.*)/;
          const match = d3pattern.exec(sourcePath);
          if (match) {
            // We're assuming a common shape of d3 packages:
            // - Only top level imports "d3-<whatever>"
            // - With no path components (like "d3-<whatever>/path/to.js")
            if (match.groups.path) {
              throw new Error(
                `Unable to process ${sourcePath} import in ${currentFile}`,
              );
            }

            // Get Vendor package path.
            const vendorPkg = `lib-vendor/${match.groups.pkg}/src/index.js`;

            // Derive relative path to vendor lib to have a file like move from:
            // - 'node_modules/d3-interpolate/src/rgb.js'
            // - 'lib-vendor/d3-interpolate/src/rgb.js'
            // and have an import transform like:
            // - `d3-color`
            // - `../../d3-color`
            const currentFileVendor = currentFile.replace(
              /^node_modules/,
              "lib-vendor",
            );
            const relPathToPkg = path
              .relative(path.dirname(currentFileVendor), vendorPkg)
              .replace(/\\/g, "/");

            return relPathToPkg;
          }

          return sourcePath;
        },
      },
    ],
  ],
};
