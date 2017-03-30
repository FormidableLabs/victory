import React from "react";
import {
  VictoryChart, VictoryGroup, VictoryStack, VictoryScatter, VictoryBar, VictoryLine,
  createContainer
} from "../../src/index";

import { VictoryTooltip } from "victory-core";

const Charts = ({CustomContainer}) => {
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
          domainPadding={{y: 2}}
          containerComponent={
            <CustomContainer dimension="x"
              labels={(d) => `y: ${d.y}`}
              labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
              selectedDomain={{x: [1.5, 2]}}
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
          style={{
            parent: chartStyle.parent,
            data: {
              fill: (datum, active) => active ? "tomato" : "black"
            }
          }}
          containerComponent={
            <CustomContainer
              selectionStyle={{
                stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
              }}
              selectedDomain={{x: [0.4, 0.95], y: [0.5, 0.8]}}
            />
          }
          size={(datum, active) => active ? 5 : 3}
          y={(d) => d.x * d.x}
        />

        <VictoryChart
          style={chartStyle}
          containerComponent={<CustomContainer selectedDomain={{x: [0, 0]}} />}
        >
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

        <VictoryStack
          style={chartStyle}
          containerComponent={<CustomContainer selectedDomain={{x: [1.5, 2.5], y: [-3, 4]}} />}
        >
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
};

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <pre>createContainer("brush", "voronoi")</pre>
        <Charts CustomContainer={createContainer("brush", "voronoi")} />
        <pre>createContainer("zoom", "voronoi")</pre>
        <Charts CustomContainer={createContainer("zoom", "voronoi")} />
      </div>
    );
  }
}

export default App;
