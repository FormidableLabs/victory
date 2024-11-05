import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryBar, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryBar> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryBar",
};

export const Data: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={[
            { animal: "Cat", pet: 45, wild: 17 },
            { animal: "Dog", pet: 85, wild: 6 },
            { animal: "Fish", pet: 55, wild: 0 },
            { animal: "Bird", pet: 15, wild: 40 },
          ]}
          x={"animal"}
          y={(data) => data.pet + data.wild}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getData(8)} y0={(d) => d.y - d.x} />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getData(8)} y0={(d) => d.y - d.x} />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryBar {...props} data={getData(8)} y0={(d) => d.y - d.x} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={[
            { a: { b: { c: 1, d: 1 } } },
            { a: { b: { c: 2, d: 3 } } },
            { a: { b: { c: 3, d: 2 } } },
          ]}
          x={"a.b.c"}
          y={"a.b.d"}
        />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryBar
          {...props}
          data={[
            { x: 1, y: 2, label: "cat" },
            { x: 2, y: 5, label: "dog" },
            { x: 3, y: 3, label: "dog" },
            { x: 4, y: -2, label: "bird" },
            { x: 5, y: -5, label: "cat" },
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
