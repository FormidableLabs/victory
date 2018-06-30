import React from "react";
import { VictoryLegend, VictoryLabel, Border } from "../../packages/victory-core/src/index";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center"
};

const legendStyle = {
  labels: { fontSize: 14, fontFamily: "Palatino" },
  border: { stroke: "black", strokeWidth: 2 },
  title: { padding: 5, fill: "red" }
};

const symbolSize = 5;
const symbolSpacer = 10;
const data = [{
  name: "Series 1",
  symbol: {
    size: symbolSize,
    type: "circle",
    fill: "green"
  }
}, {
  name: "Long Series Name -- so long",
  symbol: {
    size: symbolSize,
    type: "triangleUp",
    fill: "blue"
  }
}, {
  name: "Series 3",
  symbol: {
    size: symbolSize,
    type: "diamond",
    fill: "pink"
  }
}, {
  name: "Series 4",
  symbol: {
    size: symbolSize,
    type: "plus"
  }
}, {
  name: "Series 4: minus",
  symbol: {
    size: symbolSize,
    type: "minus"
  }
}, {
  name: "Series 5",
  symbol: {
    size: symbolSize,
    type: "star",
    fill: "red"
  },
  labels: {
    fill: "purple"
  }
}, {
  name: "Series 6: also quite long",
  symbol: {
    size: symbolSize,
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
      width={1000}
      style={{ border: "1px solid #ccc", margin: "2%" }}
    >
      <VictoryLegend
        standalone={false}
        x={25} y={20}
        itemsPerRow={2}
        title={["My Legend title", "with some explanatory substitle"]}
        data={data}
        symbolSpacer={symbolSpacer}
        style={legendStyle}
        titleComponent={<VictoryLabel style={[{ fontSize: 20 }, { fontSize: 10 }]} />}
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
        titleOrientation="right"
        centerTitle
        title={["TITLE"]}
        x={25} y={150}
        gutter={30}
        symbolSpacer={symbolSpacer}
        itemsPerRow={3}
        data={data}
        style={legendStyle}
      />

      <VictoryLegend
        orientation="horizontal"
        titleOrientation="left"
        title={["TITLE"]}
        standalone={false}
        x={25} y={300}
        symbolSpacer={symbolSpacer}
        gutter={30}
        itemsPerRow={3}
        data={data}
        style={legendStyle}
      />

      <VictoryLegend
        standalone={false}
        x={600} y={20}
        titleOrientation="bottom"
        title={["TITLE", "subtitle", "more"]}
        symbolSpacer={symbolSpacer}
        gutter={30}
        data={data}
        style={legendStyle}
      />
      <VictoryLegend
        orientation="horizontal"
        standalone={false}
        x={25} y={400}
        gutter={30}
        data={data}
        style={legendStyle}
      />
      <VictoryLegend x={25} y={480}
        standalone={false}
        orientation="vertical"
        gutter={{ left: 20, right: 50 }}
        rowGutter={{ top: 5, bottom: 8 }}
        style={{ border: { stroke: "black" } }}
        data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
      />
    </svg>
    <VictoryLegend
      borderComponent={<Border width={430} height={110} />}
      centerTitle
      title={["TITLE"]}
      gutter={30}
      symbolSpacer={symbolSpacer}
      itemsPerRow={3}
      data={data}
      style={legendStyle}
    />
  </div>
);

export default LegendDemo;
