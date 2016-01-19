### Overview

The Victory documentation site (currently `projects.formidablelabs.com/victory`; eventually `victory.formidable.com`) is served as a GitHub Pages project page, which means the content of the remote `gh-pages` branch corresponds to the live site. The site source lives in `/docs`, and the static site is built to `/docs/build` and deployed from there.

### Development

Run `builder run docs-dev` to start `webpack-dev-server` at port 3000. Run `builder run check` for the usual linting, which covers the `docs` source.

### Deployment

1. `$ git checkout master`
2. `$ builder run docs-build-static` to build the static site in `docs/build`.
3. `$ builder run server-docs` to start a `http-server`, and open `http://localhost:8080` to test the static docs site.
4. `$ git add docs/build && git commit -m "Rebuild site"` (As with Heroku, Git needs to know what's changed before it can push, so we're stuck committing built artifacts.)
5. `$ builder run push-gh-pages` to perform a subtree push from `/docs/build` (local) to root in the `gh-pages` branch (remote), updating the live site. **See Gotchas**.
6. Finally, `$ git push origin master` to get the static build into shared history.

### Gotchas

* We use pushState routing for clean URLs (`myurl.com/path`, not `myurl.com/#/path`), but we don't have any Node app rendering content on the server side. This is fine in production because the static build step generates content for every route, but it can be a headache in development. If you've run `builder run docs-dev` and navigated to a nested route like `localhost:3000/docs/my-component`, you can't just refresh the page to see changes--for now, you have to refresh `localhost:3000` and then navigate back to the page you're interested in.

* Since the live site lives in a nested route (`/victory/`), we have to do a few things differently:
  * In `docs/router.jsx`, we instantiate `history` with the `basename` `/victory`.
  * In both `docs/components/static-index.jsx` (prod base page) and `docs/index.html` (local dev base page), we specific a `base href`: the path relative to which relative content in served. In `static-index`, that path is `/victory` (since that's where the prod site lives); in `index.html`, it's `/` (since we're serving at `localhost:3000`). Then, elsewhere, we serve all assets with relative paths.

This works great in production and pretty well in development (previous Gotcha aside), but it doesn't work when previewing built assets. That is, if you `cd` into `docs/build` and start a server with something like `python -m SimpleHTTPServer`, the app won't be able to find its assets: the `build-static-docs` step builds into `static-index`, which specifies the `/victory` base href for prod, which doesn't exist locally. Point is, if you see this happen, no worries--nothing's wrong!

* Having trouble with `builder run push-gh-pages`? The remote history is probably ahead of your local history, which means someone else ran `push-gh-pages` and it's not in your history tree; maybe they forgot to push to master after building and deploying. You need the equivalent of `--force`, but that's not an option with subtree pushes. Luckily, you can chain commands together like this:
```
git push origin `git subtree split --prefix docs/build master`:gh-pages --force
```
(See http://stevenclontz.com/blog/2014/05/08/git-subtree-push-for-deployment/)

#### Happy, victorious developing! :trophy:
