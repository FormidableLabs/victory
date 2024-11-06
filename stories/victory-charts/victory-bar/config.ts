import type { Meta, StoryObj } from "@storybook/react";

import { VictoryBar } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryBar> & {
  themeKey: string;
};

export const ComponentMeta: Meta<StoryProps> = {
  component: VictoryBar,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictoryMultiLabelableProps,

    alignment: { control: "select", options: ["start", "middle", "end"] },
    barRatio: { control: "number" },
    barWidth: { control: "number" },
    cornerRadius: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
