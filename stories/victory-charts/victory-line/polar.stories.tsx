import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryLine,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";

import { getData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryLine> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryLine",
};

export const Polar: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryLine {...props} data={getData(7)} />
      </VictoryChart>
      <VictoryChart polar innerRadius={50} theme={VictoryTheme[props.themeKey]}>
        <VictoryLine {...props} data={getData(7)} />
      </VictoryChart>
      <VictoryChart
        polar
        theme={VictoryTheme[props.themeKey]}
        minDomain={{ y: 1 }}
      >
        <VictoryLine
          {...props}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 },
          ]}
        />
      </VictoryChart>
      <VictoryChart polar innerRadius={50} theme={VictoryTheme[props.themeKey]}>
        <VictoryLine
          {...props}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 },
            { x: "Frog", y: 75 },
          ]}
        />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryStack>
          <VictoryLine {...props} data={getData(5)} />
          <VictoryLine {...props} data={getData(5, "seed-1")} />
          <VictoryLine {...props} data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart polar innerRadius={50} theme={VictoryTheme[props.themeKey]}>
        <VictoryStack>
          <VictoryLine {...props} data={getData(5)} />
          <VictoryLine {...props} data={getData(5, "seed-1")} />
          <VictoryLine {...props} data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
