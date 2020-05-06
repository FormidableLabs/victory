/*global window:false */
/*eslint-disable no-magic-numbers */
import React from "react";
import { VictoryAxis } from "Packages/victory-axis/src/index";
import { VictoryLabel, VictoryContainer, VictoryTheme } from "Packages/victory-core/src/index";
import { merge, random, range } from "lodash";
import XYTheme from "../theme/victory-axis-differential-styling-theme";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tickValues: [5, 10, 25, 31, 42],
      domain: [-5, 5]
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        tickValues: this.getTickValues(),
        domain: this.getDomain()
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

  getDomain() {
    const someNumber = random(2, 5);
    return [-someNumber, someNumber];
  }

  render() {
    const style = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };

    const styleOverrides = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
      axis: {
        stroke: "black"
      },
      axisLabel: {
        padding: 60,
        fontWeight: "bold",
        fontSize: 16
      },
      grid: {
        strokeWidth: 2,
        stroke: ({ tick }) => (tick === "Mariners\nSEA" ? "red" : "grey")
      },
      ticks: {
        stroke: ({ tick }) => (tick === "Mariners\nSEA" ? "red" : "grey")
      },
      tickLabels: {
        fontWeight: ({ tick }) => (tick === "Mariners\nSEA" ? "bold" : "normal")
      }
    };

    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryAxis
            style={{
              parent: styleOverrides.parent,
              grid: { stroke: "#CFD8DC" }
            }}
            padding={60}
            label={"animation\nwow!"}
            axisLabelComponent={<VictoryLabel />}
            tickValues={this.state.tickValues}
            theme={VictoryTheme.material}
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
            style={{
              parent: style.parent,
              axis: { strokeWidth: 3 },
              tickLabels: { angle: 45 },
              grid: { stroke: "#F4511E", strokeWidth: 2 }
            }}
            containerComponent={<VictoryContainer title="Time Scale Axis Example" />}
            events={[
              {
                target: "grid",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          return { style: merge({}, props.style, { stroke: "orange" }) };
                        }
                      },
                      {
                        target: "tickLabels",
                        mutation: () => {
                          return { text: "hey" };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
            label={"Decades"}
            tickLabelComponent={<VictoryLabel y={25} />}
            tickValues={[
              new Date(1960, 1, 1),
              new Date(1970, 1, 1),
              new Date(1980, 1, 1),
              new Date(1990, 1, 1),
              new Date(2000, 1, 1)
            ]}
            tickFormat={(x) => x.getFullYear()}
          />

          <svg style={style} width={500} height={400}>
            <VictoryAxis
              crossAxis
              width={500}
              height={400}
              domain={this.state.domain}
              theme={VictoryTheme.material}
              offsetY={200}
              standalone={false}
            />
            <VictoryAxis
              dependentAxis
              crossAxis
              width={500}
              height={400}
              domain={this.state.domain}
              theme={VictoryTheme.material}
              offsetX={250}
              standalone={false}
            />
          </svg>

          <svg style={style} width={500} height={400}>
            <VictoryAxis crossAxis domain={this.state.domain} theme={XYTheme} standalone={false} />
            <VictoryAxis
              dependentAxis
              crossAxis
              domain={this.state.domain}
              theme={XYTheme}
              standalone={false}
            />
          </svg>

          <VictoryAxis
            style={{
              parent: style.parent,
              axisLabel: { padding: 45 }
            }}
            label="cool log axis"
            padding={{ top: 30, bottom: 30, left: 80, right: 30 }}
            orientation="left"
            scale={"log"}
            domain={[1, 5]}
          />
          <VictoryAxis
            style={{
              parent: style.parent,
              axisLabel: { padding: 45 }
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
            style={styleOverrides}
            tickValues={["Mets\nNY", "Giants\nSF", "Yankees\nNY", "Nationals\nDC", "Mariners\nSEA"]}
          />
          <VictoryAxis
            label="TEAMS"
            padding={{ top: 40, bottom: 40, left: 40, right: 90 }}
            orientation="right"
            style={styleOverrides}
            tickValues={["Mets\nNY", "Giants\nSF", "Yankees\nNY", "Nationals\nDC", "Mariners\nSEA"]}
          />
          <VictoryAxis
            label="TEAMS"
            orientation="bottom"
            padding={{ top: 40, bottom: 90, left: 40, right: 40 }}
            style={styleOverrides}
            tickValues={["Mets\nNY", "Giants\nSF", "Yankees\nNY", "Nationals\nDC", "Mariners\nSEA"]}
          />

          <VictoryAxis
            label="TEAMS"
            padding={{ top: 40, bottom: 40, left: 90, right: 40 }}
            orientation="left"
            style={styleOverrides}
            tickValues={["Mets\nNY", "Giants\nSF", "Yankees\nNY", "Nationals\nDC", "Mariners\nSEA"]}
          />
        </div>
      </div>
    );
  }
}
