import type { Meta, StoryObj } from "@storybook/react";

import { VictoryHistogram, VictoryHistogramProps } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = VictoryHistogramProps & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
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
