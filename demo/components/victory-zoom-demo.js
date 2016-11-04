/*global window:false */
import React from "react";
import { random, range } from "lodash";
import {
  VictoryChart, VictoryBar, VictoryAxis
} from "../../src/index";
import { VictoryLabel, VictoryZoom } from "victory-core/src";


const UPDATE_INTERVAL = 3000;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 1,
      max: 15,
      scatterData: this.getScatterData(),
      lineData: this.getData(),
      numericBarData: this.getNumericBarData(),
      barData: this.getBarData(),
      barTransitionData: this.getBarTransitionData(),
      multiBarTransitionData: this.getMultiBarTransitionData(),
      lineStyle: this.getStyles()
    };
  }

  getData() {
    return range(20).map((i) => {
      return {
        x: i,
        y: Math.random()
      };
    });
  }

  getNumericBarData() {
    return range(5).map(() => {
      return [
        {
          x: random(1, 3),
          y: random(1, 5)
        },
        {
          x: random(4, 7),
          y: random(1, 10)
        },
        {
          x: random(9, 11),
          y: random(1, 15)
        }
      ];
    });
  }

  getBarData() {
    return range(5).map(() => {
      return [
        {
          x: "apples",
          y: random(2, 5)
        },
        {
          x: "bananas",
          y: random(2, 10)
        },
        {
          x: "oranges",
          y: random(0, 15)
        }
      ];
    });
  }

  getBarTransitionData() {
    const bars = random(6, 10);
    return range(bars).map((bar) => {
      return {x: bar, y: random(2, 10)};
    });
  }

  getMultiBarTransitionData() {
    const bars = random(6, 10);
    return range(5).map(() => {
      return range(bars).map((bar) => {
        return {x: bar, y: random(2, 10)};
      });
    });
  }

  getScatterData() {
    const colors =
      ["violet", "cornflowerblue", "gold", "orange", "turquoise", "tomato", "greenyellow"];
    const symbols = ["circle", "star", "square", "triangleUp", "triangleDown", "diamond", "plus"];
    const elementNum = random(10, 40);
    return range(elementNum).map((index) => {
      const scaledIndex = Math.floor(index % 7);
      return {
        x: random(10, 50),
        y: random(2, 100),
        size: random(8) + 3,
        symbol: symbols[scaledIndex],
        fill: colors[random(0, 6)],
        opacity: 1
      };
    });
  }

  getStyles() {
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: [random(1, 3)]
    };
  }

  // componentDidMount() {
  //   /* eslint-disable react/no-did-mount-set-state */
  //   this.setStateInterval = window.setInterval(() => {
  //     this.setState({
  //       scatterData: this.getScatterData(),
  //       lineData: this.getData(),
  //       barData: this.getBarData(),
  //       barTransitionData: this.getBarTransitionData(),
  //       multiBarTransitionData: this.getMultiBarTransitionData(),
  //       numericBarData: this.getNumericBarData(),
  //       lineStyle: this.getStyles()
  //     });
  //   }, UPDATE_INTERVAL);
  // }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  changeDomain(prop, delta) {
    this.setState({
      [prop]: this.state[prop] + delta
    });
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };
    const chartStyle = {parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "80%"}};

    return (
      <div className="demo">
        <h1>VictoryChart</h1>
        <h2>min</h2>
        <button onClick={this.changeDomain.bind(this, "min", -1)}>-1</button>
        <button onClick={this.changeDomain.bind(this, "min", +1)}>+1</button>
        <h2>max</h2>
        <button onClick={this.changeDomain.bind(this, "max", -1)}>-1</button>
        <button onClick={this.changeDomain.bind(this, "max", +1)}>+1</button>
        <div style={containerStyle}>
            <VictoryChart style={chartStyle}
              domain={{
                x: [this.state.min, this.state.max]
              }}
              events={[
                {
                  childName: "bar",
                  target: "data",
                  eventHandlers: {
                    onClick: (evt) => {
                      evt.stopPropagation();
                      return [
                        {
                          mutation: () => {
                            return {style: {fill: "orange"}};
                          }
                        }
                      ];
                    }
                  }
                }
              ]}
            >
                <VictoryAxis label="Foo" />
                <VictoryLabel text="Parent Events" y={50} x={150}/>
                <VictoryBar
                  animate={{
                    duration: 200
                  }}
                  name="bar"
                  data={range(1, 30).map((x) => ({x, y: x / 2}))}
                />
            </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
