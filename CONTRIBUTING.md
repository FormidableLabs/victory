Contributing
============

Thanks for helping out!

## Monorepo!

Victory is a monorepo built with [Lerna](https://lernajs.io/) and [Yarn](https://yarnpkg.com/) workspaces. All `victory-*` packages live in the `packages` directory, and each has its own `package.json`. Installing this repo with `yarn` will automatically link all interdependent `victory-*` packages. **You must use `yarn` rather than `npm` when installing and running `package.json` scripts in this project.**

### Requirements

- [Node.js](https://nodejs.org/) 8.10.0 or higher.
- [Yarn](https://yarnpkg.com/en/docs/install) 1.7.0 or higher.

### Setup

Clone this repo:

```console
$ git clone https://github.com/FormidableLabs/victory.git
$ cd victory
```

Use [Yarn](https://yarnpkg.com/) to install dependencies:

```console
$ yarn install
```

A `postinstall` script will build `lib/` and `es/` for all `victory-*` packages.

Now you're ready to run a development server and check out the demos. Demos will be served at localhost:3000/

```console
$ yarn start
```

## Developing multiple packages

When making changes across multiple dependent packages, it is necessary to rebuild libs in order to pick up changes in dependent packages. You can manually rebuild libs by running:

```console
$ yarn run build-libs
```

or start a task in a new terminal window that will watch for code changes, and automatically rebuild libs

```console
$ yarn run watch
```

## Checks, Tests

All checks and tests run from the root directory.

The `check` script will lint all packages and infrastructure before starting a test server and running our suite of tests

```console
$ yarn run check
$ yarn run check-dev // if you already have a development server running
```

To run tests without linting, use the `test` script

```console
$ yarn run test
$ yarn run test-dev // if you already have a development server running
```

## Visual Tests

Victory relies heavily on visual regression testing with [Storybook](https://storybook.js.org/) and [Chromatic](https://www.chromaticqa.com/).

Write visual tests for new features by adding them in the `stories` directory. Run storybooks and check out changes. Storybooks are served from localhost:6006/

```console
$ yarn run storybook
```

[Chromatic](https://www.chromaticqa.com/) provides automated visual testing. All PRs will trigger a new chromatic build, which will be displayed along with CI status. You can also trigger a new build manually with:

```console
$ yarn run storybook
```

**External contributors will not be able to automate their visual regression testing with Chromatic, as it requires a secret app code.**

TODO: Set up chromatic CI for this repo


## Release

Victory uses [publishr](https://github.com/FormidableLabs/publishr) to organize compiled code for released versions.
The following scripts are responsible for publishing new versions:

```
"preversion": "yarn run check",
"version": "lerna exec --parallel -- nps build-libs && lerna exec --parallel nps build-dists",
"postversion": "lerna exec --parallel -- publishr postversion -V",
"postpublish": "lerna exec --parallel -- publishr postpublish -V"
```

TODO: make sure that `lerna publish` can run these from the root `package.json`, otherwise, we will need to add `postversion` and `postpublish` scripts to each package, and manually run `preversion` / `version` scripts (once) before any publishing.

which would look like

```
$ yarn run check
$ yarn run build
$ lerna publish
```

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

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
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
reported by contacting the project team at lauren.eastridge@formidable.com. All
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