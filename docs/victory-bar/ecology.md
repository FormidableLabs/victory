VictoryBar
=============

Draw SVG bar charts with [React][]. VictoryBar is a composable component, so it doesn't include axes. Check out [VictoryChart][] for complete bar charts and more.

## Features

### Props are Optional

VictoryBar is written to be highly configurable, but it also includes a set of sensible defaults and fallbacks. If no props are provided, VictoryBar will plot sample data.

``` playground
<VictoryBar/>
```

To display your own data, just pass in an array of data objects, or an array of arrays via the data prop.

```playground
<VictoryBar
  data={[
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 3, y: 3},
    {x: 4, y: 2},
    {x: 5, y: 1}
  ]}
/>
```

VictoryBar comes with data accessor props to make passing in data much more flexible.
assign a property to x or y, or process data on the fly.

```playground
<VictoryBar
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

Use the VictoryGroup wrapper to create a set of grouped bars.

```playground
<VictoryGroup
  height={500}
  offset={20}
  colorScale={"qualitative"}
>
  <VictoryBar
    data={[
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3}
    ]}
  />
  <VictoryBar
    data={[
      {x: 1, y: 2},
      {x: 2, y: 1},
      {x: 3, y: 1}
    ]}
  />
  <VictoryBar
    data={[
      {x: 1, y: 3},
      {x: 2, y: 4},
      {x: 3, y: 2}
    ]}
  />
</VictoryGroup>
```

Or use the VictoryStack wrapper to create a stacked layout. The y domain is automatically set to account for the cumulative maximum of the data:

```playground
<VictoryStack
  height={500}
  colorScale={"qualitative"}
>
  <VictoryBar
    data={[
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3}
    ]}
  />
  <VictoryBar
    data={[
      {x: 1, y: 2},
      {x: 2, y: 1},
      {x: 3, y: 1}
    ]}
  />
  <VictoryBar
    data={[
      {x: 1, y: 3},
      {x: 2, y: 4},
      {x: 3, y: 2}
    ]}
  />
</VictoryStack>
```
### Flexible and Configurable

The sensible defaults VictoryBar provides makes it easy to get started, but everything can be overridden, and configured to suit your needs:

```playground
<VictoryStack horizontal
  height={500}
  padding={75}
  style={{
    data: {width: 30},
    labels: {fontSize: 24}
  }}
  labels={["one", "two", "three"]}
>
  <VictoryBar
    style={{data: {fill: "tomato"}}}
    data={[
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3}
    ]}
  />
  <VictoryBar
    style={{data: {fill: "orange"}}}
    data={[
      {x: 1, y: 2},
      {x: 2, y: 1},
      {x: 3, y: 1}
    ]}
  />
  <VictoryBar
    style={{data: {fill: "gold"}}}
    data={[
      {x: 1, y: 3},
      {x: 2, y: 4},
      {x: 3, y: 2}
    ]}
  />
</VictoryStack>
```


data objects can be styled directly for granular control

```playground
<VictoryBar
  height={500}
  padding={75}
  style={{
    labels: {fontSize: 20}
  }}
  data={[
    {x: 1, y: 1, fill: "gold", label: "SO"},
    {x: 2, y: 3, fill: "orange"},
    {x: 3, y: 2, fill: "tomato", label: "WOW"},
    {x: 4, y: 4, fill: "pink"},
    {x: 5, y: 3, fill: "magenta", label: "SUCH"},
    {x: 6, y: 5, fill: "purple"},
    {x: 7, y: 6, fill: "blue", label: "LABEL"}
  ]}
/>
```

Functional styles allow elements to determine their own styles based on data

```playground
<VictoryBar
  height={500}
  padding={75}
  style={{
    data: {
      fill: (data) => data.y > 2 ?
        "red" : "blue"
    }
  }}
  data={[
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 3, y: 3},
    {x: 4, y: 2},
    {x: 5, y: 1}
  ]}
/>
```

### Events

Use the `events` prop to attach events to specific elements in VictoryBar. The `events` prop takes an array of event objects, each of which is composed of a `target`, an `eventKey`, and `eventHandlers`. `target` may be any valid style namespace for a given component, so `parent`, `data` and `labels` are all valid targets for VictoryBar events.


The `eventKey` may optionally be used to select a single element by index rather than an entire set. The `eventHandlers` object should be given as an object whose keys are standard event names (i.e. `onClick`) and whose values are event callbacks. The return value of an event handler is used to modify elements. The return value should be given as an object or an array of objects with optional `eventKey` and `target` keys, and a `mutation` key whose value is a function. The `eventKey` and `target` keys will default to values corresponding to the element the event handler was attached to. The `mutation` function will be called with the calculated props for the individual selected element (_i.e._ a single bar), and the object returned from the mutation function will override the props of the selected element via object assignment. VictoryBar may also be used with the `VictorySharedEvents` wrapper.

```playground
<VictoryBar
  height={500}
  style={{
    data: {fill: "blue", width: 20},
    labels: {fontSize: 20}
  }}
  labels={[
    "a", "b", "c", "d", "e"
  ]}
  data={[
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 3, y: 3, label: "click me"},
    {x: 4, y: 2},
    {x: 5, y: 1}
  ]}
  events={[
    {
      target: "data",
      eventKey: 2,
      eventHandlers: {
        onClick: (evt) => {
          evt.stopPropagation();
          return [
            {
              mutation: () => {
                return {style: {fill: "orange", width: 20}};
              }
            },
            {
              target: "labels",
              eventKey: 3,
              mutation: () => {
                return {text: "now click me"};
              }
            }
          ];
        }
      }
    }, {
      target: "parent",
      eventHandlers: {
        onClick: () => {
          return [
            {
              target: "data",
              mutation: () => {
                return {style: {fill: "tomato", width: 10}};
              }
            }
          ];
        }
      }
    }
  ]}
/>
```

### Animating

VictoryBar animates with [VictoryAnimation][] as data changes when an `animate` prop is provided.
VictoryBar defines a set of default transition behaviors for entering and exiting data nodes.
Provide `onExit` and `onEnter` via the animate prop to define custom enter and exit transitions.
Values returned from `before` and `after` functions will alter the data prop of entering or exiting nodes.

```playground_norender
class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      data: this.getData(),
    };
  }

  getData() {
    const num = random(3, 5);
    return range(4).map((index) => {
      return range(num).map((i) => {
        return {x: i, y: random(2, 10)};
      })
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.getData(),
      });
    }, 3000);
  }

  render() {
    return (
      <VictoryGroup
        height={600}
        offset={15}
        colorScale={"qualitative"}
        animate={{
          duration: 500,
          onExit: {
            duration: 1000,
            before: () => ({y: -1})
          },
        }}
      >
        {this.state.data.map((data, i) => {
          return (
            <VictoryBar
              data={data} key={i}
            />
          );
        })}
      </VictoryGroup>
    );
  }
}
ReactDOM.render(<App/>, mountNode);

```

### Props

[React]: https://github.com/facebook/react
[VictoryAnimation]: http://formidable.com/open-source/victory/docs/victory-animation
[VictoryChart]: http://formidable.com/open-source/victory/docs/victory-chart
