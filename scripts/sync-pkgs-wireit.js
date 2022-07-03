#!/usr/bin/env node

/**
 * This helper script uses `victory-core` as a template and then for each
 * other victory package as follows.
 *
 * 1. Adds all `scripts` and `wireit` configs to that package.
 * 2. Updates wireit config dependencies to match package.json dependencies.
 *
 * The script also adds `wireit` configs to the root package.json.
 *
 * Note that this script does _not_ mutate:
 * - victory-core
 * - victory-vendor
 * - victory-native
 *
 * If you are editing `victory-vendor` or `victory-native`, directly edit them.
 * For **all other packages**, make your changes in `victory-core` first, test
 * out, and then run this script to sync all the other packages.
 */

const fs = require("fs/promises");
const path = require("path");
const { log, error } = console; // eslint-disable-line no-undef

// ============================================================================
// Config
// ============================================================================
const ROOT = path.resolve(__dirname, ".."); // eslint-disable-line no-undef
const PKGS_ROOT = path.join(ROOT, "packages");

// Special packages
const PKGS = {
  CORE: "victory-core",
  NATIVE: "victory-native",
  VENDOR: "victory-vendor",
};
const SPECIAL_PKGS = new Set([PKGS.NATIVE, PKGS.VENDOR]);

// ============================================================================
// Helpers
// ============================================================================
const readPkg = async (pkgPath) => JSON.parse(await fs.readFile(pkgPath));
const writePkg = async (pkgPath, data) => {
  log(`Writing ${pkgPath}`);
  await fs.writeFile(pkgPath, JSON.stringify(data, null, 2) + "\n");
};

// ============================================================================
// Script
// ============================================================================
const cli = async () => {
  const workspaces = (await fs.readdir(PKGS_ROOT)).filter(
    (p) => p.startsWith("victory") && !SPECIAL_PKGS.has(p),
  );

  // Root mutation
  // We want to use wireit directly to manage multi-build for better
  // cache hits (e.g. `pnpm -r run build` seems to get a lot of cache
  // misses). So create tasks with cross-package deps
  const rootPkgPath = `${ROOT}/package.json`;
  const rootPkg = await readPkg(rootPkgPath);

  rootPkg.wireit = rootPkg.wireit || {};
  [
    { rootTask: "build" },
    { rootTask: "format:pkgs", pkgTask: "format" },
    { rootTask: "lint:pkgs", pkgTask: "lint" },
    { rootTask: "jest:pkgs", pkgTask: "jest" },
  ].forEach(({ rootTask, pkgTask }) => {
    rootPkg.wireit[rootTask] = rootPkg.wireit[rootTask] || {};
    rootPkg.wireit[rootTask].dependencies = []
      .concat(PKGS.NATIVE, PKGS.VENDOR, workspaces)
      .map((p) => `./packages/${p}:${pkgTask || rootTask}`);
  });

  delete rootPkg.sideEffects;
  rootPkg.sideEffects = false;

  await writePkg(rootPkgPath, rootPkg);

  // Workspace mutations
  // Use the core package as the template for the rest.
  const corePkg = JSON.parse(
    await fs.readFile(`${PKGS_ROOT}/victory-core/package.json`),
  );

  for (const workspace of workspaces) {
    const pkgPath = `${PKGS_ROOT}/${workspace}/package.json`;
    const pkg = await readPkg(pkgPath);

    // Overwrite scripts and wireit configuration.
    const scripts = JSON.parse(JSON.stringify(corePkg.scripts));
    pkg.scripts = scripts;

    // Start with wireit task config and add in dependencies
    const wireit = JSON.parse(JSON.stringify(corePkg.wireit));
    pkg.wireit = wireit;

    // Clear out existing deps from victory-core
    // TODO(wireit): Abstract and refactor this whole section better.
    [
      "build:lib:esm",
      "build:lib:cjs",
      "build:dist:dev",
      "build:dist:min",
    ].forEach((key) => {
      pkg.wireit[key].dependencies = [];
    });

    // TODO: Need to add victory devDependencies to jest

    const addDeps = (key, dep) => pkg.wireit[key].dependencies.push(dep);
    const crossDeps = Object.keys(pkg.dependencies).filter((p) =>
      p.startsWith("victory"),
    );
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

    await writePkg(pkgPath, pkg);
  }

  log("Finished syncing.");
};

if (require.main === module) {
  cli().catch((err) => {
    error(err);
    process.exit(1); // eslint-disable-line no-process-exit
  });
}

module.exports = {
  cli,
};
