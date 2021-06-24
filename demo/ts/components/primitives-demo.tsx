/*eslint-disable no-magic-numbers */
import React from "react";

import { VictoryAxis } from "@packages/victory-axis";
import { VictoryBoxPlot } from "@packages/victory-box-plot";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryPolarAxis } from "@packages/victory-polar-axis";
import { Arc, LineSegment, Whisker } from "@packages/victory-core";
import { range, random } from "lodash";

interface PrimitivesDemoState {
  axisBackgroundColor: string;
  whiskersActive: boolean;
  boxPlotData?: { x?: number; y?: number[] }[];
}

class App extends React.Component<any, PrimitivesDemoState> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      axisBackgroundColor: "mediumseagreen",
      whiskersActive: true
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        boxPlotData: this.getBoxPlotData()
      });
    }, 3000);
  }

  getBoxPlotData() {
    return range(5).map((i: number) => {
      return {
        x: i,
        y: [random(2, 100), random(2, 100), random(2, 100), random(2, 100)]
      };
    });
  }

  handleClick() {
    const newBackgroundColor =
      this.state.axisBackgroundColor === "mediumseagreen"
        ? "paleturquoise"
        : "mediumseagreen";

    this.setState({ axisBackgroundColor: newBackgroundColor });
  }

  handleToggleWhiskers() {
    this.setState({ whiskersActive: !this.state.whiskersActive });
  }

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const chartStyle = {
      parent: {
        border: "1px solid #ccc",
        margin: "2%",
        maxWidth: "40%"
      }
    };

    const axisChartStyle = {
      ...chartStyle,
      background: { fill: this.state.axisBackgroundColor }
    };

    const lineSegmentStyle = {
      stroke: "white",
      strokeWidth: 5,
      cursor: "pointer"
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart polar style={chartStyle}>
            <VictoryPolarAxis
              circularAxisComponent={
                <Arc
                  r={100}
                  cx={0}
                  cy={0}
                  startAngle={0}
                  endAngle={180}
                  style={{ fill: "tomato", stroke: "none" }}
                />
              }
            />
            <VictoryPolarAxis
              circularGridComponent={<Arc r={300} />}
              circularAxisComponent={
                <Arc
                  r={100}
                  cx={0}
                  cy={0}
                  startAngle={180}
                  endAngle={360}
                  style={{ fill: "salmon", stroke: "none" }}
                />
              }
            />
          </VictoryChart>

          <VictoryChart style={axisChartStyle}>
            <VictoryAxis
              crossAxis
              axisComponent={
                <LineSegment
                  events={{ onClick: this.handleClick.bind(this) }}
                  style={lineSegmentStyle}
                />
              }
              width={400}
              height={400}
              domain={[-10, 10]}
              offsetY={200}
              standalone={false}
            />
            <VictoryAxis
              dependentAxis
              crossAxis
              axisComponent={
                <LineSegment
                  events={{ onClick: this.handleClick.bind(this) }}
                  style={lineSegmentStyle}
                />
              }
              width={400}
              height={400}
              domain={[-10, 10]}
              offsetX={200}
              standalone={false}
            />
          </VictoryChart>

          <VictoryChart domainPadding={20}>
            <VictoryBoxPlot
              boxWidth={20}
              data={this.state.boxPlotData}
              maxComponent={<Whisker active={this.state.whiskersActive} />}
              minComponent={<Whisker active={this.state.whiskersActive} />}
            />
          </VictoryChart>
          <button onClick={this.handleToggleWhiskers.bind(this)}>
            Whiskers?
          </button>
        </div>
      </div>
    );
  }
}

export default App;
