### Overview

The VictoryChart documentation site (currently `projects.formidablelabs.com/victory-chart`; eventually `victory.formidable.com/chart`) is served as a GitHub Pages project page, which means the content of the remote `gh-pages` branch corresponds to the live site. The site source lives in `/docs`, and the static site is built to `/docs/build` and deployed from there.

### Development

Run `npm run dev-docs` to start `webpack-dev-server` at port 3000. Run `npm run check` for the usual linting, which covers the `docs` source.

### Deployment

On `master`, run `npm run build-static-docs` to build the static site in `docs/build`, and commit your changes. (As with Heroku, Git needs to know what's changed before it can push, so we're stuck committing built artifacts.) Then run `npm run push-gh-pages` to perform a subtree push from `/docs/build` (local) to root in the `gh-pages` branch (remote), updating the live site. Finally, run `git push origin master` to get the static build into shared history--see Gotchas.

### Gotchas

* Having trouble with `npm run push-gh-pages`? The remote history is probably ahead of your local history, which means someone else ran `push-gh-pages` and it's not in your history tree; maybe they forgot to push to master after building and deploying. You need the equivalent of `--force`, but that's not an option with subtree pushes. Luckily, you can chain commands together like this:
```
git push origin `git subtree split --prefix docs/build master`:gh-pages --force
```
(See http://stevenclontz.com/blog/2014/05/08/git-subtree-push-for-deployment/)

#### Happy, victorious developing! :trophy:
