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
import { NUM_STACKS, sampleStackData } from "../_const";
import clsx from "clsx";
import PreviewSettingsMenu from "./preview-settings-menu";

const chartStyle: { [key: string]: React.CSSProperties } = {
  parent: {
    border: "1px solid #ccc",
    width: "100%",
    height: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const ThemePreview = () => {
  const { customThemeConfig } = useTheme();
  const { colorScale, showTooltips, exampleConfigs } = usePreviewOptions();

  if (!customThemeConfig) return null;

  return (
    <main className="flex-1 flex flex-col items-center overflow-y-auto h-full">
      <div className="max-w-screen-xl w-full px-10 pt-6 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold m-0">Theme Preview</h1>
          <PreviewSettingsMenu />
        </div>
        <div
          className={clsx(
            "grid grid-cols-1 gap-10",
            exampleConfigs.length !== 1 && "xl:grid-cols-2",
            exampleConfigs.length === 1
              ? "auto-rows-[500px]"
              : "auto-rows-[400px] xl:max-2xl:auto-rows-[300px]",
          )}
        >
          {exampleConfigs.length === 0 ? (
            <>
              <div>
                <h3 className="text-lg font-bold mb-3">Stacked Area Chart</h3>
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
                <h3 className="text-lg font-bold mb-3">Stacked Bar Chart</h3>
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
                    <h3 className="text-lg font-bold mb-3">{label}</h3>
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
                        colorScale: colorScale as ColorScalePropType,
                        style: chartStyle,
                        theme: customThemeConfig,
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
  );
};
export default ThemePreview;
