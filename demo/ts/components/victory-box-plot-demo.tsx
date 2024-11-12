/* eslint-disable no-magic-numbers */
import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryBoxPlot } from "victory-box-plot";
import { VictoryTheme } from "victory-core";
import { range, random } from "lodash";

interface VictoryBoxPlotDemoState {
  data: {
    x: number;
    y: number[];
  }[];
}

export default class VictoryBoxPlotDemo extends React.Component<
  any,
  VictoryBoxPlotDemoState
> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.getData(),
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
    return range(5).map((i) => {
      return {
        x: i,
        y: range(20).map(() => random(1, 100)),
      };
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
      <div className="demo" style={containerStyle}>
        <VictoryChart
          style={chartStyle}
          minDomain={0}
          theme={VictoryTheme.clean}
        >
          <VictoryBoxPlot
            minLabels
            maxLabels
            data={[
              { x: "red", y: [5, 10, 9, 2] },
              { x: "blue", y: [1, 15, 6, 8] },
              { x: "green", y: [3, 5, 6, 9] },
              { x: "yellow", y: [5, 20, 8, 12] },
              { x: "white", y: [2, 11, 12, 13] },
            ]}
          />
        </VictoryChart>
        <VictoryChart
          style={chartStyle}
          theme={VictoryTheme.clean}
          domain={{ x: [0, 2], y: [0, 20] }}
        >
          <VictoryBoxPlot
            data={[
              { x: 1, y: 10 },
              { x: 1, y: 7 },
              { x: 1, y: 3 },
              { x: 1, y: 5 },
            ]}
          />
        </VictoryChart>
        <VictoryChart
          theme={VictoryTheme.clean}
          style={chartStyle}
          domain={{ x: [0, 3], y: [0, 20] }}
        >
          <VictoryBoxPlot
            boxWidth={20}
            labels
            data={[
              { x: 1, y: [5, 10, 9, 2] },
              { x: 2, y: [1, 15, 6, 8] },
            ]}
            style={{
              q1: { fill: VictoryTheme.clean.palette?.colors?.purple },
              q3: { fill: VictoryTheme.clean.palette?.colors?.orange },
            }}
          />
        </VictoryChart>

        <VictoryChart
          horizontal
          theme={VictoryTheme.clean}
          style={chartStyle}
          domain={{ y: [0, 20], x: [0, 3] }}
        >
          <VictoryBoxPlot
            minLabels
            maxLabels
            q1Labels={({ datum }) => `x: ${datum.x}`}
            whiskerWidth={50}
            data={[
              { x: 1, y: [5, 10, 9, 2] },
              { x: 2, y: [1, 15, 6, 8] },
            ]}
            boxWidth={20}
            labelOrientation={"top"}
            events={[
              {
                target: "q1",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "q1Labels",
                        mutation: () => ({ text: "LABEL!" }),
                      },
                    ];
                  },
                },
              },
            ]}
            style={{
              q1: { fill: VictoryTheme.clean.palette?.colors?.yellow },
              q3: { fill: VictoryTheme.clean.palette?.colors?.red },
            }}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.clean}
          style={chartStyle}
          horizontal
          domainPadding={50}
        >
          <VictoryBoxPlot
            minLabels
            maxLabels
            boxWidth={10}
            data={[
              { x: new Date(1980, 1, 1), y: [5, 10, 9, 2] },
              { x: new Date(1990, 1, 1), y: [1, 15, 6, 8] },
              { x: new Date(2000, 1, 1), y: [3, 5, 6, 9] },
              { x: new Date(2010, 1, 1), y: [5, 20, 8, 12] },
              { x: new Date(2020, 1, 1), y: [2, 11, 12, 13] },
            ]}
            style={{
              q1: { fill: VictoryTheme.clean.palette?.colors?.red },
              q3: { fill: VictoryTheme.clean.palette?.colors?.green },
            }}
          />
        </VictoryChart>
        <VictoryChart
          theme={VictoryTheme.clean}
          style={chartStyle}
          domainPadding={50}
        >
          <VictoryBoxPlot
            minLabels
            maxLabels
            boxWidth={10}
            data={[
              { x: "red", y: [5, 10, 9, 2] },
              { x: "blue", y: [1, 15, 6, 8] },
              { x: "green", y: [3, 5, 6, 9] },
              { x: "yellow", y: [5, 20, 8, 12] },
              { x: "white", y: [2, 11, 12, 13] },
            ]}
            style={{
              q1: { fill: VictoryTheme.clean.palette?.colors?.blue },
              q3: { fill: VictoryTheme.clean.palette?.colors?.cyan },
            }}
          />
        </VictoryChart>
        <VictoryChart
          theme={VictoryTheme.clean}
          style={chartStyle}
          domainPadding={50}
        >
          <VictoryBoxPlot
            minLabels
            maxLabels
            boxWidth={10}
            data={[
              { x: 1, y: 5 },
              { x: 1, y: 10 },
              { x: 1, y: 8 },
              { x: 2, y: 1 },
              { x: 2, y: 15 },
              { x: 2, y: 7 },
              { x: 3, y: 3 },
              { x: 3, y: 8 },
              { x: 3, y: 5 },
            ]}
            style={{
              q1: { fill: VictoryTheme.clean.palette?.colors?.green },
              q3: { fill: VictoryTheme.clean.palette?.colors?.yellow },
            }}
          />
        </VictoryChart>
        <VictoryChart
          theme={VictoryTheme.clean}
          style={chartStyle}
          domainPadding={50}
        >
          <VictoryBoxPlot
            labels
            boxWidth={10}
            horizontal
            x="type"
            data={[
              { type: 1, min: 1, max: 18, median: 8, q1: 5, q3: 15 },
              { type: 2, min: 4, max: 20, median: 10, q1: 7, q3: 15 },
              { type: 3, min: 3, max: 12, median: 6, q1: 5, q3: 10 },
            ]}
            labelOrientation={{
              q1: "top",
              q3: "top",
              min: "bottom",
              max: "bottom",
              median: "bottom",
            }}
            style={{
              q1: { fill: VictoryTheme.clean.palette?.colors?.red },
              q3: { fill: VictoryTheme.clean.palette?.colors?.purple },
            }}
          />
        </VictoryChart>
        <VictoryChart
          theme={VictoryTheme.clean}
          horizontal
          animate
          style={chartStyle}
        >
          <VictoryBoxPlot
            boxWidth={10}
            data={this.state.data}
            style={{
              q1: { fill: VictoryTheme.clean.palette?.colors?.cyan },
              q3: { fill: VictoryTheme.clean.palette?.colors?.purple },
            }}
          />
        </VictoryChart>
        <VictoryBoxPlot
          theme={VictoryTheme.clean}
          animate
          style={chartStyle}
          boxWidth={10}
          data={this.state.data}
        />
      </div>
    );
  }
}
