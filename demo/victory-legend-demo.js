import React from "react";
import { VictoryLegend } from "../src/index";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const legendStyle = {
  parent: { border: "1px solid #ccc", margin: "2%" },
  labels: { fontSize: 14, fontFamily: "Palatino" },
  border: { stroke: "black", strokeWidth: 2 }
};
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
  name: "Series 6: also quite long",
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
      height={800}
      width={800}
      style={{ border: "1px solid #ccc", margin: "2%" }}
    >
      <VictoryLegend
        standalone={false}
        x={25} y={20}
        itemsPerRow={2}
        data={data}
        style={legendStyle}
        events={[{
          target: "data",
          eventHandlers: {
            onClick: () => {
              return [{
                mutation: () => ({ symbol: "star" })
              }];
            }
          }
        }]}
      />
      <VictoryLegend
        standalone={false}
        x={25} y={80}
        gutter={30}
        itemsPerRow={3}
        data={data}
        style={legendStyle}
      />
      <VictoryLegend
        orientation="horizontal"
        standalone={false}
        x={25} y={160}
        gutter={30}
        itemsPerRow={3}
        data={data}
        style={legendStyle}
      />

      <VictoryLegend
        standalone={false}
        x={500} y={20}
        gutter={30}
        data={data}
        style={legendStyle}
      />
      <VictoryLegend
        orientation="horizontal"
        standalone={false}
        x={25} y={220}
        gutter={30}
        data={data}
        style={legendStyle}
      />
    </svg>
  </div>
);

export default LegendDemo;
