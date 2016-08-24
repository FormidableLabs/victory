import React from "react";
import {
  VictoryChart, VictoryArea, VictoryStack, VictoryBar, VictoryLine, VictoryGroup, VictoryScatter
} from "../../src/index";
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
        return {x: bar + 1, y: random(2, 10)};
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

    const chartStyle = {parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}};

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart style={chartStyle}>
            <VictoryStack colorScale="qualitative">
              <VictoryGroup
                data={[
                  {x: 1, y: 3},
                  {x: 2, y: 4},
                  {x: 3, y: 2}
                ]}
              >
                <VictoryArea/>
                <VictoryScatter/>
              </VictoryGroup>
              <VictoryGroup
                style={chartStyle}
                colorScale="qualitative"
                data={[
                  {x: 1, y: 4},
                  {x: 2, y: 5},
                  {x: 3, y: 1}
                ]}
              >
                <VictoryArea/>
                <VictoryScatter/>
              </VictoryGroup>
              <VictoryGroup
                style={chartStyle}
                colorScale="qualitative"
                data={[
                  {x: 1, y: 1},
                  {x: 2, y: 2},
                  {x: 3, y: 5}
                ]}
              >
                <VictoryArea/>
                <VictoryScatter/>
              </VictoryGroup>
            </VictoryStack>
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryGroup
              colorScale={"qualitative"}
              data={[
                {x: 1, y: 3},
                {x: 2, y: 4},
                {x: 3, y: 2},
                {x: 4, y: 5}
              ]}
            >
              <VictoryLine/>
              <VictoryScatter/>
              <VictoryBar/>
            </VictoryGroup>
          </VictoryChart>

        </div>
      </div>
    );
  }
}

export default App;
