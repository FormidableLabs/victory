import type { Meta, StoryObj } from "@storybook/react";

import { VictoryPolarAxis } from "@/victory";

import {
  VictoryAxisCommonProps,
  VictoryCommonProps,
  VictoryDatableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryPolarAxis>;

export const ComponentMeta: Meta<StoryProps> = {
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
    radius: { control: "number" },
    startAngle: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
