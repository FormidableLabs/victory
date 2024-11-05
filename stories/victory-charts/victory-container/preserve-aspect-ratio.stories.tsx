import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryContainer,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
} from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryContainer> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryContainer",
};

export const PreserveAspectRatio: Story = {
  args: {
    height: 250,
    width: 500,
  },
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryLine />
        <VictoryLabel x={50} y={20} text="default (undefined)" />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        containerComponent={
          <VictoryContainer {...props} preserveAspectRatio="none" />
        }
      >
        <VictoryLine />
        <VictoryLabel x={50} y={20} text={`preserveAspectRatio="none"`} />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        containerComponent={
          <VictoryContainer {...props} preserveAspectRatio="xMinYMin meet" />
        }
      >
        <VictoryLine />
        <VictoryLabel
          x={50}
          y={20}
          text={`preserveAspectRatio="xMinYMin meet"`}
        />
      </VictoryChart>
      <VictoryChart
        theme={VictoryTheme[props.themeKey]}
        containerComponent={
          <VictoryContainer {...props} preserveAspectRatio="xMinYMin slice" />
        }
      >
        <VictoryLine />
        <VictoryLabel
          x={50}
          y={20}
          text={`preserveAspectRatio="xMinYMin slice"`}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
