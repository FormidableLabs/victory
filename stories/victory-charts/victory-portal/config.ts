import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { VictoryPortal } from "@/victory";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryPortal>;

export const ComponentMeta: Meta<StoryProps> = {
  component: VictoryPortal,
  decorators: [componentContainer],
};

export type Story = StoryObj<StoryProps>;
