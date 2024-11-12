#!/usr/bin/env node

/**
 * This helper script uses a template to mutate all library package.json's:
 *
 * 1. Adds all `scripts` and `wireit` configs to that package.
 * 2. Updates wireit config dependencies to match package.json dependencies.
 *
 * The script also adds `wireit` configs to the root package.json.
 *
 * Note that this script does _not_ mutate:
 * - victory-vendor
 * - victory-native
 *
 * If you are editing `victory-vendor` or `victory-native`, directly edit them.
 * For **all other packages**, make your changes in
 * `sync-pkgs-wireit-helpers.js`.
 */

const fs = require("fs/promises");
const path = require("path");
const { generateWireitConfig } = require("./sync-pkgs-wireit-helpers");
const { log, error } = console;

// ============================================================================
// Config
// ============================================================================
const ROOT = path.resolve(__dirname, "..");
const PKGS_ROOT = path.join(ROOT, "packages");

// Special packages
const PKGS = {
  NATIVE: "victory-native",
  VENDOR: "victory-vendor",
};
const SPECIAL_PKGS = new Set([PKGS.NATIVE, PKGS.VENDOR]);

// ============================================================================
// Helpers
// ============================================================================
const readPkg = async (pkgPath) => JSON.parse(await fs.readFile(pkgPath));
const writePkg = async (pkgPath, data, originalPkg) => {
  const json = JSON.stringify(data, null, 2);
  if (json === JSON.stringify(originalPkg, null, 2)) {
    log(`Skipping ${pkgPath} (no changes)`);
    return;
  }
  log(`Writing ${pkgPath}`);
  await fs.writeFile(pkgPath, `${json}\n`);
};
const clone = (obj) => JSON.parse(JSON.stringify(obj));
const isVictoryPackage = (p) => p.startsWith("victory");

// Check for package locks, which we need to set on each wireit config
// with non-empty `files`.
const validateLocks = (pkgPath, pkg) =>
  Object.entries(pkg.wireit).forEach(([key, obj]) => {
    if (obj.files && obj.files.length && !obj.packageLocks) {
      throw new Error(
        `Missing packageLocks for wireit config for: ${key} in ${pkgPath}`,
      );
    }
  });

// Root mutation
//
// We want to use wireit directly to manage multi-build for better
// cache hits (e.g. `pnpm -r run build` seems to get a lot of cache
// misses). So create tasks with cross-package deps
const updateRootPkg = async ({ allPkgs }) => {
  const rootPkgPath = `${ROOT}/package.json`;
  const originalPkg = await readPkg(rootPkgPath);
  const rootPkg = clone(originalPkg);

  rootPkg.wireit = rootPkg.wireit || {};
  [
    { rootTask: "build", pkgTask: "build" },
    { rootTask: "build:lib:esm", pkgTask: "build:lib:esm" },
    { rootTask: "jest:pkgs", pkgTask: "jest" },
    { rootTask: "types:check", pkgTask: "types:check" },
    { rootTask: "types:create", pkgTask: "types:create" },
  ].forEach(({ rootTask, pkgTask }) => {
    rootPkg.wireit[rootTask] = rootPkg.wireit[rootTask] || {};
    rootPkg.wireit[rootTask].dependencies = allPkgs.map(
      (p) => `./packages/${p}:${pkgTask}`,
    );
  });

  validateLocks(rootPkgPath, rootPkg);
  await writePkg(rootPkgPath, rootPkg, originalPkg);
};

// Generate configurations for all packages:
const updateLibPkgs = async ({ libPkgs }) => {
  const rootPkg = await readPkg(`${ROOT}/package.json`);

  for (const workspace of libPkgs) {
    const pkgPath = `${PKGS_ROOT}/${workspace}/package.json`;
    const originalPkg = await readPkg(pkgPath);
    const pkg = {
      ...originalPkg,
      ...generateWireitConfig(originalPkg, rootPkg),
    };

    validateLocks(pkgPath, pkg);
    await writePkg(pkgPath, pkg, originalPkg);
  }
};

// ============================================================================
// Script
// ============================================================================
const cli = async () => {
  // Get packages.
  const libPkgs = (await fs.readdir(PKGS_ROOT)).filter(
    (p) => isVictoryPackage(p) && !SPECIAL_PKGS.has(p),
  );
  const allPkgs = [...SPECIAL_PKGS, ...libPkgs];

  // Mutate package.json's
  await updateRootPkg({ allPkgs });
  await updateLibPkgs({ libPkgs });

  log("Finished syncing.");
};

if (require.main === module) {
  cli().catch((err) => {
    error(err);
    process.exit(1);
  });
}

module.exports = {
  cli,
};
