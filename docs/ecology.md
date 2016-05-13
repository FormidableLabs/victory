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

Labels are placed at the centroid of each pie slice by default. Apply styles to the labels, or apply padding to move the labels:

``` playground
<VictoryPie
  style={{
    labels: {
      fontSize: 20,
      padding: 100
    }
  }}
/>
```

Styles of the pie chart itself can also be specified:

``` playground
<VictoryPie
  style={{
    data: {
      stroke: "transparent",
      opacity: 0.3
    }
  }}
/>
```

Set the `innerRadius` prop to create a donut chart. Label positions will automatically adjust.

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
  innerRadius={110}
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
        "black" : "transparent",
      opacity: (data) => data.y > 75 ?
        1 : 0.4
    }
  }}
  data={[
    {x: "Cat", y: 62},
    {x: "Dog", y: 91},
    {x: "Fish", y: 55},
    {x: "Bird", y: 55},
  ]}
/>
```

### Events

Use the `events` prop to attach arbitrary event handlers to data, labels, or the containing svg.
Event handlers on data and labels components are called with the event object, the props
corresponding to that component, and the index of that component. Values returned from
event handlers on data or labels will be stored as state on VictoryPie. Data and labels
state can be accessed by index on the `dataState`, and `labelsState` state objects respectively.

``` playground
  <VictoryPie
    data={[
      {x: "Cat", y: 62},
      {x: "Dog", y: 91},
      {x: "Fish", y: 55},
      {x: "Bird", y: 55},
    ]}
    events={{
      data: {
        onClick: (evt, props) => {
          const fill = props.style.fill;
          return fill === "pink" ?
            { data: null, labels: null } :
            {
              data: {style: {fill: "pink"}},
              labels: {style: {fontSize: 20}}
            };
        }
      }
    }}
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
[VictoryAnimation]: http://victory.formidable.com/docs/victory-animation
