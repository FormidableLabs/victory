import React from "react";
import {
  ColorScalePropType,
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTooltip,
} from "victory";
import { useTheme } from "../_providers/themeProvider";
import { usePreviewOptions } from "../_providers/previewOptionsProvider";
import Select from "./select";
import Button from "./button";
import ConfigPreview from "./config-preview";
import { colorScaleOptions } from "../_const";

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

const Main = () => {
  const [showExportModal, setShowExportModal] = React.useState(false);

  const handleExportModalOpen = () => {
    window.scrollTo({ top: 0 });
    setShowExportModal(true);
  };

  const handleExportModalClose = () => {
    setShowExportModal(false);
  };

  const { customThemeConfig } = useTheme();
  const {
    colorScale,
    updateColorScale,
    showTooltips,
    setShowTooltips,
    exampleConfigs,
  } = usePreviewOptions();

  if (!customThemeConfig) return null;

  return (
    <>
      <main className="flex-1 flex flex-col items-center overflow-y-auto h-full">
        <div className="max-w-screen-xl w-full p-10 pb-20">
          <div className="flex justify-end items-center">
            <Button onClick={handleExportModalOpen}>Export Theme</Button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Select
              id="color-scale"
              label="Color Scale"
              value={colorScale}
              onChange={updateColorScale}
              options={colorScaleOptions}
              includeDefault
              className="w-1/3"
            />
            <fieldset className="p-0 m-0">
              <div className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="show-tooltips"
                  className="form-checkbox h-4 w-4 text-primary"
                  checked={showTooltips}
                  onChange={() => setShowTooltips(!showTooltips)}
                />
                <label
                  htmlFor="show-tooltips"
                  className="text-xs cursor-pointer"
                >
                  Show tooltips instead of labels
                </label>
              </div>
            </fieldset>
          </div>
          <div className="grid grid-cols-2 gap-10">
            {exampleConfigs.length === 0 ? (
              <>
                <div>
                  <h3 className="text-base font-bold mb-3">
                    Stacked Area Chart
                  </h3>
                  <VictoryChart
                    theme={customThemeConfig}
                    domainPadding={20}
                    style={chartStyle}
                  >
                    <VictoryAxis label="X Axis" />
                    <VictoryAxis dependentAxis label="Y Axis" />
                    <VictoryStack
                      colorScale={colorScale as ColorScalePropType}
                      aria-label="Victory Stack Demo"
                    >
                      {[...Array(NUM_STACKS)].map((_, i) => (
                        <VictoryArea data={sampleStackData} key={i} />
                      ))}
                    </VictoryStack>
                  </VictoryChart>
                </div>
                <div>
                  <h3 className="text-base font-bold mb-3">
                    Stacked Bar Chart
                  </h3>
                  <VictoryChart
                    theme={customThemeConfig}
                    domainPadding={20}
                    style={chartStyle}
                  >
                    <VictoryAxis label="X Axis" />
                    <VictoryAxis dependentAxis label="Y Axis" />
                    <VictoryStack
                      colorScale={colorScale as ColorScalePropType}
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
              </>
            ) : (
              exampleConfigs.map(
                ({ label, content: Content, hasVictoryChart = true }, i) =>
                  Content && (
                    <div key={i}>
                      <h3 className="text-base font-bold mb-3">{label}</h3>
                      {hasVictoryChart ? (
                        <VictoryChart
                          theme={customThemeConfig}
                          domainPadding={20}
                          style={chartStyle}
                        >
                          {Content({
                            labels: ({ datum }) => datum.y || datum.x,
                            colorScale: colorScale as ColorScalePropType,
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
                          colorScale: colorScale as ColorScalePropType,
                          ...(showTooltips && {
                            labelComponent: <VictoryTooltip />,
                          }),
                        })
                      )}
                    </div>
                  ),
              )
            )}
          </div>
        </div>
      </main>

      {showExportModal && <ConfigPreview onClose={handleExportModalClose} />}
    </>
  );
};
export default Main;
