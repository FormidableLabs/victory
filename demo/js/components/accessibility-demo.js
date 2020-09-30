import React from "react";
import { VictoryBar } from "Packages/victory-bar";
import { VictoryChart } from "Packages/victory-chart";
import { VictoryBoxPlot } from "Packages/victory-box-plot";
import { LineSegment, Whisker, Border } from "victory-core/src";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "flex-start"
};

const chartContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "50%",
  height: "50%"
};

export default class App extends React.Component {
  render() {
    return (
      <>
        <div>
          <h2>Tabbable charts with aria-labels</h2>
        </div>
        <div className="demo" style={containerStyle}>
          {/** BAR CHART */}
          <div style={chartContainerStyle}>
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
          {/** BOX PLOT */}
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
                    tabIndex={({ index }) => index + 5}
                  />
                }
                q3Component={
                  <Border
                    ariaLabel={({ datum }) => `${datum.x} q3 value is ${datum._q3}`}
                    tabIndex={({ index }) => index + 6.1}
                  />
                }
                medianComponent={
                  <LineSegment
                    ariaLabel={({ datum }) => `${datum.x} median value is ${datum._median}`}
                    tabIndex={({ index }) => index + 5.3}
                  />
                }
                q1Component={
                  <Border
                    ariaLabel={({ datum }) => `${datum.x} q1 value is ${datum._q1}`}
                    tabIndex={({ index }) => index + 6}
                  />
                }
                minComponent={
                  <Whisker
                    ariaLabel={({ datum }) => `${datum.x} min is ${datum._min}`}
                    tabIndex={({ index }) => index + 5.2}
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
