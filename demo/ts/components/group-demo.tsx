import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryBar } from "victory-bar";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryErrorBar } from "victory-errorbar";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryVoronoi } from "victory-voronoi";
import { VictoryBoxPlot } from "victory-box-plot";
import { range, random } from "lodash";
import { VictoryTheme } from "victory-core";

const themeColors = VictoryTheme.clean.palette?.colors || {};
class App extends React.Component {
  getGroupData() {
    return range(5).map(() => {
      return [
        {
          x: "rabbits",
          y: random(1, 5),
        },
        {
          x: "cats",
          y: random(1, 10),
        },
        {
          x: "dogs",
          y: random(1, 15),
        },
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
    const containerStyle: React.CSSProperties = {
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
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart
            theme={VictoryTheme.clean}
            style={chartStyle}
            domainPadding={20}
          >
            <VictoryStack
              style={{
                data: { strokeDasharray: "10, 5" },
              }}
            >
              <VictoryGroup
                colorScale="red"
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 2 },
                ]}
              >
                <VictoryBar />
                <VictoryLine />
              </VictoryGroup>
              <VictoryGroup
                data={[
                  { x: 1, y: 4 },
                  { x: 2, y: 5 },
                  { x: 3, y: 1 },
                ]}
                colorScale="green"
              >
                <VictoryBar />
                <VictoryLine />
              </VictoryGroup>
              <VictoryGroup
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 },
                ]}
                colorScale="blue"
              >
                <VictoryBar />
                <VictoryLine />
                <VictoryScatter
                  symbol={"plus"}
                  style={{
                    data: { fill: themeColors.purple },
                  }}
                />
              </VictoryGroup>
            </VictoryStack>
          </VictoryChart>

          <VictoryChart theme={VictoryTheme.clean} style={chartStyle}>
            <VictoryGroup
              colorScale="red"
              data={[
                { x: 1, y: 3, errorX: 0.2, errorY: 0.5 },
                { x: 2, y: 4, errorX: 0.3, errorY: 0.3 },
                { x: 3, y: 2, errorX: 0.2, errorY: 0.2 },
                { x: 4, y: 5, errorX: 0.3, errorY: 0.5 },
              ]}
            >
              <VictoryLine />
              <VictoryBar />
              <VictoryErrorBar
                style={{
                  data: { stroke: "tomato" },
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
                { x: 7, y: 3 },
              ]}
            >
              <VictoryLine />
              <VictoryVoronoi labelComponent={<VictoryTooltip />} />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryGroup y={(data) => Math.sin(2 * Math.PI * data.x)}>
              <VictoryLine />
              <VictoryVoronoi
                labelComponent={<VictoryTooltip />}
                labels={({ datum }) => datum.y}
              />
            </VictoryGroup>
          </VictoryChart>
          <VictoryGroup style={chartStyle} theme={VictoryTheme.clean}>
            <VictoryBoxPlot
              minLabels
              maxLabels
              data={[
                { x: 1, y: [1, 2, 3, 5] },
                { x: 2, y: [3, 2, 8, 10] },
                { x: 3, y: [2, 8, 6, 5] },
                { x: 4, y: [1, 3, 2, 9] },
              ]}
            />
          </VictoryGroup>
        </div>
      </div>
    );
  }
}

export default App;
