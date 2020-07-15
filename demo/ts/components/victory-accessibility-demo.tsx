/*global window:false */
/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import { VictoryChart } from "@packages/victory-chart/src/index";
import { VictoryPie, Slice } from "@packages/victory-pie/src/index";
import { VictoryAxis } from "@packages/victory-axis/src/index";
import { VictoryScatter } from "@packages/victory-scatter/src/index";
import { VictoryBar, Bar } from "@packages/victory-bar/src/index";
import { VictoryStack } from "@packages/victory-stack/src/index";
import { VictoryLine } from "@packages/victory-line/src/index";
import { VictoryArea } from "@packages/victory-area/src/index";
import { VictoryLegend } from "@packages/victory-legend/src/index";
import { VictoryContainer, VictoryClipContainer, VictoryTheme, Point } from "@packages/victory-core/src/index";

export default class VictoryAccessibilityDemo extends React.Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {

    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const pieData = [
      { x: "Cats", y: 35 },
      { x: "Dogs", y: 40 },
      { x: "Birds", y: 55 }
    ];

    const pieDataAriaLabels = pieData.map(data => (
      data.x + " " + data.y
    ));

    const scatterData = [
      { x: 1, y: 80 },
      { x: 2, y: 73 },
      { x: 3, y: 69 },
      { x: 4, y: 84 },
      { x: 5, y: 65 }
    ];

    const scatterDataAriaLabels = scatterData.map(data => (
        "Time " + data.x + " Hour" + " Temperature " + data.y + " Fahrenheit"
    ));

    const barData = [
      { x: 1, y: 80 },
      { x: 2, y: 73 },
      { x: 3, y: 69 },
      { x: 4, y: 84 },
      { x: 5, y: 65 }
    ];

    const barDataAriaLabels = barData.map(data => (
      "Time " + data.x + " Hour" + " Temperature " + data.y + " Fahrenheit"
    ));

    const stackData1 = [
      {x: "coffee", y: 8},
      {x: "tea", y: 3},
      {x: "soda", y: 5}
    ]

    const stackDataAriaLabels1 = stackData1.map(data => (
      data.x + " " + data.y
    ));

    const stackData2 = [
      {x: "coffee", y: 4},
      {x: "tea", y: 6},
      {x: "soda", y: 3}
    ]

    const stackDataAriaLabels2 = stackData2.map(data => (
      data.x + " " + data.y
    ));

    const stackData3 = [
      {x: "coffee", y: 6},
      {x: "tea", y: 2}, 
      {x: "soda", y: 2}
    ]

    const stackDataAriaLabels3 = stackData3.map(data => (
      data.x + " " + data.y
    ));

    const areaData = [
      { x: 2016, y: 2 },
      { x: 2017, y: 3 },
      { x: 2018, y: 5 },
      { x: 2019, y: 4 },
      { x: 2020, y: 6 }
    ];

    const areaDataAriaLabel = () => {
      const string = areaData.map(data => (
        data.x + " " + data.y
      ))
      return "Area under the data points" + string;
    }

    const lineData = [
      { x: "Jan", y: 2 },
      { x: "Feb", y: 3 },
      { x: "Mar", y: 5 },
      { x: "Apr", y: 4 },
      { x: "May", y: 7 },
      { x: "Jun", y: 2 },
      { x: "Jul", y: 3 },
      { x: "Aug", y: 5 },
      { x: "Sep", y: 4 },
      { x: "Oct", y: 7 },
      { x: "Nov", y: 2 },
      { x: "Dec", y: 3 }
    ];

    const lineDataAriaLabel = () => {
      const string = lineData.map(data => (
        data.x + " " + data.y
      ))
      return "Line chart with the following data points" + string;
    }

    return (
      <React.Fragment>
        <h2>Pie Chart Accessibility Demo</h2>
        <h3>Percentage of Cats, Birds, and Dogs.</h3>
        <div className="demo" style={containerStyle}>
          <VictoryPie
            containerComponent={
              <VictoryContainer
                responsive={false}
                role="group"
                desc="Percentage of cats, dogs and birds."
                tabIndex="0"
                ariaLabel="Pie Chart"
              />
            }
            dataComponent={<Slice tabIndex="0" ariaLabel={({index}) => pieDataAriaLabels[index]} ariaDescribedBy="victory-container-1-desc" />}
            groupComponent={
              <g aria-label="Cats, dogs and birds" aria-describedby="victory-container-1-desc" />
            }
            data={pieData}
            width={350}
            height={350}
          />
        </div>

        <h2>Scatter Chart Accessibility Demo</h2>
        <h3>Temperature in Boston over time.</h3>
        <div className="demo" style={containerStyle}>
          <VictoryChart
            domain={{ x: [0.5, 5.5], y: [0, 100] }}
            containerComponent={
              <VictoryContainer
                responsive={false}
                desc="Temperature in Boston over time."
                tabIndex="0"
                role="group"
                ariaLabel="Scatter chart"
              />
            }
          >
            <VictoryScatter
              style={{ data: { fill: "#c43a31" } }}
              size={7}
              data={scatterData}
              groupComponent={
                <g aria-label="Group of scatter points" aria-describedby="victory-container-2-desc" />
              }
              dataComponent={<Point ariaLabel={({index}) => scatterDataAriaLabels[index]} tabIndex="0" ariaDescribedBy="victory-container-2-desc" />}
            />
            <VictoryAxis
              label="Time (hours)"
            />
            <VictoryAxis
              dependentAxis
              label="Temperature (F)"
            />
          </VictoryChart>
        </div>

        <h2>Bar Chart Accessibility Demo</h2>
        <h3>Temperature in Boston over time.</h3>
        <div className="demo" style={containerStyle}>
          <VictoryChart
            containerComponent={
              <VictoryContainer
                responsive={false}
                desc="Temperature in Boston over time."
                tabIndex="0"
                ariaLabel="Bar chart"
                role="group"
              />
            }
          >
            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              alignment="start"
              data={barData}
              groupComponent={
                <g aria-label="Group of scatter points" aria-describedby="victory-container-3-desc" />
              }
              dataComponent={<Bar ariaLabel={({index}) => barDataAriaLabels[index]} tabIndex="0" ariaDescribedBy="victory-container-2-desc" />}
            />
          </VictoryChart>
        </div>

        <h2>Stack Chart Accessibility Demo</h2>
        <h3>Number of beverages drank in 2019 in USA, UK, and Canada per household (in hundreds)</h3>
        <div className="demo" style={containerStyle}>
          <VictoryChart
            containerComponent={
              <VictoryContainer
                responsive={false}
                desc="Number of beverages drank in 2019 in USA, UK, and Canada per household (in hundreds)"
                ariaLabel="Stack chart"
                role="group"
                tabIndex="0"
              />
            }
          >
            <VictoryStack
              colorScale={["tomato", "orange", "gold"]}
              groupComponent={<g aria-label="Group of countries: USA, UK, Canada" />}
            >
              <VictoryBar
                data={stackData1}
                dataComponent={<Bar ariaLabel={({index}) => stackDataAriaLabels1[index]} tabIndex="0" ariaDescribedBy="victory-container-2-desc" />}
                groupComponent={
                  <g aria-label="USA" aria-describedby="victory-container-4-desc"/>
                }
              />
              <VictoryBar
                data={stackData2}
                dataComponent={<Bar ariaLabel={({index}) => stackDataAriaLabels2[index]} tabIndex="0" ariaDescribedBy="victory-container-2-desc" />}
                groupComponent={
                  <g aria-label="UK" aria-describedby="victory-container-4-desc" />
                }
              />
              <VictoryBar
                data={stackData3}
                dataComponent={<Bar ariaLabel={({index}) => stackDataAriaLabels3[index]} tabIndex="0" ariaDescribedBy="victory-container-2-desc" />}
                groupComponent={
                  <g aria-label="Canada" aria-describedby="victory-container-4-desc" />
                }
              />
            </VictoryStack>
            <VictoryLegend x={125} y={10}
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" } }}
              colorScale={["tomato", "orange", "gold"]}
              data={[
                { name: "USA" }, { name: "UK" }, { name: "Canada" }
              ]}
            />
          </VictoryChart>
        </div>

        <h2>Area Chart Accessibility Demo</h2>
        <h3>Number of endangered species in Africa (in thousands)</h3>
        <div className="demo" style={containerStyle}>
          <VictoryChart
            containerComponent={
              <VictoryContainer
                responsive={false}
                desc="Number of endangered species in Africa (in thousands)"
                tabIndex="0"
                ariaLabel="Area chart"
                role="group"
              />
            }
          >
            <VictoryArea
              data={areaData}
              groupComponent={
                <VictoryClipContainer tabIndex="0" ariaLabel={areaDataAriaLabel()} ariaDescribedBy="victory-container-5-desc" />
              }
            />
          </VictoryChart>
        </div>

        <h2>Line Chart Accessibility Demo</h2>
        <h3>Ice cream sales per month in 2019</h3>
        <div className="demo" style={containerStyle}>
          <VictoryLine
            containerComponent={
              <VictoryContainer
                role="group"
                desc="Ice cream sales per month in 2019"
                tabIndex="0"
                ariaLabel="Line chart"
                theme={VictoryTheme.material}
              />
            }
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
            data={lineData}
            groupComponent={
              <VictoryClipContainer tabIndex="0" ariaLabel={lineDataAriaLabel()} ariaDescribedBy="victory-container-6-desc" />
            }
          />
        </div>
      </React.Fragment>
    );
  }
}
