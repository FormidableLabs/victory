---
id: 9
title: Polar Cardioid
---

```playground_norender
const colors = [ "#428517", "#77D200", "#D6D305", "#EC8E19", "#C92B05"];

class App extends React.Component {
  render() {
    return (
      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [0, 10] }}
      >
        <VictoryPolarAxis dependentAxis
          style={{ axis: { stroke: "none" } }}
          tickFormat={() => ""}
        />
        <VictoryPolarAxis
          tickValues={[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]}
          tickFormat={["2π", "π/2", "π", "3π/2"]}
          labelPlacement="vertical"
        />
        { [5, 4, 3, 2, 1].map((val, i) => {
          return (
            <VictoryLine
              key={i}
              samples={100}
              style={{ data: { stroke: colors[i] } }}
              y={(d) => val * (1 - Math.cos(d.x))}
            />
          );
        })}
      </VictoryChart>
    );
  }
}

ReactDOM.render(<App/>, mountNode);
```
