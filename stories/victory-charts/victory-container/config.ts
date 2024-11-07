import type { Meta, StoryObj } from "@storybook/react";

import { VictoryContainer } from "@/victory";

import { VictoryContainerProps } from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryContainer> & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryContainer,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryContainerProps,
  },
};
export type Story = StoryObj<StoryProps>;
