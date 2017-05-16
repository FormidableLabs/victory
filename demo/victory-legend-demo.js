import React from "react";
import { VictoryLegend } from "../src/index";

const legendStyle = { parent: { display: "block", marginBottom: 20 }};
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
  <div className="demo">
    <VictoryLegend
      data={data}
      style={legendStyle}
    />
    <VictoryLegend
      data={data}
      itemsPerRow={4}
      orientation="horizontal"
      style={legendStyle}
    />
    <svg
      height={100}
      width={244}
      style={{ border: "1px solid #ccc" }}
    >
      <VictoryLegend
        data={data}
        padding={15}
        itemsPerRow={3}
        standalone={false}
        style={{ labels: { fill: "darkgray" } }}
      />
    </svg>
  </div>
);

export default LegendDemo;
