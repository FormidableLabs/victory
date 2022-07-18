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

- [Node.js](https://nodejs.org/) 14 or higher.
- [pnpm](https://pnpm.io/) 7 or higher.

### Setup

Clone this repo:

```sh
$ git clone https://github.com/FormidableLabs/victory.git
$ cd victory
```

Use [pnpm](https://pnpm.io/) to install dependencies:

```sh
# ... if you need pnpm
$ npm install -g pnpm
$ pnpm install
```

## Development

### Dev servers

We have some dev servers available for a sample development environment.

```sh
# JavaScript demo app
$ pnpm start

# TypeScript demo app
$ pnpm start:ts
```

These run appropriate file watchers, so you can just start developing source files and wait for the webpack dev server to pick up the new changes.

### Build and checks

Our task system mostly takes care of all task dependencies and things you need. When you first clone this repo or a new branch, run:

```sh
# Run all checks. Re-run this command for your normal workflow.
$ pnpm run check

# Build libraries and UMD distributions.
# Really only needed to double-check the webpack build still works.
$ pnpm run build
```

This will do all the build, seeding the task cache so subsequent tasks are fast, and checks that everything is correctly working. Your Victory workflow could reasonably just be (1) making some changes to files + tests, and then (2) re-running `pnpm run check`!

Here are some other useful tasks:

```sh
# Quality checks
$ pnpm run format
$ pnpm run lint
$ pnpm run types:check

# Tests
$ pnpm run jest
```

We also have some helper tasks to fix issues that are fixable.

```sh
$ pnpm run format:fix
$ pnpm run lint:fix
```

### Victory Native

- [ ] TODO(wireit): Add in `start:rn` and getting that demo going.
- [ ] TODO(wireit): Move `victory-native` README guide here and link???

### Tips and tricks

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

- [ ] TODO(wireit): Add watch section.

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
- `packages/victory-vendor/package.json`: A custom package.json that must have implementations or no-ops for all things in `victory-core`.

## Visual Tests

Victory relies heavily on visual regression testing with [Storybook](https://storybook.js.org/) and [Chromatic](https://www.chromaticqa.com/).

Write visual tests for new features by adding them in the `stories` directory. Run storybooks and check out changes. Storybooks are served from http://localhost:6006/

```sh
$ pnpm run storybook:server
```

[Chromatic](https://www.chromaticqa.com/) provides automated visual testing. All internal PRs will trigger a new Chromatic build, which will be displayed along with CI status. Chromatic builds for Victory may be viewed in more detail here: https://www.chromaticqa.com/builds?appId=5b4acf7c54c0490024d5980b. Chromatic requires a secret app code to run, so PRs from external contributors will not automatically trigger a Chromatic build. For this reason, changes from external contributors will be checked out and opened as separate PRs so Chromatic may be used to verify any changes. Developers with access to the secret app code may also trigger a chromatic build manually with:

```sh
# TODO(wireit): Implement this
$ pnpm chromatic
```

## Release

- [ ] TODO(wireit): REWRITE WHOLE SECTION


## Contributor Covenant Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of
experience, nationality, personal appearance, race, religion, or sexual identity
and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at coc@formidable.com. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 1.4, available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
