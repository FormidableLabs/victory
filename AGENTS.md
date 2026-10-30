# AGENTS.md

Guidance for AI coding agents (and humans) working in this repo. Keep it short and current: when a convention changes, update this file in the same PR.

## Current focus: 2026 Uplift

Tracking issue: https://github.com/FormidableLabs/victory/issues/3093. Read it before starting uplift work; its **Decision log** is the source of truth for settled choices. Don't re-open a logged decision without saying why.

- **Integration branch:** `chore/2026-uplift-02`. All uplift PRs target it, not `main`.
- **Infra first, source last.** No substantive changes to `packages/*/src` in infra PRs. Mechanical churn (formatting, lint autofixes, type-error fixes) goes in its own PR, with no behavior changes mixed in, and its commit is added to `.git-blame-ignore-revs`. Exception: a few type-only fixes that a tooling or dependency bump needs (no runtime or published-type change) can ride along in that PR; call them out.
- **Tasks are plain `package.json` scripts.** Turborepo (`turbo.json`) orchestrates and caches them. Never put logic only in runner config.
- **Small, reviewable PRs.** One concern per PR. Each PR that changes what users of a published package get (code, types, `exports`, published files, `dependencies`/`peerDependencies`) needs a changeset (`pnpm changeset`). Manifest changes that only touch `scripts` or `devDependencies` don't.

## Working agreements

- **Don't commit, stage, push, merge, or open PRs** unless explicitly asked. Prepare the changes in the working tree and suggest a commit message; the maintainer does the git work.
- Don't publish to npm or change npm/GitHub settings (trusted publishers, environments, dist-tags). Write the scripts and docs; a maintainer runs them.
- Report outcomes plainly: if a check was skipped or fails, say so with the output.

## Releasing

- `release.yml`'s filename and the `npm-publish` environment are bound to npm trusted publishing. Renaming either requires re-running `scripts/npm-trust.sh` (revoke first).
- Version Packages PRs get no CI (they're opened by `GITHUB_TOKEN`). Close and reopen the PR after its last update to trigger CI.

## Repo map

- `packages/victory-*`: the published packages. They all share one version (changesets `fixed` group).
- `tsdown.config.mts`: the shared build for every `victory-*` package except `victory-vendor`. It writes `dist/` (`.mjs`/`.cjs`, one file per source file, `.d.mts`/`.d.cts`) and the `main`/`module`/`types`/`exports` fields in each `package.json`. Don't hand-edit those fields; rebuild and commit what tsdown writes.
- `packages/victory-vendor`: vendors d3 as ESM + CJS. **Highest-stakes package.** About 99% of its downloads come through recharts (`victory-vendor@^37`, using `victory-vendor/d3-scale` and `victory-vendor/d3-shape`). Its `exports` map and published file layout must stay compatible; `pnpm pack:check` compares them against `packages/victory-vendor/pack-snapshot.json`.
- `stories/`: Storybook stories (to become a Vite stories app with SVG snapshot and screenshot tests).
- `website/`: Docusaurus docs site.
- `test/`: shared Vitest config (jsdom, globals) and helpers.
- `scripts/`: changelog and npm trusted-publishing setup.

## Commands

Use the Node version in `.nvmrc` and pnpm (version from `packageManager`; no corepack needed). Never use npm or yarn to install.
pnpm settings (workspace linking, `overrides`, `patchedDependencies`, `allowBuilds`) live in `pnpm-workspace.yaml`. pnpm 11+ ignores them in `.npmrc` and in `package.json`'s `"pnpm"` field.

```sh
pnpm install
pnpm build          # all packages
pnpm check          # format + lint + test + types
pnpm test           # tests (Vitest)
pnpm test:coverage  # all tests in one run with v8 coverage (coverage/index.html)
pnpm types:check
pnpm pack:check     # published output: publint, attw, entrypoints, vendor snapshot
pnpm lint           # oxlint, whole repo (not via turbo)
pnpm lint:gha       # zizmor on .github/ (skips if zizmor isn't installed; CI runs it)
pnpm format:fix     # oxfmt, whole repo (not via turbo)
pnpm dep:check      # list outdated deps (npm-check-updates; config in .ncurc.cjs)
pnpm turbo run test --filter=victory-core   # one package (and what it depends on)
```

Keep Turborepo telemetry off: CI sets `TURBO_TELEMETRY_DISABLED=1`, and agents should set it too. In a git worktree, Turborepo stores its cache in the main checkout's `.turbo/cache`; set `TURBO_CACHE_DIR=.turbo/cache` if that location isn't writable (e.g. a sandbox).

Dependency updates are manual (no update bots): run `pnpm dep:check` before each release and when a security alert comes in, then update in one PR. Don't bump a major that `.ncurc.cjs` holds back; it has a tracking item.

GitHub Actions: `actions/*` and `github/*` use major version tags; every other action is pinned to a commit SHA with a `# vX.Y.Z` comment (enforced by `.github/zizmor.yml`). Refresh them in the same routine as dependencies (pinact, see CONTRIBUTING "GitHub Actions"). Every workflow sets `permissions: {}` and grants per job; checkouts set `persist-credentials: false`. Reference local actions as `$/.github/actions/...`, not `./...`.

These commands change as the uplift lands. Update this section in the same PR that changes them.

## Code conventions

- TypeScript, React function components for new code. Some class components remain (conversion is tracked in #2778); don't convert them in infra PRs.
- Match the surrounding code's style, naming, and comment density.
- Keep the React peer floor at `>=18`, and don't use React 19-only APIs in library code.
- Don't add `engines` fields to any `package.json`. `.nvmrc` is the one place the Node version is set.
- Ship ESM + CJS. Don't add browser-only or Node-only code paths to library packages.

## Keep tuning

These are expected to change as we experiment. Update them as things settle, and log any decisions in the tracking issue.

- **Build and test speed:** keep cold and cached times for `build`, `check`, and CI in mind. Note regressions in the PR.
- **Task runner cache inputs/outputs:** an inaccurate cache key is a correctness bug. Over-including is safer than missing an input.
- **CI:** cache hit rates, job split, and running only what changed on PRs.
- **Published output:** `pnpm pack:check` packs each package, runs publint and attw, and loads every entrypoint with `require()` and `import()` from an isolated install (declared dependencies only). `victory-vendor` also has to match its `pack-snapshot.json` (manifest fields, resolution per entrypoint, known attw and load failures, file list). Update a snapshot (build, then `pnpm pack:check --update` in that package) only for an intended change, and call it out in the PR.
- **Bundle size:** measure ESM import scenarios, not only full-library size. (Tree-shaking through the `victory` package is a separate investigation, not part of the uplift.)
- **Visual testing:** snapshot stability and flakiness.
- **This file:** if an agent gets something wrong because guidance was missing or stale, fix the guidance here.
