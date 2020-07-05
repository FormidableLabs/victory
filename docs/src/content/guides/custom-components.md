---
id: 4
title: Custom Components
category: guides
scope:
  - range
  - random
---
# Custom Components

Every element that a Victory component renders may be altered or completely replaced. Most components expose `dataComponent`, `labelComponent`, `groupComponent`, and `containerComponent` props. The primitive components that Victory components render by default are simple, stateless components with a consistent set of props whenever possible. These [primitive components][] are exported for users to alter, wrap, extend and reference when creating custom components.

## Altering default components

Victory components set props on their primitive components, but these may be overridden or augmented by setting props directly on the primitive component instances.

```playground
  <VictoryBar
    data={[
      {x: 1, y: 3, label: "Alpha"},
      {x: 2, y: 4, label: "Bravo"},
      {x: 3, y: 6, label: "Charlie"},
      {x: 4, y: 3, label: "Delta"},
      {x: 5, y: 7, label: "Echo"},
    ]}
    labelComponent={
      <VictoryLabel angle={90} verticalAnchor="middle" textAnchor="end"/>
    }
  />
```

## Wrapping components

Victory components may be wrapped to customize or change behavior. Wrapper components should apply any props they receive from other Victory components to the components they render.

```playground_norender
class WrapperComponent extends React.Component {
  renderChildren() {
    const children = React.Children.toArray(this.props.children);
    return children.map((child) => {
      // children should be rendered with props from their parent Victory components assigned
      // Components like `VictoryChart` expect to control props like `domain` for their children
      // Some props should be merged rather than overridden
      const style = _.merge(child.props.style, this.props.style);
      return React.cloneElement(child, Object.assign({}, child.props, this.props, { style }));
    });
  }

  render() {
    return (
      <g transform="translate(20, 40)">
        <VictoryLabel text={"add labels"} x={110} y={30}/>
        <VictoryLabel text={"offset data from axes"} x={70} y={150}/>
        <VictoryLabel text={"alter props"} x={280} y={150}/>
        { this.renderChildren() }
      </g>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <VictoryChart>
        <WrapperComponent>
          <VictoryScatter
            y={(d) => Math.sin(2 * Math.PI * d.x)}
            samples={15}
            symbol="square"
            size={6}
            style={{ data: { stroke: "tomato", strokeWidth: 3 }}}
          />
        </WrapperComponent>
      </VictoryChart>
    );
  }
}
ReactDOM.render(<App/>, mountNode);
```


## Creating new components

Any component that renders valid svg elements (or elements wrapped in `<foreignObject>`) may be used as a `dataComponent` or `labelComponent` in Victory components. Custom components will be provided with the same props as default components. In the following example, a custom `CatPoint` component is used in place of `Point` in `VictoryScatter`.


```playground_norender
class CatPoint extends React.Component {
  render() {
    const {x, y, datum} = this.props;
    const cat = datum._y >= 0 ? "😻" : "😹";
    return (
      <text x={x} y={y} fontSize={30}>
        {cat}
      </text>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <VictoryChart>
        <VictoryScatter
          y={(d) =>
            Math.sin(2 * Math.PI * d.x)
          }
          samples={25}
          dataComponent={<CatPoint/>}
        />
      </VictoryChart>
    );
  }
}
ReactDOM.render(<App/>, mountNode);
```

More complex components may be supplied as direct children of `VictoryChart`. These components will have access to shared chart props such as `scale`. In the example below, the custom `Polygon` components draws a polygon based on a collection of points. The scale provided by `VictoryChart` is used to correctly position the points within the chart.

```playground_norender
const SAMPLE_DATA = [
	{x: 2, y: 1},
	{x: 3, y: 5},
	{x: 6, y: 3}
];

class Polygon extends React.Component {
  getPoints(data, scale) {
    return data.reduce((pointStr, {x, y}) =>
			`${pointStr} ${scale.x(x)},${scale.y(y)}`
		, '');
  }

  render() {
    // data and style are explicitly supplied to the Polygon component
    // scale is provided by VictoryChart
    const { data, style, scale } = this.props;
    const points = this.getPoints(data, scale);
    return <polygon points={points} style={style}/>;
  }
}

class App extends React.Component {
  render() {
    return <VictoryChart
      height={400}
      width={400}
      domain={[-10, 10]}
    >
      <Polygon
        data={SAMPLE_DATA}
        style={{ fill: "tomato", opacity: 0.5 }}
      />
      <VictoryScatter
        data={SAMPLE_DATA}
      />
    </VictoryChart>;
  }
}

ReactDOM.render(<App/>, mountNode)
```

Other Victory components may even be used in creating custom components, as in the example below.


```playground_norender
class CustomPie extends React.Component {
  render() {
    const {datum, x, y} = this.props;
    const pieWidth = 120;

    return (
      <g transform={
        `translate(${x - pieWidth / 2}, ${y - pieWidth / 2})`
        }
      >
        <VictoryPie
          standalone={false}
          height={pieWidth}
          width={pieWidth}
          data={datum.pie}
          style={{labels: {fontSize: 0}}}
          colorScale={["#f77", "#55e", "#8af"]}
        />
      </g>
    );
  }
}

class CustomDataComponent extends React.Component {
  render() {
    const data = [
      {x: "Jan", y: 30},
      {x: "Feb", y: 32},
      {x: "Mar", y: 65},
      {x: "Apr", y: 38},
      {x: "May", y: 50},
      {x: "Jun", y: 47},
      {x: "Jul", y: 38},
      {x: "Aug", y: 48},
      {x: "Sep", y: 80},
      {x: "Oct", y: 73},
      {x: "Nov", y: 76},
      {x: "Dec", y: 100}
    ];

    const pieData = data.map((datum) => {
      datum.pie = [
        {x: "Lions", y: Math.round(Math.random() * 10)},
        {x: "Tigers", y: Math.round(Math.random() * 10)},
        {x: "Bears", y: Math.round(Math.random() * 10)}
      ];
      return datum;
    });

    return (
      <VictoryChart domain={{y: [0, 100]}}>
        <VictoryAxis/>
        <VictoryGroup data={pieData}>
          <VictoryLine/>
          <VictoryScatter
            dataComponent={<CustomPie />}
          />
        </VictoryGroup>
      </VictoryChart>
    );
  }
}

ReactDOM.render(<CustomDataComponent/>, mountNode)
```

[primitive components]: /docs/victory-primitives
