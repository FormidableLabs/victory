<h1 align="center">Victory Documentation Site</h1>

[Documentation site](https://formidable.com/open-source/victory/) for [victory](https://github.com/FormidableLabs/victory) built with [react-static](https://github.com/nozzle/react-static).


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
Once it builds successfully, serve it:

```bash
yarn serve
```
The staging and production sites are served from a nested path, e.g. `https://commerce.nearform.com/open-source/victory`. This step is important for validating that both the `basePath` used by the static HTML output and the `basename` used by the client-side router are working as expected.

## Deployment

### Production

This site is deployed with Vercel infrastructure and is automated with a repository trigger in the Formidable Labs Vercel account. 

The site is directly accessible at [https://victory-rose.vercel.app/open-source/victory](https://victory-rose.vercel.app/open-source/victory).

The `commerce.nearform.com` site uses a rewrite to host it under the path [https://commerce.nearform.com/open-source/victory/](https://commerce.nearform.com/open-source/victory/).
