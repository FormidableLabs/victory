<h1 align="center">Victory Documentation Site</h1>

[Documentation site](https://commerce.nearform.com/open-source/victory/) for [victory](https://github.com/FormidableLabs/victory) built with [Next.js](https://nextjs.org/).


## Getting Started

To install and run the docs site locally, first install and build from the ROOT of this repository

The victory packages are PNPM linked into this project. You will need to execute a build at the root of the repository before the changes will be picked up by the documentation site.

```bash
pnpm install
pnpm build
pnpm dev
```

Note that paths in local development are based on a root of "/" but be careful when defining relative and absolute paths inline or doing url parsing, as the production output root will be "open-source/victory."

## Want to see if you're ready to :shipit:?

First, build the static site (within /docs folder):

```bash
pnpm build
```
Once the build succeeds, serve it: 

```bash
pnpm start
```

This will render the docs site at `http://localhost:3000/open-source/victory/`. If you go to root (i.e. `http://localhost:3000/`).

Note the staging and production sites are served from a nested path, e.g. `https://commerce.nearform.com/open-source/victory`. This step is important for validating that both the `basePath` used by the static HTML output and the `basename` used by the client-side router are working as expected.

## Deployment

### Preview Environments

Upon creating a Pull Request, a Vercel preview deployment is created and posted as a comment on the pull request to allow for testing changes.

### Production

This site is deployed with Vercel infrastructure and is automated with a repository trigger in the Formidable Labs Vercel account. 

The site is directly accessible at [https://victory-rose.vercel.app/open-source/victory](https://victory-rose.vercel.app/open-source/victory).

The `commerce.nearform.com` site uses a rewrite to host it under the path [https://commerce.nearform.com/open-source/victory/](https://commerce.nearform.com/open-source/victory/).
