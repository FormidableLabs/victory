<h1 align="center">victory documentation site</h1>

[![Build Status](https://travis-ci.com/FormidableLabs/victory-docs.svg?branch=master)](https://travis-ci.com/FormidableLabs/victory-docs)

***

[Documentation site](https://formidable.com/open-source/victory/) for [victory](https://github.com/FormidableLabs/victory). `victory-docs` is running on [react-static](https://github.com/nozzle/react-static).


## Getting Started

To install and run the docs site locally:

```bash
yarn install
yarn start
```

Note that paths in local development are based on a root of "/" but be careful when defining relative and absolute paths inline or doing url parsing, as the production output root will be "open-source/victory." Links in markdown files are currently handled with a link helper that prefixes relative paths with "/open-source/victory", so links like "/docs/victory-area" will work as expected in development and production. When adding links elsewhere, use `createPath` from `src/helpers/path-helpers` to ensure the path is correctly prefixed.

## Want to see if you're ready to :shipit:?
To build the staging build output and serve it with the canonical path it'll have when built as a lander for formidable.com:
```bash
#builds and serves staging content at localhost:3000/open-source/victory
yarn stage-and-serve
```
This step is important for validating that both the `basePath` used by the static HTML output and the `basename` used by the client-side router are working as expected.

## Ready to Publish?
Currently this package is consumed as a dependency of `formidable.com`, so deploying docs changes required publishing. To publish to NPM run

**This package _must_ be published with `npm@5.6.0`**

```bash
npm version <newversion | major | minor | patch> (see Versioning notes below)
git push origin master && git push --tags
npm publish
```

## Ready to Deploy?
OSS landers are deployed by the formidable.com package. To deploy, open a PR on `formidable.com` that updates the version of `victory-docs` to the new version. You will be able to see your changes on staging before merging to deploy.

### Versioning Notes

For a reliable systems of releases, `victory-docs` should aim for versioning along these lines:

- *Patch*: Typos, missing assets, broken styles, very minor copyedits.
- *Minor*: Add a new page, significantly change styles.
- *Major*: Rearchitect how the lander works, remove pages, or something else huge.

