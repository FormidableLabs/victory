/*global window:false */
import React from "react";
import { VictoryAxis } from "../../src/index";
import { VictoryLabel } from "victory-core";
import { merge, random, range } from "lodash";
import { VictoryContainer, VictoryTheme } from "victory-core";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tickValues: [5, 10, 25, 31, 42],
      domain: [-5, 5]
    };
  }

  getTickValues() {
    return range(5).map((i) => {
      return 10 * i + random(5);
    });
  }

  getDomain() {
    const someNumber = random(2, 5);
    return [-someNumber, someNumber];
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        tickValues: this.getTickValues(),
        domain: this.getDomain()
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    const style = {
      parent: {margin: "2%", maxWidth: "40%"}
    };

    const styleOverrides = {
      parent: {margin: "2%", maxWidth: "40%"},
      axis: {
        stroke: "black"
      },
      axisLabel: {
        padding: 25
      },
      grid: {
        strokeWidth: 2,
        stroke: (tick) => tick === "Mariners\nSEA" ? "red" : "grey"
      },
      ticks: {
        stroke: (tick) => tick === "Mariners\nSEA" ? "red" : "grey"
      },
      tickLabels: {
        fontWeight: (tick) => tick === "Mariners\nSEA" ? "bold" : "normal"
      }
    };

    return (
      <div className="demo">
        <h1>VictoryAxis</h1>
        <div>

        <h2>Log Scale Axis</h2>
          <VictoryAxis
            style={{
              parent: style.parent,
              axisLabel: { padding: 45},
            }}
            label="cool log axis"
            padding={{top: 10, bottom: 10, left: 90, right: 90}}
            orientation="left"
            scale={"log"}
            domain={[1, 5]}
            offsetX={50}
          />
          <VictoryAxis
            style={{
              parent: style.parent,
              axisLabel: { padding: 45},
            }}
            label="cool log axis"
            padding={{top: 10, bottom: 10, right: 60}}
            orientation="right"
            scale={"log"}
            domain={[1, 5]}
          />
        </div>


      </div>
    );
  }
}
