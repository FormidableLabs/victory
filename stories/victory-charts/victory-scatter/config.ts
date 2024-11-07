import type { Meta, StoryObj } from "@storybook/react";

import { VictoryScatter } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryScatter> & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryScatter,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictoryMultiLabelableProps,

    bubbleProperty: { control: "text" },
    maxBubbleSize: { control: "number" },
    size: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
