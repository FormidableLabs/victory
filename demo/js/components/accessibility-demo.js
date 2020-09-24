import React from "react";
import { VictoryBar } from "Packages/victory-bar";
import { VictoryChart } from "Packages/victory-chart";
import { VictoryBoxPlot } from "Packages/victory-box-plot";
import { LineSegment, Whisker, Border } from "victory-core/src";
import { VictoryStack } from "Packages/victory-stack";
import { VictoryGroup } from "Packages/victory-group";
import { VictoryArea } from "Packages/victory-area";
import {
  accessibilityBarData,
  accessibilityBoxData,
  accessibilityAreaData
} from "../../demo-data.ts";

const heading = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center"
};
const containerStyle = {
  display: "flex",
  flexFlow: "row wrap",
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
        <div style={heading}>
          <h3>Tabbable charts with aria-labels</h3>
        </div>
        <div className="demo" style={containerStyle}>
          {/** BAR CHART */}
          <div style={chartContainerStyle}>
            <h3> Bar </h3>
            <VictoryChart domainPadding={{ x: 40, y: 40 }}>
              <VictoryBar
                data={[
                  { x: "A", y: 1 },
                  { x: "B", y: 3 },
                  { x: "C", y: 5 },
                  { x: "D", y: 7 }
                ]}
                dataComponent={
                  <Bar
                    ariaLabel={({ datum }) => `bar-value-${datum.x}`}
                    tabIndex={({ index }) => index + 1}
                  />
                }
              />
            </VictoryChart>
          </div>
          {/** BOX PLOT */}
          <div style={chartContainerStyle}>
            <h3> Box plot </h3>
            <VictoryChart domainPadding={{ x: 40, y: 40 }}>
              <VictoryBoxPlot
                /** datum props available w/example values:
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
                minLabels
                maxLabels
                data={accessibilityBoxData}
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
                    tabIndex={({ index }) => index + 5.1}
                  />
                }
                q1Component={
                  <Border
                    ariaLabel={({ datum }) => `${datum.x} q1 value is ${datum._q1}`}
                    tabIndex={({ index }) => index + 6.2}
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
          {/** AREA */}
          <div style={chartContainerStyle}>
            <h3> Area </h3>
            <VictoryChart domainPadding={{ y: 10 }}>
              {/* <VictoryStack
                ariaLabel={(props) => {
                  console.log("stack props", props);
                }}
              >
                <VictoryArea
                  data={accessibilityAreaData.a}
                  ariaLabel={(props) => {
                    console.log("area props", props);
                  }}
                  tabIndex={({ index }) => index + 20}
                />
                <VictoryArea
                  data={accessibilityAreaData.b}
                  // ariaLabel={({ datum }) => `${datum.x} min is ${datum._min}`}
                  // tabIndex={({ index }) => index + 21}
                />
                <VictoryArea data={accessibilityAreaData.c} />
                <VictoryArea data={accessibilityAreaData.d} />
              </VictoryStack> */}
            </VictoryChart>
          </div>
          <div>
            <VictoryChart>
              <h3> Line </h3>
            </VictoryChart>
          </div>
          <div>
            <VictoryChart>
              <h3>Pie</h3>
            </VictoryChart>
          </div>
          <div>
            <VictoryChart>
              <h3>Scatter</h3>
            </VictoryChart>
          </div>
          <div>
            <VictoryChart>
              <h3>Voronoi</h3>
            </VictoryChart>
          </div>
          <div>
            <VictoryChart>
              <h3>Histogram</h3>
            </VictoryChart>
          </div>
        </div>
      </>
    );
  }
}
