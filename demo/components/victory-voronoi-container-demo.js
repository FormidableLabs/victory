/*global window:false*/
/*eslint-disable no-magic-numbers */
import React from "react";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryStack } from "../../packages/victory-stack/src/index";
import { VictoryGroup } from "../../packages/victory-group/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictoryLine } from "../../packages/victory-line/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictoryVoronoiContainer } from "../../packages/victory-voronoi-container/src/index";
import { random, range } from "lodash";
import { VictoryTooltip } from "../../packages/victory-tooltip/src/index";
import { VictoryLegend } from "../../packages/victory-legend/src/index";
import { VictoryTheme } from "../../packages/victory-core/src/index";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData()
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData()
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
          <VictoryChart
            height={450}
            domain={{ y: [0, 1] }}
            style={chartStyle}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `I'm kind of a long label ${datum.y}`}
                mouseFollowLabels
                labelComponent={<VictoryTooltip constrainToVisibleArea tooltipWidth={80} />}
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
                { x: 7, y: 0 }
              ]}
              style={{
                data: { fill: "blue" }
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
                { x: 7, y: 0 }
              ]}
              style={{
                data: { fill: "red" }
              }}
              size={({ active }) => (active ? 5 : 3)}
            />
          </VictoryChart>

          <VictoryChart
            height={450}
            domain={{ y: [0, 1] }}
            style={chartStyle}
            containerComponent={<VictoryVoronoiContainer labels={({ datum }) => datum.y} />}
          >
            <VictoryScatter
              data={[
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 3, y: 0 },
                { x: 4, y: 0 },
                { x: 5, y: 0 },
                { x: 6, y: 0 },
                { x: 7, y: 0 }
              ]}
              style={{
                data: { fill: "blue" }
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
                { x: 3, y: -2, l: "three" }
              ]}
              style={{
                data: { stroke: "tomato", strokeWidth: ({ active }) => (active ? 4 : 2) },
                labels: { fill: "tomato" }
              }}
            />

            <VictoryLine
              name="second"
              data={[
                { x: 1, y: -3, l: "red" },
                { x: 2, y: 5, l: "green" },
                { x: 3, y: 3, l: "blue" }
              ]}
              style={{
                data: { stroke: "blue", strokeWidth: ({ active }) => (active ? 4 : 2) },
                labels: { fill: "blue" }
              }}
            />

            <VictoryLine
              name="third"
              data={[
                { x: 1, y: 5, l: "cat" },
                { x: 2, y: -4, l: "dog" },
                { x: 3, y: -2, l: "bird" }
              ]}
              style={{
                data: { stroke: "black", strokeWidth: ({ active }) => (active ? 4 : 2) },
                labels: { fill: "black" }
              }}
            />
          </VictoryChart>

          <VictoryScatter
            animate={{ duration: 1000 }}
            style={{
              parent: chartStyle.parent,
              data: {
                fill: ({ active }) => (active ? "tomato" : "black")
              }
            }}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => datum._x}
                labelComponent={<VictoryTooltip width={50} />}
              />
            }
            size={({ active }) => active ? 5 : 3}
            data={this.state.data}
            x="a"
            y="b"
          />

          <VictoryChart
            style={chartStyle}
            containerComponent={
              <VictoryVoronoiContainer radius={20} voronoiBlacklist={["ignore"]} />
            }
          >
            <VictoryScatter
              name="ignore"
              style={{
                data: {
                  fill: "gray",
                  opacity: 0.2
                }
              }}
              size={20}
              y={(d) => d.x * d.x}
            />
            <VictoryScatter
              style={{
                data: {
                  fill: ({ active }) => (active ? "tomato" : "black")
                }
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
                { x: 7, y: 3 }
              ]}
            >
              <VictoryScatter
                style={{
                  data: { fill: "tomato" }
                }}
                size={({ active }) => (active ? 8 : 3)}
              />
              <VictoryLine name="ignore" style={{ data: { stroke: "tomato" } }} />
            </VictoryGroup>
            <VictoryGroup
              data={[
                { x: 1, y: -3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 4, y: 0 },
                { x: 5, y: -2 },
                { x: 6, y: -2 },
                { x: 7, y: 5 }
              ]}
            >
              <VictoryScatter
                style={{
                  data: { fill: "blue" }
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
                { x: 7, y: -3 }
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
            containerComponent={<VictoryVoronoiContainer voronoiBlacklist={["red"]} />}
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
                { name: "Three", symbol: { fill: "gold" } }
              ]}
            />
            <VictoryGroup style={chartStyle}>
              <VictoryScatter
                name="red"
                style={{
                  data: { fill: "tomato" }
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
                  { x: 7, y: 3 }
                ]}
              />
              <VictoryScatter
                style={{
                  data: { fill: "blue" }
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
                  { x: 7, y: 5 }
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
                  { x: 7, y: -3 }
                ]}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
                size={({ active }) => (active ? 5 : 3)}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart
            style={chartStyle}
            containerComponent={<VictoryVoronoiContainer voronoiBlacklist={["red"]} />}
          >
            <VictoryStack>
              <VictoryBar
                name="red"
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

          <VictoryStack style={chartStyle} containerComponent={<VictoryVoronoiContainer />}>
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
        </div>
      </div>
    );
  }
}

export default App;
