# AGENTS.md

Guidance for AI coding agents (and humans) working in this repo. Keep it short and current: when a convention changes, update this file in the same PR.

## Current focus: 2026 Uplift

Tracking issue: https://github.com/FormidableLabs/victory/issues/3093. Read it before starting uplift work; its **Decision log** is the source of truth for settled choices. Don't re-open a logged decision without saying why.

- **Branch:** `main`. 38.0.0 shipped from the integration branch (2026-11-03); uplift PRs now target `main` directly.
- **Infra first, source last.** No substantive changes to `packages/*/src` in infra PRs. Mechanical churn (formatting, lint autofixes, type-error fixes) goes in its own PR, with no behavior changes mixed in, and its commit is added to `.git-blame-ignore-revs`. Exception: a few type-only fixes that a tooling or dependency bump needs (no runtime or published-type change) can ride along in that PR; call them out.
- **Tasks are plain `package.json` scripts.** Turborepo (`turbo.json`) orchestrates and caches them. Never put logic only in runner config.
- **Small, reviewable PRs.** One concern per PR. Each PR that changes what users of a published package get (code, types, `exports`, published files, `dependencies`/`peerDependencies`) needs a changeset (`pnpm changeset`). Manifest changes that only touch `scripts` or `devDependencies` don't.

## Working agreements

- **Don't commit, stage, push, merge, or open PRs** unless explicitly asked. Prepare the changes in the working tree and suggest a commit message; the maintainer does the git work.
- Don't publish to npm or change npm/GitHub settings (trusted publishers, environments, dist-tags). Write the scripts and docs; a maintainer runs them.
- Report outcomes plainly: if a check was skipped or fails, say so with the output.

## Releasing

- `release.yml`'s filename and the `npm-publish` environment are bound to npm trusted publishing. Renaming either requires re-running `scripts/npm-trust.sh` (revoke first).
- Version Packages PRs are opened by `GITHUB_TOKEN`, so GitHub holds their CI runs for approval. After the PR's last update, a maintainer clicks "Approve and run" on the held runs.

## Repo map

- `packages/victory-*`: the published packages. They all share one version (changesets `fixed` group).
- `tsdown.config.mts`: the shared build for every `victory-*` package except `victory-vendor`. It writes `dist/` (`.mjs`/`.cjs`, one file per source file, `.d.mts`/`.d.cts`) and the `main`/`module`/`types`/`exports` fields in each `package.json`. Don't hand-edit those fields; rebuild and commit what tsdown writes.
- `packages/victory-vendor`: vendors d3 as ESM + CJS. **Highest-stakes package.** About 99% of its downloads come through recharts (`victory-vendor@^37`, using `victory-vendor/d3-scale` and `victory-vendor/d3-shape`). Its `exports` map and published file layout must stay compatible; `pnpm pack:check` compares them against `packages/victory-vendor/pack-snapshot.json`.
- `stories/`: the `victory-stories` workspace package (private): 203 stories in Storybook's file format and a Vite gallery app (`app/`). `utils/load-stories.ts` loads them and renders each as Storybook did (global, meta, then story args; meta decorators). `tests/` snapshots every story's markup in headless Chromium (Vitest browser mode), one file per story in `tests/__snapshots__/`, and screenshots a curated few (`SCREENSHOT_STORIES`) in `tests/__screenshots__/`, only in the pinned Playwright Docker image (tag in `ci.yml`). `tests/interactions/` drives stories with Playwright's mouse (`userEvent`) and asserts on what changes (tooltips, containers, events).
- `website/`: Docusaurus docs site.
- `test/`: shared Vitest config (jsdom, globals) and helpers.
- `scripts/`: task scripts (`pack-check.mjs`, `bundle-size.mjs`, `lint-gha.mjs`, `check-browser-docs.mjs`), changelog, and npm trusted-publishing setup.

## Commands

Use the Node version in `.nvmrc` and pnpm (version from `packageManager`; no corepack needed). Never use npm or yarn to install.
pnpm settings (workspace linking, `overrides`, `patchedDependencies`, `allowBuilds`, `minimumReleaseAge`) live in `pnpm-workspace.yaml`. pnpm 11+ ignores them in `.npmrc` and in `package.json`'s `"pnpm"` field.
`minimumReleaseAge` is 7 days and applies to the lockfile too: if `pnpm install` fails with `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`, re-resolve the named packages with `pnpm update <name> ...`. Don't add `minimumReleaseAgeExclude` entries except for an urgent security fix (CONTRIBUTING "Updating dependencies").
TypeScript: `tsc` is 7.0; `.pnpmfile.cjs` keeps tools that import the `typescript` JS API (rolldown-plugin-dts, which emits declarations) on 6.0.3 until the tsgo generator (TS 7.1). Overrides can't do this: a peer still resolves to the root's copy.

```sh
pnpm install
pnpm build          # all packages
pnpm check          # format + lint + test + types
pnpm test           # tests (Vitest); the stories' tests need `pnpm stories:install` once
pnpm test:coverage  # all tests in one run with v8 coverage (coverage/index.html)
pnpm types:check
pnpm pack:check     # published output: publint, attw, declarations, entrypoints, vendor snapshot
pnpm bundle-size    # ESM bundle sizes of common imports (bundle-size/report.md; CI job summary)
pnpm lint           # oxlint, whole repo (not via turbo)
pnpm lint:gha       # zizmor on .github/ (skips if zizmor isn't installed; CI runs it)
pnpm format:fix     # oxfmt, whole repo (not via turbo)
pnpm dep:check      # list outdated deps (npm-check-updates; config in .ncurc.cjs)
pnpm turbo run test --filter=victory-core   # one package (and what it depends on)
pnpm stories:dev    # stories gallery (Vite, http://localhost:5173/), rebuilding packages on change (turbo watch)
pnpm stories:install  # Chromium for the stories' snapshot tests (Playwright)
pnpm stories:interactions:watch  # interaction tests in a visible browser, slowed down (needs full Chromium; CONTRIBUTING)
pnpm --filter victory-stories test -u   # update story snapshots (after `pnpm build`)
pnpm stories:screenshots [-u]  # story screenshots in the CI image (Docker or Colima); -u updates
pnpm docs:check-browser [--victory <version>]  # browser docs examples on esm.sh/jsDelivr (network; CI: PRs changing them, manual runs)
```

Keep Turborepo telemetry off: CI sets `TURBO_TELEMETRY_DISABLED=1`, and agents should set it too. In a git worktree, Turborepo stores its cache in the main checkout's `.turbo/cache`; set `TURBO_CACHE_DIR=.turbo/cache` if that location isn't writable (e.g. a sandbox).

Dependency updates are manual (no update bots): run `pnpm dep:check` before each release and when a security alert comes in, then update in one PR. Don't bump a major that `.ncurc.cjs` holds back; it has a tracking item. Version ranges: `^` by default; exact only for tools whose upgrade needs its own PR (oxfmt, oxlint, vendor Babel); `~` only to match another package's range (root `rolldown` matches tsdown's). Sibling `victory-*` dependencies are exact (see CONTRIBUTING "Updating dependencies").

GitHub Actions: `actions/*` and `github/*` use major version tags; every other action is pinned to a commit SHA (enforced by `.github/zizmor.yml`) with a `# vX.Y.Z` comment (convention; pinact keeps it current). Refresh them in the same routine as dependencies (pinact, see CONTRIBUTING "GitHub Actions"). Every workflow sets `permissions: {}` and grants per job; checkouts set `persist-credentials: false`. Reference local actions as `$/.github/actions/...`, not `./...`.

These commands change as the uplift lands. Update this section in the same PR that changes them.

## Code conventions

- TypeScript, React function components for new code. Some class components remain (conversion is tracked in #2778); don't convert them in infra PRs.
- Match the surrounding code's style, naming, and comment density.
- React peer range: published packages declare `>=18`, and CI's `react` job tests on React 18.0.0 and 18.3 (the lockfile's 19 runs in `test`). React 18 APIs (`useId`, `useSyncExternalStore`, ...) are fine in library code; React 19-only APIs aren't.
- Types: `@types/react` 19 (the website stays on 18; its `tsconfig.json` `paths` keep one version in its program). A bare `React.ReactElement` has `unknown` props on 19; where code reads or clones an element's `props`, use `React.ReactElement<any>` at that spot rather than changing public prop types. Published declarations must type-check for consumers on `@types/react` 18 and 19.
- Don't add `engines` fields to any `package.json`. `.nvmrc` is the one place the Node version is set.
- Ship ESM + CJS. Don't add browser-only or Node-only code paths to library packages.
- Scripts and tooling: prefer async Node APIs (`node:fs/promises`, top-level `await`, `Promise.all` for independent work) over `*Sync` functions. Use a sync call only where async can't work (e.g. a synchronous config hook) or it clearly simplifies a step, and say why in a comment. Existing `*Sync` code isn't converted in unrelated PRs.

## Keep tuning

These are expected to change as we experiment. Update them as things settle, and log any decisions in the tracking issue.

- **Build and test speed:** keep cold and cached times for `build`, `check`, and CI in mind. Note regressions in the PR.
- **Task runner cache inputs/outputs:** an inaccurate cache key is a correctness bug. Over-including is safer than missing an input.
- **CI:** cache hit rates, job split, and running only what changed on PRs.
- **Published output:** `pnpm pack:check` packs each package, runs publint and attw, and installs it in isolation (declared dependencies only). There it type-checks the published declarations as a strict consumer with `skipLibCheck` off, on `@types/react` 18 (root `@types/react-18` alias) and 19 (known errors in `ALLOWED_DECLARATION_ERRORS`), and loads every entrypoint with `require()` and `import()`. `victory-vendor` also has to match its `pack-snapshot.json` (manifest fields, resolution per entrypoint, known attw and load failures, file list). Update a snapshot (build, then `pnpm pack:check --update` in that package) only for an intended change, and call it out in the PR.
- **Bundle size:** `pnpm bundle-size` measures ESM import scenarios (`scripts/bundle-size.mjs`), and CI reports the change against the base branch. Reported, not gated. Note size changes in the PR.
- **Visual testing:** snapshot stability and flakiness. Story snapshots are markup, not pixels, and must match across OSes: text is sized with `TextSize`'s approximation, not the installed fonts (`stories/tests/approximate-text.ts`; screenshots keep real measurement); the browser runs in UTC, `en-US`; generated ids are renumbered and attribute numbers rounded to 2 decimals (`stories/tests/serialize.ts`). A story that throws or logs a `console.error`/`console.warn` fails its test; fix the story rather than adding to `ALLOWED_CONSOLE` (`stories/tests/stories.test.tsx`). Screenshots are pixels, so they only run in the pinned container (`scripts/stories-screenshots.mjs` locally, as arm64 like CI's `ubuntu-24.04-arm` job: native on Apple silicon; x86 emulation crashes Chromium); bump its tag with `playwright`. Update snapshots and screenshots only for an intended change, and call it out in the PR. Interaction tests assert on the DOM after real mouse input, not pixels; poll after an interaction (`expect.poll`, some handlers are throttled), and add a story rather than a test-only fixture when no story shows the behavior.
- **This file:** if an agent gets something wrong because guidance was missing or stale, fix the guidance here.
