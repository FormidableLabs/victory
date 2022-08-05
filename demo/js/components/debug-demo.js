/* eslint-disable no-magic-numbers */

import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryBar } from "victory-bar";
import { VictoryArea } from "victory-area";
import { VictoryScatter } from "victory-scatter";
import { VictoryPortal } from "victory-core";
import { VictorySelectionContainer } from "victory-selection-container";
import { VictoryVoronoiContainer } from "victory-voronoi-container";
import { VictoryZoomContainer } from "victory-zoom-container";

class App extends React.Component {
  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };
    const chartStyle = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };
    return (
      <div style={containerStyle}>
        <VictoryChart
          style={chartStyle}
          containerComponent={<VictoryZoomContainer />}
        >
          <VictoryStack colorScale="warm">
            <VictoryGroup
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "black" } }} />
              </VictoryPortal>
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: 1, y: 4 },
                { x: 2, y: 3 },
                { x: 3, y: 2 },
                { x: 4, y: 5 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "green" } }} />
              </VictoryPortal>
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: 1, y: 3 },
                { x: 2, y: 1 },
                { x: 3, y: 4 },
                { x: 4, y: 2 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "blue" } }} />
              </VictoryPortal>
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: 1, y: 3 },
                { x: 2, y: 1 },
                { x: 3, y: 4 },
                { x: 4, y: 2 },
              ]}
            >
              <VictoryArea />
              <VictoryPortal>
                <VictoryScatter style={{ data: { fill: "cyan" } }} />
              </VictoryPortal>
            </VictoryGroup>
          </VictoryStack>
        </VictoryChart>

        <VictoryChart
          horizontal
          style={chartStyle}
          containerComponent={
            <VictoryVoronoiContainer labels={() => "HELLO"} />
          }
        >
          <VictoryBar
            style={{
              data: { fill: ({ active }) => (active ? "red" : "black") },
            }}
            data={[
              { x: 0, y: 3.5, y0: 2.5 },
              { x: 0, y: 11, y0: 5 },
              { x: 1, y: 2, y0: 1 },
              { x: 1, y: 7, y0: 4 },
              { x: 2, y: 4, y0: 3 },
              { x: 2, y: 12, y0: 7 },
            ]}
          />
          <VictoryScatter
            style={{
              data: { fill: ({ active }) => (active ? "black" : "red") },
            }}
            data={[
              { x: 0, y: 3.5 },
              { x: 0, y: 11 },
              { x: 1, y: 2 },
              { x: 1, y: 7 },
              { x: 2, y: 4 },
              { x: 2, y: 12 },
            ]}
          />
        </VictoryChart>

        <VictoryChart
          style={chartStyle}
          containerComponent={
            <VictorySelectionContainer
              selectionStyle={{
                stroke: "tomato",
                strokeWidth: 2,
                fill: "tomato",
                fillOpacity: 0.1,
              }}
            />
          }
        >
          <VictoryStack horizontal>
            <VictoryBar
              style={{
                data: {
                  fill: "tomato",
                  stroke: ({ active }) => (active ? "black" : "none"),
                  strokeWidth: 2,
                },
              }}
              size={({ active }) => (active ? 5 : 3)}
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
                  fill: "orange",
                  stroke: ({ active }) => (active ? "black" : "none"),
                  strokeWidth: 2,
                },
              }}
              size={({ active }) => (active ? 5 : 3)}
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
            <VictoryBar
              style={{
                data: {
                  fill: "gold",
                  stroke: ({ active }) => (active ? "black" : "none"),
                  strokeWidth: 2,
                },
              }}
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: -3 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 },
              ]}
            />
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default App;
