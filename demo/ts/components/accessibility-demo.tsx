import React from "react";
import { isNumber } from "lodash";
import { Curve } from "@packages/victory-line";
import { VictoryStack } from "@packages/victory-stack";
import { VictoryLine } from "@packages/victory-line";
import { VictoryBar, Bar } from "@packages/victory-bar";
import { VictoryPie, Slice } from "@packages/victory-pie";
import { VictoryArea, Area } from "@packages/victory-area";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryScatter } from "@packages/victory-scatter";
import { VictoryBoxPlot } from "@packages/victory-box-plot";
import { VictoryVoronoi, Voronoi } from "@packages/victory-voronoi";
import { LineSegment, Whisker, Border, Point, VictoryLabel } from "@packages/victory-core";
import {
  accessibilityBarData,
  accessibilityBoxData,
  accessibilityAreaData,
  accessibilityPieDemo,
  accessibilityScatterDemo,
  accessibilityLineDemo,
  accessibilityVoronoiData
} from "../../demo-data";

const pageHeadingStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center"
};

const chartHeadingStyle: React.CSSProperties = {
  marginBottom: "0px",
  marginTop: "25px"
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

export const assignIndexValue = (index: number | string, value: number): number => {
  const determineValidNumber = Number(index);
  return isNumber(determineValidNumber) ? determineValidNumber + value : 1;
};

export default class VictoryAccessibilityDemo extends React.Component<any> {
  render() {
    return (
      <>
        <div style={pageHeadingStyle}>
          <h3>Tabbable charts with aria-labels</h3>
        </div>
        <div className="demo" style={containerStyle}>
          <div style={chartContainerStyle} data-testid="bar-accessibility-chart">
            <h3 style={chartHeadingStyle}> Bar chart</h3>
            <VictoryChart domainPadding={{ x: 40, y: 40 }}>
              <VictoryBar
                style={{ data: { fill: "#c43a31" } }}
                data={accessibilityBarData}
                dataComponent={
                  <Bar
                    ariaLabel={({ datum }) => `x: ${datum.x}`}
                    tabIndex={({ index }) => assignIndexValue(index, 1)}
                  />
                }
              />
            </VictoryChart>
          </div>
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}> Box plot </h3>
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
                    tabIndex={({ index }) => assignIndexValue(index, 5)}
                  />
                }
                q3Component={
                  <Border
                    ariaLabel={({ datum }) => `${datum.x} q3 value is ${datum._q3}`}
                    tabIndex={({ index }) => assignIndexValue(index, 6.1)}
                  />
                }
                medianComponent={
                  <LineSegment
                    ariaLabel={({ datum }) => `${datum.x} median value is ${datum._median}`}
                    tabIndex={({ index }) => assignIndexValue(index, 5.1)}
                  />
                }
                q1Component={
                  <Border
                    ariaLabel={({ datum }) => `${datum.x} q1 value is ${datum._q1}`}
                    tabIndex={({ index }) => assignIndexValue(index, 6.2)}
                  />
                }
                minComponent={
                  <Whisker
                    ariaLabel={({ datum }) => `${datum.x} min is ${datum._min}`}
                    tabIndex={({ index }) => assignIndexValue(index, 5.2)}
                  />
                }
              />
            </VictoryChart>
          </div>

          {/** AREA */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}> Area </h3>
            <VictoryChart domainPadding={{ y: 10 }}>
              <VictoryStack>
                <VictoryArea
                  data={accessibilityAreaData.a}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) => `area chart stack ${data[0]._stack}`}
                      tabIndex={20}
                    />
                  }
                />
                <VictoryArea
                  data={accessibilityAreaData.b}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) => `area chart stack ${data[0]._stack}`}
                      tabIndex={20.1}
                    />
                  }
                />
                <VictoryArea
                  data={accessibilityAreaData.c}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) => `area chart stack ${data[0]._stack}`}
                      tabIndex={20.2}
                    />
                  }
                />
                <VictoryArea
                  data={accessibilityAreaData.d}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) => `area chart stack ${data[0]._stack}`}
                      tabIndex={20.3}
                    />
                  }
                />
              </VictoryStack>
            </VictoryChart>
          </div>

          {/** LINE */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}> Line </h3>
            <VictoryChart domain={{ x: [0, 6], y: [1, 7] }}>
              <VictoryLine
                data={accessibilityLineDemo}
                labels={({ datum }) => datum.y}
                labelComponent={
                  <VictoryLabel
                    ariaLabel={({ datum }) => datum.y}
                    tabIndex={({ index }) => assignIndexValue(index, 21)}
                  />
                }
                dataComponent={
                  <Curve
                    ariaLabel={({ data }) =>
                      data.map(
                        (dataPoint: any, i: number) =>
                          `data point ${i + 1} x value is ${dataPoint.x} and y value is ${
                            dataPoint.y
                          }`
                      )
                    }
                  />
                }
              />
            </VictoryChart>
          </div>

          {/** PIE */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}> Pie </h3>
            <VictoryPie
              style={{ labels: { fill: "white", fontSize: 10 } }}
              labelRadius={({ datum }) => datum.radius - 12}
              width={400}
              height={250}
              radius={({ datum }) => datum.radius}
              data={accessibilityPieDemo}
              dataComponent={
                <Slice
                  ariaLabel={({ datum }) => `pie slice ${datum.x}`}
                  tabIndex={({ index }) => assignIndexValue(index, 30)}
                />
              }
            />
          </div>

          {/** Scatter */}
          <div style={chartContainerStyle}>
            <h3>Scatter</h3>
            <VictoryChart domain={{ x: [0, 6], y: [0, 8] }}>
              <VictoryScatter
                style={{ data: { fill: "#c43a31" } }}
                size={7}
                data={accessibilityScatterDemo}
                dataComponent={
                  <Point
                    ariaLabel={({ datum }) => `scatter point x: ${datum.x}, y:${datum.y}`}
                    tabIndex={({ index }) => assignIndexValue(index, 28)}
                  />
                }
              />
            </VictoryChart>
          </div>

          {/** VORONOI */}
          <div style={chartContainerStyle}>
            <h3>Voronoi</h3>
            <VictoryChart>
              <VictoryVoronoi
                style={{ data: { stroke: "#c43a31", strokeWidth: 2 } }}
                data={accessibilityVoronoiData}
                dataComponent={
                  <Voronoi
                    ariaLabel={({ datum }) => `${datum.x}`}
                    tabIndex={({ index }) => index + 32}
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
