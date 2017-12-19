/*global window:false */
import React from "react";
import PropTypes from "prop-types";
import { assign, merge, random, range } from "lodash";
import { fromJS } from "immutable";
import { VictoryClipContainer, VictoryTheme } from "victory-core";

import {
  VictoryArea,
  VictoryBar,
  VictoryChart,
  VictoryErrorBar,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryStack
} from "../../src/index";

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterData: this.getScatterData(),
      multiTransitionData: this.getMultiTransitionData()
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        scatterData: this.getScatterData(),
        multiTransitionData: this.getMultiTransitionData()
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
        </div>

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
      </div>
    );
  }
}

export default App;
