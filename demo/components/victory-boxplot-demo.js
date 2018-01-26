/*eslint-disable no-magic-numbers */
import React from "react";
// import PropTypes from "prop-types";
// import VictoryAxis from "../../src/components/victory-axis/victory-axis";
import VictoryChart from "../../src/components/victory-chart/victory-chart";
import VictoryBoxPlot from "../../src/components/victory-boxplot/victory-boxplot";
// import { merge } from "lodash";

export default class App extends React.Component {

  constructor() {
    super();
  }

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
            style={{
              parent: {},
              min: { stroke: "#FF530D", strokeWidth: "2" },
              max: { stroke: "#2bbee0", strokeWidth: "2" },
              q1: { fill: "#FF530D", fillOpacity: "0.5" },
              q3: { fill: "#2bbee0", fillOpacity: "0.5" },
              median: { stroke: "#fff", strokeWidth: "4" },
              minLabels: { fill: "green" },
              maxLabels: { fill: "orange" },
              q1Labels: {},
              q3Labels: {},
              medianLabels: {}
            }}
          />
          <VictoryBoxPlot
            boxWidth={20}
            data={[
              { x: 2, y: 1 },
              { x: 2, y: 3 },
              { x: 2, y: 5 },
              { x: 2, y: 10 },
              { x: 2, y: 7 },
              { x: 2, y: 9 },
              { x: 2, y: 6 },
              { x: 2, y: 14 },
              { x: 2, y: 7 },
              { x: 2, y: 5 },
              { x: 2, y: 10 }
            ]}
            style={{
              parent: {},
              min: { stroke: "#FFBB26", strokeWidth: "5" },
              max: { stroke: "#0056FF", strokeWidth: "5" },
              q1: { fill: "#FFBB26" },
              q3: { fill: "#0056FF" },
              median: { stroke: "#EC97FF", strokeWidth: "10" },
              minLabels: { fill: "purple" },
              maxLabels: { fill: "pink" },
              q1Labels: {},
              q3Labels: {},
              medianLabels: {}
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}
