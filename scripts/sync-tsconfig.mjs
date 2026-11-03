// Copies victory-core's `tsconfig.*` files to every other package in
// `packages/` except victory-vendor, which has its own. Run from the repo root
// (the root `sync` script). CI checks the result has no diff.
import fs from "node:fs/promises";
import path from "node:path";

const SOURCE = "victory-core";
const SKIP = new Set([SOURCE, "victory-vendor"]);

const [files, manifests] = await Promise.all([
  Array.fromAsync(fs.glob(`packages/${SOURCE}/tsconfig.*`)),
  Array.fromAsync(fs.glob("packages/*/package.json")),
]);

const dirs = manifests
  .map(path.dirname)
  .filter((dir) => !SKIP.has(path.basename(dir)));

await Promise.all(
  dirs.flatMap((dir) =>
    files.map((file) => fs.copyFile(file, path.join(dir, path.basename(file)))),
  ),
);
