import React from "react";
import { VictoryLabel, Border, VictoryTheme } from "victory-core";
import { VictoryLegend } from "victory-legend";

const legendStyle = {
  labels: { fontSize: 14, fontFamily: "Palatino" },
  border: { stroke: "black", strokeWidth: 2 },
  title: { padding: 5, fill: "red" },
};

const symbolSize = 5;
const symbolSpacer = 10;
const data = [
  {
    name: "Series 1",
    symbol: {
      size: symbolSize,
      type: "circle",
      fill: "green",
    },
  },
  {
    name: "Long Series Name -- so long",
    symbol: {
      size: symbolSize,
      type: "triangleUp",
      fill: "blue",
    },
  },
  {
    name: "Series 3",
    symbol: {
      size: symbolSize,
      type: "diamond",
      fill: "pink",
    },
  },
  {
    name: "Series 4",
    symbol: {
      size: symbolSize,
      type: "plus",
    },
  },
  {
    name: "Series 4: minus",
    symbol: {
      size: symbolSize,
      type: "minus",
    },
  },
  {
    name: "Series 5",
    symbol: {
      size: symbolSize,
      type: "star",
      fill: "red",
    },
    labels: {
      fill: "purple",
    },
  },
  {
    name: "Series 6: also quite long",
    symbol: {
      size: symbolSize,
      type: "circle",
      fill: "orange",
    },
    labels: {
      fill: "blue",
    },
  },
];

const LegendDemo = () => (
  <div className="demo">
    <div>
      <svg height={200} width={1000}>
        <VictoryLegend
          theme={VictoryTheme.clean}
          standalone={false}
          x={25}
          y={20}
          itemsPerRow={2}
          title={["My Legend title", "with some explanatory substitle"]}
          data={data}
          symbolSpacer={symbolSpacer}
          titleComponent={
            <VictoryLabel style={[{ fontSize: 20 }, { fontSize: 14 }]} />
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: () => ({ symbol: "star" }),
                    },
                  ];
                },
              },
            },
          ]}
        />
      </svg>
    </div>
    <div>
      <svg height={200} width={1000}>
        <VictoryLegend
          standalone={false}
          titleOrientation="right"
          centerTitle
          title={["TITLE"]}
          x={25}
          y={20}
          gutter={30}
          symbolSpacer={symbolSpacer}
          itemsPerRow={3}
          data={data}
          style={legendStyle}
        />
      </svg>
    </div>
    <svg height={200} width={1000}>
      <VictoryLegend
        orientation="horizontal"
        titleOrientation="left"
        title={["TITLE"]}
        standalone={false}
        x={25}
        y={20}
        symbolSpacer={symbolSpacer}
        gutter={30}
        itemsPerRow={3}
        data={data}
        style={legendStyle}
      />
    </svg>
    <svg height={300} width={1000}>
      <VictoryLegend
        standalone={false}
        x={25}
        y={20}
        titleOrientation="bottom"
        title={["TITLE", "subtitle", "more"]}
        symbolSpacer={symbolSpacer}
        gutter={30}
        data={data}
        style={legendStyle}
      />
    </svg>
    <svg height={200} width={1000}>
      <VictoryLegend
        orientation="horizontal"
        standalone={false}
        x={25}
        y={20}
        gutter={30}
        data={data}
        style={legendStyle}
      />
    </svg>
    <svg height={200} width={1000}>
      <VictoryLegend
        x={25}
        y={20}
        standalone={false}
        orientation="vertical"
        gutter={{ left: 20, right: 50 }}
        rowGutter={{ top: 5, bottom: 8 }}
        style={{ border: { stroke: "black" } }}
        data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
      />
    </svg>
    <svg height={200} width={1000}>
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
    </svg> 
  </div>
);

export default LegendDemo;
