import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";
import * as d3Time from "d3-time";

import { timeData } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const DateBins: Story = {
  args: {},
  render: (props) => {
    // HACK: d3scale has a scaleTime function but the types
    // are whack coming through the build
    const niceTimeScale = (d3Scale as any)
      .scaleTime()
      .domain(d3Array.extent(timeData, ({ x }) => x))
      .nice();

    return (
      <>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram
            {...props}
            data={timeData}
            bins={[
              new Date(2010, 0, 1),
              new Date(2020, 5, 1),
              new Date(2021, 0, 1),
            ]}
          />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
          <VictoryHistogram
            {...props}
            data={timeData}
            bins={[
              new Date(2010, 0, 1),
              new Date(2020, 5, 1),
              new Date(2021, 0, 1),
            ]}
          />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram {...props} data={timeData} bins={2} />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
          <VictoryHistogram {...props} data={timeData} bins={2} />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram {...props} data={timeData} bins={10} />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
          <VictoryHistogram {...props} data={timeData} bins={10} />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram
            {...props}
            data={timeData}
            bins={niceTimeScale.ticks(d3Time.utcDay)}
          />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram
            {...props}
            data={timeData}
            bins={niceTimeScale.ticks(d3Time.utcMonth)}
          />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram
            {...props}
            data={timeData}
            bins={niceTimeScale.ticks(d3Time.utcYear)}
          />
        </VictoryChart>
      </>
    );
  },
};

export default meta;
