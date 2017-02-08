import React from "react";
import {
  VictoryChart, VictoryGroup, VictoryStack, VictoryScatter, VictoryBar, VictoryLine,
  VictorySelectionContainer
} from "../../src/index";
import { VictoryTooltip } from "victory-core";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      points: []
    };
  }

  handleSelection(datasets) {
    const points = datasets.reduce((memo, dataset) => {
      memo = memo.concat(dataset.data);
      return memo;
    }, []);
    this.setState({points});
  }

  handleClearSelection() {
    this.setState({points: []});
  }

  listData() {
    const points = this.state.points.map((point, index) => {
      return <li key={index}>{`${point.x}, ${point.y}`}</li>;
    });

    return (
      <div>
        <p>Points</p>
        <ul>
          {points}
        </ul>
      </div>
    );
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
          {this.listData()}
          <VictoryChart style={chartStyle}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                }}
                onSelection={this.handleSelection.bind(this)}
                onSelectionCleared={this.handleClearSelection.bind(this)}
              />
            }
          >
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={[
                {x: 1, y: -5},
                {x: 2, y: 4},
                {x: 3, y: 2},
                {x: 4, y: 3},
                {x: 5, y: 1},
                {x: 6, y: -3},
                {x: 7, y: 3}
              ]}
            />
            <VictoryLine
              style={{
                data: {stroke: "blue"}
              }}
              data={[
                {x: 1, y: -3},
                {x: 2, y: 5},
                {x: 3, y: 3},
                {x: 4, y: 0},
                {x: 5, y: -2},
                {x: 6, y: -2},
                {x: 7, y: 5}
              ]}
            />
            <VictoryLine
              data={[
                {x: 1, y: 5},
                {x: 2, y: -4},
                {x: 3, y: -2},
                {x: 4, y: -3},
                {x: 5, y: -1},
                {x: 6, y: 3},
                {x: 7, y: -3}
              ]}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle}
            containerComponent={<VictorySelectionContainer/>}
          >
            <VictoryGroup
              data={[
                {x: 1, y: 5, label: "one"},
                {x: 2, y: 4, label: "two"},
                {x: 3, y: -2, label: "three"}
              ]}
            >
              <VictoryLine style={{ data: {stroke: "tomato"}}}/>
              <VictoryScatter
                style={{ data: {fill: (d, active) => active ? "tomato" : "gray"}}}
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryGroup>

            <VictoryGroup
              data={[
                {x: 1, y: -3, label: "red"},
                {x: 2, y: 5, label: "green"},
                {x: 3, y: 3, label: "blue"}
              ]}
            >
              <VictoryLine style={{ data: {stroke: "blue"}}}/>
              <VictoryScatter
                style={{ data: {fill: (d, active) => active ? "blue" : "gray"}}}
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryGroup>

            <VictoryGroup
              data={[
                {x: 1, y: 5, label: "cat"},
                {x: 2, y: -4, label: "dog"},
                {x: 3, y: -2, label: "bird"}
              ]}
            >
              <VictoryLine style={{ data: {stroke: "black"}}}/>
              <VictoryScatter
                style={{ data: {fill: (d, active) => active ? "black" : "gray"}}}
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryScatter
            style={{
              parent: chartStyle.parent,
              data: {
                fill: (datum, active) => active ? "tomato" : "black"
              }
            }}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                }}
              />
            }
            size={(datum, active) => active ? 5 : 3}
            data={[
              {x: 1, y: -5},
              {x: 2, y: 4},
              {x: 3, y: 2},
              {x: 4, y: 3},
              {x: 5, y: 1},
              {x: 6, y: -3},
              {x: 7, y: 3}
            ]}
          />

          <VictoryScatter
            style={{
              parent: chartStyle.parent,
              data: {
                fill: (datum, active) => active ? "tomato" : "black"
              }
            }}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                }}
              />
            }
            size={(datum, active) => active ? 5 : 3}
            y={(d) => d.x * d.x}
          />

          <VictoryGroup style={chartStyle}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                }}
              />
            }
          >
            <VictoryScatter
              style={{
                data: {fill: "tomato"}
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                {x: 1, y: -5},
                {x: 2, y: 4},
                {x: 3, y: 2},
                {x: 4, y: 3},
                {x: 5, y: 1},
                {x: 6, y: -3},
                {x: 7, y: 3}
              ]}
            />
            <VictoryScatter
              style={{
                data: {fill: "blue"}
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                {x: 1, y: -3},
                {x: 2, y: 5},
                {x: 3, y: 3},
                {x: 4, y: 0},
                {x: 5, y: -2},
                {x: 6, y: -2},
                {x: 7, y: 5}
              ]}
            />
            <VictoryScatter
              data={[
                {x: 1, y: 5},
                {x: 2, y: -4},
                {x: 3, y: -2},
                {x: 4, y: -3},
                {x: 5, y: -1},
                {x: 6, y: 3},
                {x: 7, y: -3}
              ]}
              size={(datum, active) => active ? 5 : 3}
            />
          </VictoryGroup>

          <VictoryStack style={chartStyle}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                }}
              />
            }
          >
            <VictoryBar
              style={{
                data: {
                  fill: "tomato",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                {x: 1, y: -5},
                {x: 2, y: 4},
                {x: 3, y: 2},
                {x: 4, y: 3},
                {x: 5, y: 1},
                {x: 6, y: -3},
                {x: 7, y: 3}
              ]}
            />
            <VictoryBar
              style={{
                data: {
                  fill: "orange",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                {x: 1, y: -3},
                {x: 2, y: 5},
                {x: 3, y: 3},
                {x: 4, y: 0},
                {x: 5, y: -2},
                {x: 6, y: -2},
                {x: 7, y: 5}
              ]}
            />
            <VictoryBar
              style={{
                data: {
                  fill: "gold",
                  stroke: (d, active) => active ? "black" : "none",
                  strokeWidth: 2
                }
              }}
              data={[
                {x: 1, y: 5},
                {x: 2, y: -4},
                {x: 3, y: -2},
                {x: 4, y: -3},
                {x: 5, y: -1},
                {x: 6, y: 3},
                {x: 7, y: -3}
              ]}
            />
          </VictoryStack>
        </div>
      </div>
    );
  }
}

export default App;
