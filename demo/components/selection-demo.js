/*eslint-disable no-magic-numbers */
import React from "react";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryStack } from "../../packages/victory-stack/src/index";
import { VictoryGroup } from "../../packages/victory-group/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictoryLine } from "../../packages/victory-line/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictorySelectionContainer } from "../../packages/victory-selection-container/src/index";
import { VictoryLegend } from "../../packages/victory-legend/src/index";
import { VictoryTooltip } from "../../packages/victory-tooltip/src/index";

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
        <ul>{points}</ul>
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
          <VictoryChart
            style={chartStyle}
            height={400}
            padding={{ top: 100, bottom: 50, left: 50, right: 50 }}
            containerComponent={
              <VictorySelectionContainer
                selectionDimension="x"
                selectionStyle={{
                  stroke: "tomato",
                  strokeWidth: 2,
                  fill: "tomato",
                  fillOpacity: 0.1
                }}
                onSelection={this.handleSelection.bind(this)}
                onSelectionCleared={this.handleClearSelection.bind(this)}
              />
            }
          >
            <VictoryLegend
              x={120}
              y={20}
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

          <VictoryChart style={chartStyle} containerComponent={<VictorySelectionContainer />}>
            <VictoryGroup data={[{ x: 1, y: 5 }, { x: 2, y: 4 }, { x: 3, y: -2 }]}>
              <VictoryLine style={{ data: { stroke: "tomato" } }} />
              <VictoryScatter
                style={{ data: { fill: ({ active }) => (active ? "tomato" : "gray") } }}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>

            <VictoryGroup data={[{ x: 1, y: -3 }, { x: 2, y: 5 }, { x: 3, y: 3 }]}>
              <VictoryLine style={{ data: { stroke: "blue" } }} />
              <VictoryScatter
                style={{ data: { fill: ({ active }) => (active ? "blue" : "gray") } }}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>

            <VictoryGroup data={[{ x: 1, y: 5 }, { x: 2, y: -4 }, { x: 3, y: -2 }]}>
              <VictoryLine style={{ data: { stroke: "black" } }} />
              <VictoryScatter
                style={{ data: { fill: ({ active }) => (active ? "black" : "gray") } }}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryScatter
            style={{
              parent: chartStyle.parent,
              data: {
                fill: ({ active }) => (active ? "tomato" : "black")
              }
            }}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato",
                  strokeWidth: 2,
                  fill: "tomato",
                  fillOpacity: 0.1
                }}
              />
            }
            size={({ active }) => (active ? 5 : 3)}
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
                fill: ({ active }) => (active ? "tomato" : "black")
              }
            }}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato",
                  strokeWidth: 2,
                  fill: "tomato",
                  fillOpacity: 0.1
                }}
              />
            }
            size={({ active }) => (active ? 5 : 3)}
            y={(d) => d.x * d.x}
          />

          <VictoryGroup
            style={chartStyle}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: "tomato",
                  strokeWidth: 2,
                  fill: "tomato",
                  fillOpacity: 0.1
                }}
              />
            }
          >
            <VictoryScatter
              style={{
                data: { fill: "tomato" }
              }}
              size={({ active }) => (active ? 5 : 3)}
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
              size={({ active }) => (active ? 5 : 3)}
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
              size={({ active }) => (active ? 5 : 3)}
            />
          </VictoryGroup>

          <VictoryChart
            horizontal
            style={chartStyle}
            containerComponent={
              <VictorySelectionContainer
                selectionDimension="x"
                selectionStyle={{
                  stroke: "tomato",
                  strokeWidth: 2,
                  fill: "tomato",
                  fillOpacity: 0.1
                }}
              />
            }
          >
            <VictoryStack>
              <VictoryBar
                style={{
                  data: {
                    fill: "tomato",
                    stroke: ({ active }) => (active ? "black" : "none"),
                    strokeWidth: 2
                  }
                }}
                size={({ active }) => (active ? 5 : 3)}
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
                    stroke: ({ active }) => (active ? "black" : "none"),
                    strokeWidth: 2
                  }
                }}
                size={({ active }) => (active ? 5 : 3)}
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
                    stroke: ({ active }) => (active ? "black" : "none"),
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
