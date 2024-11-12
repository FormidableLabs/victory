import React from "react";
import { keys, random, range, round } from "lodash";
import { fromJS } from "immutable";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryArea } from "victory-area";
import { VictoryAxis } from "victory-axis";
import { VictoryPolarAxis } from "victory-polar-axis";
import { VictoryBar } from "victory-bar";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryErrorBar } from "victory-errorbar";
import { VictoryCandlestick } from "victory-candlestick";
import { VictoryVoronoi } from "victory-voronoi";
import { VictoryZoomContainer } from "victory-zoom-container";
import { VictoryVoronoiContainer } from "victory-voronoi-container";
import { VictorySelectionContainer } from "victory-selection-container";
import { VictoryCursorContainer } from "victory-cursor-container";
import { VictoryBrushContainer } from "victory-brush-container";
import { VictoryTooltip } from "victory-tooltip";
import {
  DomainTuple,
  VictoryClipContainer,
  VictoryLabel,
  VictoryStyleInterface,
  VictoryTheme,
} from "victory-core";

const themeColors = VictoryTheme.clean.palette?.colors || {};
const scatterFillStyle: VictoryStyleInterface = {
  data: {
    fill: ({ active }) =>
      active ? themeColors.red || "pink" : themeColors.blue || "blue",
  },
};
interface WrapperProps {
  children?: React.ReactElement | React.ReactElement[];
}

class Wrapper extends React.Component<WrapperProps> {
  renderChildren(props: WrapperProps) {
    const children = React.Children.toArray(props.children);
    return children.map((child: any) => {
      return React.cloneElement(child, Object.assign({}, child.props, props));
    });
  }

  render() {
    return <g>{this.renderChildren(this.props)}</g>;
  }
}

type MultiAxisDataType = {
  strength?: number;
  intelligence?: number;
  stealth?: number;
}[];

const multiAxisData: MultiAxisDataType = [
  { strength: 1, intelligence: 250, stealth: 45 },
  { strength: 2, intelligence: 300, stealth: 75 },
  { strength: 5, intelligence: 225, stealth: 60 },
];

type DataType = {
  x?: string | number;
  y?: string | number;
};

interface ImmutableDemoState {
  scatterData: {
    x: number;
    y: number;
    size: number;
    symbol: string;
    fill: string;
    opacity: number;
  }[];
  multiTransitionData: DataType[][];
  multiTransitionAreaData: DataType[][];
  multiAxisData: DataType[][];
  multiAxisMaxima: React.ReactElement[];
  zoomDomain: { x?: DomainTuple; y?: DomainTuple };
}

export default class ImmutableDemo extends React.Component<
  any,
  ImmutableDemoState
> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      scatterData: this.getScatterData(),
      multiTransitionData: this.getMultiTransitionData(),
      multiTransitionAreaData: this.getMultiTransitionAreaData(),
      multiAxisData: this.processMultiAxisData(multiAxisData),
      multiAxisMaxima: this.getMaxData(multiAxisData),
      zoomDomain: {},
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        scatterData: this.getScatterData(),
        multiTransitionData: this.getMultiTransitionData(),
        multiTransitionAreaData: this.getMultiTransitionAreaData(),
      });
    }, 3000);
  }

  getScatterData() {
    const colors = [
      "violet",
      "cornflowerblue",
      "gold",
      "orange",
      "turquoise",
      "tomato",
      "greenyellow",
    ];
    const symbols = [
      "circle",
      "star",
      "square",
      "triangleUp",
      "triangleDown",
      "diamond",
      "plus",
    ];
    const elementNum = random(10, 40);
    return fromJS(
      range(elementNum).map((index) => {
        const scaledIndex = Math.floor(index % 7);
        return {
          x: random(10, 50),
          y: random(2, 100),
          size: random(8) + 3,
          symbol: symbols[scaledIndex],
          fill: colors[random(0, 6)],
          opacity: 1,
        };
      }),
    );
  }

  getMultiTransitionData() {
    const bars = random(3, 5);
    return fromJS(
      range(4).map(() => {
        return range(bars).map((bar) => {
          return { x: bar + 1, y: random(2, 10) };
        });
      }),
    );
  }

  getMultiTransitionAreaData() {
    const areas = random(8, 10);
    return fromJS(
      range(8).map(() => {
        return range(areas).map((area) => {
          return { x: area, y: random(2, 10) };
        });
      }),
    );
  }

  getMaxData(data: MultiAxisDataType) {
    const groupedData = keys(data[0]).reduce(
      (memo: any, key: string | number) => {
        memo[key] = data.map((d) => d[key]);
        return memo;
      },
      {},
    );
    return keys(groupedData).reduce((memo: any, key: string | number) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processMultiAxisData(data: MultiAxisDataType) {
    const maxByGroup = this.getMaxData(data);
    const makeDataArray = (d: any) => {
      return keys(d).map((key: string) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return fromJS(data.map((datum) => makeDataArray(datum)));
  }

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const chartStyle: VictoryStyleInterface = {
      parent: {
        border: "1px solid #ccc",
        margin: "2%",
        maxWidth: "40%",
      },
    };

    return (
      <div className="demo">
        <h1>with immutable.js data</h1>

        <div style={containerStyle}>
          <VictoryChart
            style={chartStyle}
            animate={{ duration: 2000 }}
            theme={VictoryTheme.clean}
          >
            <VictoryScatter
              groupComponent={<VictoryClipContainer />}
              data={this.state.scatterData}
              style={{
                data: {
                  fill: ({ datum }) => datum.fill,
                  opacity: ({ datum }) => datum.opacity,
                },
              }}
              animate={{
                onExit: {
                  duration: 500,
                  before: () => ({ opacity: 0.3 }),
                },
                onEnter: {
                  duration: 500,
                  before: () => ({ opacity: 0.3 }),
                  after: (datum) => ({ opacity: datum.opacity || 1 }),
                },
              }}
            />
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            theme={VictoryTheme.clean}
            events={[
              {
                childName: "area-1",
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        childName: "area-2",
                        target: "data",
                        mutation: (props) => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: "gold",
                            }),
                          };
                        },
                      },
                      {
                        childName: "area-3",
                        target: "data",
                        mutation: (props) => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: "orange",
                            }),
                          };
                        },
                      },
                      {
                        childName: "area-4",
                        target: "data",
                        mutation: (props) => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: "red",
                            }),
                          };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryStack>
              <VictoryArea
                name="area-1"
                data={fromJS([
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 5 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 },
                ])}
              />
              <VictoryArea
                name="area-2"
                data={fromJS([
                  { x: "a", y: 1 },
                  { x: "b", y: 4 },
                  { x: "c", y: 5 },
                  { x: "d", y: 7 },
                  { x: "e", y: 5 },
                ])}
              />
              <VictoryArea
                name="area-3"
                data={fromJS([
                  { x: "a", y: 3 },
                  { x: "b", y: 2 },
                  { x: "c", y: 6 },
                  { x: "d", y: 2 },
                  { x: "e", y: 6 },
                ])}
              />
              <VictoryArea
                name="area-4"
                data={fromJS([
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 3 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 },
                ])}
              />
            </VictoryStack>
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            domainPadding={{ x: 30 }}
            theme={VictoryTheme.clean}
          >
            <VictoryGroup
              offset={12}
              animate={{ duration: 1000 }}
              colorScale={"warm"}
            >
              {this.state.multiTransitionData.map((data, index) => {
                return (
                  <Wrapper key={index}>
                    <VictoryBar key={index} data={data} />
                  </Wrapper>
                );
              })}
            </VictoryGroup>
          </VictoryChart>

          <VictoryLine
            theme={VictoryTheme.clean}
            style={chartStyle}
            labels={({ datum }) => Math.round(datum.y)}
            data={fromJS([
              { x: new Date(1982, 1, 1), y: 125 },
              { x: new Date(1987, 1, 1), y: 257 },
              { x: new Date(1993, 1, 1), y: 345 },
              { x: new Date(1997, 1, 1), y: 515 },
              { x: new Date(2001, 1, 1), y: 132 },
              { x: new Date(2005, 1, 1), y: 305 },
              { x: new Date(2011, 1, 1), y: 270 },
              { x: new Date(2015, 1, 1), y: 470 },
            ])}
          />

          <VictoryChart style={chartStyle} theme={VictoryTheme.clean}>
            <VictoryErrorBar
              data={fromJS([
                { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
                { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
                { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
                { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
                { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 },
              ])}
            />
            <VictoryLine
              data={fromJS([
                { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
                { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
                { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
                { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
                { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 },
              ])}
            />
          </VictoryChart>

          <svg height={500} width={500}>
            <VictoryCandlestick
              theme={VictoryTheme.clean}
              style={chartStyle}
              data={fromJS([
                {
                  x: new Date(2016, 6, 1),
                  open: 9,
                  close: 30,
                  high: 56,
                  low: 7,
                },
                {
                  x: new Date(2016, 6, 2),
                  open: 80,
                  close: 40,
                  high: 120,
                  low: 10,
                },
                {
                  x: new Date(2016, 6, 3),
                  open: 50,
                  close: 80,
                  high: 90,
                  low: 20,
                },
                {
                  x: new Date(2016, 6, 4),
                  open: 70,
                  close: 22,
                  high: 70,
                  low: 5,
                },
                {
                  x: new Date(2016, 6, 5),
                  open: 20,
                  close: 35,
                  high: 50,
                  low: 10,
                },
                {
                  x: new Date(2016, 6, 6),
                  open: 35,
                  close: 30,
                  high: 40,
                  low: 3,
                },
                {
                  x: new Date(2016, 6, 7),
                  open: 30,
                  close: 90,
                  high: 95,
                  low: 30,
                },
                {
                  x: new Date(2016, 6, 8),
                  open: 80,
                  close: 81,
                  high: 83,
                  low: 75,
                },
              ])}
              size={8}
              standalone={false}
              events={[
                {
                  target: "labels",
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          mutation: (props) => {
                            return {
                              style: {
                                ...props.style,
                                stroke: themeColors.orange,
                              },
                            };
                          },
                        },
                      ];
                    },
                  },
                },
                {
                  target: "data",
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          mutation: (props) => {
                            return {
                              style: {
                                ...props.style,
                                stroke: themeColors.blue,
                              },
                            };
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
            <VictoryAxis standalone={false} />
          </svg>

          <VictoryChart
            theme={VictoryTheme.clean}
            style={chartStyle}
            domainPadding={{ x: 30, y: 30 }}
            events={[
              {
                childName: "bar",
                target: "data",
                eventKey: [1, 2],
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        eventKey: [3, 4, 5],
                        mutation: () => {
                          return { text: "o shit" };
                        },
                      },
                      {
                        childName: "line",
                        target: "data",
                        mutation: (props) => {
                          return {
                            style: {
                              ...props.style,
                              stroke: themeColors.yellow,
                            },
                          };
                        },
                      },
                      {
                        childName: "line",
                        target: "labels",
                        mutation: (props) => {
                          return {
                            style: {
                              ...props.style,
                              stroke: themeColors.green,
                            },
                            text: "waddup",
                          };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryBar
              name="bar"
              data={fromJS([
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 3 },
                { x: 4, y: 2 },
                { x: 5, y: 1 },
                { x: 6, y: 2 },
                { x: 7, y: 3 },
                { x: 8, y: 2 },
                { x: 9, y: 1 },
                { x: 10, y: 2 },
                { x: 11, y: 3 },
                { x: 12, y: 2 },
                { x: 13, y: 1 },
              ])}
            />
            <VictoryLine name="line" y={() => 0.5} />
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            domainPadding={20}
            theme={VictoryTheme.clean}
          >
            <VictoryStack
              style={{
                data: { strokeDasharray: "10, 5" },
              }}
              colorScale="qualitative"
            >
              <VictoryGroup
                colorScale="red"
                data={fromJS([
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 2 },
                ])}
              >
                <VictoryBar />
                <VictoryLine />
              </VictoryGroup>
              <VictoryGroup
                data={fromJS([
                  { x: 1, y: 4 },
                  { x: 2, y: 5 },
                  { x: 3, y: 1 },
                ])}
                colorScale="blue"
              >
                <VictoryBar />
                <VictoryLine />
              </VictoryGroup>
              <VictoryGroup
                colorScale="green"
                data={fromJS([
                  { x: 1, y: 3 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 },
                ])}
              >
                <VictoryBar />
                <VictoryLine />
                <VictoryScatter
                  symbol={"plus"}
                  style={{
                    data: { fill: themeColors.purple },
                  }}
                />
              </VictoryGroup>
            </VictoryStack>
          </VictoryChart>

          <VictoryVoronoi
            style={Object.assign({}, chartStyle, {
              data: {
                fill: "gray",
                opacity: 0.1,
                stroke: "black",
                strokeWidth: 2,
              },
            })}
            data={fromJS([
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 1 },
            ])}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => [
                    {
                      mutation: () => ({ style: { fill: "orange" } }),
                    },
                  ],
                },
              },
            ]}
          />

          <VictoryCandlestick
            theme={VictoryTheme.clean}
            style={chartStyle}
            labelComponent={<VictoryTooltip />}
            labels={({ datum }) => `hello #${datum.x}`}
            data={fromJS([
              { x: 1, open: 5, close: 10, high: 15, low: 0 },
              { x: 2, open: 15, close: 10, high: 20, low: 5 },
              { x: 3, open: 15, close: 20, high: 25, low: 10 },
              { x: 4, open: 20, close: 25, high: 30, low: 15 },
              { x: 5, open: 30, close: 25, high: 35, low: 20 },
            ])}
          />

          <VictoryChart
            style={chartStyle}
            containerComponent={<VictoryZoomContainer />}
            theme={VictoryTheme.clean}
            events={[
              {
                childName: "area-1",
                target: "data",
                eventHandlers: {
                  onClick: () => [
                    {
                      childName: "area-2",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: {
                            ...props.style,
                            fill: themeColors.yellow,
                          },
                        };
                      },
                    },
                    {
                      childName: "area-3",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: {
                            ...props.style,
                            fill: themeColors.orange,
                          },
                        };
                      },
                    },
                    {
                      childName: "area-4",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: {
                            ...props.style,
                            fill: themeColors.red,
                          },
                        };
                      },
                    },
                  ],
                },
              },
            ]}
          >
            <VictoryAxis />
            <VictoryStack>
              <VictoryArea
                name="area-1"
                data={fromJS([
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 5 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 },
                ])}
              />
              <VictoryArea
                name="area-2"
                data={fromJS([
                  { x: "a", y: 1 },
                  { x: "b", y: 4 },
                  { x: "c", y: 5 },
                  { x: "d", y: 7 },
                  { x: "e", y: 5 },
                ])}
              />
              <VictoryArea
                name="area-3"
                data={fromJS([
                  { x: "a", y: 3 },
                  { x: "b", y: 2 },
                  { x: "c", y: 6 },
                  { x: "d", y: 2 },
                  { x: "e", y: 6 },
                ])}
              />
              <VictoryArea
                name="area-4"
                data={fromJS([
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 3 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 },
                ])}
              />
            </VictoryStack>
            <VictoryAxis dependentAxis />
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            theme={VictoryTheme.clean}
            domainPadding={{ y: 2 }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={({ datum }) => `y:${datum.y}`}
                labelComponent={
                  <VictoryTooltip
                    y={150}
                    flyoutStyle={{ fill: "white" }}
                    style={[{ fill: "green" }, { fill: "magenta" }]}
                  />
                }
              />
            }
          >
            <VictoryLine
              data={fromJS([
                { x: 1, y: 5, l: "one" },
                { x: 1.5, y: 5, l: "one point five" },
                { x: 2, y: 4, l: "two" },
                { x: 3, y: -2, l: "three" },
              ])}
              style={{
                data: {
                  stroke: themeColors.red,
                  strokeWidth: ({ active }) => (active ? 2 : 1),
                },
                labels: { fill: themeColors.red },
              }}
            />
            <VictoryLine
              data={fromJS([
                { x: 1, y: -3, l: "red" },
                { x: 2, y: 5, l: "green" },
                { x: 3, y: 3, l: "blue" },
              ])}
              style={{
                data: {
                  stroke: themeColors.blue,
                  strokeWidth: ({ active }) => (active ? 2 : 1),
                },
                labels: { fill: themeColors.blue },
              }}
            />
            <VictoryLine
              data={fromJS([
                { x: 1, y: 5, l: "cat" },
                { x: 2, y: -4, l: "dog" },
                { x: 3, y: -2, l: "bird" },
              ])}
              style={{
                data: {
                  stroke: themeColors.green,
                  strokeWidth: ({ active }) => (active ? 2 : 1),
                },
                labels: { fill: themeColors.green },
              }}
            />
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            theme={VictoryTheme.clean}
            containerComponent={
              <VictoryCursorContainer
                cursorLabel={({ datum }) =>
                  `${round(datum.x, 2)} , ${round(datum.y, 2)}`
                }
              />
            }
          >
            <VictoryLine
              data={fromJS(
                range(1500).map((x) => ({ x, y: x + 10 * Math.random() })),
              )}
            />
          </VictoryChart>

          <div>
            <VictoryChart
              theme={VictoryTheme.clean}
              width={800}
              height={500}
              scale={{ x: "time" }}
              containerComponent={
                <VictoryZoomContainer
                  responsive={false}
                  zoomDomain={this.state.zoomDomain}
                  zoomDimension="x"
                  onZoomDomainChange={(domain) =>
                    this.setState({ zoomDomain: domain })
                  }
                />
              }
            >
              <VictoryLine
                data={fromJS([
                  { x: new Date(1982, 1, 1), y: 125 },
                  { x: new Date(1987, 1, 1), y: 257 },
                  { x: new Date(1993, 1, 1), y: 345 },
                  { x: new Date(1997, 1, 1), y: 515 },
                  { x: new Date(2001, 1, 1), y: 132 },
                  { x: new Date(2005, 1, 1), y: 305 },
                  { x: new Date(2011, 1, 1), y: 270 },
                  { x: new Date(2015, 1, 1), y: 470 },
                ])}
              />
            </VictoryChart>

            <VictoryChart
              theme={VictoryTheme.clean}
              padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
              width={800}
              height={100}
              scale={{ x: "time" }}
              containerComponent={
                <VictoryBrushContainer
                  responsive={false}
                  brushDomain={this.state.zoomDomain}
                  brushDimension="x"
                  onBrushDomainChange={(domain) =>
                    this.setState({ zoomDomain: domain })
                  }
                />
              }
            >
              <VictoryAxis
                tickValues={[
                  new Date(1985, 1, 1),
                  new Date(1990, 1, 1),
                  new Date(1995, 1, 1),
                  new Date(2000, 1, 1),
                  new Date(2005, 1, 1),
                  new Date(2010, 1, 1),
                ]}
                tickFormat={(x) => new Date(x).getFullYear()}
              />
              <VictoryLine
                data={fromJS([
                  { x: new Date(1982, 1, 1), y: 125 },
                  { x: new Date(1987, 1, 1), y: 257 },
                  { x: new Date(1993, 1, 1), y: 345 },
                  { x: new Date(1997, 1, 1), y: 515 },
                  { x: new Date(2001, 1, 1), y: 132 },
                  { x: new Date(2005, 1, 1), y: 305 },
                  { x: new Date(2011, 1, 1), y: 270 },
                  { x: new Date(2015, 1, 1), y: 470 },
                ])}
              />
            </VictoryChart>
          </div>

          <VictoryChart style={chartStyle} animate theme={VictoryTheme.clean}>
            <VictoryStack colorScale={"warm"}>
              {this.state.multiTransitionAreaData.map((data, index) => {
                return (
                  <VictoryArea
                    key={index}
                    data={data}
                    interpolation={"basis"}
                  />
                );
              })}
            </VictoryStack>
          </VictoryChart>

          <VictoryChart
            theme={VictoryTheme.clean}
            style={chartStyle}
            containerComponent={<VictorySelectionContainer />}
          >
            <VictoryGroup
              data={fromJS([
                { x: 1, y: 5 },
                { x: 2, y: 4 },
                { x: 3, y: -2 },
              ])}
            >
              <VictoryLine style={{ data: { stroke: themeColors.purple } }} />
              <VictoryScatter
                style={scatterFillStyle}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>
            <VictoryGroup
              data={fromJS([
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
              ])}
            >
              <VictoryLine style={{ data: { stroke: themeColors.green } }} />
              <VictoryScatter
                style={scatterFillStyle}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>
            <VictoryGroup
              data={fromJS([
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
              ])}
            >
              <VictoryLine style={{ data: { stroke: themeColors.cyan } }} />
              <VictoryScatter
                style={scatterFillStyle}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart
            polar
            theme={VictoryTheme.clean}
            domain={{ y: [0, 1] }}
            style={chartStyle}
          >
            {keys(this.state.multiAxisMaxima).map((key, i) => {
              return (
                <VictoryPolarAxis
                  key={i}
                  dependentAxis
                  tickLabelComponent={
                    <VictoryLabel labelPlacement="vertical" />
                  }
                  labelPlacement="perpendicular"
                  axisValue={i + 1}
                  label={key}
                  tickFormat={(t) => t * this.state.multiAxisMaxima[key]}
                  tickValues={[0.25, 0.5, 0.75]}
                />
              );
            })}
            <VictoryPolarAxis labelPlacement="parallel" tickFormat={() => ""} />
            <VictoryGroup colorScale="warm">
              {this.state.multiAxisData.map((data, i) => {
                return <VictoryLine key={i} data={data} />;
              })}
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    );
  }
}
