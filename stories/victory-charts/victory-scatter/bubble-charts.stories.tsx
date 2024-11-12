import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryScatter, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryScatter> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryScatter",
};

export const BubbleCharts: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={25}>
        <VictoryScatter {...props} data={getData(10)} bubbleProperty="x" />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        domainPadding={25}
        horizontal
      >
        <VictoryScatter {...props} data={getData(10)} bubbleProperty="x" />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={25}>
        <VictoryScatter
          {...props}
          data={getData(10)}
          bubbleProperty="x"
          maxBubbleSize={25}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={25}>
        <VictoryScatter
          {...props}
          data={getData(10)}
          bubbleProperty="x"
          minBubbleSize={10}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={25}>
        <VictoryScatter
          {...props}
          data={getData(10)}
          bubbleProperty="x"
          minBubbleSize={8}
          maxBubbleSize={20}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} polar>
        <VictoryScatter
          {...props}
          data={getData(10)}
          bubbleProperty="x"
          maxBubbleSize={25}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={25}>
        <VictoryScatter
          {...props}
          data={getData(10)}
          bubbleProperty="x"
          size={3}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]} domainPadding={25}>
        <VictoryScatter
          {...props}
          data={getData(10)}
          bubbleProperty="x"
          symbol="plus"
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
