import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBar, VictoryChart, VictoryTheme } from "@/victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const DomainPadding: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domainPadding={25}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        domainPadding={25}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domainPadding={{ x: [25, 0], y: 25 }}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        domainPadding={{ x: [25, 0], y: 25 }}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domainPadding={{ x: 100 }}
        singleQuadrantDomainPadding={false}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        domainPadding={{ x: 100 }}
        singleQuadrantDomainPadding={false}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
    </>
  ),
};

export default meta;
