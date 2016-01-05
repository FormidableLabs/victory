[![Travis Status][trav_img]][trav_site]

Victory
=======

[![Join the chat at https://gitter.im/FormidableLabs/victory](https://badges.gitter.im/FormidableLabs/victory.svg)](https://gitter.im/FormidableLabs/victory?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  

Victory is an opinionated, but fully overridable, ecosystem of composable React components for building interactive data visualizations. This repo aggregates all of the stable Victory components so they can be conveniently included.

See the docs and examples on the website: http://victory.formidable.com

**Important:** _This project is in alpha release. We're hard at work fixing bugs and improving the API. Be prepared for breaking changes!_

## Get started

1. Add Victory to your project:
  ```
  npm install victory --save
  ```

2. Add your first Victory component:

  ```jsx
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

```jsx
import {VictoryLine, VictoryAxis} from "victory"

<VictoryLine/>
```

Or imported as a set:

```jsx
import * as V from "victory"

<V.VictoryLine/>
```

## Components

You can read about these Victory components via interactive docs!

- [VictoryAxis](http://victory.formidable.com/docs/victory-axis)
- [VictoryBar](http://victory.formidable.com/docs/victory-bar)
- [VictoryChart](http://victory.formidable.com/docs/victory-chart)
- [VictoryLine](http://victory.formidable.com/docs/victory-line)
- [VictoryPie](http://victory.formidable.com/docs/victory-pie)
- [VictoryScatter](http://victory.formidable.com/docs/victory-scatter)
- [VictoryLabel](http://victory.formidable.com/docs/victory-label)
- [VictoryAnimation](http://victory.formidable.com/docs/victory-animation)


## Animation
Wrap any Victory component with [VictoryAnimation](https://github.com/FormidableLabs/victory-animation) and it will transition smoothly between states whenever data changes. VictoryAnimation relies on d3's interpolator, so it knows how to transitions between colors, dates, numbers, strings etc.

## Development

Please see [DEVELOPMENT](DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md)

## Roadmap

Please see [ROADMAP](ROADMAP.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/victory.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory
