import React from "react";

import "../../css/custom.css";

import {
  ColorScalePropType,
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryThemeDefinition,
  VictoryTooltip,
} from "victory";
import Select from "./_components/select";
import ConfigPreview from "./_components/config-preview";
import Button from "./_components/button";
import ConfigMapper from "./_components/config-mapper";
import { setNestedConfigValue } from "./_utils";
import optionsConfig from "./_config";

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

const NUM_STACKS = 5;

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
  const [showTooltips, setShowTooltips] = React.useState(false);

  const handleThemeSelect = (themeName: string) => {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) {
      setBaseTheme(undefined);
      setCustomThemeConfig(undefined);
      return;
    }
    setBaseTheme(theme);
    setCustomThemeConfig({ ...theme?.config });
  };

  const updateCustomThemeConfig = (
    path: string | string[],
    newValue: unknown,
  ) => {
    if (!customThemeConfig) return;
    const updatedConfig = setNestedConfigValue(
      customThemeConfig,
      path,
      newValue,
    );
    setCustomThemeConfig(updatedConfig);
  };

  const handleColorScaleChange = (colorScale: string) => {
    setActiveColorScale(colorScale as ColorScalePropType);
  };

  const handleThemeConfigPreviewOpen = () => {
    setShowThemeConfigPreview(true);
  };

  const handleThemeConfigPreviewClose = () => {
    setShowThemeConfigPreview(false);
  };

  return (
    <div className="flex flex-row flex-wrap items-start justify-start w-full h-lvh theme-builder">
      <aside className="relative flex flex-col h-full w-[380px] border-r border-grayscale-300">
        <div className="grow overflow-y-auto p-4 pb-[100px]">
          <h2 className="mb-0 text-lg font-bold">Customize Your Theme</h2>
          <p className="text-sm mb-4 text-grayscale-400">
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
              <h2 className="text-lg font-bold my-4">Customization Options</h2>
              <ConfigMapper
                themeConfig={customThemeConfig}
                activeColorScale={activeColorScale}
                handleColorScaleChange={handleColorScaleChange}
                updateThemeConfig={updateCustomThemeConfig}
              />
            </section>
          )}
        </div>
        <footer className="p-4 border-t border-grayscale-300 sticky bottom-0 flex justify-end bg-white">
          <Button
            onClick={handleThemeConfigPreviewOpen}
            ariaLabel="Get Theme Code"
            disabled={!customThemeConfig}
          >
            Get Theme Code
          </Button>
        </footer>
      </aside>
      <main className="flex-1 flex flex-col items-center overflow-y-auto h-full">
        {customThemeConfig && (
          <div className="max-w-screen-xl w-full py-4 px-10">
            <h2 className="text-xl font-bold mb-4">Example Charts</h2>
            <fieldset>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="checkbox"
                  id="show-tooltips"
                  className="form-checkbox h-5 w-5 text-primary"
                  checked={showTooltips}
                  onChange={() => setShowTooltips(!showTooltips)}
                />
                <label htmlFor="show-tooltips">
                  Show tooltips instead of labels
                </label>
              </div>
            </fieldset>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h3 className="text-base font-bold mb-3">Stacked Area Chart</h3>
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
                    {[...Array(NUM_STACKS)].map((_, i) => (
                      <VictoryArea
                        data={sampleStackData}
                        key={i}
                        labels={() => undefined}
                      />
                    ))}
                  </VictoryStack>
                </VictoryChart>
              </div>
              <div>
                <h3 className="text-base font-bold mb-3">Stacked Bar Chart</h3>
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
                    {[...Array(NUM_STACKS)].map((_, i) => (
                      <VictoryBar
                        data={sampleStackData}
                        key={i}
                        labels={({ datum }) =>
                          showTooltips ? datum.y : undefined
                        }
                        {...(showTooltips && {
                          labelComponent: <VictoryTooltip />,
                        })}
                      />
                    ))}
                  </VictoryStack>
                </VictoryChart>
              </div>
              {optionsConfig.map(
                ({ title, content: Content, hasVictoryChart = true }, i) =>
                  Content && (
                    <div key={i}>
                      <h3 className="text-base font-bold mb-3">{title}</h3>
                      {hasVictoryChart ? (
                        <VictoryChart
                          theme={customThemeConfig}
                          domainPadding={20}
                          style={chartStyle}
                        >
                          {Content({
                            labels: ({ datum }) => datum.y || datum.x,
                            ...(showTooltips && {
                              labelComponent: <VictoryTooltip />,
                            }),
                          })}
                        </VictoryChart>
                      ) : (
                        Content({
                          labels: ({ datum }) => datum.y || datum.x,
                          style: chartStyle,
                          theme: customThemeConfig,
                          ...(showTooltips && {
                            labelComponent: <VictoryTooltip />,
                          }),
                        })
                      )}
                    </div>
                  ),
              )}
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
