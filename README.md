[![Travis Status][trav_img]][trav_site]


Victory Component Boilerplate
===========================

Boilerplate for developing a Victory Component!

## The Generator

We expect these opinions to change *often*.  We've written a yeoman generator to
pull down the freshest copy of this repo whenever you use it.  It just copies
this repo so you don't have to. Check it out
[here](https://github.com/FormidableLabs/generator-formidable-react-component)


## Build

Build for production use (NPM, bower, etc).

```
$ npm run build
```

Which is composed of commands to create `dist` UMD bundles (min'ed, non-min'ed)

```
$ npm run build-dist
```

and the ES5 `lib`:

```
$ npm run build-lib
```

Note that `dist/` files are only updated and committed on **tagged releases**.


## Development

All development tasks consist of watching the demo bundle, the test bundle
and launching a browser pointed to the demo page.

Run the `demo` application in a browser window with hot reload:
(More CPU usage, but faster, more specific updates)

```
$ npm run hot       # hot test/app server (OR)
$ npm run open-hot  # hot servers _and a browser window opens!_
```

Run the `demo` application with watched rebuilds, but not hot reload:

```
$ npm run dev       # dev test/app server (OR)
$ npm run open-dev  # dev servers _and a browser window opens!_
```

From there you can see:

* Demo app: [127.0.0.1:3000](http://127.0.0.1:3000/)
* Client tests: [127.0.0.1:3001/test/client/test.html](http://127.0.0.1:3001/test/client/test.html)

## Quality

### In Development

During development, you are expected to be running either:

```
$ npm run dev
$ npm run hot
```

to build the src and test files. With these running, you can run the faster

```
$ npm run check-dev
```

Command. It is comprised of:

```
$ npm run lint
$ npm run test-dev
```

Note that the tests here are not instrumented for code coverage and are thus
more development / debugging friendly.

### Continuous Integration

CI doesn't have source / test file watchers, so has to _build_ the test files
via the commands:

```
$ npm run check     # PhantomJS only
$ npm run check-cov # (OR) PhantomJS w/ coverage
$ npm run check-ci  # (OR) PhantomJS,Firefox + coverage - available on Travis.
```

Which is currently comprised of:

```
$ npm run lint      # AND ...

$ npm run test      # PhantomJS only
$ npm run test-cov  # (OR) PhantomJS w/ coverage
$ npm run test-ci   # (OR) PhantomJS,Firefox + coverage
```

Note that `(test|check)-(cov|ci)` run code coverage and thus the
test code may be harder to debug because it is instrumented.

### Client Tests

The client tests rely on webpack dev server to create and serve the bundle
of the app/test code at: http://127.0.0.1:3001/assets/main.js which is done
with the task `npm run server-test` (part of `npm dev` and `npm hot`).

#### Code Coverage

Code coverage reports are outputted to:

```
coverage/
  client/
    BROWSER_STRING/
      lcov-report/index.html  # Viewable web report.
```

## Releases

Built files in `dist/` should **not** be committeed during development or PRs.
Instead we _only_ build and commit them for published, tagged releases. So
the basic workflow is:

```
# Update version
$ vim package.json # and bump version
$ git add package.json

# Create the `dist/*{.js,.map}` files and publish working project to NPM.
$ npm publish
# ... the project is now _published_ and available to `npm`.

# Commit, tag
$ git add dist/
$ git commit -m "Bump version to vVERS"
$ git tag -a "vVERS" -m "Version VERS"
$ git push
$ git push --tags
# ... the project is now pushed to GitHub and available to `bower`.
```

Side note: `npm publish` runs `npm prepublish` under the hood, which does the
build.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/formidable-react-component-boilerplate.svg
[trav_site]: https://travis-ci.org/FormidableLabs/formidable-react-component-boilerplate

