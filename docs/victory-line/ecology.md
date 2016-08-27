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
      labels: {fontSize: 18}
    }}
 />
```

### Data Markers

To create markers and labels for individual data points along a line, just compose VictoryLine with VictoryScatter; you can use VictoryGroup to help with this.

```playground
<VictoryGroup
  style={{
    data: {strokeWidth: 3}  
  }}
  data={[
    {x: 1, y: 3},
    {x: 2, y: 2},      
    {x: 3, y: 4},
    {x: 4, y: 3},
    {x: 5, y: 5}
  ]}
>
  <VictoryLine
    interpolation={"cardinal"}
    style={{
      data: {stroke: "#822722"}
    }} 
  />
  <VictoryScatter
    style={{
      data: {
        fill: "#822722",
        stroke: "white"
      },
      labels: {
        fill: "#822722",
        fontSize: 18,
        padding: 12
      }
    }}
    size={6}
    labels={[
     "a", "b", "c", "d", "e"
    ]}
  />
</VictoryGroup>
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

Use the `events` prop to attach events to specific elements in VictoryLine. The `events` prop takes an array of event objects, each of which is composed of a `target`, an `eventKey`, and `eventHandlers`. `target` may be any valid style namespace for a given component, so `parent`, `data` and `labels` are all valid targets for VictoryLine events.


Since VictoryLine only renders a single element, the eventKey property is not used. The `eventHandlers` object should be given as an object whose keys are standard event names (i.e. `onClick`) and whose values are event callbacks. The return value of an event handler is used to modify elements. The return value should be given as an object or an array of objects with optional `eventKey` and `target` keys, and a `mutation` key whose value is a function. The `eventKey` and `target` keys will default to values corresponding to the element the event handler was attached to. The `mutation` function will be called with the calculated props for the individual selected element (_i.e._ a single label), and the object returned from the mutation function will override the props of the selected element via object assignment. VictoryLine may also be used with the `VictorySharedEvents` wrapper.

```playground
 <VictoryLine
   padding={60}
   style={{
     data: {stroke: "red", strokeWidth: 9},
     labels: {fontSize: 15}
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
   events={[{
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [
          {
            mutation: (props) => {
              const { style } = props;
              return  style.stroke === "orange" ?
                null :
                {
                  style: merge(
                    {}, style, {stroke: "orange"}
                  )
                };
            }
          }, {
            target: "labels",
            mutation: () => {
              return {text: "WOW"};
            }
          }
        ];
      }
    }
  }]}
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

[VictoryAnimation]: http://formidable.com/open-source/victory/docs/victory-animation
[VictoryChart]: http://formidable.com/open-source/victory/docs/victory-chart
