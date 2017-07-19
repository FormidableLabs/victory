import React from "react";
import { VictoryLegend } from "../src/index";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const legendStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxHeight: 300 } };
const data = [{
  name: "Series 1",
  symbol: {
    type: "circle",
    fill: "green"
  }
}, {
  name: "Long Series Name",
  symbol: {
    type: "triangleUp",
    fill: "blue"
  }
}, {
  name: "Series 3",
  symbol: {
    type: "diamond",
    fill: "pink"
  }
}, {
  name: "Series 4",
  symbol: {
    type: "plus"
  }
}, {
  name: "Series 5",
  symbol: {
    type: "star",
    fill: "red"
  },
  labels: {
    fill: "purple"
  }
}, {
  name: "Series 6",
  symbol: {
    type: "circle",
    fill: "orange"
  },
  labels: {
    fill: "blue"
  }
}];

const LegendDemo = () => (
  <div className="demo" style={containerStyle}>
    <svg
      height={150}
      width={150}
      style={{ border: "1px solid #ccc", margin: "2%" }}
    >
      <VictoryLegend
        standalone={false}
        data={data}
        style={legendStyle}
      />
    </svg>
    <svg
      height={100}
      width={244}
      style={{ border: "1px solid #ccc", margin: "2%" }}
    >
      <VictoryLegend
        data={data}
        padding={15}
        itemsPerRow={3}
        standalone={false}
        style={{ labels: { fill: "darkgray" } }}
      />
    </svg>
    <VictoryLegend
      data={data}
      itemsPerRow={4}
      orientation="horizontal"
      style={legendStyle}
    />
  </div>
);

export default LegendDemo;
