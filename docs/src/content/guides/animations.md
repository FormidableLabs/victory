---
id: 1
title: Animations
category: guides
scope:
  - range
  - random
---
# Animations

VictoryAnimation is able to animate changes in props using [d3-interpolate][]. Victory components define their animations via the `animate` prop. `duration`, `delay`, `easing` and `onEnd` functions may all be specified via the `animate` prop.

```playground_norender
function App() {
  const [state, setState] = React.useState({
    scatterData: getScatterData()
  });

  React.useState(() => {
    const setStateInterval = window.setInterval(() => {
      setState({
        scatterData: getScatterData()
      });
    }, 3000);

    return () => {
      window.clearInterval(setStateInterval);
    }
  }, []);

  return (
    <VictoryChart animate={{ duration: 2000, easing: "bounce" }}>
      <VictoryScatter
        data={state.scatterData}
        style={{
          data: {
            fill: ({ datum }) => datum.fill,
            opacity: ({ datum }) => datum.opacity
          }
        }}
      />
    </VictoryChart>
  );
}

function getScatterData() {
  const colors =[
    "violet", "cornflowerblue", "gold", "orange",
    "turquoise", "tomato", "greenyellow"
  ];
  const symbols = [
    "circle", "star", "square", "triangleUp",
    "triangleDown", "diamond", "plus"
  ];
  return range(25).map((index) => {
    const scaledIndex = Math.floor(index % 7);
    return {
      x: random(10, 50),
      y: random(2, 100),
      size: random(8) + 3,
      symbol: symbols[scaledIndex],
      fill: colors[random(0, 6)],
      opacity: 0.6
    };
  });
}

render(<App/>);
```


## Transitions

Victory components define default transitions for entering and exiting nodes, but these may be overridden with the `onEnter` and `onExit` properties of the `animate` object. The `before` and `after` properties take functions whose return values alter the datum of the transitioning node before or after the transition. These functions are called with the original datum of the transitioning node, the index of that datum, and the entire data array.

*note:* Use private variables `_x`, `_y`, `_y0` and `_y1` when altering position data during transitions.

```playground_norender
function App() {
  const [state, setState] = React.useState({
    data: getData()
  });

  React.useState(() => {
    const setStateInterval = window.setInterval(() => {
      setState({
        data: getData()
      });
    }, 3000);

    return () => {
      window.clearInterval(setStateInterval);
    }
  }, []);

  return (
    <VictoryChart
      domainPadding={{ x: 20 }}
      animate={{duration: 500}}
    >
      <VictoryBar
        data={state.data}
        style={{
          data: { fill: "tomato", width: 12 }
        }}
        animate={{
          onExit: {
            duration: 500,
            before: () => ({
              _y: 0,
              fill: "orange",
              label: "BYE"
            })
          }
        }}
      />
    </VictoryChart>
  );
}

function getData() {
  const bars = random(6, 10);
  return range(bars).map((bar) => {
    return {x: bar + 1, y: random(2, 10)};
  });
}

render(<App/>);
```


[d3-interpolate]: https://github.com/d3/d3-interpolate
