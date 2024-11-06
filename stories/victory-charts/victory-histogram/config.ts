import type { Meta, StoryObj } from "@storybook/react";

import { VictoryHistogram } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryHistogram> & {
  themeKey: string;
};

export const ComponentMeta: Meta<StoryProps> = {
  component: VictoryHistogram,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictoryMultiLabelableProps,

    bins: { control: "number" },
    binSpacing: { control: "number" },
    cornerRadius: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
