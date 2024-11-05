import React from "react";
import type { Meta } from "@storybook/react";

import { Slice, VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

export const DisableInlineStyles: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        disableInlineStyles
      />
      <VictoryPie
        {...props}
        theme={VictoryTheme[props.themeKey]}
        dataComponent={<Slice disableInlineStyles className="fill-purple" />}
      />
    </>
  ),
};

export default meta;
