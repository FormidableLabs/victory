[![Travis Status][trav_img]][trav_site]

Victory
=======

[![Join the chat at https://gitter.im/FormidableLabs/victory](https://badges.gitter.im/FormidableLabs/victory.svg)](https://gitter.im/FormidableLabs/victory?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Victory is an opinionated, but fully overridable, ecosystem of composable React components for building interactive data visualizations. This repo aggregates all of the stable Victory components so they can be conveniently included.

**Important:** _This project is in alpha release. We're hard at work fixing bugs and improving the API. Be prepared for breaking changes!_

## Including components:

Components can be included individually

```
import {VictoryLine, VictoryAxis} from "victory"

<VictoryLine/>
```

Or imported as a set:

```
import * as V from "victory"

<V.VictoryLine/>
```

## Components

You can read about these Victory components via interactive docs!

- [VictoryAxis](https://formidablelabs.github.io/victory-axis)
- [VictoryBar](https://formidablelabs.github.io/victory-bar)
- [VictoryChart](https://formidablelabs.github.io/victory-chart)
- [VictoryLine](https://formidablelabs.github.io/victory-line)
- [VictoryPie](https://formidablelabs.github.io/victory-pie)
- [VictoryScatter](https://formidablelabs.github.io/victory-scatter)


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
