import React from "react";
import isNumber from "lodash/isNumber";
import { VictoryGroup } from "victory";
import { VictoryStack } from "victory";
import { VictoryChart } from "victory";
import { VictoryScatter } from "victory";
import { VictoryBoxPlot } from "victory";
import { VictoryBar, Bar } from "victory";
import { VictoryPie, Slice } from "victory";
import { VictoryArea, Area } from "victory";
import { VictoryLine, Curve } from "victory";
import { VictoryVoronoi, Voronoi } from "victory";
import { ErrorBar, VictoryErrorBar } from "victory";
import { Candle, VictoryCandlestick } from "victory";
import {
  LineSegment,
  Whisker,
  Border,
  Point,
  VictoryLabel,
  VictoryAccessibleGroup,
  VictoryTheme,
} from "victory";
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
  accessibilityCandlestickData,
} from "../demo-data";

const pageHeadingStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
};

const chartHeadingStyle: React.CSSProperties = {
  marginBottom: "0px",
  marginTop: "25px",
  fontSize: "calc(1vw + 5px)",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  justifyContent: "flex-start",
};

const chartContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "50%",
  height: "50%",
  padding: "25px",
};

export const assignIndexValue = (
  index: number | string | undefined,
  value: number,
): number => {
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
          {/** BAR */}
          <div
            style={chartContainerStyle}
            data-testid="bar-accessibility-chart"
          >
            <h3 style={chartHeadingStyle}>Bar chart</h3>
            <VictoryChart
              theme={VictoryTheme.clean}
              domainPadding={{ x: 40, y: 40 }}
            >
              <VictoryBar
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
            <VictoryChart
              theme={VictoryTheme.clean}
              domainPadding={{ x: 40, y: 40 }}
            >
              <VictoryBoxPlot
                minLabels
                maxLabels
                data={accessibilityBoxData}
                /* datum props available ex:
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
                    ariaLabel={({ datum }) =>
                      `${datum.x} q3 value is ${datum._q3}`
                    }
                    tabIndex={({ index }) => assignIndexValue(index, 6.1)}
                  />
                }
                medianComponent={
                  <LineSegment
                    ariaLabel={({ datum }) =>
                      `${datum.x} median value is ${datum._median}`
                    }
                    tabIndex={({ index }) => assignIndexValue(index, 5.1)}
                  />
                }
                q1Component={
                  <Border
                    ariaLabel={({ datum }) =>
                      `${datum.x} q1 value is ${datum._q1}`
                    }
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
            <VictoryChart theme={VictoryTheme.clean}>
              <VictoryStack
                groupComponent={
                  <VictoryAccessibleGroup
                    aria-label="stack graph"
                    desc="stack graph description"
                    aria-describedby="stack graph aria description, descId should match"
                    tabIndex={67}
                  />
                }
              >
                <VictoryArea
                  style={{ data: { fill: "#D0F0FD" } }}
                  data={accessibilityAreaData.a}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) =>
                        `area chart stack ${data?.[0]._stack}`
                      }
                      tabIndex={20}
                    />
                  }
                />
                <VictoryArea
                  style={{ data: { fill: "#77D1F3" } }}
                  data={accessibilityAreaData.b}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) =>
                        `area chart stack ${data?.[0]._stack}`
                      }
                      tabIndex={20.1}
                    />
                  }
                />
                <VictoryArea
                  style={{ data: { fill: "#18BFFF" } }}
                  data={accessibilityAreaData.c}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) =>
                        `area chart stack ${data?.[0]._stack}`
                      }
                      tabIndex={20.2}
                    />
                  }
                />
                <VictoryArea
                  style={{ data: { fill: "#0B76B7" } }}
                  data={accessibilityAreaData.d}
                  dataComponent={
                    <Area
                      ariaLabel={({ data }) =>
                        `area chart stack ${data?.[0]._stack}`
                      }
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
            <VictoryChart
              theme={VictoryTheme.clean}
              domain={{ x: [0, 6], y: [1, 7] }}
            >
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
                      data
                        ?.map(
                          (dataPoint: any, i: number) =>
                            `data point ${i + 1} x value is ${
                              dataPoint.x
                            } and y value is ${dataPoint.y}`,
                        )
                        .join("") || ""
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
              theme={VictoryTheme.clean}
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
            <VictoryChart
              theme={VictoryTheme.clean}
              domain={{ x: [0, 6], y: [0, 8] }}
            >
              <VictoryScatter
                size={7}
                data={accessibilityScatterData}
                dataComponent={
                  <Point
                    ariaLabel={({ datum }) =>
                      `scatter point x: ${datum.x}, y:${datum.y}`
                    }
                    tabIndex={({ index }) => assignIndexValue(index, 28)}
                  />
                }
              />
            </VictoryChart>
          </div>

          {/** VORONOI */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}>Voronoi</h3>
            <VictoryChart theme={VictoryTheme.clean}>
              <VictoryVoronoi
                data={accessibilityVoronoiData}
                dataComponent={
                  <Voronoi
                    ariaLabel={({ datum }) =>
                      `voronoi chart, x ${datum.x}, y ${datum.y}`
                    }
                    tabIndex={({ index }) => assignIndexValue(index, 35)}
                  />
                }
              />
            </VictoryChart>
          </div>

          {/** CANDLESTICK */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}>Candlestick</h3>
            <VictoryChart theme={VictoryTheme.clean} domainPadding={{ x: 25 }}>
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
            <VictoryChart theme={VictoryTheme.clean} domainPadding={15}>
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

          {/** ACCESSIBLE GROUP */}
          <div style={chartContainerStyle}>
            <h3 style={chartHeadingStyle}>Accessible Group</h3>
            <VictoryChart theme={VictoryTheme.clean} domainPadding={{ x: 40 }}>
              <VictoryGroup
                theme={VictoryTheme.clean}
                offset={20}
                groupComponent={
                  <VictoryAccessibleGroup
                    aria-label="victory group"
                    desc="accessible bar group chart"
                  />
                }
              >
                <VictoryBar horizontal data={accessibilityGroupData.a} />
                <VictoryBar
                  horizontal
                  data={accessibilityGroupData.b}
                  groupComponent={
                    <VictoryAccessibleGroup
                      aria-label="victory bar group 2"
                      desc="accessible bar chart group 2"
                      aria-describedby="accessible bar chart group 2 aria description"
                      tabIndex={67}
                    />
                  }
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
