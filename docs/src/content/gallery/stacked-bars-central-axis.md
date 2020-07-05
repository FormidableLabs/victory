---
id: 11
title: Stacked Bars with Central Axis
---

```playground_norender
const dataA = [
  { x: "Personal Drones", y: 57 },
  { x: "Smart Thermostat", y: 40 },
  { x: "Television", y: 38 },
  { x: "Smartwatch", y: 37 },
  { x: "Fitness Monitor", y: 25 },
  { x: "Tablet", y: 19 },
  { x: "Camera", y: 15 },
  { x: "Laptop", y: 13 },
  { x: "Phone", y: 12 }
];

const dataB = dataA.map((point) => {
  const y = Math.round(point.y + 3 * (Math.random() - 0.5));
  return { ...point, y };
});

const width = 400;
const height = 400;

class App extends React.Component {

  render() {
    return (
      <VictoryChart horizontal
        height={height}
        width={width}
        padding={40}
      >
        <VictoryStack
          style={{ data: { width: 25 }, labels: { fontSize: 15 } }}
        >
          <VictoryBar
            style={{ data: { fill: "tomato" } }}
            data={dataA}
            y={(data) => (-Math.abs(data.y))}
            labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
          />
          <VictoryBar
            style={{ data: { fill: "orange" } }}
            data={dataB}
            labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
          />
        </VictoryStack>

        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 15, fill: "black" }
          }}
          /*
            Use a custom tickLabelComponent with
            an absolutely positioned x value to position
            your tick labels in the center of the chart. The correct
            y values are still provided by VictoryAxis for each tick
          */
          tickLabelComponent={
            <VictoryLabel
              x={width / 2}
              textAnchor="middle"
            />
          }
          tickValues={dataA.map((point) => point.x).reverse()}
        />
      </VictoryChart>
    );
  }
}

ReactDOM.render(<App/>, mountNode);
```
