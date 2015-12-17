# Getting started with Victory

Victory is an opinionated, but fully overridable, ecosystem of composable React components for building interactive data visualizations.

### Including components

First, grab Victory:
```js
npm install victory
```

Then include components individually...
```js
import { VictoryPie } from "victory";
// <VictoryPie />
```

... Or import them as a set.
```js
import * as V from "victory";
// <V.VictoryPie />
```

(The interactive docs throughout this site have already included this `import` step.)

Now you're ready to render:
```
import React from "React";
import { VictoryPie } from "victory";

class HelloWorld extends React.Component {
  render () {
    return (
      <VictoryPie />
    );
  }
}
```

### Contributing and source
Interested in helping out or seeing what's happening under the hood? Victory is maintained at [https://github.com/FormidableLabs/victory](https://github.com/FormidableLabs/victory), and you can [start contributing here](https://github.com/FormidableLabs/victory/blob/master/CONTRIBUTING.md).
