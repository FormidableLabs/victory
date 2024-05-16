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
function WrapperComponent(props) {
  function renderChildren() {
    const children = React.Children.toArray(props.children);
    return children.map((child) => {
      // children should be rendered with props from their parent Victory components assigned
      // Components like `VictoryChart` expect to control props like `domain` for their children
      // Some props should be merged rather than overridden
      const style = _.merge(child.props.style, props.style);
      return React.cloneElement(child, Object.assign({}, child.props, props, { style }));
    });
  }

  return (
    <g transform="translate(20, 40)">
      <VictoryLabel text={"add labels"} x={110} y={30}/>
      <VictoryLabel text={"offset data from axes"} x={70} y={150}/>
      <VictoryLabel text={"alter props"} x={280} y={150}/>
      { renderChildren() }
    </g>
  );
}

function App() {
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

render(<App/>);
```

## Creating new components

Any component that renders valid svg elements (or elements wrapped in `<foreignObject>`) may be used as a `dataComponent` or `labelComponent` in Victory components. Custom components will be provided with the same props as default components. In the following example, a custom `CatPoint` component is used in place of `Point` in `VictoryScatter`.

```playground_norender
function CatPoint(props) {
  const {x, y, datum} = props;
  const cat = datum._y >= 0 ? "😻" : "😹";

  return (
    <text x={x} y={y} fontSize={30}>
      {cat}
    </text>
  );
}

function App() {
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
render(<App/>);
```

More complex components may be supplied as direct children of `VictoryChart`. These components will have access to shared chart props such as `scale`. In the example below, the custom `Polygon` components draws a polygon based on a collection of points. The scale provided by `VictoryChart` is used to correctly position the points within the chart.

```playground_norender
const SAMPLE_DATA = [
	{x: 2, y: 1},
	{x: 3, y: 5},
	{x: 6, y: 3}
];

function getPoints(data, scale) {
  return data.reduce((pointStr, {x, y}) =>
    `${pointStr} ${scale.x(x)},${scale.y(y)}`
  , '');
}

function Polygon(props) {
  // data and style are explicitly supplied to the Polygon component
  // scale is provided by VictoryChart
  const { data, style, scale } = props;
  const points = getPoints(data, scale);
  return <polygon points={points} style={style}/>;
}

function App() {
  return (
    <VictoryChart domain={[-10, 10]}>
      <Polygon
        data={SAMPLE_DATA}
        style={{ fill: "tomato", opacity: 0.5 }}
      />
      <VictoryScatter
        data={SAMPLE_DATA}
      />
    </VictoryChart>
  );
}

render(<App/>);
```

Other Victory components may even be used in creating custom components, as in the example below.

```playground_norender
function CustomPie(props) {
  const {datum, x, y} = props;
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

function CustomDataComponent() {
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

render(<CustomDataComponent/>);
```

Since any custom SVG element can be used as a Victory component, any styling system can be used to style custom components, including styled components, CSS modules, or inline styles.

Here's an example using SVG + styled components.

```playground_norender
const StyledPoint = styled.circle`
  fill: ${(props) => props.color};
`;

const colors = ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"];

const ScatterPoint = ({ x, y, datum, min, max }) => {
  const i = React.useMemo(() => {
    return Math.floor(((datum.y - min) / (max - min)) * (colors.length - 1));
  }, [datum, min, max]);

  return <StyledPoint color={colors[i]} cx={x} cy={y} r={6} />;
};

const App = () => {
  const data = [
    { x: "Jan", y: 43 },
    { x: "Feb", y: 44 },
    { x: "Mar", y: 47 },
    { x: "Apr", y: 51 },
    { x: "May", y: 57 },
    { x: "Jun", y: 62 },
    { x: "Jul", y: 67 },
    { x: "Aug", y: 68 },
    { x: "Sep", y: 63 },
    { x: "Oct", y: 54 },
    { x: "Nov", y: 47 },
    { x: "Dec", y: 42 }
  ];

  const temperatures = data.map(({ y }) => y);
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);

  return (
    <VictoryChart>
      <VictoryLine data={data} />
      <VictoryScatter
        data={data}
        dataComponent={<ScatterPoint min={min} max={max} />}
      />
    </VictoryChart>
  );
}

render(<App/>);

```

[primitive components]: /docs/victory-primitives
