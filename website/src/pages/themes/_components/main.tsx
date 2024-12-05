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
  const [activeColorScale, setActiveColorScale] = React.useState<
    string | undefined
  >(undefined);
  const [showThemeConfigPreview, setShowThemeConfigPreview] =
    React.useState(false);
  const [showTooltips, setShowTooltips] = React.useState(false);

  const { customThemeConfig } = useTheme();

  return (
    <main className="flex-1 flex flex-col items-center overflow-y-auto h-full">
      <div className="max-w-screen-xl w-full p-10 pb-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Example Charts</h1>
          <fieldset className="p-0 m-0">
            <div className="flex items-center gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                id="show-tooltips"
                className="form-checkbox h-4 w-4 text-primary"
                checked={showTooltips}
                onChange={() => setShowTooltips(!showTooltips)}
              />
              <label htmlFor="show-tooltips" className="text-xs cursor-pointer">
                Show tooltips instead of labels
              </label>
            </div>
          </fieldset>
        </div>
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
                colorScale={activeColorScale as ColorScalePropType}
                aria-label="Victory Stack Demo"
              >
                {[...Array(NUM_STACKS)].map((_, i) => (
                  <VictoryArea data={sampleStackData} key={i} />
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
                    labels={({ datum }) => (showTooltips ? datum.y : undefined)}
                    {...(showTooltips && {
                      labelComponent: <VictoryTooltip />,
                    })}
                  />
                ))}
              </VictoryStack>
            </VictoryChart>
          </div>
          {[].map(
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
    </main>
  );
};
export default Main;
