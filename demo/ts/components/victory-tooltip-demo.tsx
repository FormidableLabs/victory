import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryAxis } from "victory-axis";
import { VictoryBar } from "victory-bar";
import { VictoryScatter } from "victory-scatter";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryCandlestick } from "victory-candlestick";
import { VictoryErrorBar } from "victory-errorbar";

class App extends React.Component {
  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const parentStyle = {
      border: "1px solid #ccc",
      margin: "2%",
      maxWidth: "40%",
    };

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
              { x: 5, y: 2 },
            ]}
          />

          <VictoryScatter
            style={{ parent: parentStyle }}
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea
                dy={0}
                centerOffset={{ x: 20 }}
              />
            }
            labels={({ datum }) => `hello000000 #${datum.x}`}
            size={({ active }) => (active ? 5 : 3)}
            data={[
              { x: 1, y: 5 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 1 },
            ]}
          />

          <VictoryCandlestick
            horizontal
            style={{ parent: parentStyle }}
            highLabelComponent={<VictoryTooltip active dy={-3} />}
            highLabels={({ datum }) => `hello #${datum.x}`}
            data={[
              { x: 1, open: 5, close: 10, high: 15, low: 0 },
              { x: 2, open: 15, close: 10, high: 20, low: 5 },
              { x: 3, open: 15, close: 20, high: 25, low: 10 },
              { x: 4, open: 20, close: 25, high: 30, low: 15 },
              { x: 5, open: 30, close: 25, high: 35, low: 20 },
            ]}
          />

          <VictoryErrorBar
            style={{ parent: parentStyle }}
            labelComponent={<VictoryTooltip />}
            labels={({ datum }) => `hello #${datum.x}`}
            data={[
              { x: 1, y: 1, errorX: [1, 0.5], errorY: 0.1 },
              { x: 2, y: 2, errorX: [1, 3], errorY: 0.1 },
              { x: 3, y: 3, errorX: [1, 3], errorY: [0.2, 0.3] },
              { x: 4, y: 2, errorX: [1, 0.5], errorY: 0.1 },
              { x: 5, y: 1, errorX: [1, 0.5], errorY: 0.2 },
            ]}
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
              <VictoryBar
                data={[
                  { x: 1, y: 1 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 },
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: -2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 7 },
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 9 },
                ]}
              />
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
              <VictoryBar
                data={[
                  { x: 1, y: 1 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 },
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 7 },
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 9 },
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
