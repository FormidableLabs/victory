/*eslint-disable no-magic-numbers */

import React from "react";
import {
  VictoryChart, VictoryAxis, VictoryLine, VictoryScatter
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

          <VictoryChart style={chartStyle}>
            <VictoryScatter
              data={[{ x: 1, y: -3 }, { x: 2, y: -2 }, { x: 3, y: -1 }]}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle} domain={[0, 100]}>
            <VictoryLine y={(d) => 0.5 * d.x + 0.5} style={{ data: { stroke: "red" } }}/>
            <VictoryAxis
              tickValues={range(100)}
              tickCount={10}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle} domain={[0, 100]}>
            <VictoryLine y={(d) => 0.5 * d.x + 0.5} style={{ data: { stroke: "red" } }}/>
            <VictoryAxis
              tickCount={10}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
