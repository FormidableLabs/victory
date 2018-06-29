/*eslint-disable no-magic-numbers */
import React from "react";
import {
  VictoryChart, VictoryStack, VictoryBar, VictoryLine,
  VictoryGroup, VictoryScatter, VictoryErrorBar, VictoryVoronoi
} from "../../src/index";
import { VictoryTooltip } from "victory-core";
import { range, random } from "lodash";


class App extends React.Component {

  getGroupData() {
    return range(5).map(() => {
      return [
        {
          x: "rabbits",
          y: random(1, 5)
        },
        {
          x: "cats",
          y: random(1, 10)
        },
        {
          x: "dogs",
          y: random(1, 15)
        }
      ];
    });
  }

  getMultiData() {
    const bars = random(3, 5);
    return range(4).map(() => {
      return range(bars).map((bar) => {
        return { x: bar + 1, y: random(2, 10) };
      });
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

    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart style={chartStyle} domainPadding={20}>
            <VictoryStack
              style={{
                data: { strokeDasharray: "10, 5" }
              }}
              colorScale="qualitative"
            >
              <VictoryGroup
                color={"purple"}
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 2 }
                ]}
                style={{
                  data: { width: 40, opacity: 0.6 }
                }}
              >
                <VictoryBar/>
                <VictoryLine/>
              </VictoryGroup>
              <VictoryGroup
                data={[
                  { x: 1, y: 4 },
                  { x: 2, y: 5 },
                  { x: 3, y: 1 }
                ]}
                style={{
                  data: { width: 20, opacity: 0.8 }
                }}
              >
                <VictoryBar/>
                <VictoryLine/>
              </VictoryGroup>
              <VictoryGroup
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 }
                ]}
                style={{
                  data: { width: 10, opacity: 1 }
                }}
              >
                <VictoryBar/>
                <VictoryLine/>
                <VictoryScatter
                  symbol={"plus"}
                  size={10}
                  style={{
                    data: { fill: "tomato" }
                  }}
                />
              </VictoryGroup>
            </VictoryStack>
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryGroup
              color="red"
              data={[
                { x: 1, y: 3, errorX: 0.2, errorY: 0.5 },
                { x: 2, y: 4, errorX: 0.3, errorY: 0.3 },
                { x: 3, y: 2, errorX: 0.2, errorY: 0.2 },
                { x: 4, y: 5, errorX: 0.3, errorY: 0.5 }
              ]}
            >
              <VictoryLine/>
              <VictoryBar/>
              <VictoryErrorBar
                style={{
                  data: { stroke: "tomato" }
                }}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryGroup
              colorScale={"qualitative"}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4, label: "yo" },
                { x: 3, y: 2 },
                { x: 4, y: 3, label: "o shit\nwhaddup?" },
                { x: 5, y: 1 },
                { x: 6, y: -3, label: "hello!" },
                { x: 7, y: 3 }
              ]}
            >
              <VictoryLine/>
              <VictoryVoronoi
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryGroup
              y={(data) => Math.sin(2 * Math.PI * data.x)}
            >
              <VictoryLine/>
              <VictoryVoronoi
                labelComponent={<VictoryTooltip/>}
                labels={(d) => d.y}
              />
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
