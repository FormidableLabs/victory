VictoryLine
=============

VictoryLine creates a line based on data. VictoryLine is a composable component, so it does not include an axis.  Check out [VictoryChart](https://github.com/formidablelabs/victory-chart) for easy to use line charts and more.

## Features

### Props are optional

VictoryLine is written to be highly configurable, but it also includes a set of sensible defaults and fallbacks. If no props are provided, VictoryLine plots the identity function `(x) => x`.

```playground
<VictoryLine />
```

To display your own data, just pass in an array of data objects via the data prop. The domain of the line is automatically set to include all of the data provided.

```playground
 <VictoryLine
    data={[
      {x: 0, y: 1},
      {x: 1, y: 3},
      {x: 2, y: 2},      
      {x: 3, y: 4},
      {x: 4, y: 3},
      {x: 5, y: 5}
    ]}
 />
```

VictoryLine comes with data accessor props to make passing in data much more flexible.
Assign a property to x or y, or process data on the fly.

```playground
<VictoryLine
  data={[
    {amount: 1, yield: 1, error: 0.5},
    {amount: 2, yield: 2, error: 1.1},
    {amount: 3, yield: 3, error: 0},
    {amount: 4, yield: 2, error: 0.1},
    {amount: 5, yield: 1, error: 1.5}
  ]}
  x={"amount"}
  y={(data) => (data.yield + data.error)}
/>
```


VictoryLine can also plot functions. Again, the domain is set so that the entire line is visible:

```playground
 <VictoryLine
    y={(data) =>
      Math.sin(2 * Math.PI * data.x)
    }
 />
```

### Flexible and configurable

The sensible defaults VictoryLine provides makes it easy to get started, but everything can be overridden, and configured to suit your needs:

Add labels, style the data, change the interpolation, add a custom domain:

```playground
<VictoryLine
    domain={[0, 5]}
    padding={75}
    height={500}
    data={[
      {x: 0, y: 1},
      {x: 1, y: 3},
      {x: 2, y: 2},      
      {x: 3, y: 4},
      {x: 4, y: 3},
      {x: 5, y: 5}
    ]}
    interpolation="monotone"
    label="LINE"
    style={{
      data: {
        stroke: "#822722",
        strokeWidth: 3,
        ":hover": {stroke: "#c33b33"}
      },
      labels: {fontSize: 12}
    }}
 />
```

### Functional styles

VictoryLine also supports functional styles. Unlike other data components, style for VictoryLine  will be evaluated as a function of the entire dataset rather than a single data point.

```playground
 <VictoryLine
   style={{
    data: {
      stroke: (data) => {
        const max = _.max(data.map(
          (datum) => datum.y)
        );
        return max > 2 ? "red" : "blue";
      }
    }
   }}
   data={[
     {x: 0, y: 1},
     {x: 1, y: 3},
     {x: 2, y: 2},      
     {x: 3, y: 4},
     {x: 4, y: 3},
     {x: 5, y: 5}
   ]}
 />
```


### Animating

VictoryLine animates with [VictoryAnimation](http://github.com/formidablelabs/victory-animation) as data changes when an `animate` prop is provided.

```playground_norender
class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      y: this.getYFunction(),
      style: this.getStyles()
    };
  }

  getYFunction() {
    const n = _.random(2, 7);
    return (data) => Math.exp(-n * data.x) *
      Math.sin(2 * n * Math.PI * data.x);
  }

  getStyles() {
    const colors = [
      "red", "orange", "magenta",
      "gold", "blue", "purple"
    ];
    return {
      stroke: colors[_.random(0, 5)],
      strokeWidth: _.random(1, 5)
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        y: this.getYFunction(),
        style: this.getStyles()
      });
    }, 3000);
  }

  render() {
    return (
      <VictoryLine
        style={{data: this.state.style}}
        height={600}
        interpolation="basis"
        animate={{velocity: 0.02}}
        y={this.state.y}
      />

    );
  }
}
ReactDOM.render(<App/>, mountNode);

```
