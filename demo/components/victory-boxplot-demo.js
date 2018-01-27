/*eslint-disable no-magic-numbers */
import React from "react";
import VictoryChart from "../../src/components/victory-chart/victory-chart";
import VictoryBoxPlot from "../../src/components/victory-boxplot/victory-boxplot";

export default class App extends React.Component {

  render() {

    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>
        <VictoryChart domain={{ x: [0, 3], y: [0, 15] }}>
          <VictoryBoxPlot
            boxWidth={50}
            labelOrientation={"right"}
            style={{
              parent: {},
              min: { stroke: "#FF530D", strokeWidth: "2" },
              max: { stroke: "#2bbee0", strokeWidth: "2" },
              q1: { fill: "#FF530D", fillOpacity: "0.5" },
              q3: { fill: "#2bbee0", fillOpacity: "0.5" },
              med: { stroke: "#fff", strokeWidth: "4" },
              minLabels: { fill: "green", padding: 50, angle: 45 },
              maxLabels: { fill: "orange", padding: 50, angle: -45 },
              q1Labels: { padding: 50 },
              q3Labels: { padding: 50 },
              medLabels: { padding: 50, dx: 20 }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}
