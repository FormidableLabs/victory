/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import { round } from "lodash";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryStack } from "../../packages/victory-stack/src/index";
import { VictoryGroup } from "../../packages/victory-group/src/index";
import { VictoryCreateContainer } from "../../packages/victory-create-container/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictoryLine } from "../../packages/victory-line/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictoryTooltip } from "../../packages/victory-tooltip/src/index";
import { VictoryLegend } from "../../packages/victory-legend/src/index";

const Charts = ({ behaviors }) => { // eslint-disable-line react/prop-types
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  };
  const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };
  const CustomContainer = VictoryCreateContainer(...behaviors);
  const behaviorsList = behaviors.map((behavior) => `"${behavior}"`).join(", ");

  return (
    <div className="demo">
      <pre>{`VictoryCreateContainer(${behaviorsList})`}</pre>
      <div style={containerStyle}>
        {/* A */}
        <VictoryChart style={chartStyle}
          height={400}
          padding={{ top: 100, bottom: 50, left: 50, right: 50 }}
          domainPadding={{ y: 2 }}
          containerComponent={
            <CustomContainer voronoiDimension="x"
              labels={(d) => `y: ${d.y}`}
              labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }}/>}
              selectedDomain={{ x: [1.5, 2] }}
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
            data={[
              { x: 1, y: 5, l: "one" },
              { x: 1.5, y: 5, l: "one point five" },
              { x: 2, y: 4, l: "two" },
              { x: 3, y: -2, l: "three" }
            ]}
            style={{
              data: { stroke: "tomato", strokeWidth: (d, active) => active ? 4 : 2 },
              labels: { fill: "tomato" }
            }}
          />

          <VictoryLine
            data={[
              { x: 1, y: -3, l: "red" },
              { x: 2, y: 5, l: "green" },
              { x: 3, y: 3, l: "blue" }
            ]}
            style={{
              data: { stroke: "blue", strokeWidth: (d, active) => active ? 4 : 2 },
              labels: { fill: "blue" }
            }}
          />

          <VictoryLine
            data={[
              { x: 1, y: 5, l: "cat" },
              { x: 2, y: -4, l: "dog" },
              { x: 3, y: -2, l: "bird" }
            ]}
            style={{
              data: { stroke: "black", strokeWidth: (d, active) => active ? 4 : 2 },
              labels: { fill: "black" }
            }}
          />
        </VictoryChart>

        {/* B */}
        <VictoryChart
          style={{ parent: chartStyle.parent }}
          containerComponent={
            <CustomContainer
              labels={(d) => round(d.x, 2)}
              cursorLabel={(d) => round(d.x, 2)}
              selectionStyle={{
                stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
              }}
              selectedDomain={{ x: [0.4, 0.95], y: [0.5, 0.8] }}
              defaultCursorValue={0.99}
            />
          }
        >
          <VictoryScatter
            style={{
              data: {
                fill: (datum, active) => active ? "tomato" : "black"
              }
            }}
            size={(datum, active) => active ? 5 : 3}
            y={(d) => d.x * d.x}
          />
        </VictoryChart>

        {/* C */}
        <VictoryChart
          style={chartStyle}
          containerComponent={
            <CustomContainer
              selectedDomain={{ x: [0, 0] }}
            />
          }
        >
          <VictoryGroup style={chartStyle}>
            <VictoryScatter
              style={{
                data: { fill: "tomato" }
              }}
              size={(datum, active) => active ? 5 : 3}
              labels={(d) => d.y}
              labelComponent={<VictoryTooltip/>}
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 0 },
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
              labels={(d) => d.y}
              labelComponent={<VictoryTooltip/>}
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
              labels={(d) => d.y}
              labelComponent={<VictoryTooltip/>}
              size={(datum, active) => active ? 5 : 3}
            />
          </VictoryGroup>
        </VictoryChart>

        {/* D */}
        <VictoryStack
          style={chartStyle}
          containerComponent={
            <CustomContainer
              selectedDomain={{ x: [1.5, 2.5], y: [-3, 4] }}
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
      </div>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <div className="demo">
        <Charts behaviors={["zoom", "voronoi"]} />
        <Charts behaviors={["zoom", "cursor"]} />
        <Charts behaviors={["cursor", "voronoi"]} />
        <Charts behaviors={["brush", "voronoi"]} />
      </div>
    );
  }
}

export default App;
