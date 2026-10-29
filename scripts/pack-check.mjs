// Checks what a package publishes. Run from a package directory (its
// `pack:check` script) after building it:
//
// 1. Packs the package with `pnpm pack`.
// 2. Runs publint and attw (`@arethetypeswrong/cli`) on the tarball.
// 3. Installs the tarball outside the repo, next to only the dependencies it
//    declares, and loads every entrypoint with `require()` and `import()`.
//    Also loads every bare specifier that the package's `.mjs` files
//    default-import, as Node ESM does, and fails on Babel-style CJS (`__esModule` with `exports.default`):
//    strict ESM gives the default import `module.exports`, not `.default`.
// 4. If the package has a `pack-snapshot.json`, compares the published
//    manifest fields, how attw resolves each entrypoint (and its problems),
//    which entrypoints fail to load, and the file list against it. Pass `--update` to rewrite it.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { publint } from "publint";
import { formatMessage } from "publint/utils";

const { log, error } = console;

// publint warnings we accept for now, by package, with the reason. Anything
// else fails.
const ALLOWED_PUBLINT_WARNINGS = {
  "victory-vendor": {
    // `es/*.js` is ESM in a package without `"type": "module"`. Bundlers read
    // it through `module`; Node uses `main` (CJS). See #3105.
    FILE_INVALID_FORMAT: true,
  },
};

// Default imports of Babel-style CJS that the source unwraps itself, by
// package, as `<published file>:<specifier>`. Anything else fails, and so does
// an entry that no longer matches, so the list can't outlive the workaround.
const ALLOWED_CJS_DEFAULT_IMPORTS = {
  "victory-voronoi-container": [
    // `voronoi-helpers.ts` falls back from `.default`.
    "dist/voronoi-helpers.mjs:delaunay-find/lib/index.js",
  ],
};

// Default imports in tsdown's ESM output, one per line: `D`, `D, { ... }` and
// `D, * as ns`, from a bare specifier. Revisit if the output format changes
// (a stale allowlist entry above is the canary).
const ESM_DEFAULT_IMPORT =
  /^import\s+[\w$]+(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+[\w$]+))?\s+from\s+["']([^./"'][^"']*)["'];?/gm;

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

// Install outside the repo, so that nothing resolves through the package's or
// the root's `node_modules` (devDependencies, hoisted packages). Only the
// declared `dependencies` and `peerDependencies` are linked in, from the
// workspace install. Workspace dependencies link to their package directory,
// so they can still see their own devDependencies; each gets its own check.
const installRoot = fs.realpathSync(
  fs.mkdtempSync(path.join(os.tmpdir(), "pack-check-")),
);
for (let dir = path.dirname(installRoot); ; dir = path.dirname(dir)) {
  if (fs.existsSync(path.join(dir, "node_modules"))) {
    throw new Error(`${installRoot} isn't isolated: found ${dir}/node_modules`);
  }
  if (dir === path.dirname(dir)) break;
}
const modulesDir = path.join(installRoot, "node_modules");
fs.mkdirSync(modulesDir);
run("tar", ["xzf", tarball, "-C", installRoot]);
const manifest = JSON.parse(
  fs.readFileSync(path.join(installRoot, "package/package.json"), "utf8"),
);
const installed = path.join(modulesDir, manifest.name);
fs.mkdirSync(path.dirname(installed), { recursive: true });
fs.renameSync(path.join(installRoot, "package"), installed);
const repoModules = path.resolve(import.meta.dirname, "../node_modules");
for (const dep of Object.keys({
  ...manifest.dependencies,
  ...manifest.peerDependencies,
})) {
  // Peers may only be installed at the root.
  const source = [
    path.join(pkgDir, "node_modules", dep),
    path.join(repoModules, dep),
  ].find((p) => fs.existsSync(p));
  if (!source) {
    if (!manifest.peerDependenciesMeta?.[dep]?.optional) {
      failures.push(`Dependency ${dep} isn't installed in the workspace`);
    }
    continue;
  }
  const target = path.join(modulesDir, dep);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.symlinkSync(fs.realpathSync(source), target, "dir");
}

const entrypoints = getEntrypoints(manifest, files);

// publint
const { messages, pkg } = await publint({
  pkgDir: installed,
  pack: false,
  level: "warning",
});
for (const message of messages) {
  const text = `publint ${message.type} (${message.code}): ${formatMessage(message, pkg)}`;
  if (
    message.type === "warning" &&
    ALLOWED_PUBLINT_WARNINGS[manifest.name]?.[message.code]
  ) {
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

// Load every entrypoint as CJS and ESM. `import()` of ESM syntax in a `.js`
// file without `"type"` (victory-vendor's `es/`, #3105) works only because
// Node 20.19+/22.12+ detects the syntax, as it does for consumers.
const specifiers = entrypoints.map((e) =>
  e === "." ? manifest.name : `${manifest.name}/${e.replace(/^\.\//, "")}`,
);
// Bare specifiers default-imported by the ESM output, with every file importing
// each (an unwrapped import in one file doesn't excuse another). `.mjs` only:
// victory-vendor ships its ESM as `es/*.js` (#3105), so it isn't scanned.
const defaultImports = new Map();
for (const file of files.filter((f) => f.endsWith(".mjs"))) {
  const source = fs.readFileSync(path.join(installed, file), "utf8");
  for (const [, spec] of source.matchAll(ESM_DEFAULT_IMPORT)) {
    if (!defaultImports.has(spec)) defaultImports.set(spec, new Set());
    defaultImports.get(spec).add(file);
  }
}
const loader = path.join(installRoot, "load.mjs");
fs.writeFileSync(
  loader,
  `import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const errors = [];
for (const spec of ${JSON.stringify(specifiers)}) {
  for (const [kind, load] of [["require", (s) => require(s)], ["import", (s) => import(s)]]) {
    try {
      const mod = await load(spec);
      if (Object.keys(mod).length === 0) errors.push(kind + " " + spec + ": no exports");
    } catch (err) {
      errors.push(kind + " " + spec + ": " + err.message.split("\\n")[0]);
    }
  }
}
const interop = [];
for (const spec of ${JSON.stringify([...defaultImports.keys()])}) {
  try {
    const value = (await import(spec)).default;
    if (value != null && value.__esModule && "default" in value) interop.push(spec);
  } catch {
    // Not loadable on its own (e.g. a peer); entrypoint loading covers it.
  }
}
console.log(JSON.stringify({ errors, interop }));
`,
);
let loadFailures;
try {
  const { errors, interop } = JSON.parse(
    run(process.execPath, [loader], {
      cwd: installRoot,
      stdio: ["ignore", "pipe", "pipe"],
    }),
  );
  loadFailures = errors
    .map((e) => e.replaceAll(`${modulesDir}/${manifest.name}/`, ""))
    .sort();
  const allowed = new Set(ALLOWED_CJS_DEFAULT_IMPORTS[manifest.name]);
  const seen = new Set();
  for (const spec of interop) {
    for (const file of defaultImports.get(spec)) {
      const entry = `${file}:${spec}`;
      seen.add(entry);
      if (!allowed.has(entry)) {
        failures.push(
          `${file} default-imports "${spec}", which is CJS with \`exports.default\`: in strict ESM the import gets \`module.exports\`. Unwrap \`.default\` and add "${entry}" under "${manifest.name}" in ALLOWED_CJS_DEFAULT_IMPORTS.`,
        );
      }
    }
  }
  for (const entry of allowed) {
    if (!seen.has(entry)) {
      failures.push(
        `ALLOWED_CJS_DEFAULT_IMPORTS entry "${entry}" for "${manifest.name}" no longer matches; remove it.`,
      );
    }
  }
} finally {
  fs.rmSync(installRoot, { recursive: true, force: true });
}
if (loadFailures.length && !update && !fs.existsSync(snapshotPath)) {
  failures.push(`Loading entrypoints failed:\n  ${loadFailures.join("\n  ")}`);
}

// Snapshot
const snapshot = {
  manifest: Object.fromEntries(
    SNAPSHOT_FIELDS.filter((f) => f in manifest).map((f) => [f, manifest[f]]),
  ),
  resolutions,
  attwProblems,
  loadFailures,
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
  diffs.push(...listDiff(expected.loadFailures ?? [], loadFailures, "load "));
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
