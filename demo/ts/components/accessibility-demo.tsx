import React from "react";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryBoxPlot } from "@packages/victory-box-plot/src/index";
import { VictoryBar } from "@packages/victory-bar";

export default class VictoryAccessibilityDemo extends React.Component<any> {
  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-start"
    };
    const chartContainerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "50%",
      height: "50%"
    };

    return (
      <div className="demo" style={containerStyle}>
        <div style={chartContainerStyle} data-testid="bar-accessibility-chart">
          <h3>Tabbable with aria-labels: bar chart</h3>
          <VictoryChart domainPadding={{ x: 40, y: 40 }}>
            <VictoryBar
              data={[
                { x: "A", y: 1 },
                { x: "B", y: 3 },
                { x: "C", y: 5 },
                { x: "D", y: 7 }
              ]}
              ariaLabel={({ datum }) => `bar-value-${datum.x}`}
              tabIndex={({ index }) => index + 1}
            />
          </VictoryChart>
        </div>
        <div style={chartContainerStyle}>
          <h3>Tabbable with aria-labels: bar chart</h3>
          <VictoryChart domainPadding={{ x: 40, y: 40 }}>
            <VictoryBoxPlot
              minLabels
              maxLabels
              data={[
                { x: "red", y: [5, 10, 9, 2] },
                { x: "blue", y: [1, 15, 6, 8] },
                { x: "green", y: [3, 5, 6, 9] },
                { x: "yellow", y: [5, 20, 8, 12] },
                { x: "white", y: [2, 11, 12, 13] }
              ]}
              // ariaLabel={({ datum }) => `bar-value-${datum.x}`}
              // tabIndex={({ index }) => {
              //   console.log("-----", index);
              //   return 1;
              // }}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
