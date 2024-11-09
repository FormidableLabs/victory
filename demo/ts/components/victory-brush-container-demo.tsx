 
import React from "react";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";
import { VictoryGroup } from "victory-group";
import { VictoryAxis } from "victory-axis";
import { VictoryBar } from "victory-bar";
import { VictoryLine } from "victory-line";
import { VictoryScatter } from "victory-scatter";
import { VictoryLegend } from "victory-legend";
import { VictoryZoomContainer } from "victory-zoom-container";
import { VictoryBrushContainer } from "victory-brush-container";
import { DomainTuple, VictoryTheme } from "victory-core";

const themeColors = VictoryTheme.clean.palette?.colors || {};

interface VictoryBrushContainerDemoState {
  zoomDomain: {
    x?: DomainTuple;
    y?: DomainTuple;
  };
}

export default class VictoryBrushContainerDemo extends React.Component<
  any,
  VictoryBrushContainerDemoState
> {
  constructor(props: any) {
    super(props);
  }

  handleZoom(domain: { x?: DomainTuple; y?: DomainTuple }) {
    this.setState({ zoomDomain: domain });
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
            theme={VictoryTheme.clean}
            width={800}
            height={500}
            scale={{ x: "time" }}
            containerComponent={
              <VictoryZoomContainer
                responsive={false}
                zoomDomain={this.state?.zoomDomain}
                zoomDimension="x"
                onZoomDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryLine
              data={[
                { x: new Date(1982, 1, 1), y: 125 },
                { x: new Date(1987, 1, 1), y: 257 },
                { x: new Date(1993, 1, 1), y: 345 },
                { x: new Date(1997, 1, 1), y: 515 },
                { x: new Date(2001, 1, 1), y: 132 },
                { x: new Date(2005, 1, 1), y: 305 },
                { x: new Date(2011, 1, 1), y: 270 },
                { x: new Date(2015, 1, 1), y: 470 },
              ]}
            />
          </VictoryChart>
          <VictoryChart
            theme={VictoryTheme.clean}
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={800}
            height={100}
            scale={{ x: "time" }}
            containerComponent={
              <VictoryBrushContainer
                responsive={false}
                brushDomain={this.state?.zoomDomain}
                brushDimension="x"
                onBrushDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickValues={[
                new Date(1985, 1, 1),
                new Date(1990, 1, 1),
                new Date(1995, 1, 1),
                new Date(2000, 1, 1),
                new Date(2005, 1, 1),
                new Date(2010, 1, 1),
              ]}
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              data={[
                { x: new Date(1982, 1, 1), y: 125 },
                { x: new Date(1987, 1, 1), y: 257 },
                { x: new Date(1993, 1, 1), y: 345 },
                { x: new Date(1997, 1, 1), y: 515 },
                { x: new Date(2001, 1, 1), y: 132 },
                { x: new Date(2005, 1, 1), y: 305 },
                { x: new Date(2011, 1, 1), y: 270 },
                { x: new Date(2015, 1, 1), y: 470 },
              ]}
            />
          </VictoryChart>

          <VictoryChart
            theme={VictoryTheme.clean}
            style={chartStyle}
            height={400}
            padding={{ top: 100, bottom: 50, left: 50, right: 50 }}
            containerComponent={
              <VictoryBrushContainer
                brushDomain={{ x: [2, 4], y: [-2, 2] }}
                allowDrag={false}
              />
            }
          >
            <VictoryAxis dependentAxis invertAxis />
            <VictoryLegend
              x={120}
              y={20}
              title="Legend"
              centerTitle
              orientation="horizontal"
              data={[
                { name: "One", symbol: { fill: themeColors.red } },
                { name: "Two", symbol: { fill: themeColors.orange } },
                { name: "Three", symbol: { fill: themeColors.yellow } },
              ]}
            />
            <VictoryLine
              style={{
                data: { stroke: themeColors.red },
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
            <VictoryLine
              style={{
                data: { stroke: themeColors.orange },
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
            <VictoryLine
              style={{
                data: { stroke: themeColors.yellow },
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
          </VictoryChart>

          <VictoryScatter
            theme={VictoryTheme.clean}
            style={{
              parent: chartStyle.parent,
              data: {
                fill: ({ active }) =>
                  active
                    ? themeColors.blue || "blue"
                    : themeColors.orange || "orange",
              },
            }}
            domain={{ x: [0, 10], y: [-5, 5] }}
            containerComponent={
              <VictoryBrushContainer
                defaultBrushArea="none"
                brushDomain={{ x: [0, 10] }}
              />
            }
            size={({ active }) => (active ? 5 : 3)}
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

          <VictoryScatter
            style={{
              parent: chartStyle.parent,
              data: {
                fill: ({ active }) =>
                  active
                    ? themeColors.blue || "blue"
                    : themeColors.orange || "orange",
              },
            }}
            containerComponent={
              <VictoryBrushContainer defaultBrushArea="disable" />
            }
            size={({ active }) => (active ? 5 : 3)}
            y={(d) => d.x * d.x}
          />

          <VictoryGroup
            style={chartStyle}
            containerComponent={
              <VictoryBrushContainer defaultBrushArea="move" />
            }
          >
            <VictoryScatter
              style={{
                data: { fill: themeColors.red },
              }}
              size={({ active }) => (active ? 5 : 3)}
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
            <VictoryScatter
              style={{
                data: { fill: themeColors.orange },
              }}
              size={({ active }) => (active ? 5 : 3)}
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
                data: { fill: themeColors.yellow },
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
              size={({ active }) => (active ? 5 : 3)}
            />
          </VictoryGroup>

          <VictoryStack
            theme={VictoryTheme.clean}
            style={chartStyle}
            containerComponent={<VictoryBrushContainer />}
          >
            <VictoryBar
              barWidth={({ active }) => (active ? 5 : 3)}
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
                  fill: themeColors.purple,
                },
              }}
              barWidth={({ active }) => (active ? 5 : 3)}
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
                  fill: themeColors.red,
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

          <VictoryLine
            theme={VictoryTheme.clean}
            style={{
              parent: chartStyle.parent,
              data: { stroke: themeColors.teal },
            }}
            containerComponent={
              <VictoryBrushContainer
                brushDomain={{ y: [-3, 3] }}
                brushComponent={<rect style={{ fill: themeColors.blue }} />}
                handleWidth={1}
                handleStyle={{
                  stroke: themeColors.cyan,
                }}
              />
            }
            data={[
              { x: 1, y: -3 },
              { x: 2, y: 5 },
              { x: 3, y: -3 },
              { x: 4, y: 0 },
              { x: 5, y: -5 },
              { x: 6, y: 2 },
              { x: 7, y: 0 },
            ]}
          />
        </div>
      </div>
    );
  }
}
