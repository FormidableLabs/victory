## [Victory Documentation](https://formidable.com/open-source/victory)

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

Projects using Victory should also depend on [React][] and [prop-types][].

## Victory Native

Want to use `Victory` with React Native? Check out [victory-native](https://github.com/FormidableLabs/victory-native)
Victory Native shares most of its code with Victory, and has a nearly identical api!

## [Contributing](CONTRIBUTING.md)

## Issues

### Jest Snapshots

If you want to use [Jest snapshot testing](https://github.com/storybooks/storybook/tree/master/addons/storyshots)
with Victory, you may encounter a problem where the Jest snapshot changes every time, due to a randomly generated `clipId`
being used for a `VictoryClipContainer` group component.
The solution to this is to set a static `clipId` on your `VictoryClipContainer`.

For example, when creating a `VictoryLine` component, you can pass a `groupComponent` prop:

```js
<VictoryLine groupComponent={<VictoryClipContainer clipId={1} />} />
```

Now the `clipId` attached to your `VictoryLine` component will always be the same, and your snapshot will not change with each test run.

[react]: https://facebook.github.io/react/
[prop-types]: https://github.com/reactjs/prop-types
