/*eslint-disable no-magic-numbers */
import React from "react";
import {
  VictoryChart, VictoryGroup, VictoryStack, VictoryScatter, VictorySelectionContainer
} from "../../packages/victory-chart/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictoryLine } from "../../packages/victory-line/src/index";
import { VictoryTooltip, VictoryLegend } from "../../packages/victory-core/src/index";

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
    this.setState({ points });
  }

  handleClearSelection() {
    this.setState({ points: [] });
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

    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };

    return (
      <div className="demo">
        <div style={containerStyle}>
          {this.listData()}
          <VictoryChart style={chartStyle}
            height={400}
            padding={{ top: 100, bottom: 50, left: 50, right: 50 }}
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
            <VictoryLegend x={120} y={20}
              title="Legend"
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
              data={[
                { name: "One", symbol: { fill: "tomato" } },
                { name: "Two", symbol: { fill: "orange" } },
                { name: "Three", symbol: { fill: "gold" } }
              ]}
            />
            <VictoryLine
              style={{
                data: { stroke: "tomato" }
              }}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 }
              ]}
            />
            <VictoryLine
              style={{
                data: { stroke: "blue" }
              }}
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 }
              ]}
            />
            <VictoryLine
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: -3 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 }
              ]}
            />
          </VictoryChart>

          <VictoryChart style={chartStyle}
            containerComponent={<VictorySelectionContainer/>}
          >
            <VictoryGroup
              data={[
                { x: 1, y: 5 },
                { x: 2, y: 4 },
                { x: 3, y: -2 }
              ]}
            >
              <VictoryLine style={{ data: { stroke: "tomato" } }}/>
              <VictoryScatter
                style={{ data: { fill: (d, active) => active ? "tomato" : "gray" } }}
                labels={(d) => d.y}
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryGroup>

            <VictoryGroup
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 }
              ]}
            >
              <VictoryLine style={{ data: { stroke: "blue" } }}/>
              <VictoryScatter
                style={{ data: { fill: (d, active) => active ? "blue" : "gray" } }}
                labels={(d) => d.y}
                labelComponent={<VictoryTooltip/>}
              />
            </VictoryGroup>

            <VictoryGroup
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 }
              ]}
            >
              <VictoryLine style={{ data: { stroke: "black" } }}/>
              <VictoryScatter
                style={{ data: { fill: (d, active) => active ? "black" : "gray" } }}
                labels={(d) => d.y}
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
              { x: 1, y: -5 },
              { x: 2, y: 4 },
              { x: 3, y: 2 },
              { x: 4, y: 3 },
              { x: 5, y: 1 },
              { x: 6, y: -3 },
              { x: 7, y: 3 }
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
                data: { fill: "tomato" }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 }
              ]}
            />
            <VictoryScatter
              style={{
                data: { fill: "blue" }
              }}
              size={(datum, active) => active ? 5 : 3}
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 }
              ]}
            />
            <VictoryScatter
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: -3 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 }
              ]}
              size={(datum, active) => active ? 5 : 3}
            />
          </VictoryGroup>

          <VictoryChart style={chartStyle}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                }}
              />
            }
          >
          <VictoryStack horizontal>
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
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 }
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
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 }
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
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: -3 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 }
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
