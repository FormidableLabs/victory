import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryHistogram, VictoryChart, VictoryTheme } from "@/victory";

import { data, timeData } from "./data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryHistogram> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryHistogram",
};

export const Scale: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        domainPadding={{ y: 25 }}
      >
        <VictoryHistogram
          {...props}
          binSpacing={10}
          data={timeData}
          labels={({ datum }) =>
            `${datum.x0.getFullYear()}\n|\n${datum.x1.getFullYear()}`
          }
        />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        horizontal
        domainPadding={{ y: 35 }}
      >
        <VictoryHistogram
          {...props}
          binSpacing={10}
          data={timeData}
          labels={({ datum }) =>
            `${datum.x0.getFullYear()} - ${datum.x1.getFullYear()}`
          }
        />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        scale={{ y: "log" }}
        minDomain={{ y: 1 }}
      >
        <VictoryHistogram {...props} data={data} />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        scale={{ y: "log" }}
        minDomain={{ y: 1 }}
        horizontal
      >
        <VictoryHistogram {...props} data={data} />
      </VictoryChart>
    </>
  ),
};

export default meta;
