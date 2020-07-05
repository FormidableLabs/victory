---
id: 16
title: VictoryLine with Null Data
---

```playground_norender
class App extends React.Component {

  render() {
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 2 },
            { x: 5, y: null },
            { x: 6, y: null },
            { x: 7, y: 6 },
            { x: 8, y: 7 },
            { x: 9, y: 8 },
            { x: 10, y: 12 }
          ]}
        />
      </VictoryChart>
    );
  }
 }

ReactDOM.render(<App/>, mountNode);
```
