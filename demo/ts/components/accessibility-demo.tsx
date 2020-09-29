import React from "react";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryBoxPlot } from "@packages/victory-box-plot/src/index";
import { VictoryBar } from "@packages/victory-bar";
import { VictoryLabel } from "@packages/victory-core/src/index";
import { LineSegment, Whisker, Border } from "@packages/victory-core";

const headingStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "50px"
};
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

export default class VictoryAccessibilityDemo extends React.Component<any> {
  render() {
    return (
      <>
        <div style={headingStyle}>
          <h3>Tabbable charts with aria-labels</h3>
        </div>
        <div className="demo" style={containerStyle}>
          <div style={chartContainerStyle} data-testid="bar-accessibility-chart">
            <h3> Bar chart</h3>
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
            <h3> Box plot </h3>
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
                /** datum props available ex:
                 * x: "green"
                 * xName: "green"
                 * y: (4) [3, 5, 6, 9]
                 * _max: 9
                 * _median: 5.5
                 * _min: 3
                 * _q1: 4.5
                 * _q3: 6.75
                 * _x: 3
                 * _y: 3
                 */
                maxComponent={
                  <Whisker
                    ariaLabel={({ datum }) => `${datum.x} max is ${datum._max}`}
                    tabIndex={({ index }) => index + 1}
                  />
                }
                q3Component={
                  <Border
                    ariaLabel={({ datum }) => `${datum.x} q3 value is ${datum._q3}`}
                    tabIndex={({ index }) => index + 2.1}
                  />
                }
                medianComponent={
                  <LineSegment
                    ariaLabel={({ datum }) => `${datum.x} median value is ${datum._median}`}
                    tabIndex={({ index }) => index + 1.3}
                  />
                }
                q1Component={
                  <Border
                    ariaLabel={({ datum }) => `${datum.x} q1 value is ${datum._q1}`}
                    tabIndex={({ index }) => index + 2}
                  />
                }
                minComponent={
                  <Whisker
                    ariaLabel={({ datum }) => `${datum.x} min is ${datum._min}`}
                    tabIndex={({ index }) => index + 1.2}
                  />
                }
              />
            </VictoryChart>
          </div>
        </div>
      </>
    );
  }
}
