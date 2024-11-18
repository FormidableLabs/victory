import React from "react";
import round from "lodash/round";
import { VictoryChart } from "victory";
import { VictoryStack } from "victory";
import { VictoryGroup } from "victory";
import { ContainerType, createContainer } from "victory";
import { VictoryBar } from "victory";
import { VictoryLine } from "victory";
import { VictoryScatter } from "victory";
import { VictoryTooltip } from "victory";
import { VictoryLegend } from "victory";
import { VictoryTheme } from "victory";

const themeColors = VictoryTheme.clean.palette?.colors || {};

const Charts = ({
  behaviors,
}: {
  behaviors: [ContainerType, ContainerType];
}) => {
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
  const CustomContainer = createContainer(behaviors[0], behaviors[1]);
  const behaviorsList = behaviors.map((behavior) => `"${behavior}"`).join(", ");

  return (
    <div className="demo">
      <pre>{`VictoryCreateContainer(${behaviorsList})`}</pre>
      <div style={containerStyle}>
        {/* A */}
        <VictoryChart
          style={chartStyle}
          theme={VictoryTheme.clean}
          height={400}
          padding={{ top: 100, bottom: 50, left: 50, right: 50 }}
          domainPadding={{ y: 2 }}
          containerComponent={
            <CustomContainer
              voronoiDimension="x"
              labels={({ datum }) => `y: ${datum.y}`}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={0}
                  flyoutStyle={{ fill: "white" }}
                />
              }
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
            data={[
              { name: "One", symbol: { fill: themeColors.red } },
              { name: "Two", symbol: { fill: themeColors.orange } },
              { name: "Three", symbol: { fill: themeColors.yellow } },
            ]}
          />
          <VictoryLine
            data={[
              { x: 1, y: 5, l: "one" },
              { x: 1.5, y: 5, l: "one point five" },
              { x: 2, y: 4, l: "two" },
              { x: 3, y: -2, l: "three" },
            ]}
            style={{
              data: {
                stroke: themeColors.red,
                strokeWidth: ({ active }) => (active ? 4 : 2),
              },
              labels: { fill: themeColors.red },
            }}
          />

          <VictoryLine
            data={[
              { x: 1, y: -3, l: "red" },
              { x: 2, y: 5, l: "green" },
              { x: 3, y: 3, l: "blue" },
            ]}
            style={{
              data: {
                stroke: themeColors.orange,
                strokeWidth: ({ active }) => (active ? 4 : 2),
              },
              labels: { fill: themeColors.orange },
            }}
          />

          <VictoryLine
            data={[
              { x: 1, y: 5, l: "cat" },
              { x: 2, y: -4, l: "dog" },
              { x: 3, y: -2, l: "bird" },
            ]}
            style={{
              data: {
                stroke: themeColors.yellow,
                strokeWidth: ({ active }) => (active ? 4 : 2),
              },
              labels: { fill: themeColors.yellow },
            }}
          />
        </VictoryChart>
        {/* B */}
        <VictoryChart
          theme={VictoryTheme.clean}
          style={{ parent: chartStyle.parent }}
          containerComponent={
            <CustomContainer
              labels={({ datum }) => round(datum.x, 2).toString()}
              cursorLabel={({ datum }) => round(datum.x, 2)}
              selectionStyle={{
                stroke: themeColors.red,
                strokeWidth: 2,
                fill: themeColors.red,
                fillOpacity: 0.1,
              }}
              defaultCursorValue={0.99}
            />
          }
        >
          <VictoryScatter
            style={{
              data: {
                fill: ({ active }) =>
                  active
                    ? themeColors.red || "tomato"
                    : themeColors.yellow || "yellow",
              },
            }}
            size={({ active }) => (active ? 5 : 3)}
            y={(d) => d.x * d.x}
          />
        </VictoryChart>
        {/* C */}
        <VictoryChart
          theme={VictoryTheme.clean}
          style={chartStyle}
          containerComponent={<CustomContainer />}
        >
          <VictoryGroup style={chartStyle}>
            <VictoryScatter
              style={{
                data: { fill: themeColors.blue },
              }}
              size={({ active }) => (active ? 5 : 3)}
              labels={({ datum }) => datum.y}
              labelComponent={
                <VictoryTooltip
                  pointerLength={4}
                  flyoutPadding={{ top: 8, bottom: 8, left: 16, right: 16 }}
                  cornerRadius={1}
                />
              }
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 0 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 },
              ]}
            />
            <VictoryScatter
              style={{
                data: { fill: themeColors.purple },
              }}
              size={({ active }) => (active ? 5 : 3)}
              labels={({ datum }) => datum.y}
              labelComponent={
                <VictoryTooltip
                  pointerLength={4}
                  flyoutPadding={{ top: 8, bottom: 8, left: 16, right: 16 }}
                  cornerRadius={1}
                />
              }
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
                data: { fill: themeColors.green },
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
              labels={({ datum }) => datum.y}
              labelComponent={
                <VictoryTooltip
                  pointerLength={4}
                  flyoutPadding={{ top: 8, bottom: 8, left: 16, right: 16 }}
                  cornerRadius={1}
                />
              }
              size={({ active }) => (active ? 5 : 3)}
            />
          </VictoryGroup>
        </VictoryChart>
        {/* D */}
        <VictoryStack
          theme={VictoryTheme.clean}
          style={chartStyle}
          containerComponent={<CustomContainer />}
        >
          <VictoryBar
            barWidth={({ active }) => (active ? 10 : 8)}
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
            barWidth={({ active }) => (active ? 10 : 8)}
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
            barWidth={({ active }) => (active ? 10 : 8)}
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
