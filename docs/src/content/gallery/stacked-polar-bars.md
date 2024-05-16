---
id: 12
title: Stacked Polar Bars
---

```playground_norender
const directions = {
  0: "E", 45: "NE", 90: "N", 135: "NW",
  180: "W", 225: "SW", 270: "S", 315: "SE"
};
const orange = { base: "gold", highlight: "darkOrange" };
const red = { base: "tomato", highlight: "orangeRed" };
const innerRadius = 30;

function CompassCenter(props) {
  const { origin } = props;
  const circleStyle = {
    stroke: red.base, strokeWidth: 2, fill: orange.base
  };

  return (
    <g>
      <circle
        cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle}
      />
    </g>
  );
}

function CenterLabel(props) {
  const { datum, active, color } = props;
  const text = [ `${directions[datum._x]}`, `${Math.round(datum._y1)} mph` ];
  const baseStyle = { fill: color.highlight, textAnchor: "middle" };
  const style = [
    { ...baseStyle, fontSize: 18, fontWeight: "bold" },
    { ...baseStyle, fontSize: 12 }
  ];

  return active ?
    (
      <VictoryLabel
        text={text} style={style} x={175} y={175} renderInPortal
      />
    ) : null;
}

function App() {
  const [state, setState] = React.useState({ wind: getWindData() });

  React.useState(() => {
    const setStateInterval = window.setInterval(() => {
      setState({ wind: getWindData() });
    }, 4000);

    return () => {
      window.clearInterval(setStateInterval);
    }
  }, []);

  return (
    <VictoryChart
      polar
      animate={{ duration: 500, onLoad: { duration: 500 } }}
      theme={VictoryTheme.material}
      innerRadius={innerRadius}
      domainPadding={{ y: 10 }}
      events={[{
        childName: "all",
        target: "data",
        eventHandlers: {
          onMouseOver: () => {
            return [
              { target: "labels", mutation: () => ({ active: true }) },
              { target: "data", mutation: () => ({ active: true }) }
            ];
          },
          onMouseOut: () => {
            return [
              { target: "labels", mutation: () => ({ active: false }) },
              { target: "data", mutation: () => ({ active: false }) }
            ];
          }
        }
      }]}
    >
      <VictoryPolarAxis
        dependentAxis
        labelPlacement="vertical"
        style={{ axis: { stroke: "none" } }}
        tickFormat={() => ""}
      />
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickValues={_.keys(directions).map((k) => +k)}
        tickFormat={_.values(directions)}
      />
      <VictoryStack>
        <VictoryBar
          style={{ data: {
            fill: ({ active }) => active ? orange.highlight : orange.base,
            width: 40
          } }}
          data={state.wind}
          x="windBearing"
          y="windSpeed"
          labels={() => ""}
          labelComponent={<CenterLabel color={orange}/>}
        />
        <VictoryBar
          style={{ data: {
            fill: (d, a) => a ? red.highlight : red.base,
            width: 40
          } }}
          data={state.wind}
          x="windBearing"
          y={(d) => d.windGust - d.windSpeed}
          labels={() => ""}
          labelComponent={<CenterLabel color={red}/>}
        />
      </VictoryStack>
      <CompassCenter/>
    </VictoryChart>
  );
}

function getWindData() {
  return _.keys(directions).map((d) => {
    const speed = Math.floor(_.random() * 17) + 4;
    return {
      windSpeed: speed,
      windGust: speed + _.random(2, 10),
      windBearing: +d
    };
  });
}

render(<App/>);
```
