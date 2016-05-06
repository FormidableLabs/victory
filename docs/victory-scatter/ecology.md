VictoryScatter
=============

VictoryScatter creates a scatter of points from data. VictoryScatter is a composable component, so it does not include an axis. Check out [VictoryChart][] for easy to use scatter plots and more.

## Features

### Props are optional

VictoryScatter is written to be highly configurable, but it also includes a set of sensible defaults and fallbacks. If no props are provided, VictoryScatter plots the identity function `(x) => x` as a set of points.

```playground
 <VictoryScatter/>
```

To display your own data, just pass in an array of data objects via the data prop. The domain of the scatter is automatically set to include all of the data provided.

```playground
 <VictoryScatter
    data={[
      {x: 1, y: 3},
      {x: 2, y: 5},      
      {x: 3, y: 4},
      {x: 4, y: 2},
      {x: 5, y: 5}
    ]}
 />
```
VictoryScatter comes with data accessor props to make passing in data much more flexible.
Assign a property to x or y, or process data on the fly.

```playground
<VictoryScatter
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


VictoryScatter can also plot functions. Again, the domain is set so that the entire line is visible:

```playground
 <VictoryScatter
    y={(data) =>
      Math.sin(2 * Math.PI * data.x)
    }
 />
```

### Flexible and configurable

The sensible defaults VictoryScatter provides makes it easy to get started, but everything can be overridden, and configured to suit your needs:

Style data for the entire chart with props:

```playground
<VictoryScatter
    data={[
      {x: 1, y: 3},
      {x: 2, y: 5},      
      {x: 3, y: 4},
      {x: 4, y: 2},
      {x: 5, y: 5}
    ]}
    size={8}
    symbol="star"
    style={{
      data: {
        fill: "gold",
        stroke: "orange",
        strokeWidth: 3
      }
    }}
 />
```

Or style data points individually:

```playground
<VictoryScatter
    data={[
      {
        x: 1, y: 3, fill: "red",
        symbol: "plus", size: 6
      },
      {
        x: 2, y: 5, fill: "magenta",
        size: 9, opacity: 0.4
      },      
      {
        x: 3, y: 4, fill: "orange",
        size: 5, label: "LABEL"
      },
      {
        x: 4, y: 2, fill: "brown",
        symbol: "square", size: 6
      },
      {
        x: 5, y: 5, fill: "black",
        symbol: "triangleUp", size: 5
      }
    ]}
 />
```

The following symbols are already supported. More robust symbol support coming soon.

```playground
<VictoryScatter
    data={symbolData}
    style={{
      data: {fill: "red", size: 8},
      labels: {padding: 12, fontSize: 12}
    }}
 />
```
### Functional Styles and Props

Functional styles allow elements to determine their own styles based on data

```playground
  <VictoryScatter
    style={{
      data: {
        fill: (data) => data.y > 0 ?
          "red" : "blue"
      }
    }}
    symbol={(data) => data.y > 0 ?
      "triangleUp" : "triangleDown"
    }
    y={(d) => Math.sin(2 * Math.PI * d.x)}
    samples={25}
  />
```

### Events

Use the `events` prop to attach arbitrary event handlers to data, labels, or the containing svg.
Event handlers on data and labels components are called with the event object, the props
corresponding to that component, and the index of that component. Objects returned from
event handlers are stored by index and namespace in state, and applied as props to
appropriate child components.

```playground
  <VictoryScatter
    data={[
      {x: 1, y: 3},
      {x: 2, y: 5},      
      {x: 3, y: 4},
      {x: 4, y: 2},
      {x: 5, y: 5}
    ]}
    labels={[
      "a", "b", "c", "d", "e"
    ]}
    size={8}
    symbol={"star"}
    style={{
      data: {
        fill: "gold",
        stroke: "orange",
        strokeWidth: 3
      },
      labels: {
        fill: "none",
        padding: 12
      }
    }}
    events={{
      data: {
        onClick: (evt, props) => {
          return props.symbol === "star" ?
            {
              data: {
                symbol: "circle",
                style: {
                  fill: "cyan",
                  stroke: "blue",
                  strokeWidth: 3
                }
              },
              labels: {
                style: {
                  fill: "blue",
                  fontSize: 18
                }
              }
            } :
            {data: null, labels: null};
        }
      }
    }}
  />
```

### Animating

VictoryScatter animates with [VictoryAnimation][] as data changes when an `animate` prop is provided.
VictoryScatter defines a set of default transition behaviors for entering and exiting data nodes.
Provide `onExit` and `onEnter` via the animate prop to define custom enter and exit transitions.
Values returned from `before` and `after` functions will alter the data prop of entering and exiting nodes. In the example below, the opacity of the entering nodes is set to 0.3, so that the transition is more apparent.

```playground_norender
class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      data: this.getData(),
    };
  }

  getData() {
    const colors =[
      "orange", "tomato", "gold", "cyan"
    ];
    const symbols = [
      "circle", "star", "plus", "diamond"
    ];
    const samples = random(5, 25);
    return range(samples).map((i) => {
      return {
        x: random(100),
        y: random(100),
        size: random(15) + 3,
        symbol: symbols[i % 4],
        fill: colors[random(0, 3)],
      };
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.getData(),
      });
    }, 2000);
  }

  render() {
    return (
      <VictoryScatter
        height={600}
        domain={[0, 100]}
        animate={{
          duration: 1000,
          onEnter: {
            duration: 500,
            before: () => ({opacity: 0.3}),
            after: () => ({opacity: 1})
          }
        }}
        data={this.state.data}
      />

    );
  }
}
ReactDOM.render(<App/>, mountNode);

```

### Custom Data and Label Components

VictoryScatter accepts custom data and label components via the `dataComponent` and `labelComponent` props. Custom components are supported across all chart types (VictoryLine, VictoryBar, VictoryArea, VictoryPie).

```playground_norender
class CatPoint extends React.Component {
  render() {
    const {x, y, datum} = this.props;
    const cat = datum.y >= 0 ?
      '😻' : '😹';
    return (
      <text x={x} y={y} fontSize={30}>
        {cat}
      </text>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <VictoryScatter
        height={500}
        y={(d) => Math.sin(2 * Math.PI * d.x)}
        samples={25}
        dataComponent={<CatPoint/>}
      />
    );
  }
}
ReactDOM.render(<App/>, mountNode);

```

### Props

[VictoryAnimation]: http://victory.formidable.com/docs/victory-animation
[VictoryChart]: http://victory.formidable.com/docs/victory-chart
