import type { Meta, StoryObj } from "@storybook/react";

import { VictoryBar, VictoryBarProps } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = VictoryBarProps & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
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
