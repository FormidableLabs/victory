/* eslint-disable no-magic-numbers */
import React from "react";
import { random, range, round } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryBar } from "victory-bar";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryCursorContainer } from "victory-cursor-container";
import { VictoryTooltip } from "victory-tooltip";
import { VictoryLegend } from "victory-legend";
import { VictoryTheme, CoordinatesPropType } from "victory-core";

interface VictoryCursorContainerStateInterface {
  data: { a: number; b: number }[];
  cursorValue: CoordinatesPropType;
  bigData: CoordinatesPropType[];
}

const makeData = () =>
  range(1500).map((x) => ({ x, y: x + 10 * Math.random() }));

class App extends React.Component<any, VictoryCursorContainerStateInterface> {
  defaultCursorValue?: CoordinatesPropType = undefined;
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.defaultCursorValue = { x: 2.25, y: 1.75 };

    this.state = {
      data: this.getData(),
      cursorValue: this.defaultCursorValue,
      bigData: makeData(),
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    const bars = random(6, 10);
    return range(bars).map((bar) => {
      return { a: bar + 1, b: random(2, 10) };
    });
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
          <VictoryChart
            style={chartStyle}
            theme={VictoryTheme.material}
            height={400}
            padding={{ top: 100, bottom: 40, left: 50, right: 50 }}
            containerComponent={
              <VictoryCursorContainer
                cursorLabel={({ datum }) => round(datum.x, 2)}
              />
            }
          >
            <VictoryLegend
              x={90}
              y={10}
              title="Legend"
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
              data={[
                { name: "One", symbol: { fill: "tomato" } },
                { name: "Two", symbol: { fill: "orange" } },
                { name: "Three", symbol: { fill: "gold" } },
              ]}
            />
            <VictoryLine data={this.state.bigData} />
          </VictoryChart>

          <VictoryChart
            horizontal
            style={chartStyle}
            theme={VictoryTheme.clean}
            domainPadding={{ x: 15 }}
            containerComponent={
              <VictoryCursorContainer
                cursorLabel={({ datum }) => round(datum.x, 2)}
                cursorDimension="y"
                defaultCursorValue={3}
              />
            }
          >
            <VictoryGroup offset={10}>
              <VictoryBar
                data={[
                  { x: 1, y: 5, l: "one" },
                  { x: 2, y: 4, l: "two" },
                  { x: 3, y: -2, l: "three" },
                ]}
                style={{
                  labels: { fill: "tomato" },
                }}
              />

              <VictoryBar
                data={[
                  { x: 1, y: -3, l: "red" },
                  { x: 2, y: 5, l: "green" },
                  { x: 3, y: 3, l: "blue" },
                ]}
                style={{
                  labels: { fill: "blue" },
                }}
              />

              <VictoryBar
                data={[
                  { x: 1, y: 5, l: "cat" },
                  { x: 2, y: -4, l: "dog" },
                  { x: 3, y: -2, l: "bird" },
                ]}
                style={{
                  labels: { fill: "black" },
                }}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryScatter
            theme={VictoryTheme.clean}
            animate={{ duration: 1000 }}
            style={{
              parent: chartStyle.parent,
              data: {
                fill: ({ active }) => (active ? "tomato" : "black"),
              },
            }}
            containerComponent={
              <VictoryCursorContainer
                theme={VictoryTheme.clean}
                cursorLabel={({ datum }) => round(datum.x, 2)}
                defaultCursorValue={1}
              />
            }
            size={({ active }) => (active ? 5 : 3)}
            data={this.state.data}
            x="a"
            y="b"
          />

          <VictoryScatter
            style={{
              parent: chartStyle.parent,
            }}
            containerComponent={<VictoryCursorContainer />}
            size={({ active }) => (active ? 5 : 3)}
            y={(d) => d.x * d.x}
          />

          <VictoryChart
            style={chartStyle}
            containerComponent={
              <VictoryCursorContainer
                defaultCursorValue={2}
                cursorDimension="x"
                cursorLabel={({ datum }) => round(datum.x, 2)}
                cursorLabelOffset={15}
              />
            }
          >
            <VictoryGroup style={chartStyle}>
              <VictoryScatter
                style={{
                  data: { fill: "tomato" },
                }}
                size={({ active }) => (active ? 5 : 3)}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
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
                  data: { fill: "blue" },
                }}
                size={({ active }) => (active ? 5 : 3)}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
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
                labels={(d) => d.y}
                labelComponent={<VictoryTooltip />}
                size={({ active }) => (active ? 5 : 3)}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryStack
            style={chartStyle}
            containerComponent={<VictoryCursorContainer />}
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
                  stroke: ({ active }) => (active ? "black" : "none"),
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
      </div>
    );
  }
}

export default App;
