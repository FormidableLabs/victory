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
  labels: { fontSize: 14 },
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
      height={300}
      width={500}
      style={{ border: "1px solid #ccc", margin: "2%" }}
    >
      <VictoryLegend
        standalone={false}
        width={500} height={300}
        x={25} y={120}
        gutter={30}
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
    </svg>

  </div>
);

export default LegendDemo;
