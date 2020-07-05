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
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scatterData: this.getScatterData()
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        scatterData: this.getScatterData()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }


  getScatterData() {
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

  render() {
    return (
      <VictoryChart animate={{ duration: 2000, easing: "bounce" }}>
        <VictoryScatter
          data={this.state.scatterData}
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
}

ReactDOM.render(<App/>, mountNode)
```


## Transitions

Victory components define default transitions for entering and exiting nodes, but these may be overridden with the `onEnter` and `onExit` properties of the `animate` object. The `before` and `after` properties take functions whose return values alter the datum of the transitioning node before or after the transition. These functions are called with the original datum of the transitioning node, the index of that datum, and the entire data array.

**Note:** Use private variables `_x`, `_y`, `_y0` and `_y1` when altering position data during transitions.

```playground_norender
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.getData()
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    const bars = random(6, 10);
    return range(bars).map((bar) => {
      return {x: bar + 1, y: random(2, 10)};
    });
  }

  render() {
    return (
      <VictoryChart
        domainPadding={{ x: 20 }}
        animate={{duration: 500}}
      >
        <VictoryBar
          data={this.state.data}
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
}

ReactDOM.render(<App/>, mountNode)
```


[d3-interpolate]: https://github.com/d3/d3-interpolate
