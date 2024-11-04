import React from "react";
import {
  ColorScalePropType,
  LabelProps,
  VictoryTheme,
  VictoryThemeDefinition,
} from "victory-core";
import { VictoryChart } from "victory-chart";
import { VictoryAxis } from "victory-axis";
import { VictoryStack } from "victory-stack";
import { VictoryBar } from "victory-bar";
import { VictoryArea } from "victory-area";
import ColorScaleOptions, { ColorChangeArgs } from "./color-scale-options";
import Select from "./select";
import ConfigPreview from "./config-preview";
import Button from "./button";

import "./tailwind.css";
import LabelOptions from "./label-options";

export type ThemeOption = {
  name: string;
  config?: VictoryThemeDefinition;
};

const themes: ThemeOption[] = [
  { name: "Clean", config: VictoryTheme.clean },
  { name: "Material", config: VictoryTheme.material },
  { name: "Grayscale", config: VictoryTheme.grayscale },
];

const themeOptions = [
  { label: "Select a theme", value: undefined },
  ...themes.map((theme) => ({
    label: theme.name,
    value: theme.name,
  })),
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
  const [showThemeConfigPreview, setShowThemeConfigPreview] =
    React.useState(false);

  const handleThemeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const themeName = event.target.value;
    const theme = themes.find((t) => t.name === themeName);
    setActiveTheme(theme);
  };

  const handleLabelConfigChange = (newLabelConfig: Partial<LabelProps>) => {
    if (activeTheme) {
      const updatedTheme = {
        ...activeTheme,
        name: "Custom",
        config: {
          ...activeTheme.config,
          axis: {
            ...activeTheme.config?.axis,
            style: {
              ...activeTheme.config?.axis?.style,
              axisLabel: {
                ...activeTheme.config?.axis?.style?.axisLabel,
                ...newLabelConfig,
              },
            },
          },
        },
      };
      setActiveTheme(updatedTheme as ThemeOption);
    }
  };

  const handleColorChange = ({ event, index, colorScale }: ColorChangeArgs) => {
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

  const handleThemeConfigPreviewOpen = () => {
    setShowThemeConfigPreview(true);
  };

  const handleThemeConfigPreviewClose = () => {
    setShowThemeConfigPreview(false);
  };

  return (
    <div className="flex flex-row flex-wrap items-start justify-start w-full">
      <aside className="relative flex flex-col h-lvh w-[300px] border-r border-gray-200">
        <div className="grow overflow-y-auto p-4">
          <h2 className="mb-0 text-lg font-bold">Customize Your Theme</h2>
          <p className="text-sm mb-4 text-gray-300">
            Select a theme to begin customizing.
          </p>
          <Select
            id="theme-select"
            value={activeTheme?.name || ""}
            onChange={handleThemeSelect}
            options={themeOptions}
            label="Base Theme"
          />
          {activeTheme && (
            <section>
              <h2 className="text-lg font-bold mb-4">Customization Options</h2>
              <ColorScaleOptions
                activeColorScale={activeColorScale}
                activeTheme={activeTheme}
                onColorChange={handleColorChange}
                onColorScaleChange={handleColorScaleChange}
              />
              <LabelOptions
                labelConfig={
                  activeTheme?.config?.axis?.style?.axisLabel as LabelProps
                }
                onLabelConfigChange={handleLabelConfigChange}
              />
            </section>
          )}
        </div>
        <footer className="p-4 border-t border-gray-200 sticky bottom-0 flex justify-end">
          <Button
            onClick={handleThemeConfigPreviewOpen}
            ariaLabel="Get Theme Code"
            disabled={!activeTheme}
          >
            Get Theme Code
          </Button>
        </footer>
      </aside>
      <main className="flex-1 flex flex-col items-center">
        {activeTheme && (
          <div className="max-w-screen-xl w-full py-4 px-10">
            <h2 className="text-xl font-bold mb-4">Example Charts</h2>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h3 className="text-base font-bold mb-3">Bar Chart</h3>
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
                <h3 className="text-base font-bold mb-3">Area Chart</h3>
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
          </div>
        )}
      </main>
      {showThemeConfigPreview && activeTheme?.config && (
        <ConfigPreview
          config={activeTheme?.config}
          onClose={handleThemeConfigPreviewClose}
        />
      )}
    </div>
  );
};
export default ThemeBuilder;
