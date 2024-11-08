import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryChart, VictoryCursorContainer, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const VictoryCursorContainerHorizontal: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart
        {...props}
        theme={VictoryTheme[props.themeKey]}
        horizontal
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) => datum.x}
            defaultCursorValue={{ x: 0.25, y: 0.75 }}
          />
        }
      />
    </>
  ),
};

export default meta;
