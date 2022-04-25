/**
 * Build vendor libraries from `node_modules`
 */
const fs = require("fs/promises");
const path = require("path");
const PKGS = [
  "d3-interpolate"
];

// Templates.
const getIndexEsm = (pkg) => `
// \`victory-vendor/${pkg.name}\` (ESM)
// See upstream license: ${pkg.repository.url.replace(/\.git$/, "")}/blob/main/LICENSE
//
// Our ESM package uses the underlying installed dependencies of \`node_modules/${pkg.name}\`
export * from "d3-interpolate";

// TODO REMOVE
console.log("TODO LOADED ESM ${pkg.name}");
`;

const getIndexCjs = (pkg) => `
// \`victory-vendor/${pkg.name}\` (CommonJS)
// See upstream license: ${pkg.repository.url.replace(/\.git$/, "")}/blob/main/LICENSE
//
// Our CommonJS package relies on transpiled vendor files in \`lib-vendor/${pkg.name}\`
module.exports = require("../lib-vendor/${pkg.name}/src/index.js");

// TODO REMOVE
console.log("TODO LOADED CJS ${pkg.name}");
`;

// Main.
const main = async () => {
  Promise.all(PKGS.map(async (pkgName) => {
    console.log("TODO HERE", pkgName);

    const pkgPath = path.resolve(__dirname, `../node_modules/${pkgName}/package.json`);
    const pkg = await fs.readFile(pkgPath).then((buf) => JSON.parse(buf.toString()));
    console.log(getIndexEsm(pkg));
    console.log(getIndexCjs(pkg));
  }));
}

if (require.main === module) {
  main()
  .then(() => {
    console.log("Build finished.")
  })
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  })
}
