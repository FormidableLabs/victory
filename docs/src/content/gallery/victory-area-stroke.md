---
id: 15
title: VictoryArea with Stroke
---

```playground_norender
class App extends React.Component {
  render() {
    return (
      <VictoryChart width={400} height={400}>
        <VictoryGroup
          style={{
            data: { strokeWidth: 3, fillOpacity: 0.4 }
          }}
        >
          <VictoryArea
            style={{
              data: { fill: "cyan", stroke: "cyan" }
            }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 }
            ]}
          />
          <VictoryArea
            style={{
              data: { fill: "magenta", stroke: "magenta" }
            }}
            data={[
              { x: 1, y: 3 },
              { x: 2, y: 2 },
              { x: 3, y: 6 },
              { x: 4, y: 2 },
              { x: 5, y: 6 }
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
    );
  }
}

ReactDOM.render(<App/>, mountNode);
```
