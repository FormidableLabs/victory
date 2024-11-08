import type { Meta, StoryObj } from "@storybook/react";

import { VictoryPolarAxis, VictoryPolarAxisProps } from "@/victory";

import {
  VictoryAxisCommonProps,
  VictoryCommonProps,
  VictoryDatableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = VictoryPolarAxisProps & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryPolarAxis,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryAxisCommonProps,
    ...VictoryCommonProps,
    ...VictoryDatableProps,

    axisAngle: { control: "number" },
    endAngle: { control: "number" },
    innerRadius: { control: "number" },
    labelPlacement: {
      control: "select",
      options: ["parallel", "perpendicular", "vertical"],
    },
    startAngle: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
