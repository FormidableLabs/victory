Development
===========

## Build

Build for production use (NPM, bower, etc) and create `dist` UMD bundles
(min'ed, non-min'ed)

```
$ npm run build
```

Note that `dist/` files are only updated and committed on **tagged releases**.


## Development

All development tasks consist of watching the demo bundle, the test bundle
and launching a browser pointed to the demo page.

Run the `demo` application with watched rebuilds:

```
$ npm run dev       # dev test/app server (OR)
$ npm run open-dev  # dev servers _and a browser window opens!_
```

From there you can see:

* Demo app: [127.0.0.1:3000](http://127.0.0.1:3000/)
* Client tests: [127.0.0.1:3001/test/client/test.html](http://127.0.0.1:3001/test/client/test.html)


## Programming Guide

### Logging

We use the following basic pattern for logging:

```js
if (process.env.NODE_ENV !== "production") {
  /* eslint-disable no-console */
  if (typeof console !== "undefined" && console.warn) {
    console.warn("Oh noes! bad things happened.");
  }
  /* eslint-enable no-console */
}
```

Replace `console.warn` in the condtional + method call as appropriate.

Breaking this down:

* `process.env.NODE_ENV !== "production"` - This part removes all traces of
  the code in the production bundle, to save on file size. This _also_ means
  that no warnings will be displayed in production.
* `typeof console !== "undefined" && console.METHOD` - A permissive check to
  make sure the `console` object exists and can use the appropriate `METHOD` -
  `warn`, `info`, etc.

To signal production mode to the webpack build, declare the `NODE_ENV` variable:

```js
new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production")
})
```

Unfortunately, we need to do _all_ of this every time to have Uglify properly
drop the code, but with this trick, the production bundle has no change in code
size.


## Quality

### In Development

During development, you are expected to be running either:

```
$ npm run dev
```

to build the lib and test files. With these running, you can run the faster

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
with the task `npm run server-test` (part of `npm dev`).

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
# make sure everything is committed and up to date on master
$ npm run build
# this will clean and rebuild dist/ for publication
$ git add dist/
$ git commit -m "build dist for release"

$ npm version major|minor|patch -m "Version %s - INSERT_REASONS"
# this will semantically update the version in package.json
# if you're unsure about which option to use, read about semantic versioning [here](http://semver.org/)
# ... the project is now patched and committed to git (but unpushed).

# Check that everything looks good in last commit and push.
$ git diff HEAD^ HEAD
$ git push && git push --tags
# ... the project is now pushed to GitHub and available to `bower`.

# And finally publish to `npm`!
$ npm publish
```

* [`npm version`](https://docs.npmjs.com/cli/version): Runs verification,
  builds `dist/` and `lib/` via `scripts` commands.
    * Our scripts also run the applicable `git` commands, so be very careful
      when running out `version` commands.
* [`npm publish`](https://docs.npmjs.com/cli/publish): Uploads to NPM.
    * **NOTE**: We don't _build_ in `prepublish` because of the
      [`npm install` runs `npm prepublish` bug](https://github.com/npm/npm/issues/3059)

Side note: `npm publish` runs `npm prepublish` under the hood, which does the
build.

**Note - NPM**: To correctly run `preversion`, etc. scripts, please make sure
you have a very modern `npm` binary:

```
$ npm install -g npm
```

