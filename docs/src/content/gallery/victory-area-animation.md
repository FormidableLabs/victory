---
id: 14
title: Victory Area Animation
---

```playground_norender
function App() {
  const [state, setState] = React.useState({ data: getData() });

  React.useState(() => {
    const setStateInterval = window.setInterval(() => {
      setState({ data: getData() });
    }, 4000);

    return () => {
      window.clearInterval(setStateInterval);
    }
  }, []);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      animate={{ duration: 1000 }}
    >
      <VictoryStack
        colorScale={"blue"}
      >
        {state.data.map((data, i) => {
          return (
            <VictoryArea
              key={i}
              data={data}
              interpolation={"basis"}
            />
          );
        })}
      </VictoryStack>
    </VictoryChart>
  );
}


function getData() {
  return _.range(7).map(() => {
    return [
      { x: 1, y: _.random(1, 5) },
      { x: 2, y: _.random(1, 10) },
      { x: 3, y: _.random(2, 10) },
      { x: 4, y: _.random(2, 10) },
      { x: 5, y: _.random(2, 15) }
    ];
  });
}

render(<App/>);
```
