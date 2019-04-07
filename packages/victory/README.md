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

For detailed documentation and examples please see [Victory Documentation](https://formidable.com/open-source/victory)

## Requirements

Projects using Victory should also depend on [React][] and [prop-types][].

## Victory Native

Want to use `Victory` with React Native? Check out [victory-native](https://github.com/FormidableLabs/victory-native)
Victory Native shares most of its code with Victory, and has a nearly identical api!

## [Contributing](CONTRIBUTING.md)

[react]: https://facebook.github.io/react/
[prop-types]: https://github.com/reactjs/prop-types
