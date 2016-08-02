VictoryChart
=============

A flexible charting component for React. VictoryChart composes other Victory components into reusable charts. Acting as a coordinator rather than a stand-alone component, VictoryChart reconciles props such as `domain` and `scale` for child components, and provides a set of sensible defaults. This component works with:

- [VictoryArea][]
- [VictoryAxis][]
- [VictoryBar][]
- [VictoryCandlestick][]
- [VictoryErrorBar][]
- [VictoryLine][]
- [VictoryScatter][]
- More chart types coming soon!

## Features

### Props are Optional

VictoryChart includes a set of sensible default behaviors, so even when no props are passed, a chart will still be rendered. The default chart renders two `VictoryAxis` components.

``` playground
<VictoryChart/>
```

VictoryChart was designed to build charts from minimal information. Pass in only information relevant to a specific chart, and VictoryChart will make assumptions about the other details based on available information.

```playground
<VictoryChart>
  <VictoryLine
    y={(data) => 0.5 * data.x * data.x}/>
</VictoryChart>
```

In the example above, VictoryChart was given a [VictoryLine][] component as a child. In addition, it also created a set of VictoryAxis components with the correct domain for the data being plotted by [VictoryLine][], created tick values based on that data, aligned all of its child components into a correct chart, and applied a set of default styles.

### Domain and Scale

In this example, VictoryChart was provided [VictoryScatter][] as a child with an array of `{x, y}` data points. Toggling between the positive and negative set of values shows how how the component is able to calculate domain and scale on its own.

```playground_norender
class App extends React.Component {
  render() {
    return (
      <VictoryChart>
        <VictoryScatter
          data={this.context.dataset}
        />
      </VictoryChart>
    );
  }
}

App.contextTypes = {
  dataset: React.PropTypes.array
};

ReactDOM.render(<DatasetDropdown dataset={dataset}><App/></DatasetDropdown>, mountNode);
```

### Declarative Composition

VictoryCharts are composed of other Victory components. Compose several components of the same type...

```playground
<VictoryChart>
  <VictoryLine
    style={{data:
      {stroke: "red", strokeWidth: 4}
    }}
    y={(data) =>
      Math.sin(2 * Math.PI * data.x)
    }
  />
  <VictoryLine
    style={{data:
      {stroke: "blue", strokeWidth: 4}
    }}
    y={(data) =>
      Math.cos(2 * Math.PI * data.x)
    }
  />
</VictoryChart>
```

or compose components of different types on the same chart

```playground
<VictoryChart height={450}>
  <VictoryScatter
    style={{data: {fill: "purple"}}}
    symbol="star"
    size={5}
    data={[
      {x:-4, y: -4},
      {x: 4, y: 2, fill: "red"},
      {x: 1.8, y: 3}
    ]}/>
  <VictoryLine
    y={(data) => data.x}/>
  <VictoryBar
    style={{data: {fill: "blue"}}}
    data={[
      {x: 3, y: -4},
      {x: -3, y: 4},
      {x: 1, y: 3}
    ]}/>
</VictoryChart>
```

### Flexible and Configurable

The sensible defaults VictoryChart provides makes it easy to get started, but everything can be overridden, and configured to suit your needs:

```playground
<VictoryChart
  height={500}
  padding={{
    top: 75,
    bottom: 40,
    left: 40,
    right: 40
  }}
  domainPadding={{x: 20}}>
  <VictoryAxis
    label="X AXIS"
    orientation="top"/>
  <VictoryAxis dependentAxis
    tickValues={[0, 1.5, 3, 4.5]}
    style={{
      grid: {
        stroke: "grey",
        strokeWidth: 1
      },
      axis: {stroke: "transparent"},
      ticks: {stroke: "transparent"}
    }}/>
  <VictoryBar
    style={{
      data: {
        width: 15,
        fill: (data) => data.y > 3 ?
          "gold" : "orange"
      }
    }}
    data={[
      {x: 1, y: 1},
      {x: 2, y: 2.5},
      {x: 3, y: 4},
      {x: 4, y: 2.5},
      {x: 5, y: 1},
    ]}/>   
</VictoryChart>
```

Stacked bar charts and non-numeric data are supported too!

```playground
<VictoryChart
  height={500}
  domainPadding={{x: 100}}>
  <VictoryStack
    labels={[
      "apples\n(fuji)",
      "bananas",
      "oranges\n(navel)"
    ]}
    colorScale={"qualitative"}
  >
    <VictoryBar
      data={[
        {x: "apples", y: 1},
        {x: "bananas", y: 3},
        {x: "oranges", y: 3}
      ]}
    />
    <VictoryBar
      data={[
        {x: "apples", y: 2},
        {x: "bananas", y: 1},
        {x: "oranges", y: 3}
      ]}
    />
    <VictoryBar
        data={[
        {x: "apples", y: 3},
        {x: "bananas", y: 1},
        {x: "oranges", y: 1}
      ]}
    />
  </VictoryStack>
</VictoryChart>
```

Time series data is also supported:

```playground
<VictoryChart
  height={450}
  scale={{
    x: "time"
  }}>
  <VictoryAxis
    label="Decades"
    tickValues={[
      new Date(1980, 1, 1),
      new Date(2000, 1, 1),
      new Date(2020, 1, 1),
    ]}
    tickFormat={(x) => x.getFullYear()}/>
  <VictoryLine
    data={[
      {x: new Date(1982, 1, 1), y: 125},
      {x: new Date(1987, 1, 1), y: 257},
      {x: new Date(1993, 1, 1), y: 345},
      {x: new Date(1997, 1, 1), y: 515},
      {x: new Date(2001, 1, 1), y: 132},
      {x: new Date(2005, 1, 1), y: 305},
      {x: new Date(2011, 1, 1), y: 270},
      {x: new Date(2015, 1, 1), y: 470}
    ]}/>
</VictoryChart>
```

## Events

Use the `events` prop to attach events to specific elements children of VictoryChart. The `event` prop take an array of event objects. Event objects are composed of a `childName`, `target`, `eventKey`, and `eventHandlers`. `target` may be any valid style namespace for a given component, (i.e. "data" and "labels"). The `childName` will refer to an individual child of VictoryChart, either by its `name` prop, or by index. The `eventKey` may optionally be used to select a single element by index or `eventKey `rather than an entire set. The `eventHandlers` object should be given as an object whose keys are standard event names (i.e. `onClick`) and whose values are event callbacks. The return value of an event handler is used to modify elemnts. The return value should be given as an object or an array of objects with optional `target` and `eventKey` and `childName` keys, and a mutation key whose value is a function. The `target` and `eventKey` and `childName` keys will default to those corresponding to the element the event handler was attached to. The mutation function will be called with the calculated props for the individual selected element (i.e. a single bar), and the object returned from the mutation function will override the props of the selected element via object assignment.

```playground
<VictoryChart
  domainPadding={{x: 30, y: 30}}
  height={600}
  width={600}
  events={[{
    childName: "bar",
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [
          {
            target: "labels",
            eventKey: [2, 6, 10],
            mutation: () => {
              return {text: "WOW"};
            }
          }, {
            childName: "line",
            target: "data",
            mutation: (props) => {
              return {style: {stroke: "lime", strokeWidth:  5}};
            }
          }, {
            childName: "line",
            target: "labels",
            mutation: () => {
              return {text: "LINE"};
            }
          }
        ];
      }
    }
  }]}
>
  <VictoryBar name="bar"
    style={{
      data: {width: 15, fill: "green"},
      labels: {fontSize: 20}
    }}
    data={[
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3},
      {x: 4, y: 2},
      {x: 5, y: 1},
      {x: 6, y: 2},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 1},
      {x: 10, y: 2},
      {x: 11, y: 3},
      {x: 12, y: 2},
      {x: 13, y: 1}
    ]}
  />
  <VictoryLine name="line"
    y={() => 0.5}
    style={{
      data: {stroke: "blue"},
      labels: {fontSize: 20}
    }}
  />
</VictoryChart>
```

### Animating

VictoryChart animates with [VictoryAnimation][] as data changes. Child components stay in sync.
Victory components have default transition behaviors for entering and exiting data nodes.
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
        y: random(2, 10)
      };
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 2000);
  }

  render() {
    return (
      <VictoryChart height={500}
        animate={{duration: 1000}}>
        <VictoryBar
          data={this.state.data}
          style={{
            data: {
              fill: "tomato", width: 12
            }
          }}
          animate={{
            onExit: {
              duration: 500,
              before: () => ({
                y: 0,
                fill: "orange",
                label: "BYE"
              })
            }
          }}
        />
      </VictoryChart>
    );
  }
}
ReactDOM.render(<App/>, mountNode);

```

### Props

[React]: https://github.com/facebook/react
[VictoryAnimation]: http://formidable.com/open-source/victory/docs/victory-animation
[VictoryAxis]: http://formidable.com/open-source/victory/docs/victory-axis
[VictoryArea]: http://formidable.com/open-source/victory/docs/victory-area
[VictoryLine]: http://formidable.com/open-source/victory/docs/victory-line
[VictoryErrorBar]: http://formidable.com/open-source/victory/docs/victory-errorbar
[VictoryScatter]: http://formidable.com/open-source/victory/docs/victory-scatter
[VictoryBar]: http://formidable.com/open-source/victory/docs/victory-bar
[VictoryCandlestick]: http://formidable.com/open-source/victory/docs/victory-candlestick
