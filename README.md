[![Travis Status][trav_img]][trav_site]
[![Join the chat at https://gitter.im/FormidableLabs/victory](https://badges.gitter.im/FormidableLabs/victory.svg)](https://gitter.im/FormidableLabs/victory?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


<h1 align="center">Victory</h1>

<h4 align="center">
  an ecosystem of composable React components for building interactive data visualizations.
</h4>

<p align="center">
  <img width="471" alt="animation" src="https://cloud.githubusercontent.com/assets/3719995/20915445/ca54be30-bb3a-11e6-95d0-7867af91f269.gif">
</p>

- [Getting Started](#getting-started)
- [Victory Native](#victory-native)
- [API Documentation](http://formidable.com/open-source/victory/docs)
- [Guides](http://formidable.com/open-source/victory/guides)
- [Contributing](#contributing)
- [_IMPORTANT_](#important)

* See the **docs and examples** on the website: http://formidable.com/open-source/victory.
* **Experiment** with all Victory components in this [JSBin](http://jsbin.com/qekike/edit) or this [JSFiddle](https://jsfiddle.net/5g20p8vd/6/).
* For support, join the **Gitter chat room** at https://gitter.im/FormidableLabs/victory.



## Getting started

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

<p align="center">
  <img align="center" width="471" alt="pie" src="https://cloud.githubusercontent.com/assets/3719995/20915779/b51e3652-bb3c-11e6-8243-6e7521a59115.png">
</p>

## Requirements
Projects using Victory should also depend on [React][] and [prop-types][].

## Victory Native
Want to use `Victory` with React Native? Check out [victory-native](https://github.com/FormidableLabs/victory-native)
Victory Native shares most of its code with Victory, and has a nearly identical api!

## Contributing

The `victory` repo aggregates stable victory components that are developed in other repos. The `victory`
repo is only updated with new releases, but the following repos are under very active development.

[`victory-core`](https://github.com/FormidableLabs/victory-core)
[`victory-chart`](https://github.com/FormidableLabs/victory-chart)
[`victory-pie`](https://github.com/FormidableLabs/victory-pie)

Please review our [Code of Conduct](https://github.com/FormidableLabs/builder-victory-component/blob/master/CONTRIBUTING.md#contributor-covenant-code-of-conduct) before contributing.

For a detailed contribution guide, please see [CONTRIBUTING](https://github.com/FormidableLabs/builder-victory-component-dev/blob/master/CONTRIBUTING.md) in the project builder archetype.


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

## Important

_This project is in alpha release. We're hard at work fixing bugs and improving the API. Be prepared for breaking changes!_

**SEMVER** Minor version bumps should be considered breaking changes until we hit v1.0.0. Patches can be considered safe.

**Caveats** git installs using npm 2 may fail in postinstall. If you are consuming Victory via git installs please use npm >=3.0.0

[React]: https://facebook.github.io/react/
[prop-types]: https://github.com/reactjs/prop-types
[trav_img]: https://api.travis-ci.org/FormidableLabs/victory.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory

## Issues
### Jest Snapshots

If you want to use [Jest snapshot testing](https://github.com/storybooks/storybook/tree/master/addons/storyshots)
with Victory, you may encounter a problem where the Jest snapshot changes every time, due to a randomly generated `clipId`
being used for a `VictoryClipContainer` group component.
The solution to this is to set a static `clipId` on your `VictoryClipContainer`.

For example, when creating a `VictoryLine` component, you can pass a `groupComponent` prop:
```js
<VictoryLine
  groupComponent={<VictoryClipContainer clipId={1} />}
/>
```

Now the `clipId` attached to your `VictoryLine` component will always be the same, and your snapshot will not change with each test run.  
