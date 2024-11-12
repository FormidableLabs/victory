import React from "react";

import { VictoryAxis } from "victory-axis";
import { VictoryBoxPlot } from "victory-box-plot";
import { VictoryChart } from "victory-chart";
import { VictoryPolarAxis } from "victory-polar-axis";
import { Arc, LineSegment, VictoryTheme, Whisker } from "victory-core";
import { range, random } from "lodash";

const themeColors = VictoryTheme.clean.palette?.colors || {};

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
      axisBackgroundColor: themeColors.green || "mediumseagreen",
      whiskersActive: true,
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        boxPlotData: this.getBoxPlotData(),
      });
    }, 3000);
  }

  getBoxPlotData() {
    return range(5).map((i: number) => {
      return {
        x: i,
        y: [random(2, 100), random(2, 100), random(2, 100), random(2, 100)],
      };
    });
  }

  handleClick() {
    const newBackgroundColor =
      this.state.axisBackgroundColor === "mediumseagreen" ||
      this.state.axisBackgroundColor === themeColors.green
        ? themeColors.cyan || "paleturquoise"
        : themeColors.green || "mediumseagreen";

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
      justifyContent: "center",
    };

    const chartStyle = {
      parent: {
        border: "1px solid #ccc",
        margin: "2%",
        maxWidth: "40%",
      },
    };

    const axisChartStyle = {
      ...chartStyle,
      background: { fill: this.state.axisBackgroundColor },
    };

    const lineSegmentStyle = {
      stroke: "white",
      strokeWidth: 5,
      cursor: "pointer",
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart polar style={chartStyle} theme={VictoryTheme.clean}>
            <VictoryPolarAxis
              circularAxisComponent={
                <Arc
                  r={100}
                  cx={0}
                  cy={0}
                  startAngle={0}
                  endAngle={180}
                  style={{ fill: themeColors.red }}
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
                  style={{ fill: themeColors.red }}
                />
              }
            />
          </VictoryChart>

          <VictoryChart style={axisChartStyle} theme={VictoryTheme.clean}>
            <VictoryAxis
              crossAxis
              axisComponent={
                <LineSegment
                  events={{ onClick: this.handleClick.bind(this) }}
                  style={lineSegmentStyle}
                />
              }
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
              domain={[-10, 10]}
              offsetX={200}
              standalone={false}
            />
          </VictoryChart>

          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.clean}
            style={chartStyle}
          >
            <VictoryBoxPlot
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
