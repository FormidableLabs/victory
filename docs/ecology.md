VictoryPie
=============

`victory-pie` draws an SVG pie or donut chart with [React](https://github.com/facebook/react). Styles and data can be customized by passing in your own values as properties to the component. Data changes are animated with [victory-animation](https://github.com/FormidableLabs/victory-animation).

## Examples

The plain component has baked-in sample data, style, and angle defaults, so even when no props are specified, an example pie chart will be rendered:

``` playground
<VictoryPie/>
```

Labels are placed at the centroid of each pie slice by default. Apply styles to the labels, or apply padding to move the labels:

``` playground
<VictoryPie style={{
    labels: {
      fontSize: 20,
      padding: 100
    }
  }}/>
```

Styles of the pie chart itself can also be specified:

``` playground
<VictoryPie
  style={{
    data: {
      stroke: "transparent",
      opacity: 0.3
    }
  }}/>
```

Set the `innerRadius` prop to create a donut chart. Label positions will automatically adjust.

``` playground
<VictoryPie innerRadius={140}/>
```

To render only a portion of a chart, specify a `startAngle` and `endAngle`:

``` playground
<VictoryPie
  endAngle={90}
  startAngle={-90}/>
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
  ]}/>
```

VictoryPie can also animate as props change:

```playground_norender
class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {data: this.getData()};
  }

  getData() {
    return [
      { x: "A", y: 0.2 + Math.random() },
      { x: "B", y: 0.2 + Math.random() },
      { x: "C", y: 0.2 + Math.random() },
      { x: "D", y: 0.2 + Math.random() },
      { x: "E", y: 0.2 + Math.random() }
    ];
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({data: this.getData()});
    }, 3000);
  }

  render() {
    return (
      <VictoryPie
        data={this.state.data}
        animate={{velocity: 0.02}}/>
    );
  }
}
ReactDOM.render(<App/>, mountNode);
```
