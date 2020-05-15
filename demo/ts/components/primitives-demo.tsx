/*eslint-disable no-magic-numbers */
import React from "react";
import { VictoryChart } from "@packages/victory-chart";
import { Arc } from "@packages/victory-core";
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
    const containerStyle: React.CSSProperties = {
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
          <VictoryChart style={chartStyle}>
            <Arc />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
