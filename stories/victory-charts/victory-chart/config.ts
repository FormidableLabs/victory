import type { Meta, StoryObj } from "@storybook/react";

import { VictoryChart, VictoryChartProps } from "@/victory";

import { VictoryCommonProps } from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = VictoryChartProps & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryChart,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,

    desc: { control: "text" },
    endAngle: { control: "number" },
    innerRadius: { control: "number" },
    prependDefaultAxes: { control: "boolean" },
    startAngle: { control: "number" },
    title: { control: "text" },
  },
};

export type Story = StoryObj<StoryProps>;
