import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryBar } from "victory-bar";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictorySelectionContainer } from "victory-selection-container";
import { VictoryLegend } from "victory-legend";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryStyleInterface, VictoryTheme } from "victory-core";

const themeColors = VictoryTheme.clean.palette?.colors || {};
const {
  red = "red",
  green = "green",
  blue = "blue",
  pink = "pink",
  cyan = "cyan",
  purple = "purple",
  orange = "orange",
  yellow = "gold",
} = themeColors;

const activeStrokeStyle: VictoryStyleInterface = {
  data: {
    stroke: ({ active }) => (active ? purple : "none"),
    strokeWidth: 2,
  },
};
interface SelectionDemoState {
  points: { x: number; y: number }[];
}

interface DataSet {
  data?: { x: number; y: number }[];
}

export default class SelectionDemo extends React.Component<
  any,
  SelectionDemoState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      points: [],
    };
  }

  handleSelection(datasets: DataSet[]) {
    const points = datasets.reduce(
      (memo: any, dataset: DataSet) => memo.concat(dataset.data),
      [],
    );
    this.setState({ points });
  }

  handleClearSelection() {
    this.setState({ points: [] });
  }

  listData() {
    const points = this.state.points.map(
      (point: { x: number; y: number }, index: number) => {
        return <li key={index}>{`${point.x}, ${point.y}`}</li>;
      },
    );

    return (
      <div>
        <p>Points</p>
        <ul>{points}</ul>
      </div>
    );
  }

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const chartStyle = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          {this.listData()}
          <VictoryChart
            theme={VictoryTheme.clean}
            style={chartStyle}
            height={400}
            padding={{ top: 100, bottom: 50, left: 50, right: 50 }}
            containerComponent={
              <VictorySelectionContainer
                selectionDimension="x"
                selectionStyle={{
                  stroke: red,
                  strokeWidth: 2,
                  fill: red,
                  fillOpacity: 0.1,
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
              data={[
                { name: "One", symbol: { fill: red } },
                { name: "Two", symbol: { fill: orange } },
                { name: "Three", symbol: { fill: yellow } },
              ]}
            />
            <VictoryLine
              style={{
                data: { stroke: red },
              }}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 },
              ]}
            />
            <VictoryLine
              style={{
                data: { stroke: orange },
              }}
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 },
              ]}
            />
            <VictoryLine
              style={{
                data: { stroke: yellow },
              }}
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: -3 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 },
              ]}
            />
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            containerComponent={<VictorySelectionContainer />}
          >
            <VictoryGroup
              data={[
                { x: 1, y: 5 },
                { x: 2, y: 4 },
                { x: 3, y: -2 },
              ]}
            >
              <VictoryLine style={{ data: { stroke: cyan } }} />
              <VictoryScatter
                style={{
                  data: { fill: ({ active }) => (active ? cyan : yellow) },
                }}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>

            <VictoryGroup
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
              ]}
            >
              <VictoryLine style={{ data: { stroke: green } }} />
              <VictoryScatter
                style={{
                  data: { fill: ({ active }) => (active ? green : yellow) },
                }}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>

            <VictoryGroup
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
              ]}
            >
              <VictoryLine style={{ data: { stroke: pink } }} />
              <VictoryScatter
                style={{
                  data: { fill: ({ active }) => (active ? pink : yellow) },
                }}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryScatter
            style={{
              parent: chartStyle.parent,
              data: {
                fill: ({ active }) => (active ? red : yellow),
              },
            }}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: red,
                  strokeWidth: 2,
                  fill: red,
                  fillOpacity: 0.1,
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
              { x: 7, y: 3 },
            ]}
          />

          <VictoryScatter
            style={{
              parent: chartStyle.parent,
              data: {
                fill: ({ active }) => (active ? pink : purple),
              },
            }}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: pink,
                  strokeWidth: 2,
                  fill: pink,
                  fillOpacity: 0.1,
                }}
              />
            }
            y={(d) => d.x * d.x}
          />

          <VictoryGroup
            style={chartStyle}
            containerComponent={
              <VictorySelectionContainer
                selectionStyle={{
                  stroke: red,
                  strokeWidth: 2,
                  fill: red,
                  fillOpacity: 0.1,
                }}
              />
            }
          >
            <VictoryScatter
              style={{
                data: { fill: blue },
              }}
              size={({ active }) => (active ? 5 : 3)}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 },
              ]}
            />
            <VictoryScatter
              style={{
                data: { fill: green },
              }}
              size={({ active }) => (active ? 5 : 3)}
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 },
              ]}
            />
            <VictoryScatter
              style={{
                data: { fill: purple },
              }}
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: -3 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 },
              ]}
              size={({ active }) => (active ? 5 : 3)}
            />
          </VictoryGroup>

          <VictoryChart
            horizontal
            theme={VictoryTheme.clean}
            style={chartStyle}
            containerComponent={
              <VictorySelectionContainer
                selectionDimension="x"
                selectionStyle={{
                  stroke: blue,
                  strokeWidth: 2,
                  fill: blue,
                  fillOpacity: 0.1,
                }}
              />
            }
          >
            <VictoryStack>
              <VictoryBar
                style={activeStrokeStyle}
                data={[
                  { x: 1, y: -5 },
                  { x: 2, y: 4 },
                  { x: 3, y: 2 },
                  { x: 4, y: 3 },
                  { x: 5, y: 1 },
                  { x: 6, y: -3 },
                  { x: 7, y: 3 },
                ]}
              />
              <VictoryBar
                style={activeStrokeStyle}
                data={[
                  { x: 1, y: -3 },
                  { x: 2, y: 5 },
                  { x: 3, y: 3 },
                  { x: 4, y: 0 },
                  { x: 5, y: -2 },
                  { x: 6, y: -2 },
                  { x: 7, y: 5 },
                ]}
              />
              <VictoryBar
                style={activeStrokeStyle}
                data={[
                  { x: 1, y: 5 },
                  { x: 2, y: -4 },
                  { x: 3, y: -2 },
                  { x: 4, y: -3 },
                  { x: 5, y: -1 },
                  { x: 6, y: 3 },
                  { x: 7, y: -3 },
                ]}
              />
            </VictoryStack>
          </VictoryChart>
        </div>
      </div>
    );
  }
}
