VictoryPie
=============

`victory-pie` draws an SVG pie or donut chart with [React][]. Styles and data can be customized by passing in your own values as properties to the component. Data changes are animated with [VictoryAnimation][].

## Features

### Props are Optional

The plain component has baked-in sample data, style, and angle defaults, so even when no props are specified, an example pie chart will be rendered:

``` playground
<VictoryPie/>
```
To display your own data, just pass in an array of data to the data prop.

``` playground
<VictoryPie
  data={[
    {x: "Cat", y: 62},
    {x: "Dog", y: 91},
    {x: "Fish", y: 55},
    {x: "Bird", y: 55},
  ]}
/>
```

VictoryPie comes with data accessor props to make passing in data much more flexible.
assign a property to x or y, or process data on the fly.

```playground
<VictoryPie
  data={[
    {animal: "Cat", pet: 45, wild: 17},
    {animal: "Dog", pet: 85, wild: 6},
    {animal: "Fish", pet: 55, wild: 0},
    {animal: "Bird", pet: 15, wild: 40},
  ]}
  x={"animal"}
  y={(data) => data.pet + data.wild}
/>
```

### Flexible and Configurable

Labels are placed at the outer edge of the pie by default. Set a `labelRadius` to adjust the position of the labels

``` playground
<VictoryPie
  labelRadius={80}
  style={{
    labels: {
      fontSize: 20,
      fill: "white"
    }
  }}
/>
```

Styles of the pie chart itself can also be specified:

``` playground
<VictoryPie
  style={{
    data: {
      stroke: "tomato",
      strokeDasharray: "5,5",
      strokeWidth: 2
    }
  }}
/>
```

Set the `innerRadius` prop to create a donut chart.

``` playground
<VictoryPie innerRadius={140}/>
```

To render only a portion of a chart, specify a `startAngle` and `endAngle`:

``` playground
<VictoryPie
  endAngle={90}
  startAngle={-90}
/>
```

Specify a `padAngle` to add space between adjacent slices:

``` playground
<VictoryPie
  endAngle={90}
  innerRadius={140}
  padAngle={5}
  startAngle={-90}
/>
```

Here's an example of a donut chart with custom data and colors

``` playground
<VictoryPie
  style={{
    labels: {
      fill: "white",
      fontSize: 12,
      fontWeight: "bold"
    }
  }}
  data={[
    {x: "<5", y: 6279},
    {x: "5-13", y: 9182},
    {x: "14-17", y: 5511},
    {x: "18-24", y: 7164},
    {x: "25-44", y: 6716},
    {x: "45-64", y: 4263},
    {x: "≥65", y: 7502}
  ]}
  innerRadius={100}
  labelRadius={110}
  colorScale={[
    "#D85F49",
    "#F66D3B",
    "#D92E1D",
    "#D73C4C",
    "#FFAF59",
    "#E28300",
    "#F6A57F"
  ]}
/>
```

### Functional Styles

Functional styles allow elements to determine their own styles based on data

``` playground
<VictoryPie
  style={{
    data: {
      stroke: (data) => data.y > 75 ?
        "tomato" : "black",
      strokeWidth: (data) => data.y > 75 ?
        3 : 1
    }
  }}
  data={[
    {x: "Cat", y: 62},
    {x: "Dog", y: 55},
    {x: "Fish", y: 55},
    {x: "Bird", y: 91},
  ]}
/>
```

### Events

Use the `events` prop to attach events to specific elements in VictoryPie. The `events` prop takes an array of event objects, each of which is composed of a `target`, an `eventKey`, and `eventHandlers`. `target` may be any valid style namespace for a given component, so `parent`, `data` and `labels` are all valid targets for VictoryPie events.


The `eventKey` may optionally be used to select a single element by index rather than an entire set. The `eventHandlers` object should be given as an object whose keys are standard event names (i.e. `onClick`) and whose values are event callbacks. The return value of an event handler is used to modify elements. The return value should be given as an object or an array of objects with optional `eventKey` and `target` keys, and a `mutation` key whose value is a function. The `eventKey` and `target` keys will default to values corresponding to the element the event handler was attached to. The `mutation` function will be called with the calculated props for the individual selected element (_i.e._ a single bar), and the object returned from the mutation function will override the props of the selected element via object assignment. VictoryPie may also be used with the `VictorySharedEvents` wrapper.

``` playground
  <VictoryPie
    padding={75}
    data={[
      {x: "Cat", y: 62},
      {x: "Dog", y: 91},
      {x: "Fish", y: 55},
      {x: "Bird", y: 55},
    ]}
    events={[{
      target: "data",
      eventHandlers: {
        onClick: () => {
          return [
            {
              mutation: (props) => {
                return {
                  style: merge({}, props.style, {fill: "orange"})
                };
              }
            }, {
              target: "labels",
              eventKey: [1, 2, 3],
              mutation: () => {
                return {text: "KITTEN"};
              }
            }
          ];
        }
      }
    }]}
  />
```

### Animating

VictoryPie animates with [VictoryAnimation][] as data changes when an `animate` prop is provided.
VictoryPie defines a set of default transition behaviors for entering and exiting data nodes.
Provide `onExit` and `onEnter` via the animate prop to define custom enter and exit transitions.
Values returned from `before` and `after` functions will alter the data prop of entering
and exiting nodes.


```playground_norender
class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {data: this.getData()};
  }

  getData() {
    const samples =  random(6, 10);
    return range(samples).map((data) => {
      return {
        x: data,
        y: random(3, 10),
        label: `#${data}`
      };
    })
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({data: this.getData()});
    }, 2000);
  }

  render() {
    return (
      <VictoryPie
        data={this.state.data}
        animate={{
          duration: 1000,
          onEnter: {
            duration: 500,
            before: () =>
              ({y: 0, label: " "}),
            after: (datum) =>
              ({y: datum.y, label: "NEW"})
          }
        }}
      />
    );
  }
}
ReactDOM.render(<App/>, mountNode);
```

### Props

[React]: https://github.com/facebook/react
[VictoryAnimation]: http://formidable.com/open-source/victory/docs/victory-animation
