import React from "react";
import { VictoryArea } from "victory-area";
import { VictoryBar } from "victory-bar";
import { VictoryChart } from "victory-chart";
import { VictoryLine } from "victory-line";
import { VictoryPolarAxis } from "victory-polar-axis";
import { VictoryScatter } from "victory-scatter";
import { VictorySelectionContainer } from "victory-selection-container";
import {
  VictoryTheme,
  VictoryLabel,
  VictoryStyleInterface,
} from "victory-core";
import { VictoryVoronoiContainer } from "victory-voronoi-container";
import { VictoryZoomContainer } from "victory-zoom-container";
import { random, range, keys } from "lodash";

type multiAxisDataListType = {
  strength?: number;
  intelligence?: number;
  stealth?: number;
}[];

const multiAxisData: multiAxisDataListType = [
  { strength: 1, intelligence: 250, stealth: 45 },
  { strength: 2, intelligence: 300, stealth: 75 },
  { strength: 5, intelligence: 225, stealth: 60 },
];

const themeColors = VictoryTheme.clean.palette?.colors || {};
const {
  red = "red",
  green = "green",
  blue = "blue",
  cyan = "cyan",
  purple = "purple",
  orange = "orange",
  yellow = "yellow",
} = themeColors;

class VictorySelectionContainerDemo extends React.Component<any, any> {
  setStateInterval?: number = undefined;

  constructor(props: any) {
    super(props);

    this.state = {
      data: this.getData(),
      staticData: this.getStaticData(),
      multiAxisData: this.processMultiAxisData(multiAxisData),
      multiAxisMaxima: this.getMaxData(multiAxisData),
    };
  }

  componentDidMount() {
     
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        staticData: this.getStaticData(),
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData() {
    const points = random(6, 10);
    return range(points).map((point: number) => {
      const y = random(2, 10);
      return { x: point + 1, y };
    });
  }

  getStaticData() {
    const points = [10, 20, 30, 40, 50, 60];
    return points.map((point) => {
      const y = random(2, 10);
      const x = point + random(0, 8);
      return { x, y };
    });
  }

  getMaxData(data: multiAxisDataListType) {
    const groupedData = keys(data[0]).reduce(
      (memo: any, key: string | number) => {
        memo[key] = data.map((d) => d[key]);

        return memo;
      },
      {},
    );

    return keys(groupedData).reduce((memo: any, key: string | number) => {
      memo[key] = Math.max(...groupedData[key]);

      return memo;
    }, {});
  }

  processMultiAxisData(data: multiAxisDataListType) {
    const maxByGroup = this.getMaxData(data);
    const makeDataArray = (d: any) => {
      return keys(d).map((key: string) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };

    return data.map((datum) => makeDataArray(datum));
  }

  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const chartStyle: VictoryStyleInterface = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart
            polar
            animate={{ duration: 500 }}
            theme={VictoryTheme.clean}
            width={350}
            height={350}
            domain={{ y: [0, 10] }}
            style={chartStyle}
            containerComponent={<VictorySelectionContainer />}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              tickFormat={() => ""}
            />
            <VictoryPolarAxis labelPlacement="parallel" />
            <VictoryArea
              interpolation="catmullRom"
              style={{
                data: { fill: red },
              }}
              data={this.state.data}
            />
          </VictoryChart>

          <VictoryChart
            polar
            animate={{ duration: 500 }}
            domain={{ y: [0, 10] }}
            theme={VictoryTheme.clean}
            width={350}
            height={350}
            style={chartStyle}
            containerComponent={<VictoryVoronoiContainer />}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              tickFormat={() => ""}
            />
            <VictoryPolarAxis labelPlacement="parallel" />
            <VictoryLine
              labelComponent={<VictoryLabel labelPlacement="parallel" />}
              labels={({ datum }: any) => `y: ${Math.round(datum.y)}`}
              interpolation="linear"
              style={{
                data: { stroke: red, strokeWidth: 2 },
              }}
              data={this.state.data}
            />
          </VictoryChart>

          <VictoryChart
            polar
            animate={{ duration: 2000 }}
            theme={VictoryTheme.clean}
            style={chartStyle}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              tickFormat={() => ""}
            />
            <VictoryPolarAxis labelPlacement="parallel" />
            <VictoryBar
              style={{
                data: {
                  fill: red,
                  width: 10,
                  fillOpacity: 0.4,
                  stroke: red,
                  strokeWidth: 2,
                },
              }}
              data={this.state.staticData}
            />
          </VictoryChart>

          <VictoryChart
            polar
            animate={{ duration: 2000 }}
            theme={VictoryTheme.clean}
            style={chartStyle}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              tickFormat={() => ""}
            />
            <VictoryPolarAxis labelPlacement="parallel" />
            <VictoryBar
              style={{
                data: {
                  fill: red,
                  fillOpacity: 0.4,
                  stroke: red,
                  strokeWidth: 2,
                },
              }}
              data={this.state.staticData}
            />
          </VictoryChart>

          <VictoryChart
            polar
            theme={VictoryTheme.clean}
            domain={{ x: [0, 360], y: [0, 80] }}
            style={chartStyle}
            containerComponent={<VictoryZoomContainer />}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              axisAngle={270}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />
            <VictoryBar
              alignment="start"
              style={{
                data: { fill: ({ datum }) => datum.fill, opacity: 0.5 },
              }}
              data={[
                { x: 45, y: 20, label: 1, fill: red },
                { x: 90, y: 30, label: 2, fill: orange },
                { x: 135, y: 65, label: 3, fill: yellow },
                { x: 250, y: 50, label: 4, fill: blue },
                { x: 270, y: 40, label: 5, fill: cyan },
                { x: 295, y: 30, label: 6, fill: green },
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: purple } }}
              data={[
                { x: 45, y: 20 },
                { x: 90, y: 30 },
                { x: 135, y: 65 },
                { x: 250, y: 50 },
                { x: 270, y: 40 },
                { x: 295, y: 30 },
              ]}
            />
          </VictoryChart>

          <VictoryChart polar theme={VictoryTheme.clean} style={chartStyle}>
            <VictoryBar
              alignment="start"
              style={{
                data: { fill: ({ datum }) => datum.fill, opacity: 0.5 },
              }}
              data={[
                { x: 15, y: 20, label: 1, fill: red },
                { x: 25, y: 30, label: 2, fill: orange },
                { x: 35, y: 65, label: 3, fill: yellow },
                { x: 40, y: 50, label: 4, fill: blue },
                { x: 45, y: 40, label: 5, fill: cyan },
                { x: 50, y: 30, label: 6, fill: green },
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: purple } }}
              data={[
                { x: 15, y: 20 },
                { x: 25, y: 30 },
                { x: 35, y: 65 },
                { x: 40, y: 50 },
                { x: 45, y: 40 },
                { x: 50, y: 30 },
              ]}
            />
          </VictoryChart>

          <VictoryChart polar theme={VictoryTheme.clean} style={chartStyle}>
            <VictoryBar
              style={{ data: { fill: ({ datum }) => datum.fill, width: 10 } }}
              data={[
                { x: 1, y: 2, label: 1, fill: red },
                { x: 2, y: 3, label: 2, fill: orange },
                { x: 3, y: 6, label: 3, fill: yellow },
                { x: 4, y: 5, label: 4, fill: blue },
                { x: 5, y: 4, label: 5, fill: cyan },
                { x: 6, y: 3, label: 6, fill: green },
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: purple } }}
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 6 },
                { x: 4, y: 5 },
                { x: 5, y: 4 },
                { x: 6, y: 3 },
              ]}
            />
          </VictoryChart>

          <VictoryChart polar theme={VictoryTheme.clean} style={chartStyle}>
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              axisAngle={270}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[0, 45, 90, 135, 180, 225, 315]}
            />
            <VictoryScatter
              style={{ data: { fill: red } }}
              size={5}
              data={[
                { x: 45, y: 20, label: 1 },
                { x: 90, y: 30, label: 2 },
                { x: 135, y: 75, label: 3 },
                { x: 180, y: 50, label: 4 },
                { x: 270, y: 40, label: 5 },
              ]}
            />

            <VictoryArea
              style={{ data: { fill: red, opacity: 0.6 } }}
              data={[
                { x: 45, y: 20 },
                { x: 90, y: 30 },
                { x: 135, y: 75 },
                { x: 180, y: 50 },
                { x: 270, y: 40 },
              ]}
            />

            <VictoryLine
              style={{ data: { stroke: red } }}
              data={[
                { x: 45, y: 20 },
                { x: 90, y: 30 },
                { x: 135, y: 75 },
                { x: 180, y: 50 },
                { x: 270, y: 40 },
              ]}
            />
          </VictoryChart>

          <VictoryChart polar theme={VictoryTheme.clean} style={chartStyle}>
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              axisAngle={90}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis
              labelPlacement="perpendicular"
              tickFormat={[
                "strength",
                "intelligence",
                "stealth",
                "luck",
                "charisma",
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: red } }}
              size={5}
              data={[
                { x: 1, y: 10 },
                { x: 2, y: 25 },
                { x: 3, y: 40 },
                { x: 4, y: 50 },
                { x: 5, y: 50 },
              ]}
            />
            <VictoryArea
              style={{ data: { fill: red, opacity: 0.6 } }}
              data={[
                { x: 1, y: 10 },
                { x: 2, y: 25 },
                { x: 3, y: 40 },
                { x: 4, y: 50 },
                { x: 5, y: 50 },
              ]}
            />
          </VictoryChart>

          <VictoryPolarAxis
            theme={VictoryTheme.clean}
            style={chartStyle}
            labelPlacement="vertical"
            startAngle={20}
            endAngle={380}
            domain={[0, 360]}
            tickValues={[
              0, 20, 45, 65, 90, 120, 135, 180, 225, 250, 270, 300, 315,
            ]}
          />

          <VictoryPolarAxis
            startAngle={0}
            endAngle={180}
            theme={VictoryTheme.clean}
            style={chartStyle}
            labelPlacement="perpendicular"
            tickValues={[0, 45, 90, 135, 180]}
          />

          <VictoryPolarAxis
            startAngle={0}
            endAngle={180}
            theme={VictoryTheme.clean}
            style={chartStyle}
            labelPlacement="perpendicular"
            tickValues={["Cat", "Dog", "Bird", "Snake"]}
          />

          <VictoryPolarAxis
            theme={VictoryTheme.clean}
            style={chartStyle}
            domain={[0, 10]}
            labelPlacement="vertical"
            tickValues={[3, 5, 10, 7, 8, 2, 1]}
          />

          <VictoryPolarAxis
            dependentAxis
            axisAngle={200}
            theme={VictoryTheme.clean}
            style={chartStyle}
            domain={[0, 10]}
            tickValues={[2, 4, 6, 8, 10]}
          />

          <svg width={350} height={350}>
            <VictoryPolarAxis
              standalone={false}
              theme={VictoryTheme.clean}
              style={chartStyle}
              domain={[0, 360]}
              tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />

            <VictoryPolarAxis
              dependentAxis
              standalone={false}
              axisAngle={200}
              theme={VictoryTheme.clean}
              style={chartStyle}
              tickValues={[2, 4, 6, 8, 10]}
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default VictorySelectionContainerDemo;
