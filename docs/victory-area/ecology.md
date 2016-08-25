VictoryArea
=============

Draw area charts with [React](https://github.com/facebook/react). VictoryArea is a composable component, so it doesn't include axes. Add VictoryArea as a child of VictoryChart for a complete chart.
## Features

### Props are Optional

VictoryArea is written to be highly configurable, but it also includes a set of sensible defaults and fallbacks. If no props are provided, VictoryArea will plot the identity function.

``` playground
<VictoryArea/>
```

To display your own data, just pass in an array of data objects, or an array of arrays via the data prop.

```playground
<VictoryArea
  data={[
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 3, y: 3},
    {x: 4, y: 1},
    {x: 5, y: 3},
    {x: 6, y: 4},
    {x: 7, y: 2}
  ]}
/>
```

VictoryArea comes with data accessor props to make passing in data much more flexible.
assign a property to x or y, or process data on the fly.

```playground
<VictoryArea
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

Wrap several VictoryArea components in the VictoryGroup wrapper to create a set of overlapping areas. The areas are automatically colored separately for each data series.

```playground
<VictoryGroup
  height={500}
  colorScale={"warm"}
  style={{data: {opacity: 0.3}}}
>
  <VictoryArea
    data={[
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3}
    ]}
  />
  <VictoryArea
    data={[
      {x: 1, y: 2},
      {x: 2, y: 1},
      {x: 3, y: 1}
    ]}
  />
  <VictoryArea
    data={[
      {x: 1, y: 3},
      {x: 2, y: 4},
      {x: 3, y: 2}
    ]}
  />
</VictoryGroup>
```

Wrap several VictoryArea components in the VictoryGroup wrapper to create a stacked layout. The y domain is automatically set to account for the cumulative maximum of the data:

```playground
<VictoryStack 
  colorScale={"warm"}
  height={500}
>
  <VictoryArea
    data={[
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3}
    ]}
  />
  <VictoryArea
    data={[
      {x: 1, y: 2},
      {x: 2, y: 1},
      {x: 3, y: 1}
    ]}
  />
  <VictoryArea
    data={[
      {x: 1, y: 3},
      {x: 2, y: 4},
      {x: 3, y: 2}
    ]}
  />
</VictoryStack>
```

### Flexible and Configurable

The sensible defaults VictoryArea provides makes it easy to get started, but everything can be overridden, and configured to suit your needs:

```playground
<VictoryStack
  height={500}
  style={{ data: {
    strokeDasharray: "5,5",
    strokeWidth: 2,
    fillOpacity: 0.4
  }}}
>
  <VictoryArea
    style={{ data: {
      fill: "tomato", stroke: "tomato"
    }}}
    data={[
      {x: 1, y: 1},
      {x: 2, y: 2},
      {x: 3, y: 3}
    ]}
  />
  <VictoryArea
    style={{ data: {
      fill: "orange", stroke: "orange"
    }}}
    data={[
      {x: 1, y: 2},
      {x: 2, y: 1},
      {x: 3, y: 1}
    ]}
  />
  <VictoryArea
    style={{ data: {
      fill: "gold", stroke: "gold"
    }}}
    data={[
      {x: 1, y: 3},
      {x: 2, y: 4},
      {x: 3, y: 2}
    ]}
  />
</VictoryStack>
```

### Data Markers

To create markers and labels for individual data points along an area, just compose VictoryArea with VictoryScatter. Use VictoryGroup for convenience.

```playground
<VictoryGroup
  style={{
    data: {fill: "teal"}
  }}
  data={[
    {x: 1, y: 3},
    {x: 2, y: 2},      
    {x: 3, y: 4},
    {x: 4, y: 3},
    {x: 5, y: 5}
  ]}
>
  <VictoryArea
    style={{
      data: {opacity: 0.3}
    }}
  />
  <VictoryScatter
    style={{
      labels: {
        fill: "teal",
        fontSize: 14,
        padding: 12
      }
    }}
    size={4}
    labels={[
     "a", "b", "c", "d", "e"
    ]}
  />
</VictoryGroup>
```

### Events

Use the `events` prop to attach events to specific elements in VictoryArea. The `events` prop takes an array of event objects, each of which is composed of a `target`, an `eventKey`, and `eventHandlers`. `target` may be any valid style namespace for a given component, so `parent`, `data` and `labels` are all valid targets for VictoryArea events.


Since VictoryArea only renders a single element, the `eventKey` property is not used. The `eventHandlers` object should be given as an object whose keys are standard event names (i.e. `onClick`) and whose values are event callbacks. The return value of an event handler is used to modify elements. The return value should be given as an object or an array of objects with optional `eventKey` and `target` keys, and a `mutation` key whose value is a function. The `eventKey` and `target` keys will default to values corresponding to the element the event handler was attached to. The `mutation` function will be called with the calculated props for the individual selected element (_i.e._ a single label), and the object returned from the mutation function will override the props of the selected element via object assignment. VictoryArea may also be used with the `VictorySharedEvents` wrapper.

```playground
<VictoryArea
  height={400}
  style={{
    data: {fill: "gold"}
  }}
  data={[
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 3, y: 1},
    {x: 4, y: 3},
    {x: 5, y: 2},
    {x: 6, y: 5}
  ]}
  events={[{
    target: "data",
    eventHandlers: {
      onClick: () => {
        return [{
          mutation: (props) => {
            return  props.style.fill === "orange" ?
              {} :
              {style: merge({}, props.style, {fill: "orange"})};
          }
        }];
      }
    }
  }]}
/>
```


### Animating

VictoryArea animates with the animation module provided in [VictoryCore](http://github.com/formidablelabs/victory-core) as data changes when an `animate` prop is provided.

```playground_norender
class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      data: this.getData(),
    };
  }

  getData() {
    return [1, 2, 3, 4, 5].map((index) => {
      return [
        {x: "a", y: Math.random()},
        {x: "b", y: Math.random()},
        {x: "c", y: Math.random()},
        {x: "d", y: Math.random()},
        {x: "e", y: Math.random()}
      ];
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
     <VictoryStack height={600}
      animate={{duration: 2000}}
      colorScale={[
        "black", "cornflowerblue",
        "tomato", "orange", "gold"
      ]}
    >
      {this.state.data.map((data, i) => {
        return (
          <VictoryArea key={i}
            data={data}
          />
        );
      })}
    </VictoryStack>

    );
  }
}
ReactDOM.render(<App/>, mountNode);

```
