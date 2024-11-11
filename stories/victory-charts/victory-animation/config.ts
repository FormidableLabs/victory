import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { VictoryAnimation } from "@/victory";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryAnimation>;

export const ComponentMeta: Meta<StoryProps> = {
  component: VictoryAnimation,
  decorators: [componentContainer],

  argTypes: {
    delay: { control: "number" },
    duration: { control: "number" },
    easing: { control: "text" },
  },
};

export type Story = StoryObj<StoryProps>;
