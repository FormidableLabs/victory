/*global window:false */
import React from "react";
import {VictoryAxis} from "../../src/index";
import {VictoryLabel} from "victory-core";
import range from "lodash/range";
import random from "lodash/random";

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
    }, 20000);
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
            axisLabelComponent={<VictoryLabel angle={25}/>}
            tickValues={this.state.tickValues}
            tickFormat={["first", "second", "third", "fourth", "fifth"]}
            animate={{duration: 2000}}
          />
        </div>
        <div>
          <h2>Time Scale Axis</h2>
          <VictoryAxis
            padding={{left: 10, right: 80}}
            scale="time"
            events={{
              axis: {
                onClick: () => {
                  return {
                    style: {stroke: "red", strokeWidth: 4}
                  };
                }
              }
            }}
            style={{
              parent: style.parent,
              axis: {strokeWidth: 4},
              grid: {stroke: "black", strokeWidth: 1}
            }}
            label={this.state.label}
            tickValues={[
              new Date(1980, 1, 1),
              new Date(1990, 1, 1),
              new Date(2000, 1, 1),
              new Date(2010, 1, 1),
              new Date(2020, 1, 1)]}
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
              offsetY={200} /* half of the height */
              standalone={false}
            />
            <VictoryAxis dependentAxis crossAxis
              width={500}
              height={400}
              domain={this.state.domain}
              offsetX={250} /* half of the width */
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
            padding={{top: 10, bottom: 60}}
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
      </div>
    );
  }
}
