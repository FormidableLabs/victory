/*global window:false */
import React from "react";
import {VictoryAxis, VictoryChart, VictoryLine} from "../../src/index";
import {VictoryLabel} from "victory-core";
import { merge, random, range } from "lodash";
import { VictoryContainer, VictoryTheme } from "victory-core";
import d3Scale from "d3-scale";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tickValues: [5, 10, 25, 31, 42],
      domain: [-5, 5]
    };
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

  render() {
    const style = {
      parent: {margin: "2%", maxWidth: "40%"}
    };

    const styleOverrides = {
      parent: {margin: "2%", maxWidth: "40%"},
      axis: {
        stroke: "black"
      },
      grid: {
        strokeWidth: 2,
        stroke: (tick) => tick === "Mariners\nSEA" ? "red" : "grey"
      },
      ticks: {
        stroke: (tick) => tick === "Mariners\nSEA" ? "red" : "grey"
      },
      tickLabels: {
        fontWeight: (tick) => tick === "Mariners\nSEA" ? "bold" : "normal"
      }
    };

    return (
      <div className="demo">
        <h1>VictoryAxis</h1>
        <div>
          <h2>Animating Axis</h2>

          <VictoryAxis style={styleOverrides}
            padding={60}
            label={"animation\nwow!"}
            axisLabelComponent={<VictoryLabel/>}
            tickValues={this.state.tickValues}
            theme={VictoryTheme.grayscale}
            tickFormat={["first", "second", "third", "fourth", "fifth"]}
            animate={{duration: 2000}}
            containerComponent={
              <VictoryContainer
                title="Axis Example"
                desc="This is an example of an animating axis."
              />
            }
          />
        </div>
        <div>
          <h2>Time Scale Axis</h2>
          <VictoryAxis
            scale="time"
            style={{
              parent: style.parent,
              axis: {strokeWidth: 4},
              tickLabels: {angle: 45},
              grid: {stroke: "black", strokeWidth: 5}
            }}
            containerComponent={
              <VictoryContainer
                title="Time Scale Axis Example"
              />
            }
            events={[
              {
                target: "grid",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        mutation: (props) => {
                          return {style: merge({}, props.style, {stroke: "orange"})};
                        }
                      }, {
                        target: "tickLabels",
                        mutation: () => {
                          return {text: "hey"};
                        }
                      }
                    ];
                  }
                }
              }
            ]}
            label={this.state.label}
            tickLabelComponent={<VictoryLabel y={25}/>}
            tickValues={[
              new Date(1960, 1, 1),
              new Date(1970, 1, 1),
              new Date(1980, 1, 1),
              new Date(1990, 1, 1),
              new Date(2000, 1, 1)]}
            tickFormat={(x) => x.getFullYear()}
          />

        </div>

        <div>
        <h2>X-Y Axis</h2>
          <svg style={style} width={500} height={400}>
            <VictoryAxis crossAxis
              width={500}
              height={400}
              domain={this.state.domain}
              theme={VictoryTheme.grayscale}
              offsetY={200}
              standalone={false}
            />
            <VictoryAxis dependentAxis crossAxis
              width={500}
              height={400}
              domain={this.state.domain}
              theme={VictoryTheme.grayscale}
              offsetX={250}
              standalone={false}
            />
          </svg>
        </div>
        <div>
        <h2>Log Scale Axis</h2>
          <VictoryAxis
            style={style}
            label="cool log axis"
            padding={{top: 10, bottom: 60}}
            orientation="left"
            scale={"log"}
            domain={[1, 5]}
            offsetX={50}
          />
          <VictoryAxis
            style={style}
            label="cool log axis"
            padding={{top: 10, bottom: 60, right: 60}}
            orientation="right"
            scale={"log"}
            domain={[1, 5]}
          />
        </div>
        <div>
          <h2>Ordinal Scales</h2>
          <VictoryAxis
            orientation="top"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA"
            ]}
          />
          <VictoryAxis
            orientation="right"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA"
            ]}
          />
          <VictoryAxis
            orientation="bottom"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA"
            ]}
          />

          <VictoryAxis
            orientation="left"
            style={styleOverrides}
            tickValues={[
              "Mets\nNY",
              "Giants\nSF",
              "Yankees\nNY",
              "Nationals\nDC",
              "Mariners\nSEA"
            ]}
          />
        </div>

        <VictoryChart
          height={450}
          scale={{
            x: "time"
          }}
        >
          <VictoryAxis label="Decades"/>
          <VictoryAxis dependentAxis crossAxis/>
          <VictoryLine
            data={[
              {x: new Date(1960, 1, 1), y: 125},
              {x: new Date(1987, 1, 1), y: 257},
              {x: new Date(1993, 1, 1), y: 345},
              {x: new Date(1997, 1, 1), y: 515},
              {x: new Date(2001, 1, 1), y: 132},
              {x: new Date(2005, 1, 1), y: 305},
              {x: new Date(2011, 1, 1), y: 270},
              {x: new Date(2015, 1, 1), y: 470}
            ]}
          />
        </VictoryChart>

      </div>
    );
  }
}
