import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryArea, VictoryChart, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getData } from "../../utils/data";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const DataAccessors: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
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
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
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
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
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
        <VictoryArea {...props} data={getData(8)} y0={(d) => d.y - 1} />
      </VictoryChart>
      <VictoryChart horizontal theme={VictoryTheme[props.themeKey]}>
        <VictoryArea {...props} data={getData(8)} y0={(d) => d.y - 1} />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme[props.themeKey]}>
        <VictoryArea {...props} data={getData(8)} y0={(d) => d.y - 1} />
      </VictoryChart>
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryArea
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
        <VictoryArea
          {...props}
          data={[
            { x: "Cat", y: 45, y0: 17 },
            { x: "Dog", y: 85, y0: 6 },
            { x: "Fish", y: 55, y0: 9 },
            { x: "Bird", y: 15, y0: 4 },
          ]}
        />
      </VictoryChart>
    </>
  ),
};

export default meta;
