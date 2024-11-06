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
import ConfigMapper from "./config-mapper";

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
  const [baseTheme, setBaseTheme] = React.useState<ThemeOption | undefined>(
    undefined,
  );
  const [customThemeConfig, setCustomThemeConfig] = React.useState<
    VictoryThemeDefinition | undefined
  >(undefined);
  const [activeColorScale, setActiveColorScale] =
    React.useState<ColorScalePropType>("qualitative");
  const [showThemeConfigPreview, setShowThemeConfigPreview] =
    React.useState(false);

  const handleThemeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const themeName = event.target.value;
    const theme = themes.find((t) => t.name === themeName);
    setBaseTheme(theme);
    setCustomThemeConfig({ ...theme?.config });
  };

  const handleLabelConfigChange = (newLabelConfig: Partial<LabelProps>) => {
    if (customThemeConfig) {
      const updatedConfig = {
        ...customThemeConfig,
        axis: {
          ...customThemeConfig.axis,
          style: {
            ...customThemeConfig.axis?.style,
            axisLabel: {
              ...customThemeConfig.axis?.style?.axisLabel,
              ...newLabelConfig,
            },
          },
        },
      };
      setCustomThemeConfig(updatedConfig as VictoryThemeDefinition);
    }
  };

  const handleColorChange = ({ event, index, colorScale }: ColorChangeArgs) => {
    const newColor = event.target.value;
    const updatedConfig = {
      ...customThemeConfig,
      palette: {
        ...customThemeConfig?.palette,
        [colorScale]: customThemeConfig?.palette?.[colorScale]?.map(
          (color, i) => (i === index ? newColor : color),
        ),
      },
    };
    setCustomThemeConfig(updatedConfig);
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
      <aside className="relative flex flex-col h-lvh w-[350px] border-r border-gray-200">
        <div className="grow overflow-y-auto p-4 pb-[100px]">
          <h2 className="mb-0 text-lg font-bold">Customize Your Theme</h2>
          <p className="text-sm mb-4 text-gray-300">
            Select a theme to begin customizing.
          </p>
          <Select
            id="theme-select"
            value={baseTheme?.name || ""}
            onChange={handleThemeSelect}
            options={themeOptions}
            label="Base Theme"
          />
          {customThemeConfig && (
            <section>
              <h2 className="text-lg font-bold mb-4">Customization Options</h2>
              <ConfigMapper
                activeColorScale={activeColorScale}
                handleColorScaleChange={handleColorScaleChange}
                handleLabelConfigChange={handleLabelConfigChange}
              />
            </section>
          )}
          {false && (
            <section>
              <h2 className="text-lg font-bold mb-4">Customization Options</h2>
              <h3 className="text-lg font-bold mb-4">Color Options</h3>
              <ColorScaleOptions
                activeColorScale={activeColorScale}
                palette={customThemeConfig?.palette}
                onColorChange={handleColorChange}
                onColorScaleChange={handleColorScaleChange}
              />
              <LabelOptions
                labelConfig={
                  customThemeConfig?.axis?.style?.axisLabel as LabelProps
                }
                onLabelConfigChange={handleLabelConfigChange}
              />
            </section>
          )}
        </div>
        <footer className="p-4 border-t border-gray-200 sticky bottom-0 flex justify-end bg-white">
          <Button
            onClick={handleThemeConfigPreviewOpen}
            ariaLabel="Get Theme Code"
            disabled={!customThemeConfig}
          >
            Get Theme Code
          </Button>
        </footer>
      </aside>
      <main className="flex-1 flex flex-col items-center">
        {customThemeConfig && (
          <div className="max-w-screen-xl w-full py-4 px-10">
            <h2 className="text-xl font-bold mb-4">Example Charts</h2>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h3 className="text-base font-bold mb-3">Bar Chart</h3>
                <VictoryChart
                  theme={customThemeConfig}
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
                  theme={customThemeConfig}
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
      {showThemeConfigPreview && customThemeConfig && (
        <ConfigPreview
          config={customThemeConfig}
          onClose={handleThemeConfigPreviewClose}
        />
      )}
    </div>
  );
};
export default ThemeBuilder;
