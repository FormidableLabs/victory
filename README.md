[![Travis Status][trav_img]][trav_site]
![](https://badge-size.herokuapp.com/FormidableLabs/victory/master/dist/victory.min.js?compression=gzip)
[![Join the chat at https://gitter.im/FormidableLabs/victory](https://badges.gitter.im/FormidableLabs/victory.svg)](https://gitter.im/FormidableLabs/victory?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Victory
=======

Victory is an opinionated, but fully overridable, ecosystem of composable React components for building interactive data visualizations. This repo aggregates all of the stable Victory components so they can be conveniently included.

* See the **docs and examples** on the website: http://formidable.com/open-source/victory.
* **Experiment** with all Victory components in this [JSBin](http://jsbin.com/qekike/edit) or this [JSFiddle](https://jsfiddle.net/5g20p8vd/6/).
* For support, join the **Gitter chat room** at https://gitter.im/FormidableLabs/victory.

**Important:** _This project is in alpha release. We're hard at work fixing bugs and improving the API. Be prepared for breaking changes!_

**SEMVER** Minor version bumps should be considered breaking changes until we hit v1.0.0. Patches can be considered safe.

**Caveats** git installs using npm 2 may fail in postinstall. If you are consuming Victory via git installs please use npm >=3.0.0

**VictoryNative**
Want to use `Victory` with React Native? Check out [VictoryNative](https://github.com/FormidableLabs/victory-native)

## Get started

1. Add Victory to your project:

  ```sh
  $ npm install victory --save
  ```

2. Add your first Victory component:

  ```js
  import React, { Component } from 'react';
  import { render } from 'react-dom';
  import { VictoryPie } from 'victory';

  class PieChart extends Component {
    render() {
      return (
        <VictoryPie />
      );
    }
  }

  render(<PieChart />, document.getElementById('app'));
  ```

3. `VictoryPie` component will be rendered, and you should see:

![VictoryPie](https://cloud.githubusercontent.com/assets/3802023/12114963/369a6538-b3a6-11e5-898c-db410a335a7b.png)


## Including components:

Components can be included individually

```js
import {VictoryLine, VictoryAxis} from "victory"

<VictoryLine/>
```

Or imported as a set:

```js
import * as V from "victory"

<V.VictoryLine/>
```

## Components

You can read about these Victory components via interactive docs!

- [VictoryAxis](http://formidable.com/open-source/victory/docs/victory-axis)
- [VictoryArea](http://formidable.com/open-source/victory/docs/victory-area)
- [VictoryBar](http://formidable.com/open-source/victory/docs/victory-bar)
- [VictoryChart](http://formidable.com/open-source/victory/docs/victory-chart)
- [VictoryLine](http://formidable.com/open-source/victory/docs/victory-line)
- [VictoryPie](http://formidable.com/open-source/victory/docs/victory-pie)
- [VictoryScatter](http://formidable.com/open-source/victory/docs/victory-scatter)
- [VictoryLabel](http://formidable.com/open-source/victory/docs/victory-label)
- [VictoryAnimation](http://formidable.com/open-source/victory/docs/victory-animation)

## Contributing

Please review our [Code of Conduct](https://github.com/FormidableLabs/builder-victory-component/blob/master/CONTRIBUTING.md#contributor-covenant-code-of-conduct) before contributing.

For a detailed contribution guide, please see [CONTRIBUTING](https://github.com/FormidableLabs/builder-victory-component/blob/master/dev/CONTRIBUTING.md) in the project builder archetype.

```sh
# Clone the Victory repo
$ git clone git@github.com:FormidableLabs/victory.git
$ cd victory

# Run the demo app server
$ npm start

# Open the demo app
$ open http://localhost:3000

# Run checks (lint and tests)
$ npm test
```

For more on the development environment, see [DEVELOPMENT](https://github.com/FormidableLabs/builder-victory-component/blob/master/dev/DEVELOPMENT.md) in the project builder archetype.

## Roadmap

Please see [ROADMAP](ROADMAP.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/victory.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory
[VictoryAnimation]: https://github.com/FormidableLabs/victory-core/blob/master/src/victory-animation/victory-animation.jsx
