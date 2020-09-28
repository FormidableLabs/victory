import React from "react";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryBoxPlot } from "@packages/victory-box-plot/src/index";
import { VictoryBar } from "@packages/victory-bar";
import { VictoryLabel } from "@packages/victory-core/src/index";
import { LineSegment, Whisker, Border } from "@packages/victory-core";

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
          <h3>Tabbable with aria-labels: box plot </h3>
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
              medianComponent={<LineSegment ariaLabel={({ datum }) => `custom-label-${datum}`} />}
              maxComponent={
                <Whisker
                  ariaLabel={({ datum }) => `${datum.x} max is ${Math.max(...datum.y)}`}
                  tabIndex={({ index }) => index + 1}
                />
              }
              q3Component={
                <Border
                  ariaLabel={({ datum }) => `${datum.x} q2 value is ${datum._q3}`}
                  tabIndex={({ index }) => index + 1}
                />
              }
              q1Component={
                <Border
                  ariaLabel={({ datum }) => `${datum.x} q1 value is ${datum._q1}`}
                  tabIndex={({ index }) => index + 1}
                />
              }
              minComponent={
                <Whisker
                  ariaLabel={({ datum }) => `${datum.x} min is ${Math.min(...datum.y)}`}
                  tabIndex={({ index }) => index + 1}
                />
              }
              q1LabelComponent={<VictoryLabel dx={5} dy={5} />}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
