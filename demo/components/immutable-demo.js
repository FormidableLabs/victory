/* global window:false */
/* eslint-disable no-magic-numbers, react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";
import { assign, merge, keys, random, range, round } from "lodash";
import { fromJS } from "immutable";
import {
  VictoryClipContainer,
  VictoryLabel,
  VictoryLegend,
  VictoryTheme,
  VictoryTooltip
} from "../../packages/victory-core/src/index";

import {
  VictoryArea,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryCandlestick,
  VictoryChart,
  VictoryCursorContainer,
  VictoryErrorBar,
  VictoryGroup,
  VictoryLine,
  VictoryPolarAxis,
  VictoryScatter,
  VictorySelectionContainer,
  VictoryStack,
  VictoryVoronoi,
  VictoryVoronoiContainer,
  VictoryZoomContainer
} from "../../packages/victory-chart/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index"

class Wrapper extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  renderChildren(props) {
    const children = React.Children.toArray(props.children);
    return children.map((child) => {
      return React.cloneElement(child, assign({}, child.props, props));
    });
  }

  render() {
    return (
      <g>{this.renderChildren(this.props)}</g>
    );
  }
}

const multiAxisData = [
  { strength: 1, intelligence: 250, stealth: 45 },
  { strength: 2, intelligence: 300, stealth: 75 },
  { strength: 5, intelligence: 225, stealth: 60 }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterData: this.getScatterData(),
      multiTransitionData: this.getMultiTransitionData(),
      multiTransitionAreaData: this.getMultiTransitionAreaData(),
      multiAxisData: this.processMultiAxisData(multiAxisData),
      multiAxisMaxima: this.getMaxData(multiAxisData),
      zoomDomain: {}
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        scatterData: this.getScatterData(),
        multiTransitionData: this.getMultiTransitionData(),
        multiTransitionAreaData: this.getMultiTransitionAreaData()
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
      "greenyellow"
    ];
    const symbols = [
      "circle",
      "star",
      "square",
      "triangleUp",
      "triangleDown",
      "diamond",
      "plus"
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
          opacity: 1
        };
      })
    );
  }

  getMultiTransitionData() {
    const bars = random(3, 5);
    return fromJS(
      range(4).map(() => {
        return range(bars).map((bar) => {
          return { x: bar + 1, y: random(2, 10) };
        });
      })
    );
  }

  getMultiTransitionAreaData() {
    const areas = random(8, 10);
    return fromJS(
      range(8).map(() => {
        return range(areas).map((area) => {
          return { x: area, y: random(2, 10) };
        });
      })
    );
  }

  getMaxData(data) {
    const groupedData = keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processMultiAxisData(data) {
    const maxByGroup = this.getMaxData(data);
    const makeDataArray = (d) => {
      return keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return fromJS(
      data.map((datum) => makeDataArray(datum))
    );
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const chartStyle = {
      parent: {
        border: "1px solid #ccc",
        margin: "2%",
        maxWidth: "40%"
      }
    };

    return (
      <div className="demo">
        <h1>with immutable.js data</h1>

        <div style={containerStyle}>
          <VictoryChart style={chartStyle} animate={{ duration: 2000 }}>
            <VictoryScatter
              groupComponent={<VictoryClipContainer/>}
              data={this.state.scatterData}
              style={{ data: { fill: (d) => d.fill, opacity: (d) => d.opacity } }}
              animate={{
                onExit: {
                  duration: 500,
                  before: () => ({ opacity: 0.3 })
                },
                onEnter: {
                  duration: 500,
                  before: () => ({ opacity: 0.3 }),
                  after: (datum) => ({ opacity: datum.opacity || 1 })
                }
              }}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle}
            theme={VictoryTheme.material}
            events={[{
              childName: "area-1",
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      childName: "area-2",
                      target: "data",
                      mutation: (props) => {
                        return { style: merge({}, props.style, { fill: "gold" }) };
                      }
                    }, {
                      childName: "area-3",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: merge({}, props.style, { fill: "orange" })
                        };
                      }
                    }, {
                      childName: "area-4",
                      target: "data",
                      mutation: (props) => {
                        return {
                          style: merge({}, props.style, { fill: "red" })
                        };
                      }
                    }
                  ];
                }
              }
            }]}
          >
            <VictoryStack>
              <VictoryArea name="area-1"
                data={fromJS([
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 5 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ])}
              />
              <VictoryArea name="area-2"
                data={fromJS([
                  { x: "a", y: 1 },
                  { x: "b", y: 4 },
                  { x: "c", y: 5 },
                  { x: "d", y: 7 },
                  { x: "e", y: 5 }
                ])}
              />
              <VictoryArea name="area-3"
                data={fromJS([
                  { x: "a", y: 3 },
                  { x: "b", y: 2 },
                  { x: "c", y: 6 },
                  { x: "d", y: 2 },
                  { x: "e", y: 6 }
                ])}
              />
              <VictoryArea name="area-4"
                data={fromJS([
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 3 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ])}
              />
            </VictoryStack>
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            domainPadding={{ x: 30 }}
            theme={VictoryTheme.material}
          >
            <VictoryGroup
              offset={12}
              animate={{ duration: 1000 }}
              colorScale={"warm"}
            >
              {this.state.multiTransitionData.map((data, index) => {
                return <Wrapper key={index}><VictoryBar key={index} data={data}/></Wrapper>;
              })}
            </VictoryGroup>
          </VictoryChart>

          <VictoryLine
            style={chartStyle}
            labels={(datum) => Math.round(datum.y)}
            data={fromJS([
              { x: new Date(1982, 1, 1), y: 125 },
              { x: new Date(1987, 1, 1), y: 257 },
              { x: new Date(1993, 1, 1), y: 345 },
              { x: new Date(1997, 1, 1), y: 515 },
              { x: new Date(2001, 1, 1), y: 132 },
              { x: new Date(2005, 1, 1), y: 305 },
              { x: new Date(2011, 1, 1), y: 270 },
              { x: new Date(2015, 1, 1), y: 470 }
            ])}
          />

          <VictoryChart style={chartStyle}>
            <VictoryErrorBar
              data={fromJS([
                { x: 1, y: 1, errorX: [1, 0.5], errorY: .1 },
                { x: 2, y: 2, errorX: [1, 3], errorY: .1 },
                { x: 3, y: 3, errorX: [1, 3], errorY: [.2, .3] },
                { x: 4, y: 2, errorX: [1, 0.5], errorY: .1 },
                { x: 5, y: 1, errorX: [1, 0.5], errorY: .2 }
              ])}
            />
            <VictoryLine
              data={fromJS([
                { x: 1, y: 1, errorX: [1, 0.5], errorY: .1 },
                { x: 2, y: 2, errorX: [1, 3], errorY: .1 },
                { x: 3, y: 3, errorX: [1, 3], errorY: [.2, .3] },
                { x: 4, y: 2, errorX: [1, 0.5], errorY: .1 },
                { x: 5, y: 1, errorX: [1, 0.5], errorY: .2 }
              ])}
            />
          </VictoryChart>

          <svg height={500} width={500}>
            <VictoryCandlestick
              style={merge(
                {},
                chartStyle,
                { data: { width: 10 } }
              )}
              data={fromJS([
                { x: new Date(2016, 6, 1), open: 9, close: 30, high: 56, low: 7 },
                { x: new Date(2016, 6, 2), open: 80, close: 40, high: 120, low: 10 },
                { x: new Date(2016, 6, 3), open: 50, close: 80, high: 90, low: 20 },
                { x: new Date(2016, 6, 4), open: 70, close: 22, high: 70, low: 5 },
                { x: new Date(2016, 6, 5), open: 20, close: 35, high: 50, low: 10 },
                { x: new Date(2016, 6, 6), open: 35, close: 30, high: 40, low: 3 },
                { x: new Date(2016, 6, 7), open: 30, close: 90, high: 95, low: 30 },
                { x: new Date(2016, 6, 8), open: 80, close: 81, high: 83, low: 75 }
              ])}
              size={8}
              standalone={false}
              events={[{
                target: "labels",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          return {
                            style: merge({}, props.style.labels, { fill: "orange" })
                          };
                        }
                      }
                    ];
                  }
                }
              },
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          return {
                            style: merge({}, props.style, { fill: "blue" })
                          };
                        }
                      }
                    ];
                  }
                }
              }]}
            />
            <VictoryAxis
              standalone={false}
            />
          </svg>

          <VictoryChart style={chartStyle} domainPadding={{ x: 30, y: 30 }}
            events={[{
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
                      }
                    }, {
                      childName: "line",
                      target: "data",
                      mutation: (props) => {
                        return { style: merge({}, props.style, { stroke: "lime" }) };
                      }
                    }, {
                      childName: "line",
                      target: "labels",
                      mutation: (props) => {
                        return {
                          style: merge({}, props.style, { fill: "green" }),
                          text: "waddup"
                        };
                      }
                    }
                  ];
                }
              }
            }]}
          >
            <VictoryBar name="bar"
              style={{ data: { width: 15, fill: "green" } }}
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
                { x: 13, y: 1 }
              ])}
            />
            <VictoryLine name="line"
              y={() => 0.5}
              style={{ data: { stroke: "blue", strokeWidth: 5 } }}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle} domainPadding={20}>
            <VictoryStack
              style={{
                data: { strokeDasharray: "10, 5" }
              }}
              colorScale="qualitative"
            >
              <VictoryGroup
                color={"purple"}
                data={fromJS([
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 2 }
                ])}
                style={{
                  data: { width: 40, opacity: 0.6 }
                }}
              >
                <VictoryBar/>
                <VictoryLine/>
              </VictoryGroup>
              <VictoryGroup
                data={fromJS([
                  { x: 1, y: 4 },
                  { x: 2, y: 5 },
                  { x: 3, y: 1 }
                ])}
                style={{
                  data: { width: 20, opacity: 0.8 }
                }}
              >
                <VictoryBar/>
                <VictoryLine/>
              </VictoryGroup>
              <VictoryGroup
                data={fromJS([
                  { x: 1, y: 3 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 }
                ])}
                style={{
                  data: { width: 10, opacity: 1 }
                }}
              >
                <VictoryBar/>
                <VictoryLine/>
                <VictoryScatter
                  symbol={"plus"}
                  size={10}
                  style={{
                    data: { fill: "tomato" }
                  }}
                />
              </VictoryGroup>
            </VictoryStack>
          </VictoryChart>

          <VictoryVoronoi
            style={merge({}, chartStyle, {
              data: { fill: "gray", opacity: 0.1, stroke: "black", strokeWidth: 2 }
            })}
            data={fromJS([
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 1 }
            ])}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => ([
                    {
                      mutation: () => ({ style: { fill: "orange" } })
                    }
                  ])
                }
              }
            ]}
          />

          <VictoryCandlestick
            style={chartStyle}
            labelComponent={<VictoryTooltip/>}
            labels={(d) => `hello #${d.x}`}
            data={fromJS([
              { x: 1, open: 5, close: 10, high: 15, low: 0 },
              { x: 2, open: 15, close: 10, high: 20, low: 5 },
              { x: 3, open: 15, close: 20, high: 25, low: 10 },
              { x: 4, open: 20, close: 25, high: 30, low: 15 },
              { x: 5, open: 30, close: 25, high: 35, low: 20 }
            ])}
          />

          <VictoryChart style={chartStyle}
            height={400}
            padding={{ top: 80, bottom: 50, left: 50, right: 50 }}
            containerComponent={<VictoryZoomContainer/>}
            theme={VictoryTheme.material}
            events={[{
              childName: "area-1",
              target: "data",
              eventHandlers: {
                onClick: () => ([
                  {
                    childName: "area-2",
                    target: "data",
                    mutation: (props) => {
                      return { style: merge({}, props.style, { fill: "gold" }) };
                    }
                  }, {
                    childName: "area-3",
                    target: "data",
                    mutation: (props) => {
                      return {
                        style: merge({}, props.style, { fill: "orange" })
                      };
                    }
                  }, {
                    childName: "area-4",
                    target: "data",
                    mutation: (props) => {
                      return {
                        style: merge({}, props.style, { fill: "red" })
                      };
                    }
                  }
                ])
              }
            }]}
          >
          <VictoryLegend x={83} y={10}
            title="Legend"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
            data={[
              { name: "One", symbol: { fill: "tomato" } },
              { name: "Two", symbol: { fill: "orange" } },
              { name: "Three", symbol: { fill: "gold" } }
            ]}
          />
            <VictoryAxis/>
            <VictoryStack>
              <VictoryArea name="area-1"
                data={fromJS([
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 5 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ])}
              />
              <VictoryArea name="area-2"
                data={fromJS([
                  { x: "a", y: 1 },
                  { x: "b", y: 4 },
                  { x: "c", y: 5 },
                  { x: "d", y: 7 },
                  { x: "e", y: 5 }
                ])}
              />
              <VictoryArea name="area-3"
                data={fromJS([
                  { x: "a", y: 3 },
                  { x: "b", y: 2 },
                  { x: "c", y: 6 },
                  { x: "d", y: 2 },
                  { x: "e", y: 6 }
                ])}
              />
              <VictoryArea name="area-4"
                data={fromJS([
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 3 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ])}
              />
            </VictoryStack>
            <VictoryAxis dependentAxis/>
          </VictoryChart>

          <VictoryChart style={chartStyle}
            theme={VictoryTheme.material}
            domainPadding={{ y: 2 }}
            containerComponent={
              <VictoryVoronoiContainer voronoiDimension="x"
                labels={(d) => `y:${d.y}`}
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
                { x: 3, y: -2, l: "three" }
              ])}
              style={{
                data: { stroke: "tomato", strokeWidth: (d, active) => active ? 4 : 2 },
                labels: { fill: "tomato" }
              }}
            />
            <VictoryLine
              data={fromJS([
                { x: 1, y: -3, l: "red" },
                { x: 2, y: 5, l: "green" },
                { x: 3, y: 3, l: "blue" }
              ])}
              style={{
                data: { stroke: "blue", strokeWidth: (d, active) => active ? 4 : 2 },
                labels: { fill: "blue" }
              }}
            />
            <VictoryLine
              data={fromJS([
                { x: 1, y: 5, l: "cat" },
                { x: 2, y: -4, l: "dog" },
                { x: 3, y: -2, l: "bird" }
              ])}
              style={fromJS({
                data: { stroke: "black", strokeWidth: (d, active) => active ? 4 : 2 },
                labels: { fill: "black" }
              })}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle}
            theme={VictoryTheme.material}
            height={400}
            padding={{ top: 100, bottom: 40, left: 50, right: 50 }}
            containerComponent={
              <VictoryCursorContainer
                cursorLabel={(d) => `${round(d.x, 2)} , ${round(d.y, 2)}`}
              />
            }
          >
            <VictoryLegend x={90} y={10}
              title="Legend"
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
              data={[
                { name: "One", symbol: { fill: "tomato" } },
                { name: "Two", symbol: { fill: "orange" } },
                { name: "Three", symbol: { fill: "gold" } }
              ]}
            />
            <VictoryLine data={fromJS(range(1500).map((x) => ({ x, y: x + 10 * Math.random() })))}/>
          </VictoryChart>

          <div>
            <VictoryChart width={800} height={500} scale={{ x: "time" }}
              containerComponent={
                <VictoryZoomContainer responsive={false}
                  zoomDomain={this.state.zoomDomain}
                  zoomDimension="x"
                  onZoomDomainChange={(domain) => this.setState({ zoomDomain: domain })}
                />
              }
            >
              <VictoryLine
                style={{
                  data: { stroke: "tomato" }
                }}
                data={fromJS([
                  { x: new Date(1982, 1, 1), y: 125 },
                  { x: new Date(1987, 1, 1), y: 257 },
                  { x: new Date(1993, 1, 1), y: 345 },
                  { x: new Date(1997, 1, 1), y: 515 },
                  { x: new Date(2001, 1, 1), y: 132 },
                  { x: new Date(2005, 1, 1), y: 305 },
                  { x: new Date(2011, 1, 1), y: 270 },
                  { x: new Date(2015, 1, 1), y: 470 }
                ])}
              />
            </VictoryChart>

            <VictoryChart
              padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
              width={800} height={100} scale={{ x: "time" }}
              containerComponent={
                <VictoryBrushContainer responsive={false}
                  brushDomain={this.state.zoomDomain}
                  brushDimension="x"
                  onBrushDomainChange={(domain) => this.setState({ zoomDomain: domain })}
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
                  new Date(2010, 1, 1)
                ]}
                tickFormat={(x) => new Date(x).getFullYear()}
              />
              <VictoryLine
                style={{
                  data: { stroke: "tomato" }
                }}
                data={fromJS([
                  { x: new Date(1982, 1, 1), y: 125 },
                  { x: new Date(1987, 1, 1), y: 257 },
                  { x: new Date(1993, 1, 1), y: 345 },
                  { x: new Date(1997, 1, 1), y: 515 },
                  { x: new Date(2001, 1, 1), y: 132 },
                  { x: new Date(2005, 1, 1), y: 305 },
                  { x: new Date(2011, 1, 1), y: 270 },
                  { x: new Date(2015, 1, 1), y: 470 }
                ])}
              />
            </VictoryChart>
          </div>

          <VictoryChart
            style={chartStyle}
            animate
            theme={VictoryTheme.material}
          >
            <VictoryStack
              colorScale={"warm"}
            >
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

          <VictoryChart style={chartStyle}
            containerComponent={<VictorySelectionContainer/>}
          >
            <VictoryGroup
              data={fromJS([
                { x: 1, y: 5 },
                { x: 2, y: 4 },
                { x: 3, y: -2 }
              ])}
            >
              <VictoryLine style={{ data: { stroke: "tomato" } }}/>
              <VictoryScatter
                style={{ data: { fill: (d, active) => active ? "tomato" : "gray" } }}
                labels={(d) => d.y}
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryGroup>
            <VictoryGroup
              data={fromJS([
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 }
              ])}
            >
              <VictoryLine style={{ data: { stroke: "blue" } }}/>
              <VictoryScatter
                style={{ data: { fill: (d, active) => active ? "blue" : "gray" } }}
                labels={(d) => d.y}
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryGroup>
            <VictoryGroup
              data={fromJS([
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 }
              ])}
            >
              <VictoryLine style={{ data: { stroke: "black" } }}/>
              <VictoryScatter
                style={{ data: { fill: (d, active) => active ? "black" : "gray" } }}
                labels={(d) => d.y}
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart polar
            theme={VictoryTheme.material}
            domain={{ y: [ 0, 1 ] }}
            style={chartStyle}
          >
            {
              keys(this.state.multiAxisMaxima).map((key, i) => {
                return (
                  <VictoryPolarAxis key={i} dependentAxis
                    style={{
                      axisLabel: { padding: 10 }
                    }}
                    tickLabelComponent={<VictoryLabel labelPlacement="vertical"/>}
                    labelPlacement="perpendicular"
                    axisValue={i + 1} label={key}
                    tickFormat={(t) => t * this.state.multiAxisMaxima[key]}
                    tickValues={[0.25, 0.5, 0.75]}
                  />
                );
              })
            }
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickFormat={() => ""}
            />
            <VictoryGroup colorScale="warm">
              {this.state.multiAxisData.map((data, i) => {
                return <VictoryLine key={i} data={data}/>;
              })}
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
