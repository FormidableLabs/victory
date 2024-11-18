import React from "react";
import { VictoryChart } from "victory";
import { VictoryStack } from "victory";
import { VictoryArea } from "victory";
import { VictoryBar } from "victory";
import { VictoryLine } from "victory";
import { VictoryZoomContainer } from "victory";
import { VictoryVoronoiContainer } from "victory";
import range from "lodash/range";
import { VictoryTheme, VictoryThemePalette } from "victory";

const themeColors: VictoryThemePalette =
  VictoryTheme.clean.palette?.colors || {};
class App extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      data: this.getData(),
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: this.getData(),
      });
    }, 3000);
  }

  getData() {
    return range(10).map((i) => {
      return {
        x: i,
        y: Math.random(),
      };
    });
  }

  removeMutation() {
    this.setState({
      externalMutation: undefined,
    });
  }

  handleClick() {
    const callback = this.removeMutation.bind(this);
    this.setState({
      externalMutation: [
        {
          childName: "data",
          target: ["data", "labels"],
          eventKey: "all",
          mutation: (props) => {
            const fill = props.style && props.style.fill;
            return fill === themeColors.green
              ? {
                  style: { ...props.style, fill: themeColors.red },
                }
              : {
                  style: { ...props.style, fill: themeColors.green },
                };
          },
          callback,
        },
      ],
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
          callback,
        },
      ],
    });
  }

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };
    const chartStyle = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "35%" },
    };
    return (
      <div className="demo">
        <h1>Debug</h1>
        <div style={containerStyle}>
          <ul>
            <li>
              <button onClick={this.handleClick.bind(this)}>
                External Mutation
              </button>
            </li>
            <li>
              <button onClick={this.clearMutation.bind(this)}>
                Clear Mutation
              </button>
            </li>
          </ul>
          <VictoryChart
            theme={VictoryTheme.clean}
            style={chartStyle}
            domainPadding={20}
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
                        mutation: (props) => {
                          return {
                            style: { ...props.style, fill: themeColors.orange },
                          };
                        },
                      },
                      {
                        target: "labels",
                        mutation: (props) => {
                          return props.text === "clicked"
                            ? { text: "unclicked" }
                            : { text: "clicked" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryBar
              name="data"
              labels={() => null}
              data={this.state.data}
            />
          </VictoryChart>

          <VictoryBar
            theme={VictoryTheme.clean}
            style={chartStyle}
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
                        mutation: (props) => {
                          return {
                            style: { ...props.style, fill: themeColors.orange },
                          };
                        },
                      },
                      {
                        target: "labels",
                        mutation: (props) => {
                          return props.text === "clicked"
                            ? { text: "unclicked" }
                            : { text: "clicked" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.clean}
            style={chartStyle}
            externalEventMutations={this.state.externalMutation}
            events={[
              {
                childName: "data",
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          return {
                            style: {
                              ...props.style,
                              fill:
                                props.style.fill === themeColors.green
                                  ? themeColors.teal
                                  : themeColors.green,
                            },
                          };
                        },
                      },
                      {
                        target: "labels",
                        mutation: (props) => {
                          return props.text === "clicked"
                            ? { text: "unclicked" }
                            : { text: "clicked" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryStack colorScale={"qualitative"}>
              <VictoryBar
                data={[
                  { x: 1, y: 1 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 },
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 7 },
                ]}
              />
              <VictoryBar
                name="data"
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 9 },
                ]}
              />
            </VictoryStack>
          </VictoryChart>
          <VictoryStack
            theme={VictoryTheme.clean}
            style={chartStyle}
            externalEventMutations={this.state.externalMutation}
            containerComponent={<VictoryVoronoiContainer />}
          >
            <VictoryBar
              name="data"
              style={{
                data: {
                  fill: themeColors.yellow,
                  stroke: ({ active }) => (active ? "black" : "none"),
                },
              }}
              barWidth={({ active }) => (active ? 22 : 20)}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 },
              ]}
            />
            <VictoryBar
              style={{
                data: {
                  fill: themeColors.orange,
                  stroke: ({ active }) => (active ? "black" : "none"),
                },
              }}
              barWidth={({ active }) => (active ? 22 : 20)}
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 },
              ]}
            />
          </VictoryStack>
          <VictoryChart
            theme={VictoryTheme.clean}
            style={chartStyle}
            containerComponent={<VictoryZoomContainer />}
            externalEventMutations={this.state.externalMutation}
          >
            <VictoryArea
              name="data"
              data={this.state.data}
              interpolation="stepBefore"
            />
            <VictoryLine data={this.state.data} interpolation="stepBefore" />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
