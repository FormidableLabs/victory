import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryArea,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const Polar: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryArea {...props} data={getData(7)} />
      </VictoryChart>
      <VictoryChart polar innerRadius={50} theme={VictoryTheme[props.themeKey]}>
        <VictoryArea {...props} data={getData(7)} />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
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
        <VictoryArea
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
          <VictoryArea {...props} data={getData(5)} />
          <VictoryArea {...props} data={getData(5, "seed-1")} />
          <VictoryArea {...props} data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
      <VictoryChart polar innerRadius={50} theme={VictoryTheme[props.themeKey]}>
        <VictoryStack>
          <VictoryArea {...props} data={getData(5)} />
          <VictoryArea {...props} data={getData(5, "seed-1")} />
          <VictoryArea {...props} data={getData(5, "seed-2")} />
        </VictoryStack>
      </VictoryChart>
    </>
  ),
};

export default meta;
