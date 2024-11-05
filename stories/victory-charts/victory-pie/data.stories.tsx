import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const Data: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        data={[
          { x: "Cat", y: 63 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 55 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        data={[
          { animal: "Cat", pet: 45, wild: 17 },
          { animal: "Dog", pet: 85, wild: 6 },
          { animal: "Fish", pet: 55, wild: 0 },
          { animal: "Bird", pet: 15, wild: 40 },
        ]}
        x={"animal"}
        y={(data) => data.pet + data.wild}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        data={[
          { x: "Cat", y: 62 },
          { x: "Dog", y: 91 },
          { x: "Fish", y: 55 },
          { x: "Bird", y: 55 },
        ]}
      />
    </>
  ),
};

export default meta;
