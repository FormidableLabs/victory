import React from "react";
import { VictoryArea } from "victory";
import { VictoryBar } from "victory";
import { VictoryChart } from "victory";
import { VictoryStack } from "victory";
import {
  ColorScalePropType,
  VictoryTheme,
  VictoryThemeDefinition,
} from "victory";
import { VictoryAxis } from "victory";

const data = [
  {
    x: 1,
    y: 2,
  },
  {
    x: 2,
    y: 3,
  },
  {
    x: 3,
    y: 5,
  },
  {
    x: 4,
    y: 4,
  },
  {
    x: 5,
    y: 7,
  },
];

const StackedChart = ({
  theme = VictoryTheme.clean,
  colorScale,
  chartType = "area",
  domainPadding,
}: {
  theme?: VictoryThemeDefinition;
  colorScale?: ColorScalePropType;
  chartType?: "area" | "bar";
  domainPadding?: number;
}) => {
  const chartStyle: { [key: string]: React.CSSProperties } = {
    parent: {
      border: "1px solid #ccc",
      width: "100%",
      height: 400,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  const ChartComponent = chartType === "area" ? VictoryArea : VictoryBar;
  return (
    <VictoryChart
      theme={theme}
      domainPadding={domainPadding}
      style={chartStyle}
    >
      <VictoryAxis label="X Axis" />
      <VictoryAxis dependentAxis label="Y Axis" />
      <VictoryStack colorScale={colorScale} aria-label="Victory Stack Demo">
        <ChartComponent data={data} />
        <ChartComponent data={data} />
        <ChartComponent data={data} />
        <ChartComponent data={data} />
        <ChartComponent data={data} />
      </VictoryStack>
    </VictoryChart>
  );
};

const colorScales: ColorScalePropType[] = [
  "qualitative",
  "heatmap",
  "warm",
  "cool",
  "red",
  "green",
];

class StackedThemeDemos extends React.Component {
  render() {
    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
    };

    const wrapperStyle: React.CSSProperties = {
      ...containerStyle,
      flexDirection: "column",
    };

    return (
      <div className="demo" style={containerStyle}>
        <div style={wrapperStyle}>
          <h2>Clean Theme</h2>
          {colorScales.map((colorScale, i) => (
            <StackedChart key={i} colorScale={colorScale} />
          ))}
          {colorScales.map((colorScale, i) => (
            <StackedChart
              key={i}
              colorScale={colorScale}
              chartType="bar"
              domainPadding={20}
            />
          ))}
        </div>
        <div style={wrapperStyle}>
          <h2>Material Theme</h2>
          {colorScales.map((colorScale, i) => (
            <StackedChart
              key={i}
              theme={VictoryTheme.material}
              colorScale={colorScale}
            />
          ))}
          {colorScales.map((colorScale, i) => (
            <StackedChart
              key={i}
              theme={VictoryTheme.material}
              colorScale={colorScale}
              chartType="bar"
              domainPadding={20}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default StackedThemeDemos;
