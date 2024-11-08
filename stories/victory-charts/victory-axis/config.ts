import type { Meta, StoryObj } from "@storybook/react";

import { VictoryAxis, VictoryAxisProps } from "@/victory";

import {
  VictoryAxisCommonProps,
  VictoryCommonProps,
  VictoryDatableProps,
  VictorySingleLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = VictoryAxisProps & {
  themeKey: string;
};

export type Story = StoryObj<StoryProps>;

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryAxis,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryAxisCommonProps,
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictorySingleLabelableProps,

    crossAxis: { control: "boolean" },
    fixLabelOverlap: { control: "boolean" },
    offsetX: { control: "number" },
    offsetY: { control: "number" },
    orientation: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
};
