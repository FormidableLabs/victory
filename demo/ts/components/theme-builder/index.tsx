import React from "react";
import {
  ColorScalePropType,
  VictoryTheme,
  VictoryThemeDefinition,
} from "victory-core";
import ThemePicker from "./theme-picker";
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
};

const tabContainerStyles: React.CSSProperties = {
  display: "flex",
  cursor: "pointer",
  marginBottom: 20,
  fontSize: 14,
};

const previewContainerStyles: React.CSSProperties = {
  flex: 1,
  padding: "0 20px",
};

const getTabStyles = (isActive): React.CSSProperties => ({
  padding: "10px 20px",
  borderBottom: "2px solid lightgray",
  fontWeight: "bold",
  color: "gray",
  ...(isActive && {
    borderBottom: "2px solid black",
    color: "#2165E3",
  }),
});

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

const tabConfig = [
  {
    name: "themes",
    label: "Default Themes",
    Children: ThemePicker,
  },
  {
    name: "customize",
    label: "Customize",
    Children: CustomOptions,
  },
];

const ThemeBuilder = () => {
  const [activeTheme, setActiveTheme] = React.useState<ThemeOption>(themes[0]);
  const [activeColorScale] = React.useState<ColorScalePropType | undefined>(
    "qualitative",
  );
  const [activeTab, setActiveTab] = React.useState(tabConfig[0].name);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleThemeSelect = (selectedTheme: ThemeOption) => {
    if (!selectedTheme) return;
    setActiveTheme(selectedTheme);
  };

  const handleColorChange = ({ event, index, colorScale }) => {
    const newColor = event.target.value;
    const customTheme = {
      ...activeTheme,
      name: "Custom",
      config: {
        ...activeTheme.config,
        palette: {
          ...activeTheme.config?.palette,
          [colorScale]: activeTheme.config?.palette?.[colorScale]?.map(
            (color, i) => (i === index ? newColor : color),
          ),
        },
      },
    };
    setActiveTheme(customTheme);
  };

  return (
    <div style={containerStyles}>
      <aside style={sidebarStyles}>
        <div style={tabContainerStyles}>
          {tabConfig.map((tab, i) => (
            <div
              key={i}
              onClick={() => handleTabChange(tab.name)}
              style={getTabStyles(activeTab === tab.name)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div>
          {tabConfig.map(({ name, Children }) => (
            <div key={name}>
              {activeTab === name && (
                <Children
                  key={name}
                  themes={themes}
                  activeTheme={activeTheme}
                  onColorChange={handleColorChange}
                  onSelect={handleThemeSelect}
                />
              )}
            </div>
          ))}
        </div>
      </aside>
      <main style={previewContainerStyles}>
        <h2>Example Charts</h2>
        <div style={chartsGridStyles}>
          <div>
            <h3>Bar Chart</h3>
            <VictoryChart
              theme={activeTheme.config}
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
              theme={activeTheme.config}
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
