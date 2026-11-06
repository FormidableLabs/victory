# Contributing

## How to Contribute

Victory is open to pull requests, issue reports, and questions from the community. Here are some good ways to get help if you need it.

- If you have a question, please [open a new Q&A discussion thread](https://github.com/FormidableLabs/victory/discussions/new)
- If you think you have found a bug, [open a new issue](https://github.com/FormidableLabs/victory/issues/new)

If you are a new contributor looking to learn more about Victory, check out our [good first issues board](https://github.com/FormidableLabs/victory/projects/2).

### Current goals and initiatives

There are some parts of Victory that are in need of a little extra attention right now, including state management, transitions and animations, and pan and zoom behavior. These larger goals are being tracked in [milestones](https://github.com/FormidableLabs/victory/milestones). The goal for these milestones is re-work parts of Victory to make them more performant, easier to fix, and more accessible for new contributors. If your issue is related to one of these milestones, we may not be able to push up a fix right away, but we will label it accordingly and address it as a part of this larger scope of work.

## Monorepo!

Victory is a monorepo built with [Turborepo](https://turborepo.com/) and [pnpm](https://pnpm.io/) workspaces. All `victory-*` packages live in the `packages` directory, and each has its own `package.json`. Installing this repo with `pnpm install` will automatically link all interdependent `victory-*` packages. **You must use `pnpm` rather than `npm` or `yarn` when installing and running `package.json` scripts in this project.**

### Requirements

- [Node.js](https://nodejs.org/): the major version in [`.nvmrc`](./.nvmrc) (an LTS line). CI uses the same file.
- [pnpm](https://pnpm.io/installation) 10 or later. pnpm switches itself to the version in `package.json`'s `packageManager` field.

### Setup

Clone this repo:

```sh
$ git clone https://github.com/FormidableLabs/victory.git
$ cd victory
```

Switch to the project's Node.js version (with [nvm](https://github.com/nvm-sh/nvm), or any version manager that reads `.nvmrc`):

```sh
$ nvm use
```

Use [pnpm](https://pnpm.io/) to install dependencies:

```sh
$ pnpm install
```

## Development

### Dev demo app

We have some dev servers available for a sample development environment.

Develop in the stories gallery or the docs. The gallery shows every story in `stories/` at http://localhost:5173/ (Vite), and rebuilds the packages when their source changes:

```sh
$ pnpm stories:dev
```

### Running Docs locally

You can run the documentation website locally with the following command. It is linked to the Victory package via PNPM and will reflect changes in packages when they are rebuilt.

```sh
$ pnpm start:docs
```

### Build and checks

Our task system takes care of task dependencies for you. When you first clone this repo or a new branch, run:

```sh
# Once per clone (and after a Playwright update): Chromium for the stories'
# snapshot tests.
$ pnpm run stories:install

# Run all checks. Re-run this command for your normal workflow.
$ pnpm run check

# Build all libraries (ESM, CJS and types).
$ pnpm run build
```

This does the whole build, seeding the task cache so later runs are fast, and checks that everything works. Your Victory workflow could reasonably just be (1) making some changes to files + tests, and then (2) re-running `pnpm run check`!

Here are some other useful tasks:

```sh
# Quality checks
$ pnpm run format
$ pnpm run lint
$ pnpm run types:check

# Check what each package publishes
$ pnpm run pack:check

# Tests
$ pnpm run test

# Tests with coverage (HTML report in coverage/index.html)
$ pnpm run test:coverage

# ESM bundle sizes of common imports (bundle-size/report.md)
$ pnpm run bundle-size
```

We also have some helper tasks to fix issues that are fixable.

```sh
$ pnpm run format:fix
$ pnpm run lint:fix
```

To re-run a task whenever files change, use `turbo watch`:

```sh
$ pnpm turbo watch test types:check
```

### Tips and tricks

#### Run tasks for one package

When working on a single package like `victory-core`, use a `--filter` to run only its tasks (plus whatever they depend on):

```sh
$ pnpm turbo run test types:check --filter=victory-core
# ... and the packages that depend on it, too:
$ pnpm turbo run test --filter=...victory-core
```

This is especially helpful when you're making changes to a package that is _depended upon_, like `victory-core` or `victory-vendor`, and don't want to run every single task during development.

#### My IDE shows outdated TypeScript errors

It seems like VS Code and WebStorm both struggle to update their internal cache, whenever the **built types** change. For example, when making changes to `victory-core`, the TypeScript changes won't be picked up by your IDE automatically.

Instead of restarting your IDE completely, try restarting the TypeScript Service.

#### My computer grinds to a halt!

The initial build/check, or one where something that is part of a lot of cache keys changes, can really slow down your computer, especially if you've got an older model. To leave room for other work, limit how many tasks run at once:

```sh
$ pnpm run check --concurrency=4
```

#### What happens if a check/subtask fails?

Turborepo caches every task that succeeds. So, if you run `pnpm run check` and get a single package test error, just fix that error and run `pnpm run check` again. Everything that already passed is replayed from the cache instead of running again.

#### Cache issues

If you think you're hitting a stale cache, this command cleans the Turborepo cache as well as all the tool caches:

```sh
$ pnpm run clean:cache
```

Your next `pnpm run build|check` will be a full (long) rebuild from scratch. To skip the Turborepo cache for a single run, add `--force`.

## Authoring tasks

We use [Turborepo](https://turborepo.com/) to run tasks in dependency order and cache them.

- **Tasks are plain `package.json` scripts.** Each library package has the same set of scripts (`build`, `types:check`, `test`, `pack:check`). If you change one, change it in every package.
- **`build`** runs [tsdown](https://tsdown.dev/) with the shared root `tsdown.config.mts`. It writes `dist/`: ESM (`.mjs`) and CJS (`.cjs`), one file per source file, with `.d.mts`/`.d.cts` declarations. It also writes the `main`, `module`, `types` and `exports` fields in the package's `package.json`; commit any change it makes there.
- **`turbo.json`** at the root says how tasks depend on each other (`^task` means "this task in my dependencies first"), which files are each task's inputs, and which files it outputs.
- **Root `package.json` scripts** (`pnpm run build`, `test`, `types:check`, ...) call `turbo run`. `format` ([oxfmt](https://oxc.rs/docs/guide/usage/formatter)) and `lint` ([oxlint](https://oxc.rs/docs/guide/usage/linter)) check the whole repo in about a second, so they run directly, without Turborepo. Their configs are `.oxfmtrc.json` and `.oxlintrc.json`.
- **`packages/victory-vendor`** has its own `build` script (not tsdown) and its own `turbo.json`.
- **`website`** has its own `turbo.json`: its `build` depends on the packages' `build`.

Getting inputs right matters: if a task reads a file that isn't one of its inputs, Turborepo can replay a stale result. When unsure, add the file. Files outside packages that can affect any task go in `globalDependencies`.

`pack:check` (`scripts/pack-check.mjs`) packs a built package and checks the tarball: publint, [attw](https://github.com/arethetypeswrong/arethetypeswrong.github.io), type-checking the published declarations with `skipLibCheck` off (our tsconfig skips them otherwise; known errors are listed in `ALLOWED_DECLARATION_ERRORS`), and loading every entrypoint with both `require()` and `import()` from an install outside the repo that has only the tarball's declared `dependencies` and `peerDependencies`. A package with a `pack-snapshot.json` (today only `victory-vendor`, which recharts depends on) must also match it: its resolution-related manifest fields, which file each entrypoint resolves to under each module resolution mode, attw's problems, which entrypoints fail to load (known issues, e.g. #3104), and the file list. If a change to the snapshot is intended, build, then run `pnpm run pack:check --update` in that package and commit the result.

`bundle-size` (`scripts/bundle-size.mjs`) bundles a few common ESM imports from the built `dist/` with [rolldown](https://rolldown.rs/) (minified, React external) and reports minified and gzipped sizes. CI's `bundle-size` job puts the report in the job summary; on pull requests it also builds the base commit, shows the change, and adds a warning annotation when a scenario's gzipped size grows by more than 1%. It's reported, not gated. The scenarios are listed at the top of the script; keep them few, since renaming one loses its comparison.

`pnpm run sync` copies `victory-core`'s tsconfig files to the other packages. CI checks they're in sync.

Turborepo collects anonymous telemetry unless you turn it off. CI turns it off. To turn it off on your machine, run `pnpm turbo telemetry disable`.

## Updating dependencies

We don't use Renovate or Dependabot version-update PRs. Instead, run this before each release, and when a Dependabot security alert comes in:

```sh
$ pnpm run dep:check
```

It runs [npm-check-updates](https://github.com/raineorshine/npm-check-updates) on the root and every workspace package, and lists newer versions. It doesn't change any files. Versions published in the last week are left out. `.ncurc.cjs` lists the majors we've deliberately held back (each one has a tracking item); remove an entry when its upgrade lands.

Make the updates in one PR, then run `pnpm run check`, `pnpm run build:docs` and `pnpm run pack:check`. Updates to a published package's `dependencies` change what users install, so they need a changeset.

pnpm installs only versions published at least 7 days ago (`minimumReleaseAge` in `pnpm-workspace.yaml`), transitive dependencies included. When no version in a range is old enough, resolution fails instead of picking a newer one. pnpm also checks the existing lockfile, so `pnpm install` fails with `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION` if the lockfile has a version that's too new. To fix it, re-resolve those packages to an older version with `pnpm update <name> ...` (it works for transitive dependencies too), or wait until they're a week old.

For an urgent security fix that can't wait a week, add the fixed version to `minimumReleaseAgeExclude` in `pnpm-workspace.yaml`, with a comment that links the advisory and gives the date it can be removed:

```yaml
minimumReleaseAgeExclude:
  # GHSA-xxxx-xxxx-xxxx. Remove after 2026-11-09.
  - some-package@1.2.3
```

Remove the entry once that version is a week old. Don't add exceptions to get a new version early for any other reason.

Version ranges:

- `^` by default.
- Exact versions only for tools whose upgrade needs its own PR: oxfmt and oxlint (a new version can reformat the repo or fail CI), and victory-vendor's Babel packages (they write its published files, and nothing checks their contents). TypeScript, tsdown and rolldown also shape published output, but `pnpm pack:check` and a `dist/` diff in the upgrade PR cover them, so they follow the other rules.
- `~` only to match another package's range (root `rolldown` matches tsdown's, so one copy is installed).
- TypeScript: `tsc` (`types:check`) is TypeScript 7. TypeScript 7.0 has no stable JS API, so `.pnpmfile.cjs` pins the tools that import `typescript` (rolldown-plugin-dts, which writes our declarations, and a website tool) to 6.0.3. `dep:check` doesn't see that pin; update it by hand. It goes away when declarations move to the tsgo generator (TypeScript 7.1).
- The `victory-*` packages depend on each other at the exact shared version. Changesets updates those.

### GitHub Actions

Workflows reference GitHub's own actions (`actions/*`, `github/*`) by major version tag, such as `actions/checkout@v7`. Third-party actions are pinned to a commit SHA with the version in a comment, such as `pnpm/action-setup@<sha> # v6.1.0`, because a tag can be moved to different code. [zizmor](https://docs.zizmor.sh) enforces this (`.github/zizmor.yml`) along with its other security checks.

Update actions in the same routine as the dependencies above:

- Third-party actions: run `pinact run --update` ([pinact](https://github.com/suzuki-shunsuke/pinact), `brew install pinact`). It updates SHAs and their version comments, skipping versions published in the last week (`.github/pinact.yml`). Review each action's release notes.
- GitHub's actions: check each one's releases page for a new major and read its breaking changes.
- zizmor itself: bump `version` on the zizmor step in `.github/workflows/ci.yml`.

CI runs zizmor in the `lint` job, at the `version` pinned there. To run it locally, install it and run `pnpm run lint:gha`; without it installed, the script skips. Newer zizmor releases add audits, so a different version locally can report findings that CI doesn't. To match CI, install that version, e.g. `uv tool install zizmor==1.31.1` (or `brew install zizmor` for the latest). Set `GH_TOKEN` to include zizmor's online audits.

## Visual Tests

Victory relies heavily on visual regression testing. The stories in `stories/` render in a Vite gallery for local development and in snapshot tests in CI.

Write visual tests for new features by adding stories in the `stories` directory (`*.stories.tsx`, in [Storybook's file format](https://storybook.js.org/docs/api/csf), which Victory used before). Check them in the gallery, served from http://localhost:5173/:

```sh
$ pnpm stories:dev
```

This task also watches and rebuilds all Victory source files so you can develop against the stories.

`pnpm run test` (and `check`) also renders every story in headless Chromium ([Vitest browser mode](https://vitest.dev/guide/browser/)) and compares its markup with a snapshot, one file per story in `stories/tests/__snapshots__/`. Install the browser once with `pnpm run stories:install`. Snapshots are the same on every machine: text is sized with Victory's approximation (`TextSize`) rather than measured with the installed fonts, the browser runs in UTC with the `en-US` locale, generated ids are renumbered, and numbers in attributes are rounded to 2 decimals. A new story writes its snapshot on the first run; commit it. If a change is meant to alter a story's output, build and update the snapshots, then review the diff:

```sh
$ pnpm run build
$ pnpm --filter victory-stories test -u
```

CI fails on a missing or changed snapshot, on a snapshot file whose story no longer exists (delete it), and on a story that throws or logs a `console.error` or `console.warn` (React's warnings, such as a missing `key`, included). Fix the story; `ALLOWED_CONSOLE` in `stories/tests/stories.test.tsx` is for messages that can't be avoided.

### Screenshots

A few stories also have pixel screenshots (`SCREENSHOT_STORIES` in `stories/tests/screenshots.test.tsx`, images in `stories/tests/__screenshots__/`), for what markup can't show: CSS, fills and strokes, clipping, stacking order and text rendering. Pixels differ between operating systems, so screenshots only run in the Playwright Docker image CI uses (the tag is in `.github/workflows/ci.yml`). Locally, that needs [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Colima](https://github.com/abiosoft/colima) (`brew install colima docker`, then `colima start`):

```sh
$ pnpm stories:screenshots      # compare
$ pnpm stories:screenshots -u   # update after an intended change
```

It builds the packages, installs the stories' dependencies in the container (cached in a Docker volume) and runs the tests there as arm64, like CI's screenshot job (Chromium's rendering can differ by CPU). On Apple silicon (and Windows or Linux on arm64) that's native, about 15 seconds with a warm cache; 2 GB of VM memory is enough. New and updated screenshots are copied back into `stories/tests/__screenshots__/`; for a failing one, the actual image and a diff are in `stories/.vitest/attachments/` (the test output names their paths inside the container, under `/work`). In CI, failing screenshots and diffs are uploaded as the `screenshot-diffs` artifact. Review image changes in the PR diff before committing them.

On an x86-64 machine (Windows, Linux, Intel Macs), Docker has to emulate arm64: slow at best, and Chromium can crash under emulation. Use CI instead: push, download the `screenshot-diffs` artifact from the failing Screenshots job, and copy each `*-actual-chromium-linux.png` over the matching `stories/tests/__screenshots__/<story>.png` (a new screenshot is only an `-actual-` image).

To add a story's screenshot, add its id to `SCREENSHOT_STORIES` and run `pnpm stories:screenshots`. Keep the list short: every story already has a markup snapshot.

When upgrading `playwright` (in `stories/package.json`), update the image tag in `ci.yml` to the same version and update the screenshots; `pnpm stories:screenshots` stops if the two don't match.

## Release

We use [changesets](https://github.com/changesets/changesets) to create package versions and publish them.

### Using changesets

Our official release path is to use automation to perform the actual publishing of our packages. The steps are to:

1. A human developer adds a changeset. Ideally this is as a part of a PR that will have a version impact on a package.
2. On merge of a PR our automation system opens a "Version Packages" PR.
3. On merging the "Version Packages" PR, the automation system publishes the packages.

Here are more details:

### Add a changeset

When you would like to add a changeset (which creates a file indicating the type of change), in your branch/PR issue this command:

```sh
$ pnpm run changeset
```

to produce an interactive menu. Navigate the packages with arrow keys and hit `<space>` to select 1+ packages. Hit `<return>` when done. Select semver versions for packages and add appropriate messages. From there, you'll be prompted to enter a summary of the change. Some tips for this summary:

1. Aim for a single line, 1+ sentences as appropriate.
2. Include issue links in GH format (e.g. `#123`).
3. You don't need to reference the current pull request or whatnot, as that will be added later automatically.

After this, you'll see a new uncommitted file in `.changesets` like:

```sh
$ git status
# ....
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.changeset/flimsy-pandas-marry.md
```

Review the file, make any necessary adjustments, and commit it to source. When we eventually do a package release, the changeset notes and version will be incorporated!

### Creating versions

On a merge of a feature PR to `main`, the [release workflow](.github/workflows/release.yml) opens (or updates) a PR titled `"Version Packages"`. If you're not ready to publish yet, keep merging feature PRs and merge the Version Packages PR later.

The Version Packages PR is opened and updated with the default `GITHUB_TOKEN`, so GitHub holds its CI runs until a maintainer approves them. Before merging, and after its latest update, a maintainer clicks "Approve and run" on the PR's held runs, then waits for the checks to pass.

### Publishing packages

On the merge of the Version Packages PR, the release workflow:

1. Builds and packs every package (`pack` job).
2. Publishes to npm from the `npm-publish` environment with [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC, no npm token) and provenance (`publish` job). If the environment has required reviewers, this waits for a maintainer's approval.
3. Creates one `v{version}` git tag and GitHub release with generated release notes.

### Canary releases

To try out unreleased changes, run the release workflow manually (**Actions → Release → Run workflow**) on a branch that the `npm-publish` environment allows. It publishes a snapshot (e.g. `37.4.0-canary-20261025120000`) of every package with a pending changeset to the `next` dist-tag. It never touches `latest`.

### Release setup (maintainers, one time)

- **npm:** run `scripts/npm-trust.sh` (npm >= 11.15.0, 2FA) to configure trusted publishing for every package. Add `--dry-run` to preview.
- **GitHub:** create the `npm-publish` environment (Settings → Environments), allowing `main` (and any branch used for canaries). Optionally add required reviewers to approve each publish. Don't reuse `production`: Vercel's docs deployments use it, and environment names are case-insensitive.

There's no manual (local) publish path: packages publish only from the release workflow.
