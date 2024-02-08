/* eslint-disable no-magic-numbers */
import React from "react";
import { random, range } from "lodash";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryBar } from "victory-bar";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryVoronoiContainer } from "victory-voronoi-container";
import { Flyout, VictoryTooltip } from "victory-tooltip";
import { VictoryLegend } from "victory-legend";
import { VictoryLabel, VictoryTheme } from "victory-core";

interface VictoryVoronoiContainerDemoState {
  data: {
    a: number;
    b: number;
  }[];
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
};

const chartStyle: { [key: string]: React.CSSProperties } = {
  parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
};

export default class VictoryVoronoiContainerDemo extends React.Component<
  any,
  VictoryVoronoiContainerDemoState
> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.getData(),
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
    const dy = 13;
    const CustomLabel = (props: any) => {
      const x =
        props.x - 2 - 4 * Math.max(...props.text.map((t: string) => t.length));
      const startY = 2 + props.y - (props.text.length * dy) / 2;
      return (
        <g>
          {props.activePoints.map((pt: any, idx: number) => {
            return (
              <rect
                key={`square_${idx}`}
                width={10}
                height={10}
                x={x}
                y={startY + dy * idx}
                style={{ fill: pt.c }}
              />
            );
          })}
          <VictoryLabel {...props} />
        </g>
      );
    };

    const CustomFlyout = (props: any) => {
      return <Flyout {...props} width={props.width + 15} />;
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart
            style={chartStyle}
            scale={{ y: "log" }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={({ datum }) => `y: ${datum.y}`}
                labelComponent={<VictoryTooltip />}
              />
            }
          >
            <VictoryScatter
              style={{ data: { fill: "red" }, labels: { fill: "red" } }}
              data={[
                { x: 0, y: 2500 },
                { x: 2, y: 3300 },
                { x: 4, y: 4300 },
                { x: 6, y: 2400 },
                { x: 8, y: 3300 },
                { x: 10, y: 5400 },
                { x: 12, y: 8900 },
              ]}
            />
            <VictoryScatter
              data={[
                { x: 0, y: 200 },
                { x: 2, y: 3100 },
                { x: 4, y: 2500 },
                { x: 6, y: 870 },
                { x: 8, y: 2300 },
                { x: 10, y: 550 },
                { x: 12, y: 5200 },
              ]}
            />
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            domain={{ y: [0, 6] }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={({ datum }) => `y: ${datum.y}`}
                labelComponent={
                  <VictoryTooltip
                    // TODO: active points is not exported properly, so this throws a type error
                    text={({ activePoints }) => {
                      return activePoints
                        .map(({ y }) => `value: ${y}`)
                        .join(" - ");
                    }}
                  />
                }
              />
            }
          >
            <VictoryScatter
              style={{ data: { fill: "red" }, labels: { fill: "red" } }}
              data={[
                { x: 0, y: 2 },
                { x: 2, y: 3 },
                { x: 4, y: 4 },
                { x: 6, y: 5 },
              ]}
            />
            <VictoryScatter
              data={[
                { x: 2, y: 2 },
                { x: 4, y: 3 },
                { x: 6, y: 4 },
                { x: 8, y: 5 },
              ]}
            />
          </VictoryChart>

          <VictoryChart
            height={450}
            domain={{ y: [0, 1] }}
            style={chartStyle}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `I'm kind of a long label ${datum.y}`}
                mouseFollowTooltips
                labelComponent={
                  <VictoryTooltip constrainToVisibleArea flyoutWidth={80} />
                }
              />
            }
          >
            <VictoryScatter
              data={[
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 3, y: 0 },
                { x: 4, y: 0 },
                { x: 5, y: 0 },
                { x: 6, y: 0 },
                { x: 7, y: 0 },
              ]}
              style={{
                data: { fill: "blue" },
              }}
              size={({ active }) => (active ? 8 : 3)}
            />
            <VictoryScatter
              data={[
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 3, y: 1 },
                { x: 4, y: 0 },
                { x: 5, y: 0 },
                { x: 6, y: 0 },
                { x: 7, y: 0 },
              ]}
              style={{
                data: { fill: "red" },
              }}
              size={({ active }) => (active ? 5 : 3)}
            />
          </VictoryChart>

          <VictoryChart
            height={450}
            domain={{ y: [0, 1] }}
            style={chartStyle}
            containerComponent={
              <VictoryVoronoiContainer labels={({ datum }) => datum.y} />
            }
          >
            <VictoryScatter
              data={[
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 3, y: 0 },
                { x: 4, y: 0 },
                { x: 5, y: 0 },
                { x: 6, y: 0 },
                { x: 7, y: 0 },
              ]}
              style={{
                data: { fill: "blue" },
              }}
              size={({ active }) => (active ? 5 : 3)}
            />
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            theme={VictoryTheme.material}
            domainPadding={{ y: 2 }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={({ datum }) => `y:${datum.y}`}
                labelComponent={
                  <VictoryTooltip
                    y={150}
                    flyoutStyle={{ fill: "white" }}
                    style={[{ fill: "green" }, { fill: "magenta" }]}
                  />
                }
              />
            }
          >
            <VictoryLine
              name="first"
              data={[
                { x: 1, y: 5, l: "one" },
                { x: 1.5, y: 5, l: "one point five" },
                { x: 2, y: 4, l: "two" },
                { x: 3, y: -2, l: "three" },
              ]}
              style={{
                data: {
                  stroke: "tomato",
                  strokeWidth: ({ active }) => (active ? 4 : 2),
                },
                labels: { fill: "tomato" },
              }}
            />

            <VictoryLine
              name="second"
              data={[
                { x: 1, y: -3, l: "red" },
                { x: 2, y: 5, l: "green" },
                { x: 3, y: 3, l: "blue" },
              ]}
              style={{
                data: {
                  stroke: "blue",
                  strokeWidth: ({ active }) => (active ? 4 : 2),
                },
                labels: { fill: "blue" },
              }}
            />

            <VictoryLine
              name="third"
              data={[
                { x: 1, y: 5, l: "cat" },
                { x: 2, y: -4, l: "dog" },
                { x: 3, y: -2, l: "bird" },
              ]}
              style={{
                data: {
                  stroke: "black",
                  strokeWidth: ({ active }) => (active ? 4 : 2),
                },
                labels: { fill: "black" },
              }}
            />
          </VictoryChart>

          <VictoryScatter
            animate={{ duration: 1000 }}
            style={{
              parent: chartStyle.parent,
              data: {
                fill: ({ active }) => (active ? "tomato" : "black"),
              },
            }}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => datum._x}
                labelComponent={<VictoryTooltip width={50} />}
              />
            }
            size={({ active }) => (active ? 5 : 3)}
            data={this.state.data}
            x="a"
            y="b"
          />

          <VictoryChart
            style={chartStyle}
            containerComponent={
              <VictoryVoronoiContainer
                radius={20}
                voronoiBlacklist={["ignore"]}
              />
            }
          >
            <VictoryScatter
              name="ignore"
              style={{
                data: {
                  fill: "gray",
                  opacity: 0.2,
                },
              }}
              size={20}
              y={(d) => d.x * d.x}
            />
            <VictoryScatter
              style={{
                data: {
                  fill: ({ active }) => (active ? "tomato" : "black"),
                },
              }}
              size={({ active }) => (active ? 5 : 3)}
              y={(d) => d.x * d.x}
            />
          </VictoryChart>

          <VictoryChart
            height={450}
            padding={{ top: 100, bottom: 20, left: 50, right: 50 }}
            style={chartStyle}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiBlacklist={["ignore"]}
                voronoiDimension="x"
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            }
          >
            <VictoryGroup
              data={[
                { x: 1, y: -5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 0 },
                { x: 5, y: 1 },
                { x: 6, y: -3 },
                { x: 7, y: 3 },
              ]}
            >
              <VictoryScatter
                style={{
                  data: { fill: "tomato" },
                }}
                size={({ active }) => (active ? 8 : 3)}
              />
              <VictoryLine
                name="ignore"
                style={{ data: { stroke: "tomato" } }}
              />
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 },
              ]}
            >
              <VictoryScatter
                style={{
                  data: { fill: "blue" },
                }}
                size={({ active }) => (active ? 5 : 3)}
              />
              <VictoryLine name="ignore" style={{ data: { stroke: "blue" } }} />
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: 1, y: 5 },
                { x: 2, y: -4 },
                { x: 3, y: -2 },
                { x: 4, y: 0 },
                { x: 5, y: -1 },
                { x: 6, y: 3 },
                { x: 7, y: -3 },
              ]}
            >
              <VictoryScatter size={({ active }) => (active ? 5 : 3)} />
              <VictoryLine name="ignore" />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart
            height={450}
            padding={{ top: 100, bottom: 20, left: 50, right: 50 }}
            style={chartStyle}
            containerComponent={
              <VictoryVoronoiContainer voronoiBlacklist={["red"]} />
            }
          >
            <VictoryLegend
              x={140}
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
            <VictoryGroup style={chartStyle}>
              <VictoryScatter
                name="red"
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
                  { x: 4, y: 0 },
                  { x: 5, y: -1 },
                  { x: 6, y: 3 },
                  { x: 7, y: -3 },
                ]}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
                size={({ active }) => (active ? 5 : 3)}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            containerComponent={
              <VictoryVoronoiContainer voronoiBlacklist={["red"]} />
            }
          >
            <VictoryStack>
              <VictoryBar
                name="red"
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
          </VictoryChart>

          <VictoryStack
            style={chartStyle}
            containerComponent={<VictoryVoronoiContainer />}
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

          <VictoryChart
            style={chartStyle}
            theme={VictoryTheme.material}
            domainPadding={{ y: 2 }}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.l}: ${datum.y}`}
                labelComponent={
                  <VictoryTooltip
                    y={150}
                    flyoutComponent={<CustomFlyout />}
                    labelComponent={<CustomLabel />}
                  />
                }
              />
            }
          >
            <VictoryLine
              name="first"
              data={[
                { x: 1, y: 5, c: "red", l: "error" },
                { x: 2, y: 4, c: "red", l: "error" },
                { x: 3, y: 0, c: "red", l: "error" },
              ]}
              style={{
                data: {
                  stroke: "red",
                  strokeWidth: ({ active }) => (active ? 4 : 2),
                },
              }}
            />

            <VictoryLine
              name="second"
              data={[
                { x: 1, y: 0, c: "green", l: "success" },
                { x: 2, y: 4, c: "green", l: "success" },
                { x: 3, y: 3, c: "green", l: "success" },
              ]}
              style={{
                data: {
                  stroke: "green",
                  strokeWidth: ({ active }) => (active ? 4 : 2),
                },
              }}
            />
          </VictoryChart>

          <VictoryChart
            height={450}
            padding={{ top: 100, bottom: 50, left: 50, right: 50 }}
            style={chartStyle}
            domain={{ y: [0, 6] }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={({ datum }) => `y: ${datum.y}`}
                labelComponent={<VictoryTooltip />}
                voronoiPadding={{
                  bottom: 50,
                  left: 50,
                  right: 50,
                  top: 100,
                }}
              />
            }
          >
            <VictoryLegend
              x={165}
              y={10}
              title="Voronoi padding"
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
              data={[
                { name: "One", symbol: { fill: "tomato" } },
                { name: "Two", symbol: { fill: "orange" } },
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: "tomato" }, labels: { fill: "tomato" } }}
              data={[
                { x: 0, y: 2 },
                { x: 2, y: 3 },
                { x: 4, y: 4 },
                { x: 6, y: 5 },
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: "orange" }, labels: { fill: "orange" } }}
              data={[
                { x: 2, y: 2 },
                { x: 4, y: 3 },
                { x: 6, y: 4 },
                { x: 8, y: 5 },
              ]}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
