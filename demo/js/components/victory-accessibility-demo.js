/*global window:false */
/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import { VictoryChart } from "Packages/victory-chart/src/index";
import { VictoryPie } from "Packages/victory-pie/src/index";
import { VictoryAxis } from "Packages/victory-axis/src/index";
import { VictoryScatter } from "Packages/victory-scatter/src/index";
import { VictoryContainer } from "Packages/victory-core/src/index";
import Point from "Packages/victory-core/src/victory-primitives/point";
import Slice from "Packages/victory-pie/src/slice";

export default class App extends React.Component {
  setStateInterval = undefined;

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
      });
    }, 5000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    // const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };

    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

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

    console.log('what is scatter' + scatterDataAriaLabels);

    return (
      <React.Fragment>
        <h2>Pie Chart Accessibility Demo</h2>
        <div className="demo" style={containerStyle}>
          <VictoryPie
            containerComponent={
              <VictoryContainer
                responsive={false}
                role="group"
                desc="A pie chart for animals"
                tabIndex="0"
                label="Animals"
              />
            }
            dataComponent={<Slice tabIndex="0" ariaLabel="test" ariaDescribedBy="victory-container-1-desc" />}
            groupComponent={
              <g aria-label="test" aria-describedby="hi" />
            }
            height="250"
            width="350"
              data={[
                { x: "Cats", y: 35 },
                { x: "Dogs", y: 40 },
                { x: "Birds", y: 55 }
              ]}
          />
        </div>
        <h2>Scatter Chart Accessibility Demo</h2>
        <div className="demo" style={containerStyle}>
          <VictoryChart
            domain={{ x: [0.5, 5.5], y: [0, 100] }}
            containerComponent={
              <VictoryContainer
                responsive={false}
                role="group"
                desc="A scatter chart"
                tabIndex="0"
                label="Animals"
              />
            }
          >
            <VictoryScatter
              containerComponent={
                <VictoryContainer
                  responsive={false}
                  role="group"
                  desc="A scatter chart"
                  tabIndex="0"
                  label="Animals"
                />
              }
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

        {/* <h2>Line Chart Accessibility Demo</h2>
        <div className="demo" style={containerStyle}>
          <VictoryLine
            containerComponent={
              <VictoryContainer
                role="group"
                desc="A line chart"
                tabIndex="0"
                label="Animals"
              />
            }
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 }
            ]}
          />
        </div> */}
      </React.Fragment>
    );
  }
}

class ChartWrap extends React.Component {
  static defaultProps = {
    height: 250,
    width: 350
  };
  // renders both a standalone chart, and a version wrapped in VictoryChart,
  // to test both cases at once
  render() {
    const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };

    return (
      <div style={parentStyle}>
        {React.cloneElement(this.props.children)}
        <VictoryChart {...this.props}>{this.props.children}</VictoryChart>
      </div>
    );
  }
}
