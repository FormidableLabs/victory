/*eslint-disable no-magic-numbers */
/*global window:false*/

import React from "react";
import {
  VictoryChart, VictoryBar, VictoryStack, VictoryVoronoiContainer,
  VictoryLine, VictoryArea, VictoryZoomContainer
} from "../../src/index";
import { range } from "lodash";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData()
    };
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 3000);
  }

  getData() {
    return range(10).map((i) => {
      return {
        x: i,
        y: Math.random()
      };
    });
  }

  removeMutation() {
    this.setState({
      externalMutation: undefined
    });
  }

  handleClick() {
    const callback = this.removeMutation.bind(this);
    this.setState({
      externalMutation: [{
        childName: "data",
        target: ["data", "labels"],
        eventKey: "all",
        mutation: (props) => {
          const fill = props.style && props.style.fill;
          return fill === "blue" ?
            { style: Object.assign({}, props.style, { fill: "red" }) } :
            { style: Object.assign({}, props.style, { fill: "blue" }) };
        },
        callback
      }]
    });
  }

  clearMutation() {
    const callback = this.removeMutation.bind(this);
    this.setState({
      externalMutation: [
        {
          childName: "data",
          target: "all",
          eventKey: "all",
          mutation: () => ({ style: undefined }),
          callback
        }
      ]
    });
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };
    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "35%" } };
    return (
      <div className="demo">
        <h1>Debug</h1>
        <div style={containerStyle}>
          <ul>
            <li><button onClick={this.handleClick.bind(this)}>External Mutation</button></li>
            <li><button onClick={this.clearMutation.bind(this)}>Clear Mutation</button></li>
          </ul>
          <VictoryChart style={chartStyle} domainPadding={{ x: 40 }}
            animate
            externalEventMutations={this.state.externalMutation}
            events={[
              {
                childName: "data",
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: () => {
                          return { style: { fill: "orange" } };
                        }
                      }, {
                        target: "labels",
                        mutation: (props) => {
                          return props.text === "clicked" ?
                            { text: "unclicked" } : { text: "clicked" };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          >
            <VictoryBar
              name="data"
              data={this.state.data}
              style={{ data: { fill: "cyan" } }}
            />
          </VictoryChart>

          <VictoryBar style={chartStyle}
            animate
            data={this.state.data}
            externalEventMutations={this.state.externalMutation}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: () => {
                          return { style: { fill: "orange" } };
                        }
                      }, {
                        target: "labels",
                        mutation: (props) => {
                          return props.text === "clicked" ?
                            { text: "unclicked" } : { text: "clicked" };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          />
          <VictoryChart style={chartStyle}
            externalEventMutations={this.state.externalMutation}
            events={[
              {
                childName: "data",
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: () => {
                          return { style: { fill: "orange" } };
                        }
                      }, {
                        target: "labels",
                        mutation: (props) => {
                          return props.text === "clicked" ?
                            { text: "unclicked" } : { text: "clicked" };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          >
            <VictoryStack
              colorScale={"qualitative"}
            >
              <VictoryBar
                data={[
                  { x: 1, y: 1 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 7 }
                ]}
              />
              <VictoryBar name="data"
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 9 }
                ]}
              />
            </VictoryStack>
          </VictoryChart>
          <VictoryStack style={chartStyle}
            externalEventMutations={this.state.externalMutation}
            containerComponent={<VictoryVoronoiContainer/>}
          >
            <VictoryBar name="data"
              style={{
                data: {
                  fill: "tomato",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 }
              ]}
            />
            <VictoryBar
              style={{
                data: {
                  fill: "orange",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 }
              ]}
            />
          </VictoryStack>
          <VictoryChart
            style={chartStyle}
            containerComponent={<VictoryZoomContainer/>}
            externalEventMutations={this.state.externalMutation}
          >
            <VictoryArea name="data"
              style={{ data: { stroke: "#333", fill: "#888", opacity: 0.4 } }}
              data={this.state.data}
              interpolation="stepBefore"
            />
            <VictoryLine data={this.state.data} interpolation="stepBefore"/>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
