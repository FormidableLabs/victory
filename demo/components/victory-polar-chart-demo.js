/*global window:false*/
/*eslint no-magic-numbers:0*/
import React from "react";
import {
  VictoryPolarAxis, VictoryScatter, VictoryLine, VictoryArea, VictoryBar,
  VictoryStack, VictoryChart, VictoryGroup, VictoryVoronoiContainer, VictoryZoomContainer
} from "../../src/index";
import { random, range, merge } from "lodash";

import { VictoryTheme, Curve, VictoryTooltip } from "victory-core";
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      data: this.getData(),
      staticData: this.getStaticData()
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        staticData: this.getStaticData()
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }


  getData() {
    const points = random(6, 10);
    return range(points).map((point) => {
      const y = random(2, 10);
      return { x: point + 1, y };
    });
  }

  getStaticData() {
    const points = [ 10, 20, 30, 40, 50, 60];
    return points.map((point) => {
      const y = random(2, 10);
      const x = point + random(0, 8);
      return { x, y };
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

          <VictoryGroup polar
            style={{ parent: chartStyle.parent, data: { width: 10 } }}
            labels={["a", "b", "c"]}
            offset={20}
            colorScale={"qualitative"}
          >
            <VictoryBar
              data={[
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 5 }
              ]}
            />
            <VictoryBar
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 1 },
                { x: 3, y: 7 }
              ]}
            />
            <VictoryBar
              data={[
                { x: 1, y: 3 },
                { x: 2, y: 4 },
                { x: 3, y: 9 }
              ]}
            />
          </VictoryGroup>

          <VictoryChart polar
            theme={VictoryTheme.material}
            style={chartStyle}
          >
            <VictoryGroup
              style={{ data: { width: 10 } }}
              labels={["a", "b", "c"]}
              offset={20}
              colorScale={"qualitative"}
            >
              <VictoryBar
                data={[
                  { x: 1, y: 1 },
                  { x: 2, y: 2 },
                  { x: 3, y: 5 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 1 },
                  { x: 3, y: 7 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 3 },
                  { x: 2, y: 4 },
                  { x: 3, y: 9 }
                ]}
              />
            </VictoryGroup>
          </VictoryChart>

          <VictoryChart polar
            theme={VictoryTheme.material}
            style={chartStyle}
            containerComponent={<VictoryVoronoiContainer/>}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              axisAngle={90}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis
              labelPlacement="perpendicular"
            />
            <VictoryBar
              style={{
                data: {
                  fill: (d, a) => a ? "blue" : "tomato",
                  fillOpacity: 0.6,
                  stroke: (d, a) => a ? "blue" : "tomato",
                  strokeWidth: 2
                }
              }}
              labelComponent={<VictoryTooltip/>}
              data={[
                { x: "strength", y: 10, label: "one" },
                { x: "intelligence", y: 25, label: "two" },
                { x: "stealth", y: 40, label: "three" },
                { x: "luck", y: 50, label: "four" },
                { x: "charisma", y: 50, label: "five" }
              ]}
            />
          </VictoryChart>

          <VictoryChart polar
            theme={VictoryTheme.material}
            style={chartStyle}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              axisAngle={90}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis
              labelPlacement="perpendicular"
            />
            <VictoryBar
              style={{
                data: {
                  fill: "tomato", width: 10, fillOpacity: 0.6, stroke: "tomato", strokeWidth: 2
                }
              }}
              data={[
                { x: "strength", y: 10 },
                { x: "intelligence", y: 25 },
                { x: "stealth", y: 40 },
                { x: "luck", y: 50 },
                { x: "charisma", y: 50 }
              ]}
            />
          </VictoryChart>

          <VictoryChart polar
            theme={VictoryTheme.material}
            domain={{ x: [0, 360] }}
            style={chartStyle}
            events={[{
              childName: "all",
              target: "data",
              eventHandlers: {
                onMouseOver: (evt, props) => {
                  return [
                    {
                      childName: "bar-2",
                      mutation: () => {
                        return { style: merge({}, props.style, { fill: "cyan" }) };
                      }
                    }, {
                      childName: "bar-3",
                      mutation: () => {
                        return { style: merge({}, props.style, { fill: "blue" }) };
                      }
                    }
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      childName: "all",
                      mutation: () => {
                        return { style: undefined };
                      }
                    }
                  ];
                }
              }
            }]}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />
            <VictoryStack>
              <VictoryBar name="bar-1"
                style={{ data: { fill: "tomato", width: 10 } }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
              <VictoryBar name="bar-2"
                style={{ data: { fill: "orange", width: 10 } }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
              <VictoryBar name="bar-3"
                style={{ data: { fill: "gold", width: 10 } }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
            </VictoryStack>
          </VictoryChart>

          <VictoryChart polar
            theme={VictoryTheme.material}
            domain={{ x: [0, 360] }}
            style={chartStyle}
            events={[{
              childName: "all",
              target: "data",
              eventHandlers: {
                onMouseOver: (evt, props) => {
                  return [
                    {
                      mutation: () => {
                        return { style: merge({}, props.style, { fill: "cyan", stroke: "cyan" }) };
                      }
                    }
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      mutation: () => {
                        return { style: undefined };
                      }
                    }
                  ];
                }
              }
            }]}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />
            <VictoryStack>
              <VictoryArea name="area-1"
                interpolation="cardinal"
                style={{
                  data: { fill: "tomato", stroke: "tomato", fillOpacity: 0.5, strokeWidth: 2 }
                }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
              <VictoryArea name="area-2"
                interpolation="cardinal"
                style={{
                  data: { fill: "orange", stroke: "orange", fillOpacity: 0.5, strokeWidth: 2 }
                }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
              <VictoryArea name="area-3"
                interpolation="cardinal"
                style={{
                  data: { fill: "gold", stroke: "gold", fillOpacity: 0.5, strokeWidth: 2 }
                }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
            </VictoryStack>
          </VictoryChart>

          <VictoryChart polar
            animate={{ duration: 500 }}
            theme={VictoryTheme.material}
            domain={{ y: [0, 10] }}
            style={chartStyle}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
            />
            <VictoryArea
              interpolation="catmullRom"
              style={{
                data: { fill: "tomato" }
              }}
              data={this.state.data}
            />
          </VictoryChart>

          <VictoryChart polar
            animate={{ duration: 500 }}
            domain={{ y: [0, 10] }}
            theme={VictoryTheme.material}
            style={chartStyle}
            containerComponent={<VictoryVoronoiContainer/>}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
            />
            <VictoryLine
              dataComponent={<Curve closed/>}
              labelComponent={<VictoryTooltip/>}
              labels={(d) => d.x}
              interpolation="linear"
              style={{
                data: { stroke: "tomato", strokeWidth: 2 }
              }}
              data={this.state.data}
            />
          </VictoryChart>

          <VictoryChart polar
            animate={{ duration: 2000 }}
            theme={VictoryTheme.material}
            style={chartStyle}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
            />
            <VictoryBar
              style={{
                data: {
                  fill: "tomato", width: 10, fillOpacity: 0.4, stroke: "tomato", strokeWidth: 2
                }
              }}
              data={this.state.staticData}
            />
          </VictoryChart>

          <VictoryChart polar
            animate={{ duration: 2000 }}
            theme={VictoryTheme.material}
            style={chartStyle}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
            />
            <VictoryBar
              style={{
                data: {
                  fill: "tomato", fillOpacity: 0.4, stroke: "tomato", strokeWidth: 2
                }
              }}
              data={this.state.staticData}
            />
          </VictoryChart>


          <VictoryChart polar
            theme={VictoryTheme.material}
            domain={{ x: [0, 360], y: [0, 80] }}
            style={chartStyle}
            containerComponent={<VictoryZoomContainer/>}
          >
            <VictoryPolarAxis dependentAxis
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
              style={{ data: { fill: "tomato", opacity: 0.5 } }}
              data={[
                { x: 45, y: 20, label: 1, fill: "red" },
                { x: 90, y: 30, label: 2, fill: "orange" },
                { x: 135, y: 65, label: 3, fill: "gold" },
                { x: 250, y: 50, label: 4, fill: "blue" },
                { x: 270, y: 40, label: 5, fill: "cyan" },
                { x: 295, y: 30, label: 6, fill: "green" }
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
                { x: 295, y: 30 }
              ]}
            />
          </VictoryChart>

          <VictoryChart polar
            theme={VictoryTheme.material}
            style={chartStyle}
          >
            <VictoryBar
              style={{ data: { fill: "tomato", opacity: 0.5 } }}
              data={[
                { x: 15, y: 20, label: 1, fill: "red" },
                { x: 25, y: 30, label: 2, fill: "orange" },
                { x: 35, y: 65, label: 3, fill: "gold" },
                { x: 40, y: 50, label: 4, fill: "blue" },
                { x: 45, y: 40, label: 5, fill: "cyan" },
                { x: 50, y: 30, label: 6, fill: "green" }
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
                { x: 50, y: 30 }
              ]}
            />
          </VictoryChart>

          <VictoryChart polar
            theme={VictoryTheme.material}
            style={chartStyle}
          >
            <VictoryBar
              style={{ data: { fill: "tomato", width: 10 } }}
              data={[
                { x: 1, y: 2, label: 1, fill: "red" },
                { x: 2, y: 3, label: 2, fill: "orange" },
                { x: 3, y: 6, label: 3, fill: "gold" },
                { x: 4, y: 5, label: 4, fill: "blue" },
                { x: 5, y: 4, label: 5, fill: "cyan" },
                { x: 6, y: 3, label: 6, fill: "green" }
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
                { x: 6, y: 3 }
              ]}
            />
          </VictoryChart>


          <VictoryChart polar
            theme={VictoryTheme.material}
            style={chartStyle}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              axisAngle={270}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[0, 45, 90, 135, 180, 225, 315]}
            />
            <VictoryScatter
              style={{ data: { fill: "tomato" } }}
              size={5}
              data={[
                { x: 45, y: 20, label: 1 },
                { x: 90, y: 30, label: 2 },
                { x: 135, y: 75, label: 3 },
                { x: 180, y: 50, label: 4 },
                { x: 270, y: 40, label: 5 }
              ]}
            />

            <VictoryArea
              style={{ data: { fill: "tomato", opacity: 0.6 } }}
              data={[
                { x: 45, y: 20 },
                { x: 90, y: 30 },
                { x: 135, y: 75 },
                { x: 180, y: 50 },
                { x: 270, y: 40 }
              ]}
            />

            <VictoryLine
              style={{ data: { stroke: "tomato" } }}
              data={[
                { x: 45, y: 20 },
                { x: 90, y: 30 },
                { x: 135, y: 75 },
                { x: 180, y: 50 },
                { x: 270, y: 40 }
              ]}
            />
          </VictoryChart>

          <VictoryChart polar
            theme={VictoryTheme.material}
            style={chartStyle}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              axisAngle={90}
              tickValues={[25, 50, 75]}
            />
            <VictoryPolarAxis
              labelPlacement="perpendicular"
              tickFormat={["strength", "intelligence", "stealth", "luck", "charisma"]}
            />
            <VictoryScatter
              style={{ data: { fill: "tomato" } }}
              size={5}
              data={[
                { x: 1, y: 10 },
                { x: 2, y: 25 },
                { x: 3, y: 40 },
                { x: 4, y: 50 },
                { x: 5, y: 50 }
              ]}
            />
            <VictoryArea
              style={{ data: { fill: "tomato", opacity: 0.6 } }}
              data={[
                { x: 1, y: 10 },
                { x: 2, y: 25 },
                { x: 3, y: 40 },
                { x: 4, y: 50 },
                { x: 5, y: 50 }
              ]}
            />
          </VictoryChart>

          <VictoryPolarAxis
            theme={VictoryTheme.material}
            style={chartStyle}
            labelPlacement="vertical"
            startAngle={20} endAngle={380}
            domain={[0, 360]}
            tickValues={[0, 20, 45, 65, 90, 120, 135, 180, 225, 250, 270, 300, 315]}
          />

          <VictoryPolarAxis
            startAngle={0} endAngle={180}
            theme={VictoryTheme.material}
            style={chartStyle}
            labelPlacement="perpendicular"
            tickValues={[0, 45, 90, 135, 180]}
          />

          <VictoryPolarAxis
            startAngle={0} endAngle={180}
            theme={VictoryTheme.material}
            style={chartStyle}
            labelPlacement="perpendicular"
            tickValues={["Cat", "Dog", "Bird", "Snake"]}
          />

          <VictoryPolarAxis
            theme={VictoryTheme.material}
            style={chartStyle}
            domain={[0, 10]}
            labelPlacement="vertical"
            tickValues={[3, 5, 10, 7, 8, 2, 1]}
          />

          <VictoryPolarAxis dependentAxis
            axisAngle={200}
            theme={VictoryTheme.material}
            style={chartStyle}
            domain={[0, 10]}
            tickValues={[2, 4, 6, 8, 10]}
          />

          <svg width={350} height={350}>
            <VictoryPolarAxis
              standalone={false}
              theme={VictoryTheme.material}
              style={chartStyle}
              domain={[0, 360]}
              tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />

            <VictoryPolarAxis dependentAxis
              standalone={false}
              axisAngle={200}
              theme={VictoryTheme.material}
              style={chartStyle}
              domain={[0, 10]}
              tickValues={[2, 4, 6, 8, 10]}
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default App;
