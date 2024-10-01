import React from "react";
import { VictoryStack } from "victory-stack";
import { VictoryArea } from "victory-area";
import { VictoryTheme } from "victory-core/lib";

class App extends React.Component {
  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const chartStyle: { [key: string]: React.CSSProperties } = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };

    return (
      <div className="demo">
        <h3 style={{ textAlign: "center" }}>Standalone Stack</h3>

        <div style={containerStyle}>
          <VictoryStack
            theme={VictoryTheme.clean}
            style={chartStyle}
            aria-label="Victory Stack Demo"
          >
            <VictoryArea
              data={[
                { x: "a", y: 2 },
                { x: "b", y: 3 },
                { x: "c", y: 5 },
              ]}
            />
            <VictoryArea
              data={[
                { x: "a", y: 1 },
                { x: "b", y: 4 },
                { x: "c", y: 5 },
              ]}
            />
            <VictoryArea
              data={[
                { x: "a", y: 3 },
                { x: "b", y: 2 },
                { x: "c", y: 6 },
              ]}
            />
          </VictoryStack>

          <VictoryStack
            theme={VictoryTheme.clean}
            style={chartStyle}
            colorScale="warm"
          >
            <VictoryArea
              data={[
                { x: new Date(2006, 1, 1), y: null },
                { x: new Date(2016, 1, 1), y: null },
                { x: new Date(2026, 1, 1), y: null },
              ]}
            />
            <VictoryArea
              data={[
                { x: new Date(2006, 1, 1), y: null },
                { x: new Date(2016, 1, 1), y: 1 },
                { x: new Date(2026, 1, 1), y: 3 },
              ]}
            />
            <VictoryArea
              data={[
                { x: new Date(2006, 1, 1), y: 2 },
                { x: new Date(2016, 1, 1), y: 5 },
                { x: new Date(2026, 1, 1), y: 1 },
              ]}
            />
          </VictoryStack>
        </div>
      </div>
    );
  }
}

export default App;
