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
import { VictoryTheme, CoordinatesPropType } from "victory-core";

const themeColors = VictoryTheme.clean.palette?.colors || {};

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
            theme={VictoryTheme.clean}
            containerComponent={
              <VictoryCursorContainer
                cursorLabel={({ datum }) => round(datum.x, 2)}
              />
            }
          >
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
              />

              <VictoryBar
                data={[
                  { x: 1, y: -3, l: "red" },
                  { x: 2, y: 5, l: "green" },
                  { x: 3, y: 3, l: "blue" },
                ]}
              />

              <VictoryBar
                data={[
                  { x: 1, y: 5, l: "cat" },
                  { x: 2, y: -4, l: "dog" },
                  { x: 3, y: -2, l: "bird" },
                ]}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryScatter
            theme={VictoryTheme.clean}
            animate={{ duration: 1000 }}
            style={{
              parent: chartStyle.parent,
              data: {
                fill: ({ active }) =>
                  active
                    ? themeColors.teal || "teal"
                    : themeColors.purple || "purple",
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
            theme={VictoryTheme.clean}
            style={{
              parent: chartStyle.parent,
              data: {
                fill: themeColors.green,
              },
            }}
            containerComponent={<VictoryCursorContainer />}
            size={({ active }) => (active ? 5 : 3)}
            y={(d) => d.x * d.x}
          />

          <VictoryChart
            theme={VictoryTheme.clean}
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
                  data: { fill: themeColors.red },
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
                  data: { fill: themeColors.yellow },
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
            theme={VictoryTheme.clean}
            colorScale="warm"
            style={chartStyle}
            containerComponent={<VictoryCursorContainer />}
          >
            <VictoryBar
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
