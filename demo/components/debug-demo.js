/*eslint-disable no-magic-numbers */

import React from "react";
import { VictoryChart, VictoryStack } from "../../packages/victory-chart/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictorySelectionContainer } from "../../packages/victory-selection-container/src/index";
import { VictoryVoronoiContainer } from "../../packages/victory-voronoi-container/src/index";

class App extends React.Component {

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };
    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };
    return (
      <div style={containerStyle}>
        <VictoryChart style={chartStyle}
          containerComponent={
            <VictoryVoronoiContainer
              labels={() => "HELLO"}
            />
          }
        >
          <VictoryBar
            horizontal
            style={{ data: { fill: (d, a) => a ? "red" : "black" } }}
            data={[
              { x: 0, y: 3.5, y0: 2.5 },
              { x: 0, y: 11, y0: 5 },
              { x: 1, y: 2, y0: 1 },
              { x: 1, y: 7, y0: 4 },
              { x: 2, y: 4, y0: 3 },
              { x: 2, y: 12, y0: 7 }
            ]}
          />
        </VictoryChart>

        <VictoryChart style={chartStyle}
          containerComponent={
            <VictorySelectionContainer
              selectionStyle={{
                stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
              }}
            />
          }
        >
          <VictoryStack horizontal>
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
            <VictoryBar
              style={{
                data: {
                  fill: "gold",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: -3 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 }
              ]}
            />
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default App;
