/*global window:false */
import React from "react";
import {VictoryAxis} from "../../src/index";
import {VictoryLabel} from "victory-core";
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
    }, 20000);
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
        <svg width={1450} height={1450}>
          <VictoryAxis
            width={750}
            height={750}
            padding={200}
            label="x-axis"
            standalone={false}/>
          <VictoryAxis dependentAxis
            width={750}
            height={750}
            padding={200}
            label="y-axis"
            standalone={false}/>
        </svg>

      </div>
    );
  }
}
