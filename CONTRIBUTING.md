# Contributing

## How to Contribute

Victory is open to pull requests, issue reports, and questions from the community. Here are some good ways to get help if you need it.

- If you have a question, please [open a new Q&A discussion thread](https://github.com/FormidableLabs/victory/discussions/new)
- If you think you have found a bug, [open a new issue](https://github.com/FormidableLabs/victory/issues/new)

If you are a new contributor looking to learn more about Victory, check out our [good first issues board](https://github.com/FormidableLabs/victory/projects/2).

### Current goals and initiatives

There are some parts of Victory that are in need of a little extra attention right now, including state management, transitions and animations, and pan and zoom behavior. These larger goals are being tracked in [milestones](https://github.com/FormidableLabs/victory/milestones). The goal for these milestones is re-work parts of Victory to make them more performant, easier to fix, and more accessible for new contributors. If your issue is related to one of these milestones, we may not be able to push up a fix right away, but we will label it accordingly and address it as a part of this larger scope of work.

## Monorepo!

Victory is a monorepo built with [Wireit](https://github.com/google/wireit) and [pnpm](https://pnpm.io/) workspaces. All `victory-*` packages live in the `packages` directory, and each has its own `package.json`. Installing this repo with `pnpm install` will automatically link all interdependent `victory-*` packages. **You must use `pnpm` rather than `npm` or `yarn` when installing and running `package.json` scripts in this project.**

### Requirements

- [Node.js](https://nodejs.org/) 18 or higher.
- [pnpm](https://pnpm.io/) version specified by [corepack](https://github.com/nodejs/corepack) in the `package.json`.

### Setup

Clone this repo:

```sh
$ git clone https://github.com/FormidableLabs/victory.git
$ cd victory
```

Enable corepack (if not already):

```sh
$ corepack enable
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

Our task system mostly takes care of all task dependencies and things you need. When you first clone this repo or a new branch, run:

```sh
# Run all checks. Re-run this command for your normal workflow.
$ pnpm run check
# ... or add in a `--watch` to watch & re-run checks for only what you change!
$ pnpm run check --watch

# Build libraries and UMD distributions.
# Really only needed to double-check the webpack build still works.
$ pnpm run build
# ... or add in a `--watch` to watch & re-run the parts of the build that changed!
$ pnpm run build --watch
```

This will do all the build, seeding the task cache so subsequent tasks are fast, and checks that everything is correctly working. Your Victory workflow could reasonably just be (1) making some changes to files + tests, and then (2) re-running `pnpm run check`!

Here are some other useful tasks (with or without a `--watch` flag):

```sh
# Quality checks
$ pnpm run format
$ pnpm run format --watch
$ pnpm run lint
$ pnpm run lint --watch
$ pnpm run types:check
$ pnpm run types:check --watch

# Tests
$ pnpm run jest
$ pnpm run jest --watch
```

We also have some helper tasks to fix issues that are fixable.

```sh
$ pnpm run format:fix
$ pnpm run lint:fix
```

### Victory Native

To develop against `victory-native`, please see the package [README](./packages/victory-native/README.md).

### Tips and tricks

#### Scripts can be run from the _root_ AND from inside any _package_ folder

For example, when working on a single package like `victory-core`, you can run `pnpm run check --watch` from the `packages/victory-core` directory, and it will only check the core.  Example:  

```sh
$ cd packages/victory-core
$ pnpm run check --watch
```

This is especially helpful when you're making changes to any package that is _depended upon_, like `victory-core`, and don't want to run every single script during development.


#### My IDE shows outdated TypeScript errors

It seems like VS Code and WebStorm both struggle to update their internal cache, whenever the **built types** change.  For example, when making changes to `victory-core`, the TypeScript changes won't be picked up by your IDE automatically.

Instead of restarting your IDE completely, try restarting the TypeScript Service.

#### My computer grinds to a halt!

The initial build/check, or one where something that is part of a lot of cache keys changes, can really slow down your computer, especially if you've got an older model. To allow you to do other work on your computer at the same time, consider using the `WIREIT_PARALLEL=<NUM_PROCESS>` environment variable like:

```sh
$ WIREIT_PARALLEL=4 pnpm run check
```

A good rubric is "number of cores" for max speed while still a mostly usable system or one less than that number for a much more usable system.

#### Unit of work/caching

Wireit is a flexible tool that caches at the task level. So that means that out-of-the box any wireit task will run the entire task again if any of the input `files` change. This leads us to two tips:

1. **Decompose tasks to package level**: Jest could be run over the whole monorepo in one command, but we instead break it out per-package, so that we only re-run Jest tests for packages that have actually changed (or have dependencies that have changed).
2. **Use tool-specific caching**: Tools like eslint and tsc can cache within a subtask run, so we like to leverage this within single tasks to make subtask re-runs faster.

#### What happens if a check/subtask fails?

The neat thing about wireit caching, is that for any high-level task, all of the sub-tasks that succeeded don't need to be re-run. So, if you're trying to run `pnpm run check` and get a single package lint error, just fix that package lint error and run `pnpm run check` again -- and then repeat until you get a pass! All of the work along the way that _succeeds_ will be cached and won't be run again!

#### What should be a package script? What should be a wireit script?

If you look at our `package.json:scripts.start` command, you'll notice that we use both a wireit-based script (`pnpm run build:lib:esm`) as well as a normal shell command (`webpack serve ...`). This is a good example of the types of things that should and shouldn't be wireit script tasks.

1. **Wireit tasks**: Tasks that should run on input file **changes** and then not run again should be wireit tasks. E.g. "transpile files", "lint files".
2. **Normal script tasks**: Tasks that should _always_ run regardless of the state of cache task execution. E.g. "start a webpack dev server".

#### Cache issues

We use tools caching within subtasks wherever we can. However, that can sometimes lead to weird errors. Here are some familiar ones with remedies.

*Everything*

If you want to make sure globally you're not hitting a cache issue, this command cleans the wireit cache as well as all the tool caches:

```sh
$ pnpm run clean:cache
```

Your next `pnpm run build|check` will be a full (long) rebuild from scratch.

*Eslint*

If you hit something like:

```
/PATH/TO/victory/test/jest-setup.ts
  0:0  error  Parsing error: Debug Failure. False expression: /PATH/TO/victory/packages/victory-native/node_modules/victory-area/es/index.js linked to nonexistent file /PATH/TO/victory/packages/victory-area/es/index.js

✖ 1 problem (1 error, 0 warnings)
```

Then you've hit an eslint issue that can be fixed with:

```sh
$ pnpm run clean:cache:lint
```

## Authoring tasks

Our task system is optimized for fast, easy developer experience, at the acknowledged cost of **extra maintainer burden** when we change task structure, add tasks, etc. If you are editing the scripts in a `package.json` or `package-scripts.js` you'll need to read up on [Wireit](https://github.com/google/wireit) and probably want to talk to an existing Victory maintainer.

We use three tools and some custom scripts as follows:

- `pnpm` to `run` or `exec` scripts
- `wireit` to cache tasks and run dependent tasks.
- `nps` to place one off script tasks in the root `/project-scripts.js` in a manner that can be called from within a workspace.
- `scripts/sync-pkgs-wireit*.js`: Scripts run with `pnpm run sync` to automate dependency management. This is where most of your work for task management will take place.

For our packages, we primarily focus on four types of package.json files:

- `package.json`: Define root tasks here and aggregate workspace tasks here. Note that instead of relying on `pnpm -r run` to concurrently run tasks in each workspace, we instead rely on `wireit` alone to have dependencies in aggregate tasks on all subtasks. This is more efficient to have `wireit` command concurrency and the task dependency graph.
- `packages/victory*/package.json`: These package scripts are generated by `scripts/sync-pkgs-wireit-helpers.js`. If you want to change them, edit that script and run `pnpm run sync`.
- `packages/victory-native/package.json`: A custom package.json that must have implementations or no-ops for all things in `victory-core`.

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

On a merge of a feature PR, the changesets GitHub action will open a new PR titled `"Version Packages"`. This PR is automatically kept up to date with additional PRs with changesets. So, if you're not ready to publish yet, just keep merging feature PRs and then merge the version packages PR later.

### Publishing packages

On the merge of a version packages PR, the changesets GitHub action will publish the packages to npm.

### The manual version

For exceptional circumstances, here is a quick guide to manually publishing from a local computer using changesets.

1. Add a changeset with `pnpm run changeset`. Add changeset file, review file, tweak, and commit.
2. Make a version. Due to our changelog plugin you will need to create a personal GitHub token and pass it to the environment.

    ```sh
    $ GITHUB_TOKEN=<INSERT TOKEN> pnpm run version
    ```

    Review git changes, tweak, and commit.

3. Publish.

    First, build necessary files:

    ```sh
    # Build everything
    $ pnpm run build
    ```

    Then publish:

    ```sh
    # Test things out first
    $ pnpm -r publish --dry-run

    # The real publish
    # This first does a single git tag (if not already present), then publishes
    $ pnpm run publish --otp=<insert otp code>
    ```

    Note that publishing multiple packages via `changeset` to npm with an OTP code can often fail with `429 Too Many Requests` rate limiting error. Take a 5+ minute coffee break, then come back and try again.

    Then issue the following to also push git tags:

    ```sh
    $ git push && git push --tags
    ```
