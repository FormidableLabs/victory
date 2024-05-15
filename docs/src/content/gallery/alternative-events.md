---
id: 0
title: Alternative Events
---

```playground_norender
function App() {
  const [state, setState] = React.useState({
    clicked: false,
    style: {
      data: { fill: "tomato" }
    }
  });

  const handleMouseOver = () => {
    const fillColor = state.clicked ? "blue" : "tomato";
    const clicked = !state.clicked;
    setState({
      clicked,
      style: {
        data: { fill: fillColor }
      }
    });
  };

  return (
    <div>
      <VictoryChart
        domainPadding={{ x: 50, y: [0, 20] }}
        scale={{ x: "time" }}
      >
        <VictoryBar
          dataComponent={
            <Bar events={{ onMouseOver: handleMouseOver }}/>
          }
          style={state.style}
          data={[
            { x: new Date(1986, 1, 1), y: 2 },
            { x: new Date(1996, 1, 1), y: 3 },
            { x: new Date(2006, 1, 1), y: 5 },
            { x: new Date(2016, 1, 1), y: 4 }
          ]}
        />
      </VictoryChart>
    </div>
  );
}

render(<App/>);
```
