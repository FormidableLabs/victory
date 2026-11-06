// Runs the stories' screenshot tests (`stories/tests/screenshots.test.tsx`) in
// the Playwright container CI uses, so the pixels match CI's. Needs Docker
// (Docker Desktop, or Colima: `colima start`). Arguments go to Vitest, e.g.
// `pnpm stories:screenshots -u` to update the screenshots.
//
// `pnpm stories:screenshots` builds the packages first; their `dist/` is
// copied into the container (it's plain JS, the same on every OS). The
// container gets its own Linux `node_modules`, installed into a copy of the
// repo; new and updated screenshots, and diffs of failing ones, are copied
// back.
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// A native path (Docker on Windows needs `C:\\...`, not `/C:/...`).
const ROOT = fileURLToPath(new URL("..", import.meta.url));

// The image tag lives in CI's workflow; read it from there so there's one
// place to bump it.
const ci = await readFile(
  new URL("../.github/workflows/ci.yml", import.meta.url),
  "utf8",
);
const image = ci.match(/mcr\.microsoft\.com\/playwright:v([\d.]+)-\w+/);
if (!image) {
  throw new Error("No Playwright image found in .github/workflows/ci.yml");
}

// The image's browsers only work with the same Playwright version.
const require = createRequire(
  new URL("../stories/package.json", import.meta.url),
);
const { version } = require("playwright/package.json");
if (version !== image[1]) {
  throw new Error(
    `Playwright is ${version} but the CI image is ${image[0]}. Update the image tag in .github/workflows/ci.yml to v${version}.`,
  );
}

const { packageManager } = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

// Runs inside the container. Copies the repo without `node_modules` and
// caches, installs what the stories need, runs the tests, then copies the
// screenshots and any diffs back (even when tests fail).
const script = `
set -eu
mkdir -p /work
tar -C /src --exclude=node_modules --exclude=./.git --exclude=./.turbo \\
  --exclude=./website -cf - . | tar -C /work -xf -
cd /work
npm install --global --silent --cache /cache/npm "${packageManager}"
pnpm install --frozen-lockfile --store-dir /cache/pnpm-store \\
  --filter victory-stories... > /tmp/install.log 2>&1 || { cat /tmp/install.log; exit 1; }
status=0
pnpm --filter victory-stories exec vitest run --project screenshots "$@" || status=$?
# Vitest's attachments are the actual images and diffs of failing ones.
rm -rf /src/stories/tests/__screenshots__ /src/stories/.vitest/attachments
cp -R stories/tests/__screenshots__ /src/stories/tests/
if [ -d stories/.vitest/attachments ]; then
  mkdir -p /src/stories/.vitest
  cp -R stories/.vitest/attachments /src/stories/.vitest/
fi
exit $status
`;

const args = [
  "run",
  "--rm",
  "--init",
  // Chromium needs more shared memory than Docker's default.
  "--ipc=host",
  // CI's screenshot job runs on arm64, and Chromium's rasterizer can differ
  // by CPU. Native on Apple silicon; elsewhere Docker emulates it (slowly).
  "--platform=linux/arm64",
  "--volume",
  `${ROOT}:/src`,
  // pnpm's store and npm's cache, kept between runs.
  "--volume",
  "victory-stories-screenshots:/cache",
  image[0],
  "bash",
  "-c",
  script,
  "bash",
  ...process.argv.slice(2),
];

const child = spawn("docker", args, { stdio: "inherit" });
child.on("error", (error) => {
  if (error.code === "ENOENT") {
    process.stderr.write(
      "Docker isn't installed. Install Docker Desktop or Colima (see CONTRIBUTING.md).\n",
    );
    process.exit(1);
  }
  throw error;
});
child.on("exit", (code) => process.exit(code ?? 1));
