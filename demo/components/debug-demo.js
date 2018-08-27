/*eslint-disable no-magic-numbers */

import React from "react";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryStack } from "../../packages/victory-stack/src/index";
import { VictoryGroup } from "../../packages/victory-group/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictoryArea } from "../../packages/victory-area/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictoryPortal } from "../../packages/victory-core/src/index";
import { VictorySelectionContainer } from "../../packages/victory-selection-container/src/index";
import { VictoryVoronoiContainer } from "../../packages/victory-voronoi-container/src/index";
import { VictoryZoomContainer } from "../../packages/victory-zoom-container/src/index";
import { range, random } from "lodash";

const lowToHigh = [
  { x: "low", y: "first", sort: 1 },
  { x: "med", y: "second", sort: 2 },
  { x: "high", y: "third", sort: 3 }
];

const highToLow = [
  { x: "low", y: "first", sort: 3 },
  { x: "med", y: "second", sort: 2 },
  { x: "high", y: "third", sort: 1 }
];

class App extends React.Component {
  getBarData() {
    return range(5).map(() => {
      return [
        {
          x: "apples",
          y: 3
        },
        {
          x: "bananas",
          y: 5
        },
        {
          x: "oranges",
          y: 7
        }
      ];
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
      <div style={containerStyle}>
        <VictoryChart
          style={chartStyle}
        >
          <VictoryBar
            horizontal
            alignment="start"
            data={[
              { x: 2, y: "Echo" },
              { x: 6, y: "Foxtrot" },
              { x: 3, y: "Golf" },
              { x: 4, y: "Hotel" }
            ]}
          />
        </VictoryChart>
        <VictoryChart style={chartStyle}>
          <VictoryBar horizontal
            data={lowToHigh}
            sortKey={`sort`}
          />
        </VictoryChart>
        <VictoryChart style={chartStyle}>
          <VictoryBar horizontal
            data={highToLow}
            sortKey={`sort`}
          />
        </VictoryChart>

        <VictoryChart style={chartStyle} domainPadding={{ x: 50 }}>
            <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
              <VictoryStack colorScale={"red"}>
                {this.getBarData().map((data, index) => {
                  return <VictoryBar horizontal key={index} data={data}/>;
                })}
              </VictoryStack>
              <VictoryStack colorScale={"green"}>
                {this.getBarData().map((data, index) => {
                  return <VictoryBar horizontal key={index} data={data}/>;
                })}
              </VictoryStack>
              <VictoryStack colorScale={"blue"}>
                {this.getBarData().map((data, index) => {
                  return <VictoryBar horizontal key={index} data={data}/>;
                })}
              </VictoryStack>
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart style={chartStyle}
            categories={{ x: ["e", "a", "c", "b", "d"] }}
          >
            <VictoryStack>
              <VictoryArea
                data={[
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 5 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ]}
              />
              <VictoryArea
                data={[
                  { x: "a", y: 1 },
                  { x: "b", y: 4 },
                  { x: "c", y: 5 },
                  { x: "d", y: 7 },
                  { x: "e", y: 5 }
                ]}
              />
              <VictoryArea
                data={[
                  { x: "a", y: 3 },
                  { x: "b", y: 2 },
                  { x: "c", y: 6 },
                  { x: "d", y: 2 },
                  { x: "e", y: 6 }
                ]}
              />
              <VictoryArea
                data={[
                  { x: "a", y: 2 },
                  { x: "b", y: 3 },
                  { x: "c", y: 3 },
                  { x: "d", y: 4 },
                  { x: "e", y: 7 }
                ]}
              />
            </VictoryStack>
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryGroup>
            <VictoryStack
              labels={["a", "b", "c"]}
              horizontal
              offset={20}
              colorScale={"qualitative"}
            >
              <VictoryBar
                data={[
                  { x: "a", y: 1 },
                  { x: "b", y: 2 },
                  { x: "c", y: 5 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: "a", y: 2 },
                  { x: "b", y: 1 },
                  { x: "c", y: 7 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: "a", y: 3 },
                  { x: "b", y: 4 },
                  { x: "c", y: 9 }
                ]}
              />
            </VictoryStack>
            </VictoryGroup>
         </VictoryChart>
         <VictoryChart style={chartStyle}>
            <VictoryGroup
              labels={["a", "b", "c"]}
              horizontal
              offset={20}
              colorScale={"qualitative"}
            >
              <VictoryBar
                data={[
                  { x: 1, y: 1 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 7 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 9 }
                ]}
              />
            </VictoryGroup>
         </VictoryChart>

      </div>
    );
  }
}

export default App;
