import type { Meta, StoryObj } from "../../utils/types";

import { VictoryContainer, VictoryContainerProps } from "victory";

import { VictoryContainerProps as ContainerArgTypes } from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = VictoryContainerProps & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryContainer,
  decorators: [componentContainer],

  argTypes: {
    ...ContainerArgTypes,
  },
};
export type Story = StoryObj<StoryProps>;
