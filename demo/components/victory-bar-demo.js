/*global window:false*/
/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryStack } from "../../packages/victory-stack/src/index";
import { VictoryGroup } from "../../packages/victory-group/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictorySharedEvents } from "../../packages/victory-shared-events/src/index";

import {
  VictoryContainer,
  VictoryTheme,
  VictoryLabel
} from "../../packages/victory-core/src/index";
import { assign, random, range, merge } from "lodash";

class Wrapper extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
  };

  renderChildren(props) {
    const children = React.Children.toArray(props.children);
    return children.map((child) => {
      return React.cloneElement(child, assign({}, child.props, props));
    });
  }

  render() {
    return <g>{this.renderChildren(this.props)}</g>;
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      barData: this.getBarData(),
      barTransitionData: this.getBarTransitionData(),
      multiTransitionData: this.getMultiTransitionData(),
      numericBarData: this.getNumericBarData()
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        barData: this.getBarData(),
        barTransitionData: this.getBarTransitionData(),
        multiTransitionData: this.getMultiTransitionData(),
        numericBarData: this.getNumericBarData()
      });
    }, 5000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getBarData() {
    return range(5).map(() => {
      return [
        {
          x: "rabbits",
          y: random(-5, 5)
        },
        {
          x: "cats",
          y: random(-10, 10)
        },
        {
          x: "dogs",
          y: random(-15, 15)
        }
      ];
    });
  }

  getNumericBarData() {
    return range(5).map(() => {
      return [
        {
          x: random(1, 3),
          y: random(1, 5)
        },
        {
          x: random(4, 7),
          y: random(1, 10)
        },
        {
          x: random(9, 11),
          y: random(0, 15)
        }
      ];
    });
  }

  getBarTransitionData() {
    const bars = random(6, 10);
    return range(bars).map((bar) => {
      return { a: bar + 1, b: random(2, 10) };
    });
  }

  getMultiTransitionData() {
    const bars = random(3, 5);
    return range(4).map(() => {
      return range(bars).map((bar) => {
        return { x: bar + 1, y: random(2, 10) };
      });
    });
  }

  render() {
    const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };

    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>
        <ChartWrap scale={{ x: "log", y: "linear" }}>
          <VictoryBar
            cornerRadius={4}
            scale={{ x: "log", y: "linear" }}
            horizontal
            data={[
              { x: 1, y: 0.1 },
              { x: 2, y: 1 },
              { x: 3, y: 10 },
              { x: 4, y: 100 },
              { x: 5, y: 0.1 },
              { x: 6, y: 1 },
              { x: 7, y: 10 },
              { x: 8, y: 100 }
            ]}
          />
        </ChartWrap>

        <ChartWrap scale={{ x: "linear", y: "log" }}>
          <VictoryBar
            cornerRadius={5}
            style={{ data: { width: 15, fill: "red" } }}
            scale={{ x: "linear", y: "log" }}
            data={[
              { x: 1, y: 0.1 },
              { x: 2, y: 1 },
              { x: 3, y: 10 },
              { x: 4, y: 100 },
              { x: 5, y: 0.1 },
              { x: 6, y: 1 },
              { x: 7, y: 10 },
              { x: 8, y: 100 }
            ]}
          />
        </ChartWrap>
        <ChartWrap>
          <VictoryBar
            horizontal
            labels={(d) => d.y}
            data={[
              { x: 1, y: "Label 1" },
              { x: 7, y: "Label 2" },
              { x: 3, y: "Label 3" },
              { x: 4, y: "Label 4" }
            ]}
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            horizontal
            labels={(d) => d.y}
            data={[{ x: 1, y: 20 }, { x: 7, y: -40 }, { x: 3, y: -60 }, { x: 4, y: 80 }]}
          />
        </ChartWrap>

        <ChartWrap>
          <VictoryBar
            labels={(d) => d.y}
            data={[{ x: 1, y: 20 }, { x: 7, y: -40 }, { x: 3, y: -60 }, { x: 4, y: 80 }]}
          />
        </ChartWrap>

        <VictoryChart domainPadding={{ y: 20 }}>
          <VictoryBar
            data={[
              { x: 1, y: "Alpha" },
              { x: 7, y: "Beta" },
              { x: 3, y: "Charlie" },
              { x: 4, y: "Delta" }
            ]}
          />
        </VictoryChart>

        <VictoryChart style={{ parent: parentStyle }} theme={VictoryTheme.material}>
          <VictoryBar
            horizontal
            alignment="start"
            data={[
              { x: 2, y: "Echo" },
              { x: 6, y: "Foxtrot" },
              { x: 3, y: "Golf" },
              { x: 4, y: "Hotel" }
            ]}
          />
        </VictoryChart>

        <VictoryBar
          style={{ parent: parentStyle }}
          labels={() => "HELLO"}
          labelComponent={<VictoryLabel angle={45} verticalAnchor="end" textAnchor="end" />}
          animate={{
            duration: 500,
            onExit: {
              duration: 1000
            },
            onEnter: {
              duration: 500
            }
          }}
          containerComponent={
            <VictoryContainer
              title="Bar Chart"
              desc="This is an animated bar chart that displays data with labels."
            />
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return { style: merge({}, props.style, { fill: "orange" }) };
                      }
                    },
                    {
                      target: "labels",
                      mutation: () => {
                        return { text: "hey" };
                      }
                    }
                  ];
                }
              }
            }
          ]}
          data={this.state.barTransitionData}
          x="a"
          y="b"
        />
        <VictoryStack style={{ parent: parentStyle }} animate={{ duration: 1000 }}>
          {this.state.multiTransitionData.map((data, index) => {
            return (
              <Wrapper key={index}>
                <VictoryBar data={data} colorScale={"warm"} />
              </Wrapper>
            );
          })}
        </VictoryStack>

        <VictoryChart
          style={{ parent: parentStyle }}
          domainPadding={{ x: 30 }}
          theme={VictoryTheme.material}
        >
          <VictoryGroup offset={12} animate={{ duration: 1000 }} colorScale={"warm"}>
            {this.state.multiTransitionData.map((data, index) => {
              return (
                <Wrapper key={index}>
                  <VictoryBar key={index} data={data} />
                </Wrapper>
              );
            })}
          </VictoryGroup>
        </VictoryChart>

        <VictoryGroup
          style={{ parent: parentStyle }}
          offset={18}
          colorScale={"qualitative"}
          animate={{ duration: 2000 }}
        >
          {this.getBarData().map((data, index) => {
            return <VictoryBar key={index} data={data} labels={["a", "b", "c"]} />;
          })}
        </VictoryGroup>

        <VictoryGroup
          horizontal
          style={{ parent: parentStyle }}
          offset={15}
          colorScale={"cool"}
          animate={{ duration: 2000 }}
          labels={["a", "b", "c"]}
        >
          {this.getBarData().map((data, index) => {
            return <VictoryBar key={index} data={data} />;
          })}
        </VictoryGroup>

        <VictoryGroup
          style={{ parent: parentStyle, data: { width: 20 } }}
          offset={25}
          animate={{ duration: 2000 }}
        >
          <VictoryStack colorScale={"red"}>
            {this.getBarData().map((data, index) => {
              return <VictoryBar key={index} data={data} />;
            })}
          </VictoryStack>
          <VictoryStack colorScale={"green"}>
            {this.getBarData().map((data, index) => {
              return <VictoryBar key={index} data={data} />;
            })}
          </VictoryStack>
          <VictoryStack colorScale={"blue"}>
            {this.getBarData().map((data, index) => {
              return <VictoryBar key={index} data={data} />;
            })}
          </VictoryStack>
        </VictoryGroup>

        <VictoryStack
          style={{ parent: parentStyle }}
          animate={{ duration: 2000 }}
          colorScale={"warm"}
          labels={["one", "two", "three"]}
        >
          {this.getBarData().map((data, index) => {
            return <VictoryBar key={index} data={data} />;
          })}
        </VictoryStack>

        <ChartWrap>
          <VictoryBar
            height={250}
            data={[{ a: { b: { c: 1, d: 1 } } }, { a: { b: { c: 2, d: 3 } } }]}
            x={"a.b.c"}
            y={"a.b.d"}
          />
        </ChartWrap>

        <VictoryStack colorScale="warm" style={{ parent: parentStyle }}>
          <Wrapper>
            <VictoryBar
              data={[{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 4 }]}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          mutation: (props) => {
                            return { style: merge({}, props.style, { fill: "orange" }) };
                          }
                        }
                      ];
                    }
                  }
                }
              ]}
            />
          </Wrapper>
          <VictoryBar
            data={[{ x: "c", y: 2 }, { x: "d", y: 3 }, { x: "e", y: 4 }]}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          return { style: merge({}, props.style, { fill: "blue" }) };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
        </VictoryStack>
        <svg width={500} height={300} style={{ parent: parentStyle }}>
          <VictorySharedEvents
            events={[
              {
                childName: "firstBar",
                target: "data",
                eventKey: 1,
                eventHandlers: {
                  onClick: () => {
                    return {
                      childName: "secondBar",
                      mutation: (props) => {
                        return { style: merge({}, props.style, { fill: "blue" }) };
                      }
                    };
                  }
                }
              },
              {
                childName: "secondBar",
                target: "data",
                eventKey: 0,
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        childName: "firstBar",
                        mutation: (props) => {
                          return props.style.fill === "cyan"
                            ? null
                            : { style: merge({}, props.style, { fill: "cyan" }) };
                        }
                      },
                      {
                        mutation: (props) => {
                          return { style: merge({}, props.style, { fill: "orange" }) };
                        }
                      },
                      {
                        target: "labels",
                        eventKey: 1,
                        mutation: () => {
                          return { text: "CLICKED" };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          >
            <VictoryBar
              name="firstBar"
              style={{
                data: { width: 25, fill: "gold" }
              }}
              data={[{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 4 }]}
            />
            <VictoryBar
              name={"secondBar"}
              data={[{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 4 }]}
            />
          </VictorySharedEvents>
        </svg>
        <VictoryBar
          theme={VictoryTheme.grayscale}
          style={{
            parent: parentStyle,
            data: { fill: "blue" }
          }}
          labels={["a", "b", "c", "d", "e"]}
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3, label: "click me" },
            { x: 4, y: 2 },
            { x: 5, y: 1 }
          ]}
          events={[
            {
              target: "data",
              eventKey: 2,
              eventHandlers: {
                onClick: (evt) => {
                  evt.stopPropagation();
                  return [
                    {
                      mutation: () => {
                        return { style: { fill: "orange" } };
                      }
                    }
                  ];
                }
              }
            },
            {
              target: "parent",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "labels",
                      mutation: () => {
                        return { text: "o shit" };
                      }
                    }
                  ];
                }
              }
            }
          ]}
        />

        <VictoryChart>
          <VictoryBar
            horizontal
            data={[
              { x: 21, y: "Label 1" },
              { x: 28, y: "Label 2" },
              { x: 35, y: "Label 3" },
              { x: 40, y: "Label 4" }
            ]}
            x={"y"}
            y={"x"}
          />
        </VictoryChart>

        <VictoryChart>
          <VictoryBar data={[[5, 10], [10, 15], [15, 20], [20, 25]]} x={0} y={1} />
        </VictoryChart>
      </div>
    );
  }
}

class ChartWrap extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    height: PropTypes.number,
    width: PropTypes.number
  };
  static defaultProps = {
    height: 250,
    width: 350
  };
  // renders both a standalone chart, and a version wrapped in VictoryChart,
  // to test both cases at once
  render() {
    const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };

    return (
      <div style={{ parent: parentStyle }}>
        {React.cloneElement(this.props.children)}
        <VictoryChart {...this.props}>{this.props.children}</VictoryChart>
      </div>
    );
  }
}
