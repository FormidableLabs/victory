VictoryCandlestick
=============

Draw SVG candlestick charts with [React][]. VictoryCandlestick is a composable component, so it doesn't include axes. Check out [VictoryChart][] for complete candlestick charts and more.

## Features

### Props are Optional

VictoryCandlestick is written to be highly configurable, but it also includes a set of sensible defaults and fallbacks. If no props are provided, VictoryCandlestick will plot sample data.

``` playground
<VictoryCandlestick/>
```

To display your own data, just pass in an array of data objects, or an array of arrays via the data prop.

```playground
<VictoryCandlestick
  data={[
    {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
    {x: new Date(2016, 6, 2), open: 15, close: 10, high: 20, low: 5},
    {x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10},
    {x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15},
    {x: new Date(2016, 6, 5), open: 30, close: 25, high: 35, low: 20}
  ]}
/>
```

VictoryCandlestick comes with data accessor props to make passing in data much more flexible.
assign a property to x, open, close, high, or low, or process data on the fly.

```playground
<VictoryCandlestick
  data={[
    {date: new Date(2016, 8, 2), open: 5, close: 10, low: 0},
    {date: new Date(2016, 8, 3), open: 15, close: 10, low: 5},
    {date: new Date(2016, 8, 4), open: 15, close: 20, low: 10},
    {date: new Date(2016, 8, 5), open: 25, close: 20, low: 15},
    {date: new Date(2016, 8, 6), open: 25, close: 30, low: 20}
  ]}
  x={"date"}
  high={(data) => (Math.max(data.open, data.close) + 10)}
/>
```

### Flexible and Configurable

The sensible defaults VictoryCandlestick provides makes it easy to get started, but everything can be overridden, and configured to suit your needs:

```playground
<VictoryChart
  height={500}
  padding={75}
  scale={{x: "time"}}
>
  <VictoryAxis
    scale="time"
    tickFormat={(x) => (x.getMonth() + 1 + "/" + x.getDate())}
  />

  <VictoryAxis
    dependentAxis
  />

  <VictoryCandlestick
    candleColors={{positive: "purple", negative: "blue"}}
    style={{
      data: {width: 30},
      labels: {fontSize: 24}
    }}
    domain={{x: [new Date(2016, 5, 30), new Date(2016, 6, 6)]}}
    data={[
    {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
    {x: new Date(2016, 6, 2), open: 15, close: 10, high: 20, low: 5},
    {x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10},
    {x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15},
    {x: new Date(2016, 6, 5), open: 30, close: 25, high: 35, low: 20}
  ]}
  />

</VictoryChart>
```


Data objects can be styled directly for granular control

```playground
<VictoryCandlestick
  height={500}
  padding={75}
  style={{
    labels: {fontSize: 20}
  }}
  data={[
    {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0, opacity: 0.1, label: "OMG"},
    {x: new Date(2016, 6, 2), open: 15, close: 10, high: 20, low: 5, opacity: 0.5},
    {x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10, opacity: 0.75, label: "WOW"},
    {x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15, opacity: 0.2},
    {x: new Date(2016, 6, 5), open: 30, close: 25, high: 35, low: 20, label: "LOL"},
    {x: new Date(2016, 6, 6), open: 30, close: 35, high: 40, low: 25}
  ]}
/>
```

Candlestick wicks can be changed to whatever color you'd like, but to ensure that wicks match up with candle body, set the stroke property to "transparent" or "none".

```playground
<VictoryCandlestick
  height={500}
  padding={75}
  style={{
    data: {fill: "blue", stroke: "none"},
    labels: {fontSize: 20}
  }}
  data={[
    {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
    {x: new Date(2016, 6, 2), open: 15, close: 10, high: 20, low: 5},
    {x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10},
    {x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15},
    {x: new Date(2016, 6, 5), open: 30, close: 25, high: 35, low: 20}
  ]}
/>
```

Functional styles allow elements to determine their own styles based on data

```playground
<VictoryCandlestick
  height={500}
  padding={75}
  style={{
    data: {
      strokeWidth: (data) => data.open > data.close ?
        5 : 1
    }
  }}
  data={[
    {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
    {x: new Date(2016, 6, 2), open: 15, close: 10, high: 20, low: 5},
    {x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10},
    {x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15},
    {x: new Date(2016, 6, 5), open: 30, close: 25, high: 35, low: 20}
  ]}
/>
```

### Events

Use the `events` prop to attach events to specific elements in VictoryCandlestick. The `events` prop takes an array of event objects, each of which is composed of a `target`, an `eventKey`, and `eventHandlers`. `target` may be any valid style namespace for a given component, so `parent`, `data` and `labels` are all valid targets for VictoryCandlestick events.


The `eventKey` may optionally be used to select a single element by index rather than an entire set. The `eventHandlers` object should be given as an object whose keys are standard event names (i.e. `onClick`) and whose values are event callbacks. The return value of an event handler is used to modify elements. The return value should be given as an object or an array of objects with optional `eventKey` and `target` keys, and a `mutation` key whose value is a function. The `eventKey` and `target` keys will default to values corresponding to the element the event handler was attached to. The `mutation` function will be called with the calculated props for the individual selected element (_i.e._ a single candlestick), and the object returned from the mutation function will override the props of the selected element via object assignment. VictoryCandlestick may also be used with the `VictorySharedEvents` wrapper.

```playground
<VictoryCandlestick
  height={500}
  padding={75}
  data={[
    {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
    {x: new Date(2016, 6, 2), open: 15, close: 10, high: 20, low: 5, label: "hello"},
    {x: new Date(2016, 6, 3), open: 15, close: 20, high: 25, low: 10},
    {x: new Date(2016, 6, 4), open: 20, close: 25, high: 30, low: 15, label: "there"},
    {x: new Date(2016, 6, 5), open: 30, close: 25, high: 35, low: 20}
  ]}
  events={[{
    target: "labels",
    eventHandlers: {
      onClick: () => {
        return [
          {
            mutation: (props) => {
              return {
                style: merge({}, props.style.labels, {fill: "orange"})
              };
            }
          }
        ];
      }
    }
  },
  {
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [
          {
            mutation: (props) => {
              return {
                style: merge({}, props.style, {fill: "blue"})
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
    const n = random(4, 10)
    return range(n).map((i) => {
      return {
        x: i,
        open: random(10, 20),
        close: random(10, 20),
        high: random(20, 30),
        low: random(0, 10)
      };
    });
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
      <VictoryCandlestick
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
