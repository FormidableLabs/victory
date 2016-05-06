VictoryAxis
=============

VictoryAxis draws an SVG chart axis with [React][]. Styles and data can be customized by passing in your own values as properties to the component. Data changes are animated with [VictoryAnimation][].

## Features

### Props are Optional

VictoryAxis is written to be highly configurable, but it also includes a set of sensible defaults and fallbacks. If no properties are provided, the following default axis is rendered:

```playground
<VictoryAxis/>
```

To make a vertical axis, set the `dependentAxis` prop to `true`. Dependent axes are automatically oriented on the left. You can also manually specify an `orientation` prop *i.e.* `orientation="right"`. The default dependent axis is shown below.

```playground
<VictoryAxis dependentAxis/>
```

### Declarative Composition

Axes are meant to be composable.

```playground
<svg width={450} height={450}>
  <VictoryAxis
    padding={75}
    label="x-axis"
    standalone={false}/>
  <VictoryAxis dependentAxis
    padding={75}
    label="y-axis"
    standalone={false}/>
</svg>
```

And can be made to cross each other by setting `offsetX`,  `offsetY`, and `crossAxis` props as shown below. Getting crossed axes to look correct requires calculating the appropriate offsets. This is handled automatically in [VictoryChart][].

```playground
<svg width={400} height={400}>
  <VictoryAxis
    width={400}
    height={400}
    domain={[-10, 10]}
    crossAxis={true}
    offsetY={200}
    standalone={false}/>
  <VictoryAxis dependentAxis
    width={400}
    height={400}
    domain={[-10, 10]}
    crossAxis={true}
    offsetX={200}
    standalone={false}/>
</svg>
```

### Flexible and Configurable

The sensible defaults VictoryAxis provides make it easy to get started, but everything can be overridden, and configured to suit your needs:

```playground
  <VictoryAxis
    style={{
      axis: {stroke: "black"},
      grid: {strokeWidth: 2},
      ticks: {stroke: "red"},
      tickLabels: {fontSize: 12},
      axisLabel: {fontsize: 16}
    }}
    label="Planets"
    tickValues={[
      "Mercury",
      "Venus",
      "Earth",
      "Mars",
      "Jupiter"
    ]}/>
```

### Non-linear scales

With a little more code, you can make a time scale axis with custom tick values and formatting.

```playground
<VictoryAxis
  scale="time"
  tickValues={[
    new Date(1980, 1, 1),
    new Date(1990, 1, 1),
    new Date(2000, 1, 1),
    new Date(2010, 1, 1),
    new Date(2020, 1, 1)]}
    tickFormat={(x) => x.getFullYear()}/>
```

Here's how you make a log scale:

```playground
<VictoryAxis
  dependentAxis
  padding={{left: 50, top: 20, bottom: 20}}
  scale="log"
  domain={[1, 5]}
/>
```

### Animating

VictoryAxis animates with [VictoryAnimation][] as props change when an `animate` prop is provided.

```playground_norender
class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      tickValues: [5, 10, 25, 31, 42],
      style: this.getStyles()
    };
  }

  getTickValues() {
    return range(5).map((i) => {
      return 10 * i + random(5);
    });
  }

  getStyles() {
    const n = random(0, 1);
    const tickColors = ["black", "red"];
    return {
      axis: {stroke: "black"},
      grid: {strokeWidth: n},
      ticks: {stroke: tickColors[n]},
      tickLabels: {fill: tickColors[n]}
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        tickValues: this.getTickValues(),
        style: this.getStyles()
      });
    }, 3000);
  }

  render() {
    return (
      <VictoryAxis
        animate={{duration: 3000}}
        style={this.state.style}
        tickValues={this.state.tickValues}
        tickFormat={[
          "Mets\nNY",
          "Giants\nSF",
          "Yankees\nNY",
          "Nationals\nDC",
          "Mariners\nSEA"
        ]}/>
    );
  }
}
ReactDOM.render(<App/>, mountNode);

```

### Props

[React]: https://github.com/facebook/react
[VictoryAnimation]: http://victory.formidable.com/docs/victory-animation
[VictoryChart]: http://victory.formidable.com/docs/victory-chart
