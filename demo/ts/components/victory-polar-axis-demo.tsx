/* eslint no-magic-numbers:0*/
import React from "react";
import { VictoryChart } from "victory";
import { VictoryPolarAxis } from "victory";
import { VictoryArea } from "victory";
import { VictoryBar } from "victory";
import { VictoryLine } from "victory";
import { VictoryScatter } from "victory";
import { VictoryZoomContainer } from "victory";
import { VictoryVoronoiContainer } from "victory";
import { VictorySelectionContainer } from "victory";
import { VictoryGroup } from "victory";
import { VictoryTooltip } from "victory";
import { VictoryStack } from "victory";
import { random, range, keys } from "lodash";
import { VictoryTheme, VictoryLabel, VictoryThemePalette } from "victory";

type multiAxisDataListType = {
  strength?: number;
  intelligence?: number;
  stealth?: number;
}[];

type dataType = {
  x?: string | number;
  y?: string | number;
};

const multiAxisData: multiAxisDataListType = [
  { strength: 1, intelligence: 250, stealth: 45 },
  { strength: 2, intelligence: 300, stealth: 75 },
  { strength: 5, intelligence: 225, stealth: 60 },
];

interface VictoryPolarAxisState {
  data: dataType[];
  staticData: dataType[];
  multiAxisData: dataType[][];
  multiAxisMaxima: React.ReactElement[];
}

class App extends React.Component<any, VictoryPolarAxisState> {
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

    const themeColors: VictoryThemePalette =
      VictoryTheme.clean.palette?.colors || {};

    const chartStyle: { [key: string]: React.CSSProperties } = {
      parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" },
    };

    return (
      <div className="demo">
        <div style={containerStyle}>
          <VictoryChart
            polar
            theme={VictoryTheme.clean}
            domain={{ y: [0, 1] }}
            style={chartStyle}
          >
            {keys(this.state.multiAxisMaxima).map((key, i) => {
              return (
                <VictoryPolarAxis
                  key={i}
                  dependentAxis
                  tickLabelComponent={
                    <VictoryLabel labelPlacement="vertical" />
                  }
                  labelPlacement="perpendicular"
                  axisValue={i + 1}
                  label={key}
                  tickFormat={(t) => t * this.state.multiAxisMaxima[key]}
                  tickValues={[0.25, 0.5, 0.75]}
                />
              );
            })}
            <VictoryPolarAxis labelPlacement="parallel" tickFormat={() => ""} />
            <VictoryGroup colorScale="warm">
              {this.state.multiAxisData.map((data, i) => {
                return <VictoryLine key={i} data={data} />;
              })}
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart
            polar
            theme={VictoryTheme.clean}
            style={chartStyle}
            containerComponent={<VictorySelectionContainer />}
          >
            <VictoryPolarAxis labelPlacement="perpendicular" />
            <VictoryGroup
              colorScale="red"
              data={[
                { x: 1, y: 5 },
                { x: 2, y: 3 },
                { x: 3, y: 1 },
                { x: 4, y: 2 },
                { x: 5, y: 4 },
              ]}
            >
              <VictoryLine />
              <VictoryScatter
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>

            <VictoryGroup
              colorScale="cool"
              data={[
                { x: 1, y: 3 },
                { x: 2, y: 5 },
                { x: 3, y: 3 },
                { x: 3, y: 2 },
                { x: 4, y: 2 },
                { x: 5, y: 1 },
              ]}
            >
              <VictoryLine />
              <VictoryScatter
                labels={({ datum }) => `y: ${datum.y}`}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>

            <VictoryGroup
              colorScale="warm"
              data={[
                { x: 1, y: 5 },
                { x: 2, y: 4 },
                { x: 3, y: 2 },
                { x: 4, y: 4 },
                { x: 5, y: 2 },
              ]}
            >
              <VictoryLine />
              <VictoryScatter
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart polar theme={VictoryTheme.clean} style={chartStyle}>
            <VictoryPolarAxis dependentAxis tickValues={[2, 6, 8]} />
            <VictoryGroup
              style={{ data: { width: 10, fillOpacity: 0.5 } }}
              labels={["a", "b", "c"]}
              offset={20}
              colorScale={"qualitative"}
            >
              <VictoryBar
                data={[
                  { x: 1, y: 1 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 },
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 7 },
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 9 },
                ]}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart
            polar
            theme={VictoryTheme.clean}
            style={chartStyle}
            containerComponent={<VictoryVoronoiContainer />}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              axisAngle={90}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis labelPlacement="perpendicular" />
            <VictoryBar
              style={{
                data: {
                  fill: ({ active }) =>
                    active
                      ? themeColors.blue || "blue"
                      : themeColors.red || "red",
                },
              }}
              labelComponent={<VictoryTooltip />}
              data={[
                { x: "strength", y: 10, label: "one" },
                { x: "intelligence", y: 25, label: "two" },
                { x: "stealth", y: 40, label: "three" },
                { x: "luck", y: 50, label: "four" },
                { x: "charisma", y: 50, label: "five" },
              ]}
            />
          </VictoryChart>

          <VictoryChart polar theme={VictoryTheme.clean} style={chartStyle}>
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              axisAngle={90}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis labelPlacement="perpendicular" />
            <VictoryBar
              style={{
                data: {
                  width: 10,
                },
              }}
              data={[
                { x: "strength", y: 10 },
                { x: "intelligence", y: 25 },
                { x: "stealth", y: 40 },
                { x: "luck", y: 50 },
                { x: "charisma", y: 50 },
              ]}
            />
          </VictoryChart>

          <VictoryChart
            polar
            theme={VictoryTheme.clean}
            domain={{ x: [0, 360] }}
            innerRadius={50}
            style={chartStyle}
            events={[
              {
                childName: "all",
                target: "data",
                eventHandlers: {
                  onMouseOver: (evt, props) => {
                    return [
                      {
                        childName: "bar-2",
                        mutation: () => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: themeColors.cyan,
                            }),
                          };
                        },
                      },
                      {
                        childName: "bar-3",
                        mutation: () => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: themeColors.blue,
                            }),
                          };
                        },
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        childName: "all",
                        mutation: () => {
                          return { style: undefined };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />
            <VictoryStack>
              <VictoryBar
                name="bar-1"
                style={{
                  data: { fill: themeColors.red },
                }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 },
                ]}
              />
              <VictoryBar
                name="bar-2"
                style={{
                  data: { fill: themeColors.orange },
                }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 },
                ]}
              />
              <VictoryBar
                name="bar-3"
                style={{
                  data: {
                    fill: themeColors.yellow,
                  },
                }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 },
                ]}
              />
            </VictoryStack>
          </VictoryChart>

          <VictoryChart
            polar
            theme={VictoryTheme.clean}
            domain={{ x: [0, 360] }}
            style={chartStyle}
            events={[
              {
                childName: "all",
                target: "data",
                eventHandlers: {
                  onMouseOver: (evt, props) => {
                    return [
                      {
                        mutation: () => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: themeColors.cyan,
                            }),
                          };
                        },
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        mutation: () => {
                          return { style: undefined };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />
            <VictoryStack>
              <VictoryArea
                name="area-1"
                interpolation="cardinal"
                style={{
                  data: {
                    fill: themeColors.red,
                  },
                }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 },
                ]}
              />
              <VictoryArea
                name="area-2"
                interpolation="cardinal"
                style={{
                  data: {
                    fill: themeColors.orange,
                  },
                }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 },
                ]}
              />
              <VictoryArea
                name="area-3"
                interpolation="cardinal"
                style={{
                  data: {
                    fill: themeColors.yellow,
                  },
                }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 },
                ]}
              />
            </VictoryStack>
          </VictoryChart>

          <VictoryChart
            polar
            animate={{ duration: 500 }}
            theme={VictoryTheme.clean}
            domain={{ y: [0, 10] }}
            style={chartStyle}
          >
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              tickFormat={() => ""}
            />
            <VictoryPolarAxis labelPlacement="parallel" />
            <VictoryArea interpolation="catmullRom" data={this.state.data} />
          </VictoryChart>

          <VictoryChart
            polar
            animate={{ duration: 500 }}
            domain={{ y: [0, 10] }}
            theme={VictoryTheme.clean}
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
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis labelPlacement="parallel" />
            <VictoryBar
              style={{
                data: {
                  fill: themeColors.red,
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
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis labelPlacement="parallel" />
            <VictoryBar
              style={{
                data: {
                  fill: themeColors.purple,
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
              style={{ axis: { stroke: "none" } }}
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
                data: {
                  fill: ({ datum }) => themeColors[datum.fill],
                },
              }}
              data={[
                { x: 45, y: 20, label: 1, fill: "red" },
                { x: 90, y: 30, label: 2, fill: "orange" },
                { x: 135, y: 65, label: 3, fill: "yellow" },
                { x: 250, y: 50, label: 4, fill: "blue" },
                { x: 270, y: 40, label: 5, fill: "cyan" },
                { x: 295, y: 30, label: 6, fill: "green" },
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: "black" } }}
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
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              tickValues={[2, 4, 6, 8]}
            />
            <VictoryPolarAxis labelPlacement="parallel" />
            <VictoryBar
              alignment="start"
              style={{
                data: { fill: ({ datum }) => themeColors[datum.fill] },
              }}
              data={[
                { x: 15, y: 20, label: 1, fill: "red" },
                { x: 25, y: 30, label: 2, fill: "orange" },
                { x: 35, y: 65, label: 3, fill: "yellow" },
                { x: 40, y: 50, label: 4, fill: "blue" },
                { x: 45, y: 40, label: 5, fill: "cyan" },
                { x: 50, y: 30, label: 6, fill: "green" },
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: "black" } }}
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
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              axisAngle={270}
              tickValues={[1, 3, 5, 7]}
            />
            <VictoryPolarAxis labelPlacement="parallel" />
            <VictoryBar
              style={{ data: { fill: ({ datum }) => themeColors[datum.fill] } }}
              data={[
                { x: 1, y: 2, label: 1, fill: "red" },
                { x: 2, y: 3, label: 2, fill: "orange" },
                { x: 3, y: 6, label: 3, fill: "yellow" },
                { x: 4, y: 5, label: 4, fill: "blue" },
                { x: 5, y: 4, label: 5, fill: "cyan" },
                { x: 6, y: 3, label: 6, fill: "green" },
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: "black" } }}
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
              style={{ axis: { stroke: "none" } }}
              axisAngle={270}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[0, 45, 90, 135, 180, 225, 315]}
            />

            <VictoryArea
              data={[
                { x: 45, y: 20 },
                { x: 90, y: 30 },
                { x: 135, y: 75 },
                { x: 180, y: 50 },
                { x: 270, y: 40 },
              ]}
            />
            <VictoryLine
              data={[
                { x: 45, y: 20 },
                { x: 90, y: 30 },
                { x: 135, y: 75 },
                { x: 180, y: 50 },
                { x: 270, y: 40 },
              ]}
            />
            <VictoryScatter
              size={5}
              data={[
                { x: 45, y: 20, label: 1 },
                { x: 90, y: 30, label: 2 },
                { x: 135, y: 75, label: 3 },
                { x: 180, y: 50, label: 4 },
                { x: 270, y: 40, label: 5 },
              ]}
            />
          </VictoryChart>

          <VictoryChart polar theme={VictoryTheme.clean} style={chartStyle}>
            <VictoryPolarAxis
              dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
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
            <VictoryArea
              data={[
                { x: 1, y: 10 },
                { x: 2, y: 25 },
                { x: 3, y: 40 },
                { x: 4, y: 50 },
                { x: 5, y: 50 },
              ]}
            />
            <VictoryScatter
              size={5}
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

export default App;
