/*eslint-disable no-magic-numbers */

import React from "react";
import {
  VictoryChart, VictoryAxis, VictoryBar, VictoryScatter, VictoryBrushLine
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
            <VictoryBar
              data={[{ x: "one", y: 4 }, { x: "two", y: 5 }, { x: "three", y: 6 }]}
            />
            <VictoryAxis
              axisComponent={<VictoryBrushLine brushWidth={20}/>}
            />
          </VictoryChart>
          <VictoryChart style={chartStyle} domainPadding={{ x: 50 }}>
            <VictoryBar
              data={[{ x: "one", y: 4 }, { x: "two", y: 5 }, { x: "three", y: 6 }]}
            />
            <VictoryAxis dependentAxis
              axisComponent={<VictoryBrushLine brushWidth={20} brushDomain={[2, 3]}/>}
            />
          </VictoryChart>
          <VictoryChart style={chartStyle}>
            <VictoryScatter
              data={[{ x: "one", y: 0 }, { x: "two", y: 2 }, { x: "three", y: 4 }]}
            />
            <VictoryAxis
              gridComponent={<VictoryBrushLine brushWidth={20}/>}
            />
          </VictoryChart>
          <VictoryChart style={chartStyle}>
            <VictoryScatter
              data={[{ x: "one", y: 0 }, { x: "two", y: 2 }, { x: "three", y: 4 }]}
            />
            <VictoryAxis dependentAxis crossAxis={false}
              gridComponent={<VictoryBrushLine brushWidth={20}/>}
            />
          </VictoryChart>

          <VictoryAxis style={chartStyle}
            gridComponent={<VictoryBrushLine brushWidth={20} domain={[0, 10]}/>}
          />
        </div>
      </div>
    );
  }
}

export default App;
