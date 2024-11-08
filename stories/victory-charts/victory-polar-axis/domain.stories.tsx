import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryPolarAxis, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";
import { getValues } from "../../utils/data";

const meta: Meta<typeof VictoryPolarAxis> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPolarAxis",
};

export const Domain: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        domain={[-10, 10]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        domain={[-10, 10]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={getValues(5)}
        domain={[-10, 10]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        tickValues={getValues(5)}
        domain={[-10, 10]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={[8, 9, 10, 11, 12, 13]}
        domain={[-10, 10]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        tickValues={[8, 9, 10, 11, 12, 13]}
        domain={[-10, 10]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        tickValues={["cat", "dog", "bird"]}
        domain={[-2, 2]}
      />
      <VictoryPolarAxis
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dependentAxis
        tickValues={["cat", "dog", "bird"]}
        domain={[-2, 2]}
      />
    </>
  ),
};

export default meta;
