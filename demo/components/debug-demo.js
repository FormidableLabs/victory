/*eslint-disable no-magic-numbers */

import React from "react";
import {
  VictoryChart, VictoryAxis, VictoryBar, VictoryBrushLine
} from "../../src/index";

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
        <h1>Debug</h1>
        <div style={containerStyle}>
          <VictoryChart style={chartStyle}>
            <VictoryAxis tickFormat={(t, i, ts) => `${t}s ${i} ${ts[0]}`}/>
            <VictoryBar
              style={{ data: { fill: "tomato" } }}
              data={[
                { x: "one", y: 1 },
                { x: "two", y: 2 },
                { x: "three", y: 7 }
              ]}
            />
         </VictoryChart>

          <VictoryChart
            style={chartStyle}
          >
            <VictoryBar
              alignment="start"
              data={[
                { x: 2, y: "Echo" },
                { x: 6, y: "Foxtrot" },
                { x: 3, y: "Golf" },
                { x: 4, y: "Hotel" }
              ]}
            />
            <VictoryAxis/>
            <VictoryAxis dependentAxis axisComponent={<VictoryBrushLine/>}/>
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryBar
              data={[{ x: "one", y: 4 }, { x: "two", y: 5 }, { x: "three", y: 6 }]}
            />
            <VictoryAxis
              tickValues={["one", "three"]}
              axisComponent={<VictoryBrushLine brushDomain={[2, 3]}/>}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
