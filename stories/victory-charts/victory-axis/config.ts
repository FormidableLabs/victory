import type { Meta, StoryObj } from "@storybook/react";

import { VictoryAxis } from "@/victory";

import {
  VictoryAxisCommonProps,
  VictoryCommonProps,
  VictoryDatableProps,
  VictorySingleLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryAxis> & {
  themeKey: string;
};

export type Story = StoryObj<StoryProps>;

export const ComponentMeta: Meta<StoryProps> = {
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
