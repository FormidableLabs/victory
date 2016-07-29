VictoryCandlestick
=============

Draw SVG error bar charts with [React][]. VictoryErrorBar is a composable component, so it doesn't include axes. Check out [VictoryChart][] for complete error bar charts and more.

## Features

### Props are Optional

VictoryErrorBar is written to be highly configurable, but it also includes a set of sensible defaults and fallbacks. If no props are provided, VictoryErrorBar will plot sample data.

``` playground
<VictoryErrorBar/>
```

To display your own data, just pass in an array of data objects, or an array of arrays via the data prop.

```playground
<VictoryErrorBar
  data={[
    {x: 1, y: 1, errorX: [1, 0.5], errorY: .1},
    {x: 2, y: 2, errorX: [1, 3], errorY: .1},
    {x: 3, y: 3, errorX: [1, 3], errorY: [.2, .3]},
    {x: 4, y: 2, errorX: [1, 0.5], errorY: .1},
    {x: 5, y: 1, errorX: [1, 0.5], errorY: .2}
  ]}
/>
```

VictoryErrorBar comes with data accessor props to make passing in data much more flexible.
assign a property to x, y, errorX, or errorY, or process data on the fly.

```playground
<VictoryErrorBar
  data={[
    {num: 1, y: 1, dif: 4},
    {num: 2, y: 2, dif: 1},
    {num: 3, y: 3, dif: 2},
    {num: 4, y: 2, dif: .5},
    {num: 5, y: 1, dif: 3}
  ]}
  x={"num"}
  errorY={(d) => (d.dif / 4)}
/>
```

### Flexible and Configurable

The sensible defaults VictoryErrorBar provides makes it easy to get started, but everything can be overridden, and configured to suit your needs:

```playground
<VictoryChart
  height={500}
  padding={75}
  domainPadding={20}
>
  <VictoryErrorBar
    style={{
      data: {width: 30, stroke: "blue"},
      labels: {fontSize: 24, padding: 40}
    }}
    data={[
      {x: 1, y: 1, errorY: .1, label: "first"},
      {x: 2, y: 2, errorY: .1},
      {x: 3, y: 3, errorY: [.2, .3], label: "third"},
      {x: 4, y: 4, errorY: .1},
      {x: 5, y: 5, errorY: .2, label: "fifth"}
    ]}
  />

</VictoryChart>
```


Data objects can be styled directly for granular control

```playground
<VictoryErrorBar
  height={500}
  padding={75}
  style={{
    labels: {fontSize: 20}
  }}
  data={[
    {x: 1, y: 5, errorY: 0.1, errorX: [1, 2], label: "HI", stroke: "green"},
    {x: 2, y: 15, errorY: 0.1, errorX: [2, 0], opacity: 0.5, stroke: "yellow"},
    {x: 3, y: 10, errorY: 0.2, errorX: [2, 1], opacity: 0.75, label: "HELLO", stroke: "salmon"},
    {x: 4, y: 20, errorY: 0.25, errorX: [3, 2], stroke: "pink"},
    {x: 5, y: 30, errorY: 0.25, errorX: [2, 1], label: "HEY", stroke: "purple"},
    {x: 6, y: 35, errorY: 0.35, errorX: [0, 3], stroke: "blue"}
  ]}
/>
```

Functional styles allow elements to determine their own styles based on data

```playground
<VictoryErrorBar
  height={500}
  padding={75}
  style={{
    data: {
      strokeWidth: (data) => data.errorX ?
        5 : 1,
        stroke: (data) => data.y > 3 ? "pink" : "purple"
    }
  }}
  data={[
    {x: 2, y: 2},
    {x: 4, y: 4, errorY: 0.5, errorX: 1.2},
    {x: 6, y: 1, errorY: 1.1},
    {x: 8, y: 3, errorY: 0.25, errorX: 0.9},
    {x: 10, y: 6, errorY: 0.3}
  ]}
/>
```

### Events

Use the `events` prop to attach events to specific elements in VictoryCandlestick. The `events` prop takes an array of event objects, each of which is composed of a `target`, an `eventKey`, and `eventHandlers`. `target` may be any valid style namespace for a given component, so `parent`, `data` and `labels` are all valid targets for VictoryCandlestick events.


The `eventKey` may optionally be used to select a single element by index rather than an entire set. The `eventHandlers` object should be given as an object whose keys are standard event names (i.e. `onClick`) and whose values are event callbacks. The return value of an event handler is used to modify elements. The return value should be given as an object or an array of objects with optional `eventKey` and `target` keys, and a `mutation` key whose value is a function. The `eventKey` and `target` keys will default to values corresponding to the element the event handler was attached to. The `mutation` function will be called with the calculated props for the individual selected element (_i.e._ a single candlestick), and the object returned from the mutation function will override the props of the selected element via object assignment. VictoryCandlestick may also be used with the `VictorySharedEvents` wrapper.

```playground
<VictoryErrorBar
  height={500}
  padding={75}
  style={{labels: {padding: 40}, data: {stroke: "orange"}}}
  data={[
    {x: 1, y: 1, errorX: [1, 0.5], errorY: .1, label: "click me"},
    {x: 2, y: 2, errorX: [1, 3], errorY: .1},
    {x: 3, y: 3, errorX: [1, 3], errorY: [.2, .3]},
    {x: 4, y: 2, errorX: [1, 0.5], errorY: .1, label: "click me too"},
    {x: 5, y: 1, errorX: [1, 0.5], errorY: .2}
  ]}
  events={[{
    target: "labels",
    eventHandlers: {
      onClick: () => {
        return [
          {
            target: "data",
            mutation: (props) => {
              return {
                style: merge({}, props.style, {stroke: "blue", strokeWidth: 2})
              };
            }  
          }
        ];
      }
    }
  }]}
/>
```

### Animating

VictoryCandlestick animates with [VictoryAnimation][] as data changes when an `animate` prop is provided.
VictoryCandlestick defines a set of default transition behaviors for entering and exiting data nodes.
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
    const n = random(1, 30)
    return range(n).map((i) => {
      return {
        x: i,
        y: random(1, 10),
        errorX: random(0, 2),
        errorY: random(0, 1),
        stroke: this.getColors()
      };
    });
  }

  getColors(){
    const colors = ["salmon", "pink", "lime", "aqua", "fuchsia"];
    return colors[random(0, 4)];
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.getData(),
      });
    }, 1500);
  }

  render() {
    return (
      <VictoryErrorBar
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

### Props

[React]: https://github.com/facebook/react
[VictoryAnimation]: http://formidable.com/open-source/victory/docs/victory-animation
[VictoryChart]: http://formidable.com/open-source/victory/docs/victory-chart
