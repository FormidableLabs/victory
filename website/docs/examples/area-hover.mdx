---
title: Area - Advanced Hover
---

```jsx live noInline
function CustomArea(props) {
  if (!props.active) {
    return <Area {...props} />;
  } else {
    const { data, activeX, scale, style } = props;
    const index = data.findIndex(val => val._x.getTime() === activeX.getTime());
    const previousPoint = index === 0 ? activeX : data[index - 1]._x;
    const nextPoint = index === data.length - 1 ? activeX : data[index + 1]._x;
    // create a copy of the x dimension scale, and set the range to [0, 100] to easily calculate a percentage for the gradient offsets
    const percentScale = scale.x.copy().range([0, 100]);
    // calculate the percentages for current, previous, and next points
    const currentPercent = percentScale(activeX);
    const previousPercent = percentScale(previousPoint);
    const nextPercent = percentScale(nextPoint);
    const minPercent = currentPercent - (currentPercent - previousPercent) / 2;
    const maxPercent = currentPercent + (nextPercent - currentPercent) / 2;

    const gradientId = Math.random();
    const isBrowser =
      typeof window !== "undefined" && window.__STATIC_GENERATOR !== true;
    const loc = isBrowser ? window.location.href : "";
    const newStyle = Object.assign({}, style, {
      fill: `url(${loc}#${gradientId})`,
      stroke: "none"
    });

    return (
      <g>
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="0%" stopColor={style.fill} />
            <stop offset={`${minPercent}%`} stopColor={style.fill} />
            <stop offset={`${minPercent}%`} stopColor={"tomato"} />
            <stop offset={`${maxPercent}%`} stopColor={"tomato"} />
            <stop offset={`${maxPercent}%`} stopColor={style.fill} />
            <stop offset="100%" stopColor={style.fill} />
          </linearGradient>
        </defs>
        <Area {...props} style={newStyle} />
      </g>
    );
  }
}

function App() {
  const [state, setState] = React.useState({
    activeX: null
  });

  function onActivated(points, props) {
    setState({ activeX: points[0]._x });
  }

  return (
    <VictoryChart
      scale={{ x: "time" }}
      containerComponent={
        <VictoryVoronoiContainer onActivated={onActivated} />
      }
      theme={VictoryTheme.clean}
    >
      <VictoryStack colorScale="blue">
        <VictoryArea
          data={[
            { x: new Date(1986, 1, 1), y: 2 },
            { x: new Date(1996, 1, 1), y: 3 },
            { x: new Date(2006, 1, 1), y: 5 },
            { x: new Date(2016, 1, 1), y: 4 }
          ]}
          dataComponent={<CustomArea activeX={state.activeX} />}
        />

        <VictoryArea
          data={[
            { x: new Date(1986, 1, 1), y: 4 },
            { x: new Date(1996, 1, 1), y: 3 },
            { x: new Date(2006, 1, 1), y: 2 },
            { x: new Date(2016, 1, 1), y: 5 }
          ]}
          dataComponent={<CustomArea activeX={state.activeX} />}
        />
        <VictoryArea
          data={[
            { x: new Date(1986, 1, 1), y: 3 },
            { x: new Date(1996, 1, 1), y: 1 },
            { x: new Date(2006, 1, 1), y: 4 },
            { x: new Date(2016, 1, 1), y: 2 }
          ]}
          dataComponent={<CustomArea activeX={state.activeX} />}
        />
      </VictoryStack>
    </VictoryChart>
  );
}

render(<App/>);
```
