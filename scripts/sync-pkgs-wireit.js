#!/usr/bin/env node

/**
 * This helper script uses `victory-core` as a template and then for each
 * other victory package.
 * 1. Adds all `scripts` and `wireit` configs to that package.
 * 2. Updates wireit config dependencies to match package.json dependencies.
 *
 * Note that this script does _not_ mutate:
 * - victory-core
 * - victory-vendor
 * - victory-native
 */

const fs = require("fs/promises");
const path = require("path");
const { log, error } = console;

// ============================================================================
// Config
// ============================================================================
const PKGS_ROOT = path.resolve(__dirname, "../packages");

// Special packages
const PKGS = {
  CORE: "victory-core",
  NATIVE: "victory-native",
  VENDOR: "victory-vendor"
};
const PKGS_SET = new Set(Object.values(PKGS));

// ============================================================================
// Script
// ============================================================================
const cli = async ({ args = [] } = {}) => {
  const workspaces = (await fs.readdir(PKGS_ROOT))
    .filter((p) => p.startsWith("victory") && !PKGS_SET.has(p));

  // Use the core package as the template for the rest.
  const corePkg = require(`${PKGS_ROOT}/victory-core/package.json`);

  for (let workspace of workspaces) {
    const pkgPath = `${PKGS_ROOT}/${workspace}/package.json`;
    const pkg = JSON.parse(await fs.readFile(pkgPath));

    // Mutate in wireit config while preserving dependencies if already set.
    const scripts = JSON.parse(JSON.stringify(corePkg.scripts));
    pkg.scripts = scripts;

    // Start with wireit task config and add in dependencies
    const wireit = JSON.parse(JSON.stringify(corePkg.wireit));
    pkg.wireit = wireit;

    const addDeps = (key, dep) => {
      pkg.wireit[key].dependencies = pkg.wireit[key].dependencies || [];
      pkg.wireit[key].dependencies.push(dep);
    };

    const crossDeps = Object.keys(pkg.dependencies).filter((p) => p.startsWith("victory"));
    crossDeps.forEach((dep) => {
      // Special case victory-vendor
      if (dep === PKGS.VENDOR) {
        [
          "build:lib:esm",
          "build:lib:cjs",
          "build:dist:dev",
          "build:dist:min",
        ].forEach((key) => addDeps(key, `../${PKGS.VENDOR}:build`));
        return;
      }

      // Normal case
      // Make sure dependent libraries are built.
      addDeps("build:lib:esm", `../${dep}:build:lib:esm`);
      addDeps("build:lib:cjs", `../${dep}:build:lib:cjs`);

      // Webpack depends on ESM output from other packages.
      addDeps("build:dist:dev", `../${dep}:build:lib:esm`);
      addDeps("build:dist:min", `../${dep}:build:lib:esm`);
    });

    // Hack: move sideEffects back to end
    delete pkg.sideEffects;
    pkg.sideEffects = false;

    log(`Writing ${pkgPath}`);
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
  }

  log("Finished syncing.");
};

if (require.main === module) {
  cli({
    args: process.argv.slice(2) // eslint-disable-line no-magic-numbers
  }).catch((err) => {
    error(err);
    process.exit(1); // eslint-disable-line no-process-exit
  });
}

module.exports = {
  cli
};
