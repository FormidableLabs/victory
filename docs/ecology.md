VictoryChart
=============

A flexible charting component for React. VictoryChart composes other victory components into reusable charts. Acting as a coordinator rather than a stand-alone component, VictoryChart reconciles props such as `domain` and `scale` for child components, and provides a set of sensible defaults. This component works with:

- [VictoryAxis](http://github.com/formidablelabs/victory-axis) 
- [VictoryLine](http://github.com/formidablelabs/victory-line)
- [VictoryScatter](http://github.com/formidablelabs/victory-scatter)
- [VictoryBar](http://github.com/formidablelabs/victory-bar)
- More chart types coming soon!

## Features

### Props are Optional

VictoryChart includes a set of sensible default behaviors, so even when no props are passed, a chart will still be rendered. The default chart renders a `VictoryLine` components which plots the identity function `(x) => x`, and two `VictoryAxis` components.

``` playground
<VictoryChart/>
```

Several data components (VictoryLine, VictoryScatter, VictoryBar etc.) can be passed into chart at once:

```playground
<VictoryChart>
  <VictoryScatter 
    style={{data: {fill: "red"}}}
    symbol="star"
    data={[
      {x:1, y: 1}, 
      {x: 2, y: 2}, 
      {x: 1.8, y: 3}
    ]}/>
  <VictoryLine 
    style={{data: {stroke: "green"}}} 
    interpolation="basis"
    y={(x) => 0.1 * x * x}/>
  <VictoryBar 
    style={{data: {fill: "blue"}}}
    data={[
      {x: 3, y: 5}, 
      {x: 4, y: 4}, 
      {x: 6, y: 3}
    ]}/>
</VictoryChart> 
```
