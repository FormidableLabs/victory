import React from "react";
import { range } from "lodash";
import {VictoryLine, VictoryChart, VictoryZoom, VictoryScatter,
        VictoryBar, VictoryAxis, VictoryArea} from "../../src/index";

export default class App extends React.Component {

  state = {
    barData: range(-50, 75).map((i) => ({x: i, y: Math.random()}))
  };

  render() {
    const parentStyle = {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"};
    return (
      <div className="demo">
        <h1>VictoryZoom</h1>

        <VictoryZoom>
          <VictoryChart>
              {/* <VictoryLine
                style={{data: {stroke: "red"}}}
                y={(d) => Math.cos(2 * Math.PI * d.x)}
                sample={1000}
              />
              <VictoryScatter
                style={{data: {fill: "gold"}}}
                y={(d) => Math.sin(2 * Math.PI * d.x)}
                sample={1000}
              /> */}
              <VictoryArea
                style={{parent: parentStyle, data: {stroke: "#333", fill: "#888", opacity: 0.4}}}
                data={this.state.barData}
                interpolation="stepBefore"
                samples={25}
              />
          </VictoryChart>
        </VictoryZoom>
      </div>
    );
  }
}
