Contributing
============

Thanks for helping out! We couldn't build Victory without the support of our awesome community. Here's a guide for getting you started. If you have any questions, don't hesitate to [reach out on Gitter](https://gitter.im/FormidableLabs/victory).

## How to Contribute to Victory

### 1. Create Issues

We love issues!

If you find a bug :bug: the first thing you should do is search for an existing issue describing your problem. It helps if you can add more detail or a reproduction case. See [this list of repos](https://github.com/FormidableLabs/victory/blob/master/CONTRIBUTING.md#fix-bugs), and scroll through or use the search feature.

If you can't find an existing issue, [create a new issue](https://github.com/FormidableLabs/victory/issues/new?labels=bug). **Please add a JSBin or Fiddle demonstrating the issue**. This is the _number one_ most important thing you can do to help us fix the bug!

* [clone this bin](http://jsbin.com/vikiha/edit)
* ...[or fork this fiddle](https://jsfiddle.net/5g20p8vd/).

### 2. Fix bugs

Feel like writing some code? The best way to get familiar with the code base is to fix a bug!

`Option a)` You can browse bugs repo by repo:

* [victory](https://github.com/FormidableLabs/victory/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
* [victory-animation](https://github.com/FormidableLabs/victory-animation/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
* [victory-axis](https://github.com/FormidableLabs/victory-axis/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
* [victory-bar](https://github.com/FormidableLabs/victory-bar/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
* [victory-chart](https://github.com/FormidableLabs/victory-chart/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
* [victory-label](https://github.com/FormidableLabs/victory-label/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
* [victory-line](https://github.com/FormidableLabs/victory-line/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
* [victory-pie](https://github.com/FormidableLabs/victory-pie/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
* [victory-scatter](https://github.com/FormidableLabs/victory-scatter/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
* [victory-util](https://github.com/FormidableLabs/victory-util/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

`Option b):` ...or you can [add ZenHub to GitHub](https://www.zenhub.io/) (Firefox and Chrome only), and take a look at [the board](https://github.com/FormidableLabs/victory#boards?repos=38721888,38460192,39965719,40037231,39981240,40025701,39974376,40269956,45209191,45209229,45499928,39859425,42207274) of prioritized issues. You can [filter by the "bug" label](https://github.com/FormidableLabs/victory/issues#boards?repos=38721888,38460192,39965719,40037231,39981240,40025701,39974376,40269956,45209191,45209229,45499928,39859425,42207274&labels=bug) to see only bugs.

Fork the repo from the repository front page of the component you want to work on.

When you've fixed the bug, it's time to write some tests to ensure important corner cases are covered, and that the bug doesn't get introduced again. See [victory-line.spec.jsx](https://github.com/FormidableLabs/victory-line/blob/master/test/client/spec/components/victory-line.spec.jsx) for an example test suite.

### 3. Create a PR

Submit a PR by clicking "New pull request" from your fork's main repo page. Before submitting a PR, please read the [Developer's Guide](https://github.com/FormidableLabs/victory/blob/master/CONTRIBUTING.md#developers-guide) below. It will help you stay consistent with the code style and get your PRs merged sooner!

We prefer that you fold all your commits into one for bug fixes. It's easy:

```
# 1. Create a separate copy of the branch just to be safe.

$ git checkout -b bug-fixWithOneCommit


# 2. "Soft reset" the precise number of commits you want to squash into one.
#    Replace the `N` with the number of commits you've made! `git log --oneline` if you're unsure.
#    This will result in a staged diff that's ready-to-commit.

$ git reset --soft HEAD~N


# 3. Commit the change. Include the issue #number in the commit message!

$ git commit
```

Make sure to mention the issue **`#number`** in the commit message!

## Developer's Guide

This is an overview. For a more in-depth guide, see [`DEVELOPMENT.md`](https://github.com/FormidableLabs/victory/blob/master/DEVELOPMENT.md#development).

**Note: Victory requires `npm v3`**. To upgrade your global `npm` installation, run `npm install -g npm@3`.

We use [builder](https://github.com/FormidableLabs/builder) to control our
development workflows. `builder` is an npm dependency found in
`node_modules/.bin/builder`. To use the shorthand `builder` command without the
full path, please follow the steps in the `builder`
[local install guide](https://github.com/FormidableLabs/builder#local-install).

The "short, short version" of this on Mac/Linux is to add:

```sh
export PATH="${PATH}:./node_modules/.bin"
```

to your permanent shell configuration.

### Dev Server

Run `builder run dev` to run a webpack dev server with component examples. The dev server runs on `localhost:3000`.

### Checks, Tests

Each bug fix and feature should come with tests. New features should aim for 100% code coverage.


Run `builder run server-test` to run a karma server with HTML reporting, then open http://localhost:3001/test/client/test.html in your browser. This is great for debugging tests.

Run `builder run check` before committing to ensure lint and tests are passing.

We'd like to [start using Enzyme](https://github.com/FormidableLabs/victory/issues/162) for tests. If you feel up for it, please help by converting some existing tests to Enzyme.

### Code Style

We follow a consistent code style, but we don't have a style manual yet. The easiest way to get a feel for the style is to look at source code.

The JavaScript code style is enforced with `eslint` following the [`defaults/configurations/walmart/es6-react`](https://github.com/walmartlabs/eslint-config-defaults#full-configurations) configuration from [`eslint-config-defaults`](https://github.com/walmartlabs/eslint-config-defaults).

### Component Style

Victory is an ecosystem of components with similar language and methodologies. It should only require one learning curve, and avoid as much component specific domain knowledge as possible. Victory should expose an intuitive api, with sensible defaults that allow a user to render simple visualizations with little start up cost. Though Victory currently relies on d3, Victory components should not be simply React wrappers around d3.

Victory components should:

- Be created from the [FormidableLabs component generator](https://github.com/FormidableLabs/generator-formidable-react-component)
- Be very well documented with [ecology](https://github.com/FormidableLabs/ecology)
- Be named consistently _i.e._ `victory-bar`
- Be React 0.14 compatible
- *NOT* let 3rd party libraries like d3 interact with the DOM
- Have sensible default props / fallback behaviors so that _something_ is rendered even when no props are provided
- Produce sensible results if _only_ data is provided _i.e_ set the domain based on whatever data was provided
- Have attractive default styling
- Take a `style` prop, and intelligently merge provided (and scoped) styles with default styles

```js
// default styles
const styles = {
  parent: {
    width: 500,
    height: 300,
    margin: 50
  },
  data: {
    fill: "#756f6a",
    opacity: 1,
    stroke: "transparent",
    strokeWidth: 0
  },
  labels: {
    stroke: "none",
    fill: "black",
    fontFamily: "Helvetica",
    fontSize: 10,
    textAnchor: "middle"
  }
};

// merging styles:
getStyles(props) {
  if (!props.style) {
    return styles;
  }
  const {data, labels, parent} = props.style;
  return {
    parent: _.merge({}, styles.parent, parent),
    labels: _.merge({}, styles.labels, labels),
    data: _.merge({}, styles.data, data)
  };
}

// example style prop
style={{
  parent: {
    border: "1px solid #ccc",
    height: 500,
    margin: 50,
    width: 500
  },
  data: {
    fill: "red",
    opacity: 0.8
  },
  labels: {
    fontSize: 15,
    padding: 20,
    fill: "grey"
  }
}}
```

- Support animating and static visualizations
- Take an `animate` prop as an object that can be passed as props to [victory-animation](https://github.com/FormidableLabs/victory-animation)
- Support rendering svg and g tags via a `standalone` prop (renders svg when true, g when false).
- Not require users to write d3 or have d3 domain knowledge
- Be accessible and usable for junior developers
- Have an intuitive api
