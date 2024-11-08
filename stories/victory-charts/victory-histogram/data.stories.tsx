import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data, timeData } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const Data: Story = {
  args: {},
  render: (props) => {
    const oneYear = timeData.map(({ x }) => {
      const newDate = new Date(x);
      newDate.setFullYear(2020);
      return { x: newDate };
    });

    const fourMonths = timeData.map(({ x }, index) => {
      const newDate = new Date(x);
      newDate.setFullYear(2020);
      newDate.setMonth(Math.ceil(index / 200));
      return { x: newDate };
    });

    const oneMonth = timeData.map(({ x }) => {
      const newDate = new Date(x);
      newDate.setMonth(4);
      newDate.setFullYear(2020);
      return { x: newDate };
    });

    return (
      <>
        <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
          <VictoryHistogram {...props} data={timeData}  />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram {...props} data={oneYear}  />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram {...props} data={fourMonths}  />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]} horizontal>
          <VictoryHistogram {...props} data={oneMonth}  />
        </VictoryChart>
        <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram {...props}
            data={data.map(({ x }) => ({ value: x }))}
            x={({ value }) => value}
          />
        </VictoryChart>
        {/* <VictoryChart theme={VictoryTheme[props.themeKey]}>
          <VictoryHistogram {...props}
            bins="year"
            data={timeData.map(({ x }) => ({ value: x }))}
            x={({ value }) => value}
          />
        </VictoryChart> */}
      </>
    );
  },
};

export default meta;
