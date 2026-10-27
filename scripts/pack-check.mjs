// Checks what a package publishes. Run from a package directory (its
// `pack:check` script) after building it:
//
// 1. Packs the package with `pnpm pack`.
// 2. Runs publint and attw (`@arethetypeswrong/cli`) on the tarball.
// 3. Installs the tarball into a scratch `node_modules` and loads every
//    entrypoint with both `require()` and `import()`.
// 4. If the package has a `pack-snapshot.json`, compares the published
//    manifest fields, how attw resolves each entrypoint (and its problems),
//    and the file list against it. Pass `--update` to rewrite it.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { publint } from "publint";
import { formatMessage } from "publint/utils";

const { log, error } = console;

// publint warnings we accept for now, with the reason. Anything else fails.
const ALLOWED_PUBLINT_WARNINGS = {
  // `es/*.js` is ESM in a package without `"type": "module"`. Bundlers read
  // it through `module`; Node uses `main` (CJS). Fixed by `exports` in v38.
  FILE_INVALID_FORMAT: true,
};

// Manifest fields that change how consumers resolve or install the package.
const SNAPSHOT_FIELDS = [
  "name",
  "type",
  "main",
  "module",
  "types",
  "typings",
  "exports",
  "browser",
  "sideEffects",
  "bin",
  "dependencies",
  "peerDependencies",
  "peerDependenciesMeta",
];

const update = process.argv.includes("--update");
const pkgDir = process.cwd();
const workDir = path.join(pkgDir, "node_modules/.cache/pack-check");
const snapshotPath = path.join(pkgDir, "pack-snapshot.json");
const failures = [];

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: "utf8", ...opts });

// Pack
fs.rmSync(workDir, { recursive: true, force: true });
fs.mkdirSync(workDir, { recursive: true });
const { filename } = JSON.parse(
  run("pnpm", ["pack", "--json", "--pack-destination", workDir], {
    stdio: ["ignore", "pipe", "inherit"],
  }),
);
const tarball = path.resolve(workDir, filename);
const files = run("tar", ["tzf", tarball])
  .split("\n")
  .filter((f) => f && !f.endsWith("/"))
  .map((f) => f.replace(/^package\//, ""))
  .sort();

// Install into a scratch `node_modules`. Its dependencies resolve from the
// package's own `node_modules` further up.
const installDir = path.join(workDir, "node_modules/.pkg");
fs.mkdirSync(installDir, { recursive: true });
run("tar", ["xzf", tarball, "-C", installDir]);
const manifest = JSON.parse(
  fs.readFileSync(path.join(installDir, "package/package.json"), "utf8"),
);
const installed = path.join(workDir, "node_modules", manifest.name);
fs.renameSync(path.join(installDir, "package"), installed);
fs.rmSync(installDir, { recursive: true });

const entrypoints = getEntrypoints(manifest, files);

// publint
const { messages, pkg } = await publint({
  pkgDir: installed,
  pack: false,
  level: "warning",
});
for (const message of messages) {
  const text = `publint ${message.type} (${message.code}): ${formatMessage(message, pkg)}`;
  if (message.type === "warning" && ALLOWED_PUBLINT_WARNINGS[message.code]) {
    continue;
  }
  failures.push(text);
}

// attw. Wildcard subpaths aren't discovered, so list them explicitly. With a
// snapshot, its problems are compared against the snapshot instead of failing.
const subpaths = entrypoints.filter((e) => e !== ".");
// attw exits before a piped stdout is flushed, so write to a file.
const attwJson = path.join(workDir, "attw.json");
const attwFd = fs.openSync(attwJson, "w");
try {
  run(
    "attw",
    [
      tarball,
      "--format",
      "json",
      ...(subpaths.length ? ["--include-entrypoints", ...subpaths] : []),
    ],
    { stdio: ["ignore", attwFd, "inherit"] },
  );
} catch {
  // Exits non-zero when it finds problems.
} finally {
  fs.closeSync(attwFd);
}
const { analysis } = JSON.parse(fs.readFileSync(attwJson, "utf8"));
const stripPkg = (fileName) =>
  fileName?.replace(`/node_modules/${manifest.name}/`, "");
const attwProblems = [
  ...new Set(
    analysis.problems.map((p) =>
      [p.kind, p.entrypoint, p.resolutionKind, stripPkg(p.fileName)]
        .filter(Boolean)
        .join(" "),
    ),
  ),
].sort();
// Which types and JS file each entrypoint resolves to, per resolution mode.
const resolutions = Object.fromEntries(
  Object.entries(analysis.entrypoints).map(([subpath, entry]) => [
    subpath,
    Object.fromEntries(
      Object.entries(entry.resolutions).map(([kind, r]) => [
        kind,
        `types=${stripPkg(r.resolution?.fileName) ?? "none"} js=${stripPkg(r.implementationResolution?.fileName) ?? "none"}`,
      ]),
    ),
  ]),
);
if (attwProblems.length && !update && !fs.existsSync(snapshotPath)) {
  failures.push(`attw found problems:\n  ${attwProblems.join("\n  ")}`);
}

// Load every entrypoint as CJS and ESM.
const specifiers = entrypoints.map((e) =>
  e === "." ? manifest.name : `${manifest.name}/${e.replace(/^\.\//, "")}`,
);
const loader = path.join(workDir, "load.mjs");
fs.writeFileSync(
  loader,
  `import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const errors = [];
for (const spec of ${JSON.stringify(specifiers)}) {
  for (const [kind, load] of [["require", (s) => require(s)], ["import", (s) => import(s)]]) {
    try {
      const mod = await load(spec);
      if (Object.keys(mod).length === 0) errors.push(kind + "(" + spec + "): no exports");
    } catch (err) {
      errors.push(kind + "(" + spec + "): " + err.message.split("\\n")[0]);
    }
  }
}
if (errors.length) {
  console.error(errors.join("\\n"));
  process.exit(1);
}
`,
);
try {
  run(process.execPath, [loader], { stdio: ["ignore", "pipe", "pipe"] });
} catch (err) {
  failures.push(`Loading entrypoints failed:\n${err.stderr}`);
}

// Snapshot
const snapshot = {
  manifest: Object.fromEntries(
    SNAPSHOT_FIELDS.filter((f) => f in manifest).map((f) => [f, manifest[f]]),
  ),
  resolutions,
  attwProblems,
  files,
};
if (update) {
  fs.writeFileSync(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  log(`Wrote ${path.relative(pkgDir, snapshotPath)}`);
} else if (fs.existsSync(snapshotPath)) {
  const expected = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  const diffs = [];
  for (const field of new Set([
    ...Object.keys(expected.manifest),
    ...Object.keys(snapshot.manifest),
  ])) {
    const [a, b] = [expected.manifest[field], snapshot.manifest[field]].map(
      (v) => JSON.stringify(v),
    );
    if (a !== b) diffs.push(`  ${field}: ${a} -> ${b}`);
  }
  for (const [subpath, kinds] of Object.entries({
    ...expected.resolutions,
    ...resolutions,
  })) {
    for (const kind of Object.keys(kinds)) {
      const a = expected.resolutions[subpath]?.[kind] ?? "missing";
      const b = resolutions[subpath]?.[kind] ?? "missing";
      if (a !== b) diffs.push(`  ${subpath} (${kind}): ${a} -> ${b}`);
    }
  }
  diffs.push(...listDiff(expected.attwProblems, attwProblems, "attw "));
  diffs.push(...listDiff(expected.files, files, ""));
  if (diffs.length) {
    failures.push(
      `Published output differs from pack-snapshot.json (if intended, run \`pnpm pack:check --update\` in this package and commit it):\n${diffs.join("\n")}`,
    );
  }
}

log(
  `${manifest.name}: ${files.length} files, entrypoints: ${specifiers.join(", ")}`,
);
if (failures.length) {
  error(failures.join("\n\n"));
  process.exit(1);
}

// "." for packages without `exports`. Otherwise each subpath, with wildcards
// expanded against the packed files (`./d3-*` -> `./d3-scale`, ...).
function getEntrypoints({ exports }, packed) {
  if (!exports) return ["."];
  if (
    typeof exports === "string" ||
    !Object.keys(exports)[0]?.startsWith(".")
  ) {
    return ["."];
  }
  const found = [];
  for (const [subpath, target] of Object.entries(exports)) {
    if (subpath === "./package.json") continue;
    if (!subpath.includes("*")) {
      found.push(subpath);
      continue;
    }
    const pattern = firstTarget(target).replace(/^\.\//, "");
    const [prefix, suffix] = pattern.split("*");
    for (const f of packed) {
      if (f.startsWith(prefix) && f.endsWith(suffix)) {
        const match = f.slice(prefix.length, f.length - suffix.length);
        if (match && !match.includes("/")) {
          found.push(subpath.replace("*", match));
        }
      }
    }
  }
  return found;
}

function listDiff(before, after, label) {
  const [a, b] = [new Set(before), new Set(after)];
  return [
    ...before.filter((x) => !b.has(x)).map((x) => `  - ${label}${x}`),
    ...after.filter((x) => !a.has(x)).map((x) => `  + ${label}${x}`),
  ];
}

function firstTarget(target) {
  if (typeof target === "string") return target;
  return firstTarget(
    target.default ?? target.require ?? Object.values(target)[0],
  );
}
