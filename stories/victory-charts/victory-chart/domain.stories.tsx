import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBar, VictoryChart, VictoryLine, VictoryTheme } from "@/victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const Domain: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domain={[0, 10]}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        domain={[0, 10]}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domain={{ x: [0, 6], y: [0, 10] }}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        domain={{ x: [0, 6], y: [0, 10] }}
      >
        <VictoryBar data={getData(5)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        minDomain={1}
        maxDomain={7}
      >
        <VictoryLine data={getData(100)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        minDomain={1}
        maxDomain={7}
      >
        <VictoryLine data={getData(100)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        minDomain={{ x: 50 }}
        maxDomain={{ y: 7 }}
      >
        <VictoryLine data={getData(100)} />
      </VictoryChart>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        minDomain={{ x: 50 }}
        maxDomain={{ y: 7 }}
      >
        <VictoryLine data={getData(100)} />
      </VictoryChart>
    </>
  ),
};

export default meta;
