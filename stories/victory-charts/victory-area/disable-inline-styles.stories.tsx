import React from "react";
import type { Meta } from "@storybook/react";

import { Area, VictoryArea, VictoryTheme } from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryArea> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryArea",
};

export const DisableInlineStyles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryArea
        {...props}
        theme={VictoryTheme[props.themeKey]}
        disableInlineStyles
      />
      <VictoryArea
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dataComponent={<Area disableInlineStyles className="fill-purple" />}
      />
    </>
  ),
};

export default meta;
