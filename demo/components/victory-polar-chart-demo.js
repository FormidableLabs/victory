/*global window:false*/
/*eslint no-magic-numbers:0*/
import React from "react";
import {
  VictoryPolarAxis, VictoryPolarChart, VictoryScatter, VictoryLine, VictoryArea
} from "../../src/index";
import { random, range } from "lodash";

import { VictoryTheme } from "victory-core";
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
      return { a: bar + 1, b: random(2, 10) };
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

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryPolarChart
            domain={{ x: [0, 360], y: [0, 75] }}
            theme={VictoryTheme.material}
            style={chartStyle}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              axisAngle={90}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[45, 135, 225, 315]}
            />
            <VictoryScatter
              style={{ data: { fill: "tomato" } }}
              size={5}
              data={[
                { x: 0, y: 10, label: "a" },
                { x: 90, y: 25, label: "b" },
                { x: 180, y: 40, label: "c" },
                { x: 270, y: 50, label: "d" }
              ]}
            />
            <VictoryLine
              groupComponent={<g/>}
              style={{ data: { stroke: "tomato" } }}
              data={[
                { x: 0, y: 10 },
                { x: 90, y: 25 },
                { x: 180, y: 40 },
                { x: 270, y: 50 }
              ]}
            />
            <VictoryArea
              groupComponent={<g/>}
              style={{ data: { fill: "tomato", opacity: 0.6 } }}
              data={[
                { x: 0, y: 20 },
                { x: 90, y: 35 },
                { x: 180, y: 50 },
                { x: 270, y: 60 }
              ]}
            />
          </VictoryPolarChart>

          <VictoryPolarAxis
            theme={VictoryTheme.material}
            style={chartStyle}
            labelPlacement="perpendicular"
            domain={[0, 360]}
            tickValues={[0, 20, 45, 65, 90, 120, 135, 180, 225, 250, 270, 300, 315]}
          />

          <VictoryPolarAxis
            startAngle={90} endAngle={270}
            domain={[0, 180]}
            theme={VictoryTheme.material}
            style={chartStyle}
            labelPlacement="perpendicular"
            tickValues={[0, 45, 90, 135, 180]}
          />

          <VictoryPolarAxis
            startAngle={90} endAngle={270}
            theme={VictoryTheme.material}
            style={chartStyle}
            labelPlacement="perpendicular"
            tickValues={["Cat", "Dog", "Bird", "Snake"]}
          />

          <VictoryPolarAxis
            theme={VictoryTheme.material}
            style={chartStyle}
            domain={[0, 10]}
            labelPlacement="vertical"
            tickValues={[3, 5, 10, 7, 8, 2, 1]}
          />

          <VictoryPolarAxis dependentAxis
            axisAngle={200}
            theme={VictoryTheme.material}
            style={chartStyle}
            domain={[0, 10]}
            tickValues={[2, 4, 6, 8, 10]}
          />

          <svg width={350} height={350}>
            <VictoryPolarAxis
              standalone={false}
              theme={VictoryTheme.material}
              style={chartStyle}
              domain={[0, 360]}
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
