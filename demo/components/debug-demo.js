/*eslint-disable no-magic-numbers */

import React from "react";
import {
  VictoryChart, VictoryAxis, VictoryLine, VictoryScatter, VictoryBar
} from "../../src/index";

import { range } from "lodash";

class App extends React.Component {

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
        <h1>VictoryChart</h1>
        <div style={containerStyle}>

          <VictoryChart
            style={chartStyle}
          >
            <VictoryBar horizontal
              alignment="start"
              data={[
                { x: 2, y: "Echo" },
                { x: 6, y: "Foxtrot" },
                { x: 3, y: "Golf" },
                { x: 4, y: "Hotel" }
              ]}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryBar
              data={[{ x: "one", y: 4 }, { x: "two", y: 5 }, { x: "three", y: 6 }]}
            />
            <VictoryAxis
              tickValues={["one", "three"]}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
