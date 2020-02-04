import React from "react";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryStack } from "@packages/victory-stack";
import { VictoryGroup } from "@packages/victory-group";
import { VictoryAxis } from "@packages/victory-axis";
import { VictoryBar } from "@packages/victory-bar";
import { VictoryScatter } from "@packages/victory-scatter";
import { VictoryTooltip } from "@packages/victory-tooltip";

class App extends React.Component {
  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryBar
            style={{ parent: parentStyle }}
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea
                flyoutStyle={{ stroke: "red" }}
                cornerRadius={0}
                pointerLength={20}
              />
            }
            labels={({ datum }) => `hello0000000000 #${datum.x}`}
            data={[
              { x: 1, y: 1 },
              { x: 2, y: -2 },
              { x: 3, y: 3 },
              { x: 4, y: -3 },
              { x: 5, y: 2 }
            ]}
          />

          <VictoryScatter
            style={{ parent: parentStyle }}
            labelComponent={
              <VictoryTooltip constrainToVisibleArea dy={0} centerOffset={{ x: 20 }} />
            }
            labels={({ datum }) => `hello000000 #${datum.x}`}
            size={({ active }) => (active ? 5 : 3)}
            data={[{ x: 1, y: 5 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 2 }, { x: 5, y: 1 }]}
          />

          <VictoryChart style={{ parent: parentStyle }}>
            <VictoryGroup
              labels={["a", "b", "c"]}
              labelComponent={<VictoryTooltip />}
              horizontal
              offset={16}
              colorScale={"qualitative"}
              style={{ data: { width: 15 } }}
            >
              <VictoryBar data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]} />
              <VictoryBar data={[{ x: 1, y: -2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]} />
              <VictoryBar data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]} />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart style={{ parent: parentStyle }}>
            <VictoryAxis />
            <VictoryStack
              colorScale={"qualitative"}
              labels={["a", "b", "c"]}
              labelComponent={<VictoryTooltip />}
              style={{ data: { width: 30 } }}
            >
              <VictoryBar data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]} />
              <VictoryBar data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]} />
              <VictoryBar data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]} />
            </VictoryStack>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
