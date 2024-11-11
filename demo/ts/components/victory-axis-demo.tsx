import React from "react";
import { random, range } from "lodash";
import { DomainPropType } from "victory-core";
import { VictoryAxis, VictoryAxisProps } from "victory-axis";
import { VictoryLabel, VictoryContainer, VictoryTheme } from "victory-core";

interface VictoryAxisDemoState {
  tickValues: number[];
  domain: DomainPropType;
}

export default class VictoryAxisDemo extends React.Component<
  any,
  VictoryAxisDemoState
> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      tickValues: [5, 10, 25, 31, 42],
      domain: [-5, 5],
    };
  }

  componentDidMount() {
     
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        tickValues: this.getTickValues(),
        domain: this.getDomain(),
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getTickValues() {
    return range(5).map((i) => {
      return 10 * i + random(5);
    });
  }

  getDomain(): DomainPropType {
    const someNumber = random(2, 5);
    return [-someNumber, someNumber];
  }

  render() {
    const style = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };

    const blue = VictoryTheme.clean.palette?.colors?.blue || "blue";

    const styleOverrides: VictoryAxisProps["style"] = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
      grid: {
        stroke: ({ tick }: any) => (tick === "Mariners\nSEA" ? blue : "grey"),
      },
      ticks: {
        stroke: ({ tick }: any) => (tick === "Mariners\nSEA" ? blue : "grey"),
      },
      tickLabels: {
        fontWeight: ({ tick }: any) =>
          tick === "Mariners\nSEA" ? "bold" : "normal",
      },
    };

    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryAxis
            style={{
              parent: styleOverrides.parent,
              grid: { stroke: "#CFD8DC", strokeDasharray: "10, 5" },
            }}
            tickValues={this.state.tickValues}
            theme={VictoryTheme.clean}
            tickFormat={["first", "second", "third", "fourth", "fifth"]}
            animate={{ duration: 2000 }}
            containerComponent={
              <VictoryContainer
                title="Axis Example"
                desc="This is an example of an animating axis."
              />
            }
          />
          <VictoryAxis
            scale="time"
            theme={VictoryTheme.clean}
            style={{
              parent: style.parent,
              tickLabels: { angle: 45 },
              grid: { stroke: VictoryTheme.clean.palette?.colors?.blue },
            }}
            containerComponent={
              <VictoryContainer title="Time Scale Axis Example" />
            }
            events={[
              {
                target: "grid",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props: any) => {
                          return {
                            style: Object.assign({}, props.style, {
                              stroke: "orange",
                            }),
                          };
                        },
                      },
                      {
                        target: "tickLabels",
                        mutation: () => {
                          return { text: "hey" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            label={"Decades"}
            tickLabelComponent={<VictoryLabel y={25} />}
            tickValues={[
              new Date(1960, 1, 1),
              new Date(1970, 1, 1),
              new Date(1980, 1, 1),
              new Date(1990, 1, 1),
              new Date(2000, 1, 1),
            ]}
            tickFormat={(x) => x.getFullYear()}
          />
          <svg width={500} height={400}>
            <VictoryAxis
              crossAxis
              width={500}
              height={400}
              domain={this.state.domain}
              theme={VictoryTheme.clean}
              offsetY={200}
              standalone={false}
            />
            <VictoryAxis
              dependentAxis
              crossAxis
              width={500}
              height={400}
              domain={this.state.domain}
              theme={VictoryTheme.clean}
              offsetX={250}
              standalone={false}
            />
          </svg>

          <svg width={500} height={400}>
            <VictoryAxis
              theme={VictoryTheme.clean}
              style={{
                parent: style.parent,
                axisLabel: { padding: 45 },
              }}
              crossAxis
              domain={this.state.domain}
              standalone={false}
            />
            <VictoryAxis
              theme={VictoryTheme.clean}
              style={{
                parent: style.parent,
                axisLabel: { padding: 45 },
              }}
              dependentAxis
              crossAxis
              domain={this.state.domain}
              standalone={false}
            />
          </svg>
          <VictoryAxis
            style={{
              parent: style.parent,
              axisLabel: { padding: 45 },
            }}
            theme={VictoryTheme.clean}
            label="cool log axis"
            padding={{ top: 30, bottom: 30, left: 80, right: 30 }}
            orientation="left"
            scale={"log"}
            domain={[1, 5]}
          />
          <VictoryAxis
            theme={VictoryTheme.clean}
            style={{
              parent: style.parent,
              axisLabel: { padding: 45 },
            }}
            label="cool log axis"
            padding={{ top: 40, bottom: 40, right: 80 }}
            orientation="right"
            scale={"log"}
            domain={[1, 5]}
          />
          <VictoryAxis
            label="TEAMS"
            padding={{ top: 90, bottom: 40, left: 40, right: 40 }}
            orientation="top"
            theme={VictoryTheme.clean}
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA",
            ]}
          />
          <VictoryAxis
            theme={VictoryTheme.clean}
            label="TEAMS"
            padding={{ top: 40, bottom: 40, left: 40, right: 90 }}
            orientation="right"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA",
            ]}
          />
          <VictoryAxis
            theme={VictoryTheme.clean}
            label="TEAMS"
            orientation="bottom"
            padding={{ top: 40, bottom: 90, left: 40, right: 40 }}
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA",
            ]}
          />
          <VictoryAxis
            theme={VictoryTheme.clean}
            label="TEAMS"
            padding={{ top: 40, bottom: 40, left: 90, right: 40 }}
            orientation="left"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA",
            ]}
          />
          <VictoryAxis
            theme={VictoryTheme.clean}
            label="Empty Values"
            padding={{ top: 40, bottom: 40, left: 40, right: 90 }}
            orientation="right"
            style={styleOverrides}
            tickValues={[]}
          />
        </div>
      </div>
    );
  }
}
