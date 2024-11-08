import type { Meta, StoryObj } from "@storybook/react";

import { VictoryBoxPlot, VictoryBoxPlotProps } from "@/victory";

import { VictoryCommonProps, VictoryDatableProps } from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = VictoryBoxPlotProps & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryBoxPlot,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,

    boxWidth: { control: "number" },
    labels: { control: "boolean" },
    max: { control: "text" },
    maxLabels: { control: "boolean" },
    median: { control: "text" },
    medianLabels: { control: "boolean" },
    min: { control: "text" },
    minLabels: { control: "boolean" },
    q1: { control: "text" },
    q1Labels: { control: "boolean" },
    q3: { control: "text" },
    q3Labels: { control: "boolean" },
    whiskerWidth: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
