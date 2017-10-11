/*eslint-disable no-magic-numbers */
/*global window:false */

import React from "react";
import {
  VictoryChart, VictoryBar, VictoryAxis, VictoryGroup, VictoryLine, VictoryScatter
} from "../../src/index";

import { range, random } from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineData: this.getData(),
      numericBarData: this.getNumericBarData(),
      barData: this.getBarData(),
      barTransitionData: this.getBarTransitionData(),
      multiBarTransitionData: this.getMultiBarTransitionData(),
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        lineData: this.getData(),
        barData: this.getBarData(),
        barTransitionData: this.getBarTransitionData(),
        multiBarTransitionData: this.getMultiBarTransitionData(),
        numericBarData: this.getNumericBarData(),
      });
    }, 4000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
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
      return { x: bar, y: random(2, 10) };
    });
  }

  getMultiBarTransitionData() {
    const bars = random(6, 10);
    return range(5).map(() => {
      return range(bars).map((bar) => {
        return { x: bar, y: random(2, 10) };
      });
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
    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };
    const axisStyle = {
      grid: { stroke: "grey", strokeWidth: 1 },
      axis: { stroke: "transparent" },
      ticks: { stroke: "transparent" },
      tickLabels: { fill: "none" }
    };
    return (
      <div className="demo">
        <h1>VictoryChart</h1>
        <div style={containerStyle}>
          <VictoryChart style={chartStyle}
            padding={{ top: 80, bottom: 10, left: 80, right: 10 }}
          >
            <VictoryAxis label={"A LABEL"} dependentAxis/>
            <VictoryAxis label={"A LABEL"}/>
            <VictoryLine y={(d) => 0.5 * d.x + 0.5} style={{ data: { stroke: "red" } }}/>
            <VictoryScatter y={(d) => d.x * d.x} style={{ data: { stroke: "red" } }}/>
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryAxis label={"A LABEL"} dependentAxis orientation="right" invertAxis/>
            <VictoryAxis label={"A LABEL"} orientation="top" invertAxis/>
            <VictoryLine y={(d) => 0.5 * d.x + 0.5} style={{ data: { stroke: "red" } }}/>
            <VictoryScatter y={(d) => d.x * d.x} style={{ data: { stroke: "red" } }}/>
          </VictoryChart>

          <VictoryChart style={chartStyle} domain={[-10, 10]}>
            <VictoryAxis dependentAxis orientation="right"/>
            <VictoryAxis orientation="top"/>
            <VictoryLine y={(d) => 0.5 * d.x + 0.5} style={{ data: { stroke: "red" } }}/>
            <VictoryScatter y={(d) => d.x * d.x} style={{ data: { stroke: "red" } }}/>
          </VictoryChart>

          <VictoryChart style={chartStyle} domain={{ x: [-10, 10], y: [-2, 10] }}>
            <VictoryAxis dependentAxis orientation="right"/>
            <VictoryAxis orientation="top"/>
            <VictoryLine y={(d) => 0.5 * d.x + 0.5} style={{ data: { stroke: "red" } }}/>
            <VictoryScatter y={(d) => d.x * d.x} style={{ data: { stroke: "red" } }}/>
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryScatter
              data={[{ x: 3, y: 3 }]}
            />
            <VictoryAxis
              tickValues={[3]}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
