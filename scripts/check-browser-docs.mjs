// Checks the no-build examples in the "Using Victory in the Browser" docs
// (website/docs/introduction/browser.mdx, #3106). They load published Victory
// and React from esm.sh and jsDelivr, so they can break without a change here.
//
// For each page (esm.sh; jsDelivr; jsDelivr on another React, with and without
// the documented remap line), it:
//
// 1. Crawls the module graph from the page's import map with `fetch` and
//    checks that React and React DOM load once, at one version. A duplicate
//    names the module that imports it.
// 2. Renders the page in headless Chromium (the stories package's Playwright;
//    `pnpm stories:install` once), waits for the chart, clicks "Randomize" and
//    waits for the bars to change. Any page or console error fails it.
//
// The page without the remap line is expected to fail both checks.
//
// `--victory <version>` swaps in another Victory version (e.g. a canary on
// `next`) so a release can be checked before the docs are bumped.
//
// It hits third-party CDNs and tests published versions, not this checkout,
// so CI runs it only on demand and for PRs that change the docs page or this
// script (.github/workflows/browser-docs.yml).
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { setTimeout } from "node:timers/promises";
import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    victory: { type: "string" },
    mdx: {
      type: "string",
      default: "website/docs/introduction/browser.mdx",
    },
  },
});

// The page's own origin. Playwright serves the page for it; nothing listens.
const PAGE_URL = "http://browser-docs.test/";
const RENDER_TIMEOUT = 60_000;
const FETCH_ATTEMPTS = 3;
const RETRY_DELAY = 1000;
const CLICK_TIMEOUT = 10_000;

// --- Examples ---------------------------------------------------------------

const mdx = await readFile(args.mdx, "utf8");
const codeBlocks = (lang) =>
  [...mdx.matchAll(new RegExp("```" + lang + "\\n([\\s\\S]*?)```", "g"))].map(
    (m) => m[1],
  );
const htmlBlocks = codeBlocks("html");
const jsonBlocks = codeBlocks("json");
if (htmlBlocks.length !== 2 || jsonBlocks.length !== 1) {
  throw new Error(
    `${args.mdx}: expected 2 html blocks (esm.sh page, jsDelivr import map) and 1 json block (remap line), found ${htmlBlocks.length} and ${jsonBlocks.length}. Update this script to match the page.`,
  );
}

const IMPORT_MAP_RE = /<script type="importmap">([\s\S]*?)<\/script>/;
const importMapOf = (html) => {
  const match = html.match(IMPORT_MAP_RE);
  if (!match) throw new Error(`${args.mdx}: no import map in:\n${html}`);
  return JSON.parse(match[1]).imports;
};
const pageWith = (imports) =>
  htmlBlocks[0].replace(
    IMPORT_MAP_RE,
    () =>
      `<script type="importmap">${JSON.stringify({ imports }, null, 2)}</script>`,
  );

// `"victory": "...victory@38..."` → the `--victory` version.
const withVictory = (imports) => {
  if (!args.victory) return imports;
  const victory = imports.victory.replace(
    /\/victory@[^/?]+/,
    () => `/victory@${args.victory}`,
  );
  if (!/\/victory@[^/?]+/.test(imports.victory)) {
    throw new Error(`No version to replace in ${imports.victory}`);
  }
  return { ...imports, victory };
};

// The remap line, e.g. jsDelivr's react@19.3.1/ → react@19.2.0/. The pages on
// "another React" use its target version.
const remap = JSON.parse(`{${jsonBlocks[0]}}`);
const [[remapFrom, remapTo]] = Object.entries(remap);
const otherReact = remapTo.match(/\/react@([^/]+)\//)?.[1];
if (!otherReact) throw new Error(`No React version in ${remapTo}`);
const withReact = (imports, version) =>
  Object.fromEntries(
    Object.entries(imports).map(([key, url]) => [
      key,
      key === "react" || key.startsWith("react-dom")
        ? url.replace(
            /\/(react(?:-dom)?)@[^/?]+/,
            (_, name) => `/${name}@${version}`,
          )
        : url,
    ]),
  );

const esmsh = withVictory(importMapOf(htmlBlocks[0]));
const jsdelivr = withVictory(importMapOf(htmlBlocks[1]));
const jsdelivrOther = withReact(jsdelivr, otherReact);

const PAGES = [
  { name: "esm.sh", imports: esmsh, ok: true },
  { name: "jsDelivr", imports: jsdelivr, ok: true },
  {
    name: `jsDelivr, React ${otherReact} + remap`,
    imports: { ...jsdelivrOther, ...remap },
    ok: true,
  },
  {
    name: `jsDelivr, React ${otherReact}, no remap (should fail)`,
    imports: jsdelivrOther,
    ok: false,
  },
];

// --- 1. Module graph --------------------------------------------------------

// Import map resolution (top-level "imports" only, which is all the docs use):
// an exact key, else the longest key ending in "/" that prefixes it.
const resolve = (specifier, base, imports) => {
  let key = specifier;
  if (/^(\/|\.\.?\/)/.test(specifier) || URL.canParse(specifier)) {
    key = new URL(specifier, base).href;
  }
  if (Object.hasOwn(imports, key)) return imports[key];
  const prefix = Object.keys(imports)
    .filter((k) => k.endsWith("/") && key.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  if (prefix) return imports[prefix] + key.slice(prefix.length);
  if (key === specifier && !URL.canParse(specifier)) {
    throw new Error(`Bare specifier "${specifier}" isn't in the import map`);
  }
  return key;
};

// Responses are shared across pages: most modules are the same.
const responses = new Map();
const fetchModule = (url) => {
  if (!responses.has(url)) {
    responses.set(
      url,
      (async () => {
        for (let attempt = 1; ; attempt++) {
          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            // Redirects (esm.sh's `@38` → `@38.0.0`) change the base URL.
            return { url: res.url, source: await res.text() };
          } catch (error) {
            if (attempt === FETCH_ATTEMPTS) {
              throw new Error(`Fetching ${url}: ${error.message}`, {
                cause: error,
              });
            }
            await setTimeout(RETRY_DELAY * attempt);
          }
        }
      })(),
    );
  }
  return responses.get(url);
};

// Static and dynamic imports and re-exports in (minified) ESM.
const SPECIFIER_RE = /(?:\bfrom\s*|\bimport\s*\(?\s*)["']([^"'\s]+)["']/g;
// `/npm/react@19.3.1/+esm` (jsDelivr), `/react@19.3.1/es2022/react.mjs` (esm.sh)
const PACKAGE_RE = /^\/(?:npm\/|v\d+\/|stable\/)?((?:@[^/]+\/)?[^@/]+)@([^/]+)/;
const SINGLETONS = ["react", "react-dom"];

const crawl = async (imports) => {
  // `react` → version → first module seen importing it.
  const found = new Map(SINGLETONS.map((name) => [name, new Map()]));
  const seen = new Set();
  let modules = 0;
  const visit = async (specifier, importer) => {
    const url = resolve(specifier, importer ?? PAGE_URL, imports);
    const pkg = new URL(url).pathname.match(PACKAGE_RE);
    if (pkg && found.has(pkg[1]) && !found.get(pkg[1]).has(pkg[2])) {
      found.get(pkg[1]).set(pkg[2], { importer, specifier });
    }
    if (seen.has(url)) return;
    seen.add(url);
    const mod = await fetchModule(url);
    if (mod.url !== url && seen.has(mod.url)) return;
    seen.add(mod.url);
    modules++;
    const specifiers = new Set(
      [...mod.source.matchAll(SPECIFIER_RE)].map((m) => m[1]),
    );
    await Promise.all([...specifiers].map((s) => visit(s, mod.url)));
  };
  // The page imports these bare names.
  await Promise.all(
    ["react", "react-dom/client", "victory"].map((s) => visit(s)),
  );

  const problems = [];
  let duplicate = false;
  for (const [name, versions] of found) {
    if (versions.size === 0) problems.push(`no ${name} in the module graph`);
    if (versions.size < 2) continue;
    duplicate = true;
    const lines = [...versions].map(
      ([version, { importer, specifier }]) =>
        `  ${name}@${version}: "${specifier}" in ${importer ?? "the page"}`,
    );
    problems.push(
      `${name} loads at ${versions.size} versions:\n${lines.join("\n")}`,
    );
  }
  const react = [...found.get("react").keys()];
  const reactDom = [...found.get("react-dom").keys()];
  if (react.length === 1 && reactDom.length === 1 && react[0] !== reactDom[0]) {
    problems.push(`react@${react[0]} and react-dom@${reactDom[0]} differ`);
  }
  return { modules, problems, duplicate };
};

// --- 2. Render --------------------------------------------------------------

// Playwright is the stories package's (no second install).
const require = createRequire(
  new URL("../stories/package.json", import.meta.url),
);
const { chromium } = require("playwright");

const render = async (browser, imports) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  // Any error (two Reacts, a module that fails to load) fails the page, so it
  // stops the wait for the chart.
  const { promise: pageError, reject } = Promise.withResolvers();
  pageError.catch(() => {});
  const addError = (message) => {
    errors.push(message);
    reject(new Error("page error"));
  };
  page.on("pageerror", (error) => addError(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") addError(message.text());
  });
  await page.route(PAGE_URL, (route) =>
    route.fulfill({ contentType: "text/html", body: pageWith(imports) }),
  );
  const bars = () =>
    page.$$eval("#root svg path", (paths) =>
      paths.map((p) => p.getAttribute("d")).join(" "),
    );
  try {
    await page.goto(PAGE_URL);
    await Promise.race([
      page.waitForSelector("#root svg path", { timeout: RENDER_TIMEOUT }),
      pageError,
    ]);
    const before = await bars();
    await page.click("#root button");
    await Promise.race([
      page.waitForFunction(
        (prev) =>
          [...document.querySelectorAll("#root svg path")]
            .map((p) => p.getAttribute("d"))
            .join(" ") !== prev,
        before,
        { timeout: CLICK_TIMEOUT },
      ),
      pageError,
    ]);
  } catch (error) {
    if (error.message !== "page error")
      errors.push(error.message.split("\n")[0]);
  } finally {
    await context.close();
  }
  return { errors };
};

// --- Run --------------------------------------------------------------------

const browser = await chromium.launch();
let failed = false;
try {
  const results = await Promise.all(
    PAGES.map(async (page) => {
      const [graph, rendered] = await Promise.all([
        crawl(page.imports).catch((error) => ({
          modules: 0,
          problems: [error.message],
          duplicate: false,
        })),
        render(browser, page.imports),
      ]);
      return { ...page, graph, rendered };
    }),
  );
  for (const { name, imports, ok, graph, rendered } of results) {
    const passed = graph.problems.length === 0 && rendered.errors.length === 0;
    // The no-remap page has to load two Reacts and fail to render, to show
    // the remap is needed (not fail for some other reason, like a 404).
    const asExpected = ok
      ? passed
      : graph.duplicate && rendered.errors.length > 0;
    if (!asExpected) failed = true;
    let status = "FAIL";
    if (asExpected) status = ok ? "ok" : "ok (failed as expected)";
    process.stdout.write(
      `\n${status}: ${name}\n  victory: ${imports.victory}\n`,
    );
    process.stdout.write(`  module graph: ${graph.modules} modules\n`);
    for (const problem of graph.problems) {
      process.stdout.write(`  ${problem.replaceAll("\n", "\n  ")}\n`);
    }
    process.stdout.write(
      rendered.errors.length === 0
        ? "  render: chart drawn, updated on Randomize\n"
        : `  render errors:\n${rendered.errors.map((e) => `    ${e}`).join("\n")}\n`,
    );
  }
} finally {
  await browser.close();
}

if (failed) {
  process.stdout.write(
    `\nThe browser docs examples don't work as documented. A duplicate React in the jsDelivr graph usually means jsDelivr built Victory against a different React: update the page's React to that version, and the remap line's source version (${remapFrom}).\n`,
  );
  process.exit(1);
}
