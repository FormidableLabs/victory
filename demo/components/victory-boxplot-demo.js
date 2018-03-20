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
        <VictoryChart /* domain={{ x: [0, 3], y: [0, 12] }} */>
          <VictoryBoxPlot
            data={[{ x: 1, y: 10 }, { x: 1, y: 7 }, { x: 1, y: 3 }, { x: 1, y: 5 }]}
          />
        </VictoryChart>
        <VictoryChart domain={{ x: [0, 3], y: [0, 20] }}>
          <VictoryBoxPlot
            boxWidth={20}
            data={[{ x: 1, y: [5, 10, 9, 2] }, { x: 2, y: [1, 15, 6, 8] }]}
            style={{
              min: { stroke: "black", strokeWidth: 2 },
              max: { stroke: "black", strokeWidth: 2 },
              q1: { fill: "#FF530D", fillOpacity: "0.5" },
              q3: { fill: "#2bbee0", fillOpacity: "0.5" },
              median: { stroke: "#fff", strokeWidth: "4" },
              minLabels: { fill: "green", padding: 10 },
              maxLabels: { fill: "orange", padding: 10 },
              q1Labels: { padding: 10 },
              q3Labels: { padding: 10 },
              medianLabels: { padding: 10 }
            }}
          />
        </VictoryChart>

        <VictoryChart domain={{ x: [0, 20], y: [0, 3] }}>
          <VictoryBoxPlot
            data={[{ y: 1, x: [5, 10, 9, 2] }, { y: 2, x: [1, 15, 6, 8] }]}
            boxWidth={20}
            horizontal
            labelOrientation={"top"}
            style={{
              parent: {},
              min: { stroke: "black", strokeWidth: 2 },
              max: { stroke: "black", strokeWidth: 2 },
              q1: { fill: "#FF530D", fillOpacity: 0.5 },
              q3: { fill: "#2bbee0", fillOpacity: 0.5 },
              median: { stroke: "#fff", strokeWidth: 2 },
              minLabels: { fill: "green", padding: 10 },
              maxLabels: { fill: "orange", padding: 10 },
              q1Labels: { padding: 10 },
              q3Labels: { padding: 10 },
              medianLabels: { padding: 10 }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}
