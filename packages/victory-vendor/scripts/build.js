/**
 * Build vendor libraries from `node_modules`
 */
const fs = require("fs/promises");
const path = require("path");
const { promisify } = require("util");

const rimraf = require("rimraf");
const rimrafP = promisify(rimraf);

const vendorPkg = require("../package.json");
const VENDOR_PKGS = new Set(Object.keys(vendorPkg.dependencies));

// Templates.
const getEsmIndex = (pkg) => `
// \`victory-vendor/${pkg.name}\` (ESM)
// See upstream license: ${pkg.repository.url.replace(
  /\.git$/,
  ""
)}/blob/main/LICENSE
//
// Our ESM package uses the underlying installed dependencies of \`node_modules/${
  pkg.name
}\`
export * from "${pkg.name}";

// TODO REMOVE
console.log("TODO LOADED ESM ${pkg.name}");
`;

const getCjsIndex = (pkg) => `
// \`victory-vendor/${pkg.name}\` (CommonJS)
// See upstream license: ${pkg.repository.url.replace(
  /\.git$/,
  ""
)}/blob/main/LICENSE
//
// Our CommonJS package relies on transpiled vendor files in \`lib-vendor/${
  pkg.name
}\`
module.exports = require("../lib-vendor/${pkg.name}/src/index.js");

// TODO REMOVE
console.log("TODO LOADED CJS ${pkg.name}");
`;

const getCjsRootIndex = (pkg) => `
// \`victory-vendor/${pkg.name}\` (CommonJS)
// See upstream license: ${pkg.repository.url.replace(
  /\.git$/,
  ""
)}/blob/main/LICENSE
//
// This file only exists for tooling that doesn't work yet with package.json:exports
// by proxying through the CommonJS version.
module.exports = require("./lib/${pkg.name}");

// TODO REMOVE
console.log("TODO LOADED CJS ROOT ${pkg.name}");
`;

// Main.
const main = async () => {
  // Lazy ESM imports.
  const { execa } = await import("execa");

  // Get d3-related packages we want to vendor.
  const pkgs = (
    await fs.readdir(path.resolve(__dirname, "../node_modules/"))
  ).filter((name) => /^(d3-|internmap)/.test(name));

  // Safety check: we assume that **all** are flattened to root level of this
  // package, and want to make sure there are no nested dependencies.
  for (let pkgName of pkgs) {
    const pkgModsPath = path.resolve(
      __dirname,
      `../node_modules/git${pkgName}/node_modules`
    );
    const stat = await fs.lstat(pkgModsPath).catch(() => null);
    if (stat) {
      throw new Error(`Found nested modules: ${pkgModsPath}`);
    }
  }

  // Clean out and ensure base library paths exist
  const EsmBasePath = path.resolve(__dirname, `../es`);
  const CjsBasePath = path.resolve(__dirname, `../lib`);
  const VendorBasePath = path.resolve(__dirname, `../lib-vendor`);
  console.log("Cleaning old vendor directories.");
  await Promise.all(
    [
      EsmBasePath,
      CjsBasePath,
      VendorBasePath,
      path.resolve(__dirname, "../d3-*")
    ].map((libPath) =>
      rimrafP(libPath).then(() => fs.mkdir(libPath, { recursive: true }))
    )
  );

  // Transpile.
  console.log("Transpiling vendor sources.");
  await execa(
    "yarn" /*yarn*/,
    [
      "babel",
      "--config-file",
      path.resolve(__dirname, "../.babelrc.js"),
      "-d",
      path.resolve(__dirname, "../lib-vendor"),
      path.resolve(__dirname, "../node_modules")
    ],
    {
      stdio: "inherit"
    }
  );

  // Iterate and generate index files.
  console.log("Copying licenses and generating indexes.");
  for (let pkgName of pkgs) {
    console.log(`- ${pkgName}`);

    const pkgBase = path.resolve(__dirname, `../node_modules/${pkgName}`);
    const pkgPath = path.join(pkgBase, `package.json`);
    const pkg = await fs
      .readFile(pkgPath)
      .then((buf) => JSON.parse(buf.toString()));
    const libVendorPath = path.resolve(__dirname, `../lib-vendor/${pkgName}`);

    // Create library indexes and copy licenses to `lib-vendor.
    await Promise.all([
      fs.writeFile(path.join(EsmBasePath, `${pkgName}.js`), getEsmIndex(pkg)),
      fs.writeFile(path.join(CjsBasePath, `${pkgName}.js`), getCjsIndex(pkg)),
      fs.copyFile(
        path.join(pkgBase, "LICENSE"),
        path.join(libVendorPath, "LICENSE")
      ),
      // Root hack file for non package.json:exports systems
      VENDOR_PKGS.has(pkgName)
        ? fs.writeFile(
            path.resolve(__dirname, `../${pkgName}.js`),
            getCjsRootIndex(pkg)
          )
        : Promise.resolve()
    ]);
  }
};

if (require.main === module) {
  main()
    .then(() => {
      console.log("Build finished.");
    })
    .catch((err) => {
      console.error(err);
      process.exit(-1);
    });
}
