[![Travis Status][trav_img]][trav_site]

[![Maintenance Status][maintenance-image]](#maintenance-status)

# Victory

#### an ecosystem of composable React components for building interactive data visualizations.

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
$ npm install victory --save
```

2. Add your first Victory component:

```js
import React, { Component } from "react";
import { render } from "react-dom";
import { VictoryPie } from "victory";

class PieChart extends Component {
  render() {
    return <VictoryPie />;
  }
}

render(<PieChart />, document.getElementById("app"));
```

3. `VictoryPie` component will be rendered, and you should see:

<p align="center">
  <img align="center" width="471" alt="pie" src="https://cloud.githubusercontent.com/assets/3719995/20915779/b51e3652-bb3c-11e6-8243-6e7521a59115.png">
</p>

## Requirements

Projects using Victory should also depend on [React][]

## Victory Native

Want to use `Victory` with React Native? Check out [victory-native](https://github.com/FormidableLabs/victory-native)
Victory Native shares most of its code with Victory, and has a nearly identical api!

## [Contributing](CONTRIBUTING.md)

## Maintenance Status

**Active:** Formidable is actively working on this project, and we expect to continue for work for the foreseeable future. Bug reports, feature requests and pull requests are welcome.


[react]: https://facebook.github.io/react/
[trav_img]: https://api.travis-ci.org/FormidableLabs/victory.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory
[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg
