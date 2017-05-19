/*global window:false*/
/*eslint no-magic-numbers:0*/
import React from "react";
import {
  VictoryPolarAxis, VictoryPolarChart, VictoryScatter, VictoryLine, VictoryArea, VictoryBar, VictoryStack
} from "../../src/index";
import { random, range } from "lodash";

import { VictoryTheme } from "victory-core";
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

          <VictoryPolarChart
            theme={VictoryTheme.material}
            domain={{ x: [0, 360] }}
            style={chartStyle}
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
            <VictoryStack>
              <VictoryBar
                style={{ data: { fill: "tomato", width: 15 } }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
              <VictoryBar
                style={{ data: { fill: "orange", width: 15 } }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
              <VictoryBar
                style={{ data: { fill: "gold", width: 15 } }}
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
          </VictoryPolarChart>

          <VictoryPolarChart
            theme={VictoryTheme.material}
            domain={{ x: [0, 360] }}
            style={chartStyle}
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
            <VictoryStack>
              <VictoryArea
                groupComponent={<g/>}
                style={{ data: { fill: "tomato" } }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
              <VictoryArea
                groupComponent={<g/>}
                style={{ data: { fill: "orange" } }}
                data={[
                  { x: 45, y: 20 },
                  { x: 90, y: 30 },
                  { x: 135, y: 65 },
                  { x: 180, y: 50 },
                  { x: 270, y: 40 },
                  { x: 315, y: 30 }
                ]}
              />
              <VictoryArea
                groupComponent={<g/>}
                style={{ data: { fill: "gold" } }}
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
          </VictoryPolarChart>

          <VictoryPolarChart
            theme={VictoryTheme.material}
            domain={{ x: [0, 360] }}
            style={chartStyle}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              axisAngle={270}
              tickValues={[25, 50, 75]}
              tickFormat={() => ""}
            />
            <VictoryPolarAxis
              labelPlacement="parallel"
              tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
            />
            <VictoryBar
              style={{ data: { fill: "tomato", width: 15, opacity: 0.4 } }}
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
          </VictoryPolarChart>

          <VictoryPolarChart
            theme={VictoryTheme.material}
            domain={{ x: [0, 360] }}
            style={chartStyle}
          >
            <VictoryPolarAxis dependentAxis
              labelPlacement="vertical"
              style={{ axis: { stroke: "none" } }}
              axisAngle={270}
              tickValues={[25, 50, 75]}
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
          </VictoryPolarChart>

          <VictoryPolarChart
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
            />
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
          </VictoryPolarChart>

          <VictoryPolarChart
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
            />
            <VictoryBar
              style={{ data: { fill: "tomato", width: 15 } }}
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
          </VictoryPolarChart>


          <VictoryPolarChart
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
              groupComponent={<g/>}
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
              groupComponent={<g/>}
              style={{ data: { stroke: "tomato" } }}
              data={[
                { x: 45, y: 20 },
                { x: 90, y: 30 },
                { x: 135, y: 75 },
                { x: 180, y: 50 },
                { x: 270, y: 40 }
              ]}
            />
          </VictoryPolarChart>

          <VictoryPolarChart
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
              groupComponent={<g/>}
              style={{ data: { fill: "tomato", opacity: 0.6 } }}
              data={[
                { x: 1, y: 10 },
                { x: 2, y: 25 },
                { x: 3, y: 40 },
                { x: 4, y: 50 },
                { x: 5, y: 50 }
              ]}
            />
          </VictoryPolarChart>

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
