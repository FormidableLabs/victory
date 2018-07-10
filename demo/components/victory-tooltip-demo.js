/*eslint-disable no-magic-numbers */
import React from "react";
import {
  VictoryChart, VictoryStack, VictoryGroup, VictoryAxis, VictoryCandlestick, VictoryErrorBar
} from "../../packages/victory-chart/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictoryTooltip } from "../../packages/victory-core/src/index";

class App extends React.Component {
  render() {
    const containerStyle = {
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
                flyoutStyle={{ stroke: "red" }}
                cornerRadius={0}
                pointerLength={20}
              />
            }
            labels={(d) => `hello #${d.x}`}
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 1 }
            ]}
          />

          <VictoryScatter
            style={{ parent: parentStyle }}
            labelComponent={<VictoryTooltip/>}
            labels={(d) => `hello #${d.x}`}
            size={(d, active) => active ? 5 : 3}
            data={[
              { x: 1, y: 5 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 1 }
            ]}
          />

          <VictoryCandlestick
            style={{ parent: parentStyle }}
            labelComponent={<VictoryTooltip/>}
            labels={(d) => `hello #${d.x}`}
            data={[
              { x: 1, open: 5, close: 10, high: 15, low: 0 },
              { x: 2, open: 15, close: 10, high: 20, low: 5 },
              { x: 3, open: 15, close: 20, high: 25, low: 10 },
              { x: 4, open: 20, close: 25, high: 30, low: 15 },
              { x: 5, open: 30, close: 25, high: 35, low: 20 }
            ]}
          />

          <VictoryErrorBar
            style={{ parent: parentStyle }}
            labelComponent={<VictoryTooltip/>}
            labels={(d) => `hello #${d.x}`}
            data={[
              { x: 1, y: 1, errorX: [1, 0.5], errorY: .1 },
              { x: 2, y: 2, errorX: [1, 3], errorY: .1 },
              { x: 3, y: 3, errorX: [1, 3], errorY: [.2, .3] },
              { x: 4, y: 2, errorX: [1, 0.5], errorY: .1 },
              { x: 5, y: 1, errorX: [1, 0.5], errorY: .2 }
            ]}
          />

          <VictoryChart style={{ parent: parentStyle }}>
            <VictoryGroup
              labels={["a", "b", "c"]}
              labelComponent={<VictoryTooltip/>}
              horizontal
              offset={16}
              colorScale={"qualitative"}
              style={{ data: { width: 15 } }}
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

         <VictoryChart style={{ parent: parentStyle }}>
            <VictoryAxis/>
            <VictoryStack
              colorScale={"qualitative"}
              labels={["a", "b", "c"]}
              labelComponent={<VictoryTooltip/>}
              style={{ data: { width: 30 } }}
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
            </VictoryStack>
         </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
