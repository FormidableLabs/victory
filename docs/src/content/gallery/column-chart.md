---
id: 3
title: 100% Column Chart
---

```playground_norender
const myDataset = [
  [
      { x: "a", y: 1 },
      { x: "b", y: 2 },
      { x: "c", y: 3 },
      { x: "d", y: 2 },
      { x: "e", y: 1 }
  ],
  [
      { x: "a", y: 2 },
      { x: "b", y: 3 },
      { x: "c", y: 4 },
      { x: "d", y: 5 },
      { x: "e", y: 5 }
  ],
  [
      { x: "a", y: 1 },
      { x: "b", y: 2 },
      { x: "c", y: 3 },
      { x: "d", y: 4 },
      { x: "e", y: 4 }
  ]
];

function App() {
  // This is an example of a function you might
  // use to transform your data to make 100% data

  function transformData(dataset) {
    const totals = dataset[0].map((data, i) => {
      return dataset.reduce((memo, curr) => {
        return memo + curr[i].y;
      }, 0);
    });
    return dataset.map((data) => {
      return data.map((datum, i) => {
        return { x: datum.x, y: (datum.y / totals[i]) * 100 };
      });
    });
  }

  const dataset = transformData(myDataset);
  return (
    <div>
      <VictoryChart domainPadding={{ x: 30, y: 20 }}>
        <VictoryStack
          colorScale={["black", "blue", "tomato"]}
        >
          {dataset.map((data, i) => {
            return <VictoryBar data={data} key={i}/>;
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis
          tickFormat={(tick) => `${tick}%`}
        />
        <VictoryAxis
          tickFormat={["a", "b", "c", "d", "e"]}
        />
      </VictoryChart>
    </div>
  );
}

render(<App/>);
```
