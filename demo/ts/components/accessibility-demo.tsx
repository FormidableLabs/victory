import React from "react";
import { Curve } from "@packages/victory-line";
import { VictoryBar, Bar } from "@packages/victory-bar";
import { VictoryPie } from "@packages/victory-pie";
import { VictoryLine } from "@packages/victory-line";
import { VictoryArea } from "@packages/victory-area";
import { VictoryStack } from "@packages/victory-stack";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryScatter } from "@packages/victory-scatter";
import { VictoryBoxPlot } from "@packages/victory-box-plot";
import { LineSegment, Whisker, Border } from "@packages/victory-core";
import {
  accessibilityBarData,
  accessibilityBoxData,
  accessibilityAreaData,
  accessibilityPieDemo,
  accessibilityScatterDemo,
  accessibilityLineDemo
} from "../../demo-data";

const headingStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "50px"
};
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexFlow: "row wrap",
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
                data={accessibilityBarData}
                dataComponent={
                  <Bar
                    ariaLabel={({ datum }) => `bar-value-${datum.x}`}
                    tabIndex={({ index }) => index + 1}
                  />
                }
              />
            </VictoryChart>
          </div>
          <div style={chartContainerStyle}>
            <h3> Box plot </h3>
            <VictoryChart domainPadding={{ x: 40, y: 40 }}>
              <VictoryBoxPlot
                minLabels
                maxLabels
                data={accessibilityBoxData}
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
          {/** AREA */}
          <div style={chartContainerStyle}>
            <h3> Area </h3>
            <VictoryChart domainPadding={{ y: 10 }}>
              <VictoryStack>
                <VictoryArea data={accessibilityAreaData.a} />
                <VictoryArea
                  data={accessibilityAreaData.b}
                  // ariaLabel={({ datum }) => `${datum.x} min is ${datum._min}`}
                  // tabIndex={({ index }) => index + 21}
                />
                <VictoryArea data={accessibilityAreaData.c} />
                <VictoryArea data={accessibilityAreaData.d} />
              </VictoryStack>
            </VictoryChart>
          </div>
          <div style={chartContainerStyle}>
            <h3> Line </h3>
            <VictoryChart>
              <VictoryLine
                data={accessibilityLineDemo}
                dataComponent={
                  <Curve
                    ariaLabel={(props) => {
                      console.log("props", props);
                      return "test";
                    }}
                  />
                }
              />
            </VictoryChart>
          </div>
          <div style={chartContainerStyle}>
            <h3>Pie</h3>
            <VictoryChart>
              <VictoryPie
                style={{ labels: { fill: "white", fontSize: 10 } }}
                labelRadius={({ datum }) => datum.radius - 12}
                padding={{ bottom: 50, left: 50, right: 10 }}
                width={400}
                height={200}
                radius={({ datum }) => datum.radius}
                data={accessibilityPieDemo}
              />
            </VictoryChart>
          </div>
          <div style={chartContainerStyle}>
            <h3>Scatter</h3>
            <VictoryChart domain={{ x: [0, 6], y: [0, 8] }}>
              <VictoryScatter
                style={{ data: { fill: "#c43a31" } }}
                size={7}
                data={accessibilityScatterDemo}
              />
            </VictoryChart>
          </div>
          <div style={chartContainerStyle}>
            <h3>Voronoi</h3>
            <VictoryChart></VictoryChart>
          </div>
          <div style={chartContainerStyle}>
            <h3>Histogram</h3>
            <VictoryChart></VictoryChart>
          </div>
        </div>
      </>
    );
  }
}
