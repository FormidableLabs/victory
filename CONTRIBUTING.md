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

- [Node.js](https://nodejs.org/): the version in [`.nvmrc`](./.nvmrc) (the current LTS). CI uses the same file.
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

> Note: The demo app is deprecated, all development should occur in storybook or the docs

```sh
# watch mode / HMR
$ pnpm storybook:dev

# storybook standalone
$ pnpm storybook:start
```

### Running Docs locally

You can run the documentation website locally with the following command. It is linked to the Victory package via PNPM and will reflect changes in packages when they are rebuilt.

```sh
$ pnpm start:docs
```

### Build and checks

Our task system takes care of task dependencies for you. When you first clone this repo or a new branch, run:

```sh
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
$ pnpm run jest
```

We also have some helper tasks to fix issues that are fixable.

```sh
$ pnpm run format:fix
$ pnpm run lint:fix
```

To re-run a task whenever files change, use `turbo watch`:

```sh
$ pnpm turbo watch jest types:check
```

### Tips and tricks

#### Run tasks for one package

When working on a single package like `victory-core`, use a `--filter` to run only its tasks (plus whatever they depend on):

```sh
$ pnpm turbo run jest types:check lint --filter=victory-core
# ... and the packages that depend on it, too:
$ pnpm turbo run jest --filter=...victory-core
```

This is especially helpful when you're making changes to a package that is _depended upon_, like `victory-core` or `victory-vendor`, and don't want to run every single task during development.

#### My IDE shows outdated TypeScript errors

It seems like VS Code and WebStorm both struggle to update their internal cache, whenever the **built types** change.  For example, when making changes to `victory-core`, the TypeScript changes won't be picked up by your IDE automatically.

Instead of restarting your IDE completely, try restarting the TypeScript Service.

#### My computer grinds to a halt!

The initial build/check, or one where something that is part of a lot of cache keys changes, can really slow down your computer, especially if you've got an older model. To leave room for other work, limit how many tasks run at once:

```sh
$ pnpm run check --concurrency=4
```

#### What happens if a check/subtask fails?

Turborepo caches every task that succeeds. So, if you run `pnpm run check` and get a single package lint error, just fix that error and run `pnpm run check` again. Everything that already passed is replayed from the cache instead of running again.

#### Cache issues

If you think you're hitting a stale cache, this command cleans the Turborepo cache as well as all the tool caches (ESLint, Prettier, Babel):

```sh
$ pnpm run clean:cache
```

Your next `pnpm run build|check` will be a full (long) rebuild from scratch. To skip the Turborepo cache for a single run, add `--force`.

## Authoring tasks

We use [Turborepo](https://turborepo.com/) to run tasks in dependency order and cache them.

- **Tasks are plain `package.json` scripts.** Each library package has the same set of scripts (`build:lib:esm`, `build:lib:cjs`, `types:create`, `types:check`, `lint`, `jest`, `pack:check`). If you change one, change it in every package.
- **`turbo.json`** at the root says how tasks depend on each other (`^task` means "this task in my dependencies first"), which files are each task's inputs, and which files it outputs. `build` is an aggregate task in `turbo.json` with no script of its own.
- **Root `package.json` scripts** (`pnpm run build`, `check`, `lint`, ...) call `turbo run`. Root-only tasks like `format` are listed in `turbo.json` as `//#format`.
- **`packages/victory-vendor`** has a single `build` script and its own `turbo.json`, which maps the other build tasks to it.
- **`website`** has its own `turbo.json`: its `build` depends on the packages' `build:lib:esm`.

Getting inputs right matters: if a task reads a file that isn't one of its inputs, Turborepo can replay a stale result. When unsure, add the file. Files outside packages that can affect any task go in `globalDependencies`.

`pack:check` (`scripts/pack-check.mjs`) packs a built package and checks the tarball: publint, [attw](https://github.com/arethetypeswrong/arethetypeswrong.github.io), and loading every entrypoint with both `require()` and `import()` from an install outside the repo that has only the tarball's declared `dependencies` and `peerDependencies`. A package with a `pack-snapshot.json` (today only `victory-vendor`, which recharts depends on) must also match it: its resolution-related manifest fields, which file each entrypoint resolves to under each module resolution mode, attw's problems, which entrypoints fail to load (known issues, e.g. #3104), and the file list. If a change to the snapshot is intended, build, then run `pnpm run pack:check --update` in that package and commit the result.

`pnpm run sync` copies `victory-core`'s tsconfig files to the other packages. CI checks they're in sync.

Turborepo collects anonymous telemetry unless you turn it off. CI turns it off. To turn it off on your machine, run `pnpm turbo telemetry disable`.

## Visual Tests

Victory relies heavily on visual regression testing with [Storybook](https://storybook.js.org/) and [Chromatic](https://www.chromaticqa.com/).

Write visual tests for new features by adding them in the `stories` directory. Run storybooks and check out changes. Storybooks are served from http://localhost:6006/

```sh
$ pnpm run storybook:server
```

This task also watches and rebuilds all Victory source files so you can more easily develop against storybook.

[Chromatic](https://www.chromaticqa.com/) provides automated visual testing. All internal PRs will trigger a new Chromatic build, which will be displayed along with CI status. Chromatic builds for Victory may be viewed in more detail here: https://www.chromaticqa.com/builds?appId=5b4acf7c54c0490024d5980b. Chromatic requires a secret app code to run, so PRs from external contributors will not automatically trigger a Chromatic build. For this reason, changes from external contributors will be checked out and opened as separate PRs so Chromatic may be used to verify any changes. Developers with access to the secret app code may also trigger a chromatic build manually with:

```sh
$ pnpm run chromatic
```

Note that Chromatic internally runs `npm run build-storybook` around which we have a custom `package.json:scripts.build-storybook` task that is meant to work within Chromatic.

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

The Version Packages PR is opened and updated with the default `GITHUB_TOKEN`, so no CI runs on it at all. Before merging, and after its latest update, a maintainer closes and reopens the PR to trigger CI, then waits for the checks to pass.

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
