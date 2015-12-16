# Getting started with Victory

Victory is an opinionated, but fully overridable, ecosystem of composable React components for building interactive data visualizations.

### Including components

Components can be included individually:

```playground
// import { VictoryPie } from "victory"
<VictoryPie/>
```

Or imported as a set:
```playground
// import * as V from "victory"
<V.VictoryPie/>
```
### Animation
Wrap any Victory component with [VictoryAnimation](https://github.com/FormidableLabs/victory-animation) and it will transition smoothly between states whenever data changes. `VictoryAnimation` relies on d3's interpolator, so it knows how to transition between colors, dates, numbers, strings etc.

### Contributing
Interested in helping out? Great! You can [get started here](https://github.com/FormidableLabs/victory/blob/master/CONTRIBUTING.md).
