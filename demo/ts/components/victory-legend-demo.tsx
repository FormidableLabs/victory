import React, { useState } from "react";
import { VictoryLabel, Border, VictoryTheme } from "victory";
import { VictoryLegend } from "victory";
import { FaMoon, FaSun, FaStar } from "react-icons/fa";

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

const customIconData = [
  {
    name: "Series 1",
    symbol: {
      size: symbolSize,
      fill: "green",
    },
  },
  {
    name: "Long Series Name -- so long",
    symbol: {
      size: symbolSize,
      fill: "blue",
    },
  },
  {
    name: "Series 3",
    symbol: {
      size: symbolSize,
      fill: "pink",
    },
  },
];

const CustomSun = (props) => {
  return <FaSun {...props} x={props.x - 7} y={props.y - 7} size={15} />;
};

const CustomMoon = (props) => {
  const [iconColor, setIconColor] = useState(props?.style?.fill || "green");
  const [icon, setIcon] = useState("moon");
  if (icon === "moon") {
    return (
      <FaMoon
        fill={iconColor}
        x={props.x - 7}
        y={props.y - 7}
        size={15}
        onClick={() => {
          setIcon("star");
          setIconColor("red");
        }}
      />
    );
  }
  return (
    <FaStar
      fill={iconColor}
      x={props.x - 7}
      y={props.y - 7}
      size={15}
      onClick={() => {
        setIcon("moon");
        setIconColor("blue");
      }}
    />
  );
};

const LegendDemo = () => (
  <div className="demo">
    <div>
      <svg height={200} width={1500}>
        <VictoryLegend
          theme={VictoryTheme.clean}
          standalone={false}
          x={25}
          y={20}
          itemsPerRow={2}
          title={["My Legend title", "with some explanatory substitle"]}
          data={data}
          symbolSpacer={symbolSpacer}
          titleComponent={<VictoryLabel />}
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
          title={["TITLE"]}
          data={data}
          theme={VictoryTheme.clean}
          standalone={false}
          x={25}
          y={20}
          symbolSpacer={symbolSpacer}
          itemsPerRow={3}
        />
      </svg>
    </div>
    <svg height={300} width={1000}>
      <VictoryLegend
        title={["TITLE", "subtitle", "more"]}
        data={data}
        theme={VictoryTheme.clean}
        standalone={false}
        x={25}
        y={20}
        symbolSpacer={symbolSpacer}
      />
    </svg>
    <svg height={100} width={1000}>
      <VictoryLegend
        data={data}
        theme={VictoryTheme.clean}
        orientation="horizontal"
        standalone={false}
        x={25}
        y={20}
      />
    </svg>
    <svg height={200} width={1000}>
      <VictoryLegend
        data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
        theme={VictoryTheme.clean}
        x={25}
        y={0}
        standalone={false}
      />
    </svg>
    <svg height={200} width={1000}>
      <VictoryLegend
        theme={VictoryTheme.clean}
        borderComponent={<Border />}
        x={25}
        y={20}
        standalone={false}
        title={["TITLE"]}
        symbolSpacer={symbolSpacer}
        itemsPerRow={3}
        data={data}
      />
    </svg>
    {/* CustomIcon */}
    <svg height={200} width={1000}>
      <VictoryLegend
        theme={VictoryTheme.clean}
        title={["TITLE"]}
        x={25}
        y={20}
        standalone={false}
        symbolSpacer={symbolSpacer}
        itemsPerRow={3}
        dataComponent={<CustomSun />}
        data={customIconData}
      />
    </svg>
    {/* CustomIcon with events*/}
    <svg height={200} width={1000}>
      <VictoryLegend
        theme={VictoryTheme.clean}
        standalone={false}
        x={25}
        y={20}
        itemsPerRow={2}
        title={["My Legend title"]}
        data={customIconData}
        dataComponent={<CustomMoon />}
        symbolSpacer={symbolSpacer}
        titleComponent={
          <VictoryLabel style={[{ fontSize: 20 }, { fontSize: 14 }]} />
        }
      />
    </svg>
  </div>
);

export default LegendDemo;
