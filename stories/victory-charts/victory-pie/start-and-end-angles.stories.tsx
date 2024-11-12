import React from "react";
import type { Meta } from "@storybook/react";

import { Helpers, Slice, VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const StartAndEndAngles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        endAngle={90}
        startAngle={-90}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        endAngle={90}
        innerRadius={140}
        padAngle={5}
        startAngle={-90}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dataComponent={
          <Slice
            sliceStartAngle={0}
            sliceEndAngle={({ datum }) => datum.endAngle}
          />
        }
        labels={() => null}
        cornerRadius={5}
        radius={({ datum }) => datum.radius}
        innerRadius={({ datum }) => datum.innerRadius}
        data={[
          { x: "Cat", y: 62, innerRadius: 0, radius: 30 },
          { x: "Dog", y: 91, innerRadius: 35, radius: 65 },
          { x: "Fish", y: 55, innerRadius: 70, radius: 100 },
          { x: "Bird", y: 55, innerRadius: 105, radius: 135, endAngle: 360 },
        ]}
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dataComponent={
          <Slice
            sliceStartAngle={-90}
            sliceEndAngle={({ slice }) =>
              Helpers.radiansToDegrees(slice?.endAngle) - 90
            }
          />
        }
        labels={() => null}
        cornerRadius={5}
        radius={({ datum }) => datum.radius}
        innerRadius={({ datum }) => datum.innerRadius}
        data={[
          { x: "Cat", y: 62, innerRadius: 0, radius: 30 },
          { x: "Dog", y: 91, innerRadius: 35, radius: 65 },
          { x: "Fish", y: 55, innerRadius: 70, radius: 100 },
          { x: "Bird", y: 55, innerRadius: 105, radius: 135 },
        ]}
      />
    </>
  ),
};

export default meta;
