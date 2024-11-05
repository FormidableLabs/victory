import type { Meta, StoryObj } from "@storybook/react";

import { VictoryBoxPlot } from "@/victory";

import { VictoryCommonProps, VictoryDatableProps } from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryBoxPlot> & {
  themeKey: string;
};

export const ComponentMeta: Meta<StoryProps> = {
  component: VictoryBoxPlot,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
  },

  boxWidth: { control: "number" },
  labels: { control: "boolean" },
  max: { control: "string" },
  maxLabels: { control: "boolean" },
  median: { control: "string" },
  medianLabels: { control: "boolean" },
  min: { control: "string" },
  minLabels: { control: "boolean" },
  q1: { control: "string" },
  q1Labels: { control: "boolean" },
  q3: { control: "string" },
  q3Labels: { control: "boolean" },
  whiskerWidth: { control: "number" },
};

export type Story = StoryObj<StoryProps>;
