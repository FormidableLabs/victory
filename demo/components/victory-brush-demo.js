import React from "react";
import { range } from "lodash";
import {VictoryChart, VictoryZoom, VictoryArea} from "../../src/index";

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
              <VictoryArea
                style={{parent: parentStyle, data: {stroke: "#333", fill: "#888", opacity: 0.4}}}
                data={this.state.barData}
                interpolation="stepBefore"
              />
          </VictoryChart>
        </VictoryZoom>
      </div>
    );
  }
}
