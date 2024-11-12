import React from "react";
import { VictoryAxis } from "victory-axis";
import { VictoryArea } from "victory-area";
import { VictoryBar } from "victory-bar";
import { VictoryChart } from "victory-chart";
import { VictoryLine } from "victory-line";
import { VictoryPie } from "victory-pie";
import { VictoryScatter } from "victory-scatter";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictorySelectionContainer } from "victory-selection-container";
import { VictoryTheme } from "victory-core";

export default class App extends React.Component {
  render() {
    const style = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "100%" },
    };
    return (
      <div className="demo">
        <h1>Victory Demo</h1>

        <h2>Composites</h2>

        <h3>VictoryPie</h3>
        <p>Default props</p>
        <VictoryPie theme={VictoryTheme.clean} style={style} />

        <h3>VictoryChart</h3>
        <p>
          Line chart of function <code>y = x^2</code>
        </p>

        <VictoryChart theme={VictoryTheme.clean} style={style}>
          <VictoryLine y={(data) => data.x * data.x} />
        </VictoryChart>

        <h3>VictoryChart</h3>
        <p>Custom axes and tickformats; Bar + line chart</p>
        <VictoryChart
          theme={VictoryTheme.clean}
          style={style}
          domainPadding={{ x: 30, y: 30 }}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
            tickFormat={(x) => `${x}\ntick`}
            style={{
              axis: { stroke: "black", strokeWidth: 2 },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "black" },
            }}
          />
          <VictoryAxis
            label="y axis"
            dependentAxis
            tickValues={[0, 1.5, 3, 4.5]}
            style={{
              grid: { strokeWidth: 1 },
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent", padding: 15 },
            }}
          />
          <VictoryBar
            style={{
              data: {
                fill: VictoryTheme.clean.palette?.colors?.orange,
              },
            }}
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 1 },
              { x: 6, y: 2 },
              { x: 7, y: 3 },
              { x: 8, y: 2 },
              { x: 9, y: 1 },
              { x: 10, y: 2 },
              { x: 11, y: 3 },
              { x: 12, y: 2 },
              { x: 13, y: 1 },
            ]}
          />
          <VictoryLine
            y={() => 0.5}
            style={{ data: { stroke: "gold", strokeWidth: 3 } }}
            labels={["LINE"]}
          />
        </VictoryChart>

        <h2>Primitives</h2>

        <h3>VictoryAxis</h3>
        <p>Default props</p>
        <VictoryAxis theme={VictoryTheme.clean} style={style} />

        <h3>VictoryBar</h3>
        <p>Default props</p>
        <VictoryBar theme={VictoryTheme.clean} style={style} />

        <h3>VictoryLine</h3>
        <p>Default props</p>
        <VictoryLine theme={VictoryTheme.clean} style={style} />

        <h3>VictoryScatter</h3>
        <p>Default props</p>
        <VictoryScatter theme={VictoryTheme.clean} style={style} />

        <h3>VictoryArea</h3>
        <p>Default props</p>
        <VictoryArea theme={VictoryTheme.clean} style={style} />

        <h3>VictorySelectionContainer</h3>

        <VictoryGroup
          theme={VictoryTheme.clean}
          style={style}
          containerComponent={
            <VictorySelectionContainer
              selectionStyle={{
                stroke: "tomato",
                strokeWidth: 2,
                fill: "tomato",
                fillOpacity: 0.1,
              }}
            />
          }
        >
          <VictoryScatter
            style={{
              data: { fill: "tomato" },
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
              data: { fill: "blue" },
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

        <VictoryStack
          theme={VictoryTheme.clean}
          style={style}
          containerComponent={
            <VictorySelectionContainer
              selectionStyle={{
                stroke: "tomato",
                strokeWidth: 2,
                fill: "tomato",
                fillOpacity: 0.1,
              }}
            />
          }
        >
          <VictoryBar
            style={{
              data: {
                fill: "tomato",
                stroke: ({ active }) => (active ? "black" : "none"),
                strokeWidth: 2,
              },
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
          <VictoryBar
            style={{
              data: {
                fill: "orange",
                stroke: ({ active }) => (active ? "black" : "none"),
                strokeWidth: 2,
              },
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
          <VictoryBar
            style={{
              data: {
                fill: "gold",
                stroke: ({ active }) => (active ? "#292929" : "none"),
                strokeWidth: 2,
              },
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
        </VictoryStack>
      </div>
    );
  }
}
