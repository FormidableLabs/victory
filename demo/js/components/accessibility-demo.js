import React from "react";
import { VictoryChart } from "Packages/victory-chart/src/index";
import { VictoryBoxPlot } from "Packages/victory-box-plot/src/index";
import { VictoryBar } from "Packages/victory-bar/src/index";
import { LineSegment, Whisker, Box } from "victory-core/src";

export default class App extends React.Component {
  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: "40%",
      margin: "3%"
    };

    const chartContainerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "100%"
    };
    {
      /** BAR CHART */
    }
    return (
      <div className="demo" style={containerStyle}>
        {/* <div style={chartContainerStyle}>
         
          <h3>Tabbable with aria-labels: bar chart</h3>
          <VictoryChart domainPadding={{ x: 40, y: 40 }}>
            <VictoryBar
              data={[
                { x: "A", y: 1 },
                { x: "B", y: 3 },
                { x: "C", y: 5 },
                { x: "D", y: 7 }
              ]}
              ariaLabel={({ datum }) => `bar-value-${datum.x}`}
              tabIndex={({ index }) => index + 1}
            />
          </VictoryChart>
        </div> */}
        {/** BOX PLOT */}
        <div style={chartContainerStyle}>
          <h3>Tabbable with aria-labels: bar chart</h3>
          <VictoryChart domainPadding={{ x: 40, y: 40 }}>
            <VictoryBoxPlot
              minLabels
              maxLabels
              data={[
                { x: "red", y: [5, 10, 9, 2] },
                { x: "blue", y: [1, 15, 6, 8] },
                { x: "green", y: [3, 5, 6, 9] },
                { x: "yellow", y: [5, 20, 8, 12] },
                { x: "white", y: [2, 11, 12, 13] }
              ]}
              medianComponent={<LineSegment ariaLabel={({ datum }) => `custom-label-${datum}`} />}
              maxComponent={
                <Whisker
                  ariaLabel={({ datum }) => `${datum.x} max is ${Math.max(...datum.y)}`}
                  tabIndex={({ index }) => index + 1}
                />
              }
              minComponent={
                <Whisker
                  ariaLabel={({ datum }) => `${datum.x} min is ${Math.min(...datum.y)}`}
                  tabIndex={({ index }) => index + 4}
                />
              }
              dataComponent={
                <Box ariaLabel={"THE DATA BOX COMPONENT"} tabIndex={({ index }) => index + 1} />
              }
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
