---
title: Area - Steam Graph
---

```jsx live noInline
// This custom path component is supplied to `Area` as the `pathComponent` prop
function GradientPath(props) {
  const toGrayscale = color => {
    const integerColor = parseInt(color.replace("#", ""), 16);
    const r = (integerColor >> 16) & 255; // eslint-disable-line no-bitwise
    const g = (integerColor >> 8) & 255; // eslint-disable-line no-bitwise
    const b = integerColor & 255; // eslint-disable-line no-bitwise
    const gray = parseInt(0.299 * r + 0.587 * g + 0.114 * b, 10);
    return `rgb(${gray}, ${gray}, ${gray})`;
  };

  const { percent, style = {}, ...rest } = props;

  const gradientId = `gradient-${Math.random()}`;
  const isBrowser =
    typeof window !== "undefined" && window.__STATIC_GENERATOR !== true;
  const loc = isBrowser ? window.location.href : "";
  const areaStyle = Object.assign({}, style, {
    fill: `url(${loc}#${gradientId})`,
    stroke: "none"
  });

  return (
    <g key="area">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset="0%" stopColor={style.fill} />
          <stop offset={`${percent}%`} stopColor={style.fill} />
          <stop offset={`${percent}%`} stopColor={toGrayscale(style.fill)} />
          <stop offset="100%" stopColor={toGrayscale(style.fill)} />
        </linearGradient>
      </defs>
      <path key="area" {...rest} style={areaStyle} />
    </g>
  );
}

function App() {
  const [state, setState] = React.useState({ percent: 62 });

  const streamData = getStreamData();

  const colors = [
    "#006064",
    "#00796B",
    "#8BC34A",
    "#DCE775",
    "#FFF59D",
    "#F4511E",
    "#c33409"
  ];

  return (
    <VictoryChart
      domain={{
        x: [0, 25],
        y: [-300, 300]
      }}
    >
      <VictoryAxis
        style={{
          axis: { stroke: "none" },
          tickLabels: { fill: "none" },
          grid: { stroke: "gray" }
        }}
        tickValues={[2, 4, 6, 8, 10, 12, 14, 17, 19, 21, 23, 25]}
      />
      <VictoryAxis
        dependentAxis
        style={{ tickLabels: { fontSize: 15 } }}
        crossAxis={false}
      />

      {streamData.map((d, i) => (
        <VictoryArea
          key={i}
          interpolation="monotoneX"
          data={d}
          style={{ data: { fill: colors[i] } }}
          dataComponent={
            <Area
              pathComponent={<GradientPath percent={state.percent} />}
            />
          }
        />
      ))}
      <VictoryLine
        style={{
          data: {
            stroke: "#c33409",
            strokeWidth: 3
          }
        }}
        data={[
          {
            x: (25 * state.percent) / 100,
            y: -300
          },
          {
            x: (25 * state.percent) / 100,
            y: 300
          }
        ]}
      />
    </VictoryChart>
  );
}

function getStreamData() {
  return _.range(7).map(i =>
    _.range(26).map(j => ({
      x: j,
      y: (10 - i) * _.random(10 - i, 20 - 2 * i),
      _y0: -1 * (10 - i) * _.random(10 - i, 20 - 2 * i)
    }))
  );
}

render(<App/>);
```
