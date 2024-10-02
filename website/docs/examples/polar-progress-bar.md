---
title: Polar - Animated Progress Bar
---

```jsx live noInline
function App() {
  const [state, setState] = React.useState({
    percent: 25, data: getData(0)
  });

  React.useState(() => {
    const setStateInterval = window.setInterval(() => {
      let percent = 25;
      percent += (Math.random() * 25);
      percent = (percent > 100) ? 0 : percent;
      setState({
        percent, data: getData(percent)
      });
    }, 2000);

    return () => {
      window.clearInterval(setStateInterval);
    }
  }, []);

  return (
    <div>
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400} height={400}
          data={state.data}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: { fill: ({ datum }) => {
              const color = datum.y > 30 ? "green" : "red";
              return datum.x === 1 ? color : "transparent";
            }
            }
          }}
        />
        <VictoryAnimation duration={1000} data={state}>
          {(newProps) => {
            return (
              <VictoryLabel
                textAnchor="middle" verticalAnchor="middle"
                x={200} y={200}
                text={`${Math.round(newProps.percent)}%`}
                style={{ fontSize: 45 }}
              />
            );
          }}
        </VictoryAnimation>
      </svg>
    </div>
  );
}

function getData(percent) {
  return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
}

render(<App/>);
```
