import React from "react";
import {
  ColorScalePropType,
  VictoryTheme,
  VictoryThemeDefinition,
} from "victory-core";
import { VictoryChart } from "victory-chart";
import { VictoryAxis } from "victory-axis";
import { VictoryStack } from "victory-stack";
import { VictoryBar } from "victory-bar";
import { VictoryArea } from "victory-area";
import CustomOptions from "./custom-options";

export type ThemeOption = {
  name: string;
  config?: VictoryThemeDefinition;
};

const themes: ThemeOption[] = [
  { name: "Clean", config: VictoryTheme.clean },
  { name: "Material", config: VictoryTheme.material },
  { name: "Grayscale", config: VictoryTheme.grayscale },
];

const sampleStackData = [
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

const containerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
};

const sidebarStyles: React.CSSProperties = {
  height: "100%",
  borderRight: "1px solid #ccc",
  padding: "20px",
  width: 300,
  overflowY: "auto",
};

const previewContainerStyles: React.CSSProperties = {
  flex: 1,
  padding: "0 20px",
};

const chartsGridStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
};

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

const ThemeBuilder = () => {
  const [activeTheme, setActiveTheme] = React.useState<ThemeOption | undefined>(
    undefined,
  );
  const [activeColorScale, setActiveColorScale] =
    React.useState<ColorScalePropType>("qualitative");

  const handleThemeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const themeName = event.target.value;
    const theme = themes.find((t) => t.name === themeName);
    setActiveTheme(theme);
  };

  const handleColorChange = ({ event, index, colorScale }) => {
    const newColor = event.target.value;
    const customTheme = {
      ...activeTheme,
      name: "Custom",
      config: {
        ...activeTheme?.config,
        palette: {
          ...activeTheme?.config?.palette,
          [colorScale]: activeTheme?.config?.palette?.[colorScale]?.map(
            (color, i) => (i === index ? newColor : color),
          ),
        },
      },
    };
    setActiveTheme(customTheme);
  };

  const handleColorScaleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setActiveColorScale(event.target.value as ColorScalePropType);
  };

  return (
    <div style={containerStyles}>
      <aside style={sidebarStyles}>
        <section>
          <h2>Theme</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <select
              value={activeTheme?.name || ""}
              onChange={handleThemeSelect}
              placeholder="Select a starter theme"
            >
              <option value="" disabled>
                Select a starter theme
              </option>
              {themes.map((theme, i) => (
                <option key={`${theme.name}-${i}`} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
        </section>
        {activeTheme && (
          <section>
            <h2>Customize</h2>
            <CustomOptions
              activeColorScale={activeColorScale}
              activeTheme={activeTheme}
              onColorChange={handleColorChange}
              onColorScaleChange={handleColorScaleChange}
            />
          </section>
        )}
      </aside>
      <main style={previewContainerStyles}>
        <h2>Example Charts</h2>
        <div style={chartsGridStyles}>
          <div>
            <h3>Bar Chart</h3>
            <VictoryChart
              theme={activeTheme?.config}
              domainPadding={20}
              style={chartStyle}
            >
              <VictoryAxis label="X Axis" />
              <VictoryAxis dependentAxis label="Y Axis" />
              <VictoryStack
                colorScale={activeColorScale}
                aria-label="Victory Stack Demo"
              >
                {[...Array(5)].map((_, i) => (
                  <VictoryBar data={sampleStackData} key={i} />
                ))}
              </VictoryStack>
            </VictoryChart>
          </div>
          <div>
            <h3>Area Chart</h3>
            <VictoryChart
              theme={activeTheme?.config}
              domainPadding={20}
              style={chartStyle}
            >
              <VictoryAxis label="X Axis" />
              <VictoryAxis dependentAxis label="Y Axis" />
              <VictoryStack
                colorScale={activeColorScale}
                aria-label="Victory Stack Demo"
              >
                {[...Array(5)].map((_, i) => (
                  <VictoryArea data={sampleStackData} key={i} />
                ))}
              </VictoryStack>
            </VictoryChart>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ThemeBuilder;
