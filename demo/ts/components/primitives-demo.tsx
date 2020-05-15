/*eslint-disable no-magic-numbers */
import React from "react";

// import { VictoryArea } from "@packages/victory-area";
import { VictoryAxis } from "@packages/victory-axis";
import { VictoryBoxPlot } from "@packages/victory-box-plot";
import { VictoryChart } from "@packages/victory-chart";
import { VictoryPolarAxis } from "@packages/victory-polar-axis";
import { Arc, LineSegment, Whisker } from "@packages/victory-core";

interface PrimitivesDemoState {
  axisBackgroundColor: string;
  showWhiskers: boolean;
}

class App extends React.Component<any, PrimitivesDemoState> {
  constructor(props: any) {
    super(props);
    this.state = {
      axisBackgroundColor: "mediumseagreen",
      showWhiskers: true
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.toggleWhiskers = this.toggleWhiskers.bind(this);
  }

  handleMouseMove(e: React.SyntheticEvent<any>) {
    const newBackgroundColor =
      this.state.axisBackgroundColor === "mediumseagreen" ? "paleturquoise" : "mediumseagreen";

    this.setState({ axisBackgroundColor: newBackgroundColor });
  }

  toggleWhiskers() {
    this.setState({ showWhiskers: !this.state.showWhiskers });
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

    const lineSegmentStyle = { stroke: "white", strokeWidth: 4 };

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
                  events={{ onMouseMove: this.handleMouseMove }}
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
                  events={{ onMouseMove: this.handleMouseMove }}
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
              maxComponent={<Whisker active={this.state.showWhiskers} />}
              minComponent={<Whisker active={this.state.showWhiskers} />}
              data={[
                { x: 1, y: [1, 2, 3, 5] },
                { x: 2, y: [3, 2, 8, 10] },
                { x: 3, y: [2, 8, 6, 5] },
                { x: 4, y: [1, 3, 2, 9] }
              ]}
            />
          </VictoryChart>
          <button onClick={this.toggleWhiskers}>Whiskers?</button>
        </div>
      </div>
    );
  }
}

export default App;
