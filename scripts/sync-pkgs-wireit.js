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
const { log, error } = console;

// ============================================================================
// Config
// ============================================================================
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
  const workspaces = (await fs.readdir("packages"))
    .filter((p) => p.startsWith("victory") && !PKGS_SET.has(p));

  // Use the core package as the template for the rest.
  const corePkg = require("./packages/victory-core/package.json");

  for (let workspace of workspaces) {
    const pkgPath = `./packages/${workspace}/package.json`;
    const pkg = JSON.parse(await fs.readFile(pkgPath));

    // Mutate in wireit config while preserving dependencies if already set.
    const scripts = JSON.parse(JSON.stringify(corePkg.scripts));
    pkg.scripts = scripts;

    const oldWireit = pkg.wireit;
    const wireit = JSON.parse(JSON.stringify(corePkg.wireit));
    pkg.wireit = wireit;

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
