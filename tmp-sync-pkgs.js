#!/usr/bin/env node

/**
 * Helper to sync up wireit scripts.
 *
 * TODO: Remove when done
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
  const pkgs = (await fs.readdir("packages"))
    .filter((p) => p.startsWith("victory") && !PKGS_SET.has(p));

  console.log("TODO", { pkgs })
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
