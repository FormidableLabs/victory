// Measures what users get from common ESM imports: bundles each scenario from
// the packages' built `dist/` with rolldown, minified, with React external and
// `process.env.NODE_ENV` set to "production", then gzips the result. Run from
// the repo root after building (`pnpm bundle-size` builds first). In CI, the
// PR's copy of this script also measures the base branch, so both sides use
// the same scenarios and bundler.
//
// Writes `bundle-size/report.json` and `bundle-size/report.md`. Pass
// `--base <report.json>` (an earlier report) to add the change from it.
// Reported, not gated: it never fails on size.
import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { build } from "rolldown";

// Keep this list short and stable: renaming a scenario loses its comparison.
const SCENARIOS = {
  "VictoryPie from victory-pie": `export { VictoryPie } from "victory-pie";`,
  "VictoryPie from victory": `export { VictoryPie } from "victory";`,
  "victory-core (everything)": `export * from "victory-core";`,
  "victory (everything)": `export * from "victory";`,
};

const root = process.cwd();
const outDir = path.join(root, "bundle-size");
// Inside the `victory` package, so its dependencies and itself (by name)
// resolve as they would for a user.
const workDir = path.join(
  root,
  "packages/victory/node_modules/.cache/bundle-size",
);

// Warning annotations show on the PR's checks without needing write access.
const warn = (message) =>
  process.stdout.write(
    process.env.GITHUB_ACTIONS
      ? `::warning title=Bundle size::${message}\n`
      : `Warning: ${message}\n`,
  );

// An empty `--base ""` means no comparison (CI passes one on pushes).
const baseIndex = process.argv.indexOf("--base");
if (baseIndex !== -1 && baseIndex + 1 >= process.argv.length) {
  throw new Error("--base needs a path to a report.json");
}
const basePath = baseIndex === -1 ? "" : process.argv[baseIndex + 1];
let base = null;
if (basePath) {
  if (fs.existsSync(basePath)) {
    base = JSON.parse(fs.readFileSync(basePath, "utf8"));
  } else {
    warn(`No base report at ${basePath}, so no comparison.`);
  }
}

fs.rmSync(workDir, { recursive: true, force: true });
fs.mkdirSync(workDir, { recursive: true });

const results = {};
try {
  for (const [name, source] of Object.entries(SCENARIOS)) {
    const entry = path.join(workDir, `${Object.keys(results).length}.mjs`);
    fs.writeFileSync(entry, `${source}\n`);
    const { output } = await build({
      input: entry,
      platform: "browser",
      external: /^react(-dom)?($|\/)/,
      transform: { define: { "process.env.NODE_ENV": '"production"' } },
      output: { format: "esm", minify: true, codeSplitting: false },
      write: false,
      logLevel: "silent",
    });
    const code = output[0].code;
    results[name] = {
      minified: Buffer.byteLength(code),
      gzip: gzipSync(code).length,
    };
  }
} finally {
  fs.rmSync(workDir, { recursive: true, force: true });
}

const BYTES_PER_KB = 1000;
const PERCENT = 100;
// Gzip growth over the base that gets a warning annotation in CI. Builds are
// deterministic, so any change is real; this only skips routine edits.
const WARN_GROWTH = 0.01;
const kb = (bytes) => `${(bytes / BYTES_PER_KB).toFixed(1)} kB`;
const delta = (now, then) => {
  if (then === undefined) return "new";
  const diff = now - then;
  if (diff === 0) return "0";
  const sign = diff > 0 ? "+" : "";
  const pct = ((diff / then) * PERCENT).toFixed(1);
  return `${sign}${kb(diff)} (${sign}${pct}%)`;
};

const header = base
  ? ["Scenario", "Minified", "Gzip", "Gzip change"]
  : ["Scenario", "Minified", "Gzip"];
const rows = Object.entries(results).map(([name, { minified, gzip }]) => {
  const row = [`\`${name}\``, kb(minified), kb(gzip)];
  if (base) row.push(delta(gzip, base[name]?.gzip));
  return row;
});
const markdown = [
  "### Bundle size",
  "",
  `| ${header.join(" | ")} |`,
  `| ${header.map((_, i) => (i === 0 ? "---" : "---:")).join(" | ")} |`,
  ...rows.map((row) => `| ${row.join(" | ")} |`),
  "",
  "ESM from `dist/`, bundled with rolldown, minified, React external." +
    (basePath && !base
      ? " The base report is missing, so no change is shown."
      : ""),
  "",
].join("\n");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "report.json"),
  `${JSON.stringify(results, null, 2)}\n`,
);
fs.writeFileSync(path.join(outDir, "report.md"), markdown);
process.stdout.write(markdown);

for (const [name, { gzip }] of Object.entries(results)) {
  const then = base?.[name]?.gzip;
  if (then && (gzip - then) / then > WARN_GROWTH) {
    warn(`${name}: gzip ${delta(gzip, then)} vs base`);
  }
}
