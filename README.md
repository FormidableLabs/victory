<div align="center">
    <img width="300" alt="victory" src="https://raw.githubusercontent.com/FormidableLabs/formidable-oss-badges/master/src/assets/featuredLogos/victory.svg?sanitize=true" />

  <br />
  <br />

  <strong>
    an ecosystem of composable React components for building interactive data visualizations.
  </strong>

  <br />
  <br />

  <a href="https://npmjs.com/package/victory">
    <img alt="weekly downloads" src="https://img.shields.io/npm/dw/victory.svg">
  </a>
  <a href="https://npmjs.com/package/victory">
    <img alt="current version" src="https://img.shields.io/npm/v/victory.svg">
  </a>
  <a href="https://github.com/FormidableLabs/victory/actions">
    <img alt="build status" src="https://github.com/FormidableLabs/victory/actions/workflows/ci.yml/badge.svg">
  </a>

  <img alt="Gzip size" src="http://img.badgesize.io/https://unpkg.com/victory/dist/victory.min.js?compression=gzip&label=gzip%20size">

  <a href="https://github.com/FormidableLabs/victory#maintenance-status">
    <img alt="Maintenance Status" src="https://img.shields.io/badge/maintenance-active-green.svg" />
  </a>

  <br />
  <br />
</div>

# `Victory`

## Contents

- [Getting Started](#getting-started)
- [Victory Native](#victory-native)
- [API Documentation](http://formidable.com/open-source/victory/docs)
- [Guides](http://formidable.com/open-source/victory/guides)
- [Contributing](#contributing)

* See the **docs and examples** on the website: http://formidable.com/open-source/victory.
* **Experiment** with all Victory components in this [code sandbox](https://codesandbox.io/s/m3xo745x2x)
* For support, join the **Spectrum chat room** at https://spectrum.chat/victory.

## Getting started

1. Add Victory to your project:

```sh
# npm
$ npm i --save victory
# or yarn
$ yarn add victory
```

2. Add your first Victory component:

```js
import React from "react";
import { render } from "react-dom";
import { VictoryPie } from "victory";

const PieChart = () => {
  return <VictoryPie />;
};

render(<PieChart />, document.getElementById("app"));
```

3. `VictoryPie` component will be rendered, and you should see:

<p align="center">
  <img align="center" width="471" alt="pie" src="https://cloud.githubusercontent.com/assets/3719995/20915779/b51e3652-bb3c-11e6-8243-6e7521a59115.png">
</p>

<br />

## Requirements

Projects using Victory should also depend on [React][]. Victory works with React ~~version 15 and above.~~ As of `victory@34.0.0` Victory requires React version `16.3.0` or above

## Victory Native

Want to use `Victory` with React Native? Check out [victory-native](https://github.com/FormidableLabs/victory-native);
Victory Native shares most of its code with Victory, and has a nearly identical API!

## [Contributing](CONTRIBUTING.md)

## Maintenance Status

**Active:** Formidable is actively working on this project, and we expect to continue for work for the foreseeable future. Bug reports, feature requests and pull requests are welcome.

[react]: https://facebook.github.io/react/
