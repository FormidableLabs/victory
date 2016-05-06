VictoryLine
=============

VictoryLine creates a line based on data. VictoryLine is a composable component, so it does not include an axis.  Check out [VictoryChart][] for easy to use line charts and more.

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
    interpolation="cardinal"
    label="LINE"
    style={{
      data: {
        stroke: "#822722",
        strokeWidth: 3
      },
      labels: {fontSize: 12}
    }}
 />
```

### Data Markers

To create markers and labels for individual data points along a line, just compose VictoryLine with VictoryScatter.

```playground
<svg width={500} height={500}>
  <VictoryLine
    width={500}
    height={300}
    standalone={false}
    interpolation={"cardinal"}
    style={{
      data: {
        stroke: "#822722",
        strokeWidth: 3
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
  <VictoryScatter
    width={500}
    height={300}
    standalone={false}
    style={{
      data: {
        fill: "#822722",
        stroke: "white",
        strokeWidth: 3
      },
      labels: {
        fill: "#822722",
        fontSize: 14,
        padding: 12
      }
    }}
    size={6}
    labels={[
     "a", "b", "c", "d", "e", "f"
    ]}
    data={[
      {x: 0, y: 1},
      {x: 1, y: 3},
      {x: 2, y: 2},      
      {x: 3, y: 4},
      {x: 4, y: 3},
      {x: 5, y: 5}
    ]}
  />
</svg>
```

### Functional styles

VictoryLine also supports functional styles. Unlike other data components, style for VictoryLine  will be evaluated as a function of the entire dataset rather than a single data point.

```playground
 <VictoryLine
   style={{
    data: {
      stroke: (data) => {
        const y = data.map((d) => d.y);
        return Math.max(...y) > 2 ?
          "red" : "blue";
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

### Events

Use the `events` prop to attach arbitrary event handlers to data, labels, or the containing svg.
Event handlers on data and labels components are called with the event object, the props
corresponding to that component, and the index of that component. Objects returned from
event handlers are stored by index and namespace in state, and applied as props to
appropriate child components.

```playground
 <VictoryLine
   style={{
     data: {stroke: "red", strokeWidth: 9}
   }}
   interpolation={"linear"}
   data={[
     {x: 0, y: 1},
     {x: 1, y: 3},
     {x: 2, y: 2},      
     {x: 3, y: 4},
     {x: 4, y: 3},
     {x: 5, y: 5}
   ]}
   events={{
     data: {
       onClick: (evt, props) => {
         const i = props.interpolation;
         return i === "linear" ?
          {data: {interpolation: "cardinal"}} :
          {data: null};
       }
     }
   }}
 />
```

### Animating

VictoryLine animates with [VictoryAnimation][] as data changes when an `animate` prop is provided.

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
    const n = random(2, 7);
    return (data) => Math.exp(-n * data.x) *
      Math.sin(2 * n * Math.PI * data.x);
  }

  getStyles() {
    const colors = [
      "red", "orange", "magenta",
      "gold", "blue", "purple"
    ];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
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
        animate={{duration: 1500}}
        y={this.state.y}
      />

    );
  }
}
ReactDOM.render(<App/>, mountNode);

```

### Props

[VictoryAnimation]: http://victory.formidable.com/docs/victory-animation
[VictoryChart]: http://victory.formidable.com/docs/victory-chart
