import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryBrushContainer,
  VictoryZoomContainer,
  VictoryAxis
} from "victory";

import importedTheme from "../../styles/theme";

const chartData = [
  {
    x: new Date(1982, 1, 1),
    y: 125
  },
  {
    x: new Date(1987, 1, 1),
    y: 257
  },
  {
    x: new Date(1993, 1, 1),
    y: 345
  },
  {
    x: new Date(1997, 1, 1),
    y: 515
  },
  {
    x: new Date(2001, 1, 1),
    y: 132
  },
  {
    x: new Date(2005, 1, 1),
    y: 305
  },
  {
    x: new Date(2011, 1, 1),
    y: 270
  },
  {
    x: new Date(2013, 1, 1),
    y: 470
  },
  {
    x: new Date(2020, 1, 1),
    y: 340
  }
];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] },
      selectedDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
    };
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  getStyles(isMain) {
    return {
      parent: {
        boxSizing: "border-box",
        display: "block",
        height: isMain ? "70%" : "30%",
        margin: "0 auto",
        padding: 0
      }
    };
  }

  render() {
    return (
      <>
        <VictoryChart
          padding={{
            left: 50,
            right: 50,
            bottom: 35,
            top: 20
          }}
          width={450}
          height={245}
          scale={{ x: "time" }}
          style={this.getStyles(true)}
          containerComponent={
            <VictoryZoomContainer
              width={450}
              height={245}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: importedTheme.color.red }
            }}
            data={chartData}
          />
        </VictoryChart>
        <VictoryChart
          padding={{
            top: 0,
            left: 50,
            right: 50,
            bottom: 35
          }}
          width={450}
          height={105}
          scale={{ x: "time" }}
          style={this.getStyles(false)}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              height={105}
              onBrushDomainChange={this.handleBrush.bind(this)}
              width={450}
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
              new Date(2015, 1, 1),
              new Date(2020, 1, 1)
            ]}
            tickFormat={x => new Date(x).getFullYear()}
          />
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={chartData}
          />
        </VictoryChart>
      </>
    );
  }
}
