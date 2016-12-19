import React from "react";
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryGroup } from "../../src/index";
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

          <VictoryChart style={chartStyle} containerComponent={<VictoryVoronoiContainer/>}>
            <VictoryLine
              data={[
                {x: 1, y: -5},
                {x: 2, y: 4, label: "yo"},
                {x: 3, y: 2},
                {x: 4, y: 3, label: "o shit\nwhaddup?"},
                {x: 5, y: 1},
                {x: 6, y: -3, label: "hello!"},
                {x: 7, y: 3}
              ]}
            />
            <VictoryLine
              data={[
                {x: 1, y: 5},
                {x: 2, y: -4, label: "yo"},
                {x: 3, y: -2},
                {x: 4, y: -3, label: "o shit\nwhaddup?"},
                {x: 5, y: -1},
                {x: 6, y: 3, label: "hello!"},
                {x: 7, y: -3}
              ]}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle}>
            <VictoryGroup >
              <VictoryLine
                data={[
                  {x: 1, y: -5},
                  {x: 2, y: 4, label: "yo"},
                  {x: 3, y: 2},
                  {x: 4, y: 3, label: "o shit\nwhaddup?"},
                  {x: 5, y: 1},
                  {x: 6, y: -3, label: "hello!"},
                  {x: 7, y: 3}
                ]}
              />
              <VictoryLine
                y={(data) => Math.sin(2 * Math.PI * data.x)}
              />
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default App;
