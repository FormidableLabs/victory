/*global window:false*/
import React from "react";
import {
  VictoryChart, VictoryGroup, VictoryStack, VictoryScatter, VictoryBar, VictoryLine,
  VictoryPolarAxis
} from "../../src/index";
import { random, range } from "lodash";

import { VictoryTooltip, VictoryTheme } from "victory-core";
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      data: this.getData()
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
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
      return {a: bar + 1, b: random(2, 10)};
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

    const chartStyle = {parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}};

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryPolarAxis
            theme={VictoryTheme.material}
            style={chartStyle}
            labelRotation={90}
            tickValues={[0, 20, 45, 65, 90, 120, 135, 180, 225, 250, 270, 300, 315]}
          />

          <VictoryPolarAxis dependentAxis
            theme={VictoryTheme.material}
            style={chartStyle}
            domain={[0, 100]}
            tickValues={[20, 40, 60, 80, 100]}
          />

          <svg width={350} height={350}>
            <VictoryPolarAxis
              standalone={false}
              theme={VictoryTheme.material}
              style={chartStyle}
              tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />

            <VictoryPolarAxis dependentAxis
              standalone={false}
              axisAngle={200}
              theme={VictoryTheme.material}
              style={chartStyle}
              domain={[0, 10]}
              tickValues={[2, 4, 6, 8, 10]}
            />
          </svg>


        </div>
      </div>
    );
  }
}

export default App;
