<h1 align="center">Victory Documentation Site</h1>

[Documentation site](https://formidable.com/open-source/victory/) for [victory](https://github.com/FormidableLabs/victory) built with [react-static](https://github.com/nozzle/react-static), and deployed with [formideploy](https://github.com/FormidableLabs/formideploy)


## Getting Started

To install and run the docs site locally:

```bash
yarn install
yarn start
```

Note that paths in local development are based on a root of "/" but be careful when defining relative and absolute paths inline or doing url parsing, as the production output root will be "open-source/victory." Links in markdown files are currently handled with a link helper that prefixes relative paths with "/open-source/victory", so links like "/docs/victory-area" will work as expected in development and production. When adding links elsewhere, use `createPath` from `src/helpers/path-helpers` to ensure the path is correctly prefixed.

## Want to see if you're ready to :shipit:?

First build the static site.
```bash
yarn build
```
Once it builds successfully, serve it

```bash
yarn serve
```
The staging and production sites are served from a nested path, e.g. `https://formidable.com/open-source/victory`. This step is important for validating that both the `basePath` used by the static HTML output and the `basename` used by the client-side router are working as expected.

## Deployment

### Staging

_Only for project administrators._

Our CI deploys to staging for each PR using surge.sh at the following URL:

`https://formidable-com-victory-staging-${PR_NUMBER}.surge.sh/open-source/victory`

To test things out locally find the `Surge.sh` entry in 1password in the IC vault and make up some pretend values for a PR number in `FORMIDEPLOY_PULL_REQUEST`:

```sh
$ cd docs
$ yarn clean && \
  yarn build
$ SURGE_LOGIN=<SNIPPED> \
  SURGE_TOKEN=<SNIPPED> \
  FORMIDEPLOY_PULL_REQUEST=12 \
  yarn deploy:stage
```

### Production

_Only for project administrators._

Our CI is configured to deploy the production build in `dist` to `formidable.com/open-source/victory`. This will happen automatically when a branch with docs changes that was opened by an internal collaborator is merged into the `main` branch of this repo. This section discusses kicking the tires locally:

First, install the AWS CLI:

```sh
$ brew install awscli
```

Then, set up `aws-vault` with the AWS access and secret keys for "CI" in the `AWS IAM (victory-ci)` entry in the IC vault:

```sh
$ brew cask install aws-vault
$ aws-vault add fmd-victory-ci
# Enter AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY values.
```

_note_ if these keys do not already exist in the IC vault, they will need to be created. Please reach out to a member of the cloud team for help.

Then build for production and deploy with dry run to check things:

```sh
$ cd docs
$ yarn clean && \
  yarn build
$ aws-vault exec fmd-victory-ci --no-session -- \
  yarn deploy:prod --dryrun
```

### Notes

Docs PRs that originate from forks will not trigger staging or production builds of the docs site. To trigger a docs update based on a forked PR, someone with write access to the repo should open a new PR based on the changes and close the original with a reference. [Here's a handy git alias for creating a new branch based on a pr](https://gist.github.com/gvaughn/f3c7897a51e52138eac1)
