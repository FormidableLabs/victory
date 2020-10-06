import React from "react";
import { isNumber } from "lodash";
import { Curve } from "@packages/victory-line";
import { VictoryGroup } from "@packages/victory-group";
import { VictoryStack } from "@packages/victory-stack";
import { VictoryLine } from "@packages/victory-line";
import { VictoryBar, Bar } from "@packages/victory-bar";
import { VictoryPie, Slice } from "@packages/victory-pie";
import { VictoryArea, Area } from "@packages/victory-area";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryScatter } from "@packages/victory-scatter";
import { VictoryBoxPlot } from "@packages/victory-box-plot";
import { VictoryVoronoi, Voronoi } from "@packages/victory-voronoi";
import { ErrorBar, VictoryErrorBar } from "@packages/victory-errorbar";
import { Candle, VictoryCandlestick } from "@packages/victory-candlestick";
import {
  LineSegment,
  Whisker,
  Border,
  Point,
  VictoryLabel,
  VictoryAccessibilityGroup
} from "@packages/victory-core";
import {
  accessibilityBarData,
  accessibilityBoxData,
  accessibilityPieData,
  accessibilityAreaData,
  accessibilityLineData,
  accessibilityGroupData,
  accessibilityScatterData,
  accessibilityVoronoiData,
  accessibilityErrorBarData,
  accessibilityCandlestickData
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
  height: "50%",
  padding: "25px"
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
          {/**BAR */}
          <div style={chartContainerStyle} data-testid="bar-accessibility-chart">
            <h3 style={chartHeadingStyle}>Bar chart</h3>
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

          {/** BOXPLOT */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}>BoxPlot</h3>
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
            <h3 style={chartHeadingStyle}>Area</h3>
            <VictoryChart>
              <VictoryStack>
                <VictoryArea
                  data={accessibilityAreaData.a}
                  style={{ data: { fill: "#c43a31" } }}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) => `area chart stack ${data[0]._stack}`}
                      tabIndex={20}
                    />
                  }
                />
                <VictoryArea
                  style={{ data: { fill: "#c43a31", opacity: 0.9 } }}
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
                  style={{ data: { fill: "#c43a31", opacity: 0.8 } }}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) => `area chart stack ${data[0]._stack}`}
                      tabIndex={20.2}
                    />
                  }
                />
                <VictoryArea
                  data={accessibilityAreaData.d}
                  style={{ data: { fill: "#c43a31", opacity: 0.6 } }}
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
            <h3 style={chartHeadingStyle}>Line</h3>
            <VictoryChart domain={{ x: [0, 6], y: [1, 7] }}>
              <VictoryLine
                data={accessibilityLineData}
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
            <h3 style={chartHeadingStyle}>Pie</h3>
            <VictoryPie
              style={{ labels: { fill: "white", fontSize: 10 } }}
              labelRadius={({ datum }) => datum.radius - 12}
              width={400}
              height={250}
              radius={({ datum }) => datum.radius}
              data={accessibilityPieData}
              dataComponent={
                <Slice
                  ariaLabel={({ datum }) => `pie slice ${datum.x}`}
                  tabIndex={({ index }) => assignIndexValue(index, 30)}
                />
              }
            />
          </div>

          {/** SCATTER */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}>Scatter</h3>
            <VictoryChart domain={{ x: [0, 6], y: [0, 8] }}>
              <VictoryScatter
                style={{ data: { fill: "#c43a31" } }}
                size={7}
                data={accessibilityScatterData}
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
            <h3 style={chartHeadingStyle}>Voronoi</h3>
            <VictoryChart>
              <VictoryVoronoi
                style={{ data: { stroke: "#c43a31", strokeWidth: 2 } }}
                data={accessibilityVoronoiData}
                dataComponent={
                  <Voronoi
                    ariaLabel={({ datum }) => `voronoi chart, x ${datum.x}, y ${datum.y}`}
                    tabIndex={({ index }) => assignIndexValue(index, 35)}
                  />
                }
              />
            </VictoryChart>
          </div>

          {/** CANDLESTICK */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}>Candlestick</h3>
            <VictoryChart domainPadding={{ x: 25 }}>
              <VictoryCandlestick
                data={accessibilityCandlestickData}
                dataComponent={
                  <Candle
                    ariaLabel={({ datum }) =>
                      `candlestick chart, ${datum.x} open ${datum.open}, close ${datum.close}, low ${datum.low}, high ${datum.high}`
                    }
                    tabIndex={({ index }) => assignIndexValue(index, 43)}
                  />
                }
              />
            </VictoryChart>
          </div>

          {/** ERRORBAR */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}>ErrorBar</h3>
            <VictoryChart domainPadding={15}>
              <VictoryErrorBar
                data={accessibilityErrorBarData}
                errorX={(datum) => datum.error * datum.x}
                errorY={(datum) => datum.error * datum.y}
                dataComponent={
                  <ErrorBar
                    ariaLabel={({ datum }) =>
                      `error bar chart, x ${datum.x}, y ${datum.y}, error margin ${datum.error}`
                    }
                    tabIndex={({ index }) => assignIndexValue(index, 60)}
                  />
                }
              />
            </VictoryChart>
          </div>

          {/**ACCESSIBILITYGROUP */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}>Accessibility Group</h3>
            <VictoryChart domainPadding={{ x: 40 }}>
              <VictoryGroup
                offset={20}
                groupComponent={
                  <VictoryAccessibilityGroup
                    aria-label="access-group"
                    aria-describedby="horizontal bar chart"
                    desc="horizontal bar chart"
                    tabIndex={66}
                  />
                }
              >
                <VictoryBar horizontal data={accessibilityGroupData.a} />
                <VictoryBar
                  horizontal
                  style={{ data: { fill: "#c43a31", opacity: 0.9 } }}
                  data={accessibilityGroupData.b}
                />
                <VictoryBar horizontal data={accessibilityGroupData.c} />
              </VictoryGroup>
            </VictoryChart>
          </div>
        </div>
      </>
    );
  }
}
