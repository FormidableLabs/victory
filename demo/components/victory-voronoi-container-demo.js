/*global window:false*/
import React from "react";
import {
  VictoryChart, VictoryGroup, VictoryStack, VictoryScatter, VictoryBar, VictoryLine,
  VictoryVoronoiContainer
} from "../../src/index";
import { random, range } from "lodash";

import { VictoryTooltip, VictoryTheme } from "victory-core";
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      data: this.getData()
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }


  getData() {
    const bars = random(6, 10);
    return range(bars).map((bar) => {
      return {a: bar + 1, b: random(2, 10)};
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

    const chartStyle = {parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}};

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart style={chartStyle}
            theme={VictoryTheme.material}
            domainPadding={{y: 2}}
            containerComponent={
              <VictoryVoronoiContainer dimension="x"
                labels={(d) => `y:${d.y}`}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{fill: "white"}}
                    style={{fontSize: 10}}
                  />
                }
              />
            }
          >
            <VictoryLine
              data={[
                {x: 1, y: 5, l: "one"},
                {x: 1.5, y: 5, l: "one point five"},
                {x: 2, y: 4, l: "two"},
                {x: 3, y: -2, l: "three"}
              ]}
              style={{
                data: { stroke: "tomato", strokeWidth: (d, active) => active ? 4 : 2},
                labels: {fill: "tomato"}
              }}
            />

            <VictoryLine
              data={[
                {x: 1, y: -3, l: "red"},
                {x: 2, y: 5, l: "green"},
                {x: 3, y: 3, l: "blue"}
              ]}
              style={{
                data: { stroke: "blue", strokeWidth: (d, active) => active ? 4 : 2},
                labels: {fill: "blue"}
              }}
            />

            <VictoryLine
              data={[
                {x: 1, y: 5, l: "cat"},
                {x: 2, y: -4, l: "dog"},
                {x: 3, y: -2, l: "bird"}
              ]}
              style={{
                data: { stroke: "black", strokeWidth: (d, active) => active ? 4 : 2},
                labels: {fill: "black"}
              }}
            />
          </VictoryChart>

          <VictoryScatter
            animate={{duration: 1000}}
            style={{
              parent: chartStyle.parent,
              data: {
                fill: (datum, active) => active ? "tomato" : "black"
              }
            }}
            containerComponent={<VictoryVoronoiContainer dimension="x"/>}
            size={(datum, active) => active ? 5 : 3}
            data={this.state.data}
            x="a"
            y="b"
          />

          <VictoryScatter
            style={{
              parent: chartStyle.parent,
              data: {
                fill: (datum, active) => active ? "tomato" : "black"
              }
            }}
            containerComponent={
              <VictoryVoronoiContainer
                selectionStyle={{
                  stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                }}
              />
            }
            size={(datum, active) => active ? 5 : 3}
            y={(d) => d.x * d.x}
          />

          <VictoryChart style={chartStyle} containerComponent={<VictoryVoronoiContainer/>}>
            <VictoryGroup style={chartStyle}>
              <VictoryScatter
                style={{
                  data: {fill: "tomato"}
                }}
                size={(datum, active) => active ? 5 : 3}
                labels={(d) => d.y}
                labelComponent={<VictoryTooltip/>}
                data={[
                  {x: 1, y: -5},
                  {x: 2, y: 4},
                  {x: 3, y: 2},
                  {x: 4, y: 0},
                  {x: 5, y: 1},
                  {x: 6, y: -3},
                  {x: 7, y: 3}
                ]}
              />
              <VictoryScatter
                style={{
                  data: {fill: "blue"}
                }}
                size={(datum, active) => active ? 5 : 3}
                labels={(d) => d.y}
                labelComponent={<VictoryTooltip/>}
                data={[
                  {x: 1, y: -3},
                  {x: 2, y: 5},
                  {x: 3, y: 3},
                  {x: 4, y: 0},
                  {x: 5, y: -2},
                  {x: 6, y: -2},
                  {x: 7, y: 5}
                ]}
              />
              <VictoryScatter
                data={[
                  {x: 1, y: 5},
                  {x: 2, y: -4},
                  {x: 3, y: -2},
                  {x: 4, y: -3},
                  {x: 5, y: -1},
                  {x: 6, y: 3},
                  {x: 7, y: -3}
                ]}
                labels={(d) => d.y}
                labelComponent={<VictoryTooltip/>}
                size={(datum, active) => active ? 5 : 3}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryStack style={chartStyle} containerComponent={<VictoryVoronoiContainer/>}>
            <VictoryBar
              style={{
                data: {
                  fill: "tomato",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                {x: 1, y: -5},
                {x: 2, y: 4},
                {x: 3, y: 2},
                {x: 4, y: 3},
                {x: 5, y: 1},
                {x: 6, y: -3},
                {x: 7, y: 3}
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
                {x: 1, y: -3},
                {x: 2, y: 5},
                {x: 3, y: 3},
                {x: 4, y: 0},
                {x: 5, y: -2},
                {x: 6, y: -2},
                {x: 7, y: 5}
              ]}
            />
            <VictoryBar
              style={{
                data: {
                  fill: "gold",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              data={[
                {x: 1, y: 5},
                {x: 2, y: -4},
                {x: 3, y: -2},
                {x: 4, y: -3},
                {x: 5, y: -1},
                {x: 6, y: 3},
                {x: 7, y: -3}
              ]}
            />
          </VictoryStack>
        </div>
      </div>
    );
  }
}

export default App;
