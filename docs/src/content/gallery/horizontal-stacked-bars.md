---
id: 51
title: Horizontal Stacked Bars
description: Horizontal Stacked Bars with Custom Tooltips
---

```playground_norender
const axisTickValues = [30, 100];
const data = [[{ x: 0, y: 29 }], [{ x: 0, y: 70 }], [{ x: 0, y: 30 }]];
const styles = [
  { data: { fill: "#f3d437", stroke: "#d1b322", strokeWidth: 1 } },
  { data: { fill: "#0ca340", stroke: "#0ca340", strokeWidth: 1 } },
  { data: { fill: "#f3d437", stroke: "#d1b322", strokeWidth: 1 } },
];

const labelFn = ({ datum }) =>
  datum.y < axisTickValues[0] ? `${datum.y} Low` : `${datum.y} Normal`;

class App extends React.Component {
  render() {
    return (
      <div>
        <VictoryChart>
          <VictoryAxis
            dependentAxis
            tickValues={axisTickValues}
            style={{
              tickLabels: { fontSize: 10, padding: 10 },
            }}
          />
          <VictoryStack style={{ data: { width: 10 } }} horizontal>
            {data.map((d, i) => (
              <VictoryBar
                style={styles[i]}
                data={d}
                labels={i === 0 ? labelFn : undefined}
                labelComponent={
                  <VictoryTooltip
                    active
                    dy={-10}
                    horizontal={false}
                    flyoutStyle={{
                      fill: "#fbf2ca",
                      stroke: "#ae9308",
                      strokeWidth: 0.5,
                    }}
                  />
                }
              />
            ))}
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

ReactDOM.render(<App/>, mountNode);
```
