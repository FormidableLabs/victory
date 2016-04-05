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
corresponding to that component, and the index of that component. Values returned from
event handlers on data or labels will be stored as state on VictoryScatter. Data and labels
state can be accessed by index on the `dataState`, and `labelsState` state objects respectively.

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
    symbol={"star"}
    style={{
      data: {
        fill: "gold",
        stroke: "orange",
        strokeWidth: 3
      }
    }}
    events={{
      data: {
        onClick: (evt, props) => {
          return props.symbol === "star" ?
            {
              symbol: "circle",
              style: {
                fill: "cyan",
                stroke: "blue",
                strokeWidth: 3
              }
            } : null;
        }
      }
    }}
  />
```

### Animating

VictoryScatter animates with [VictoryAnimation][] as data changes when an `animate` prop is provided.

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
      "violet", "tomato", "cornflowerblue",
      "turquoise",  "greenyellow", "orange"
    ];
    const symbols = [
      "circle", "star", "square", "diamond",
      "triangleUp", "triangleDown", "plus"
    ];
    return _.map(_.range(25), (index) => {
      return {
        x: _.random(100),
        y: _.random(100),
        size: _.random(15) + 3,
        symbol: symbols[index % 7],
        fill: colors[_.random(0, 5)],
        opacity: _.random(0.3, 1)
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
        animate={{duration: 2000}}
        data={this.state.data}
      />

    );
  }
}
ReactDOM.render(<App/>, mountNode);

```

### Custom Data and Label Components

VictoryScatter accepts custom data and label components via the `dataComponent` and `labelComponent` props. Custom components will soon be supported across all chart types (VictoryLine, VictoryBar, VictoryArea, VictoryPie).

```playground_norender
class CatPoint extends React.Component {
  render() {
    const {x, y, datum} = this.props;
    const cat = datum.y >= 0 ?
      '😻' : '😹';
    return (
      <text x={x} y={y} fontSize={20}>
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
