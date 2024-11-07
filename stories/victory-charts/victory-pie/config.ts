import type { Meta, StoryObj } from "@storybook/react";

import { VictoryPie } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryPie> & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryPie,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictoryMultiLabelableProps,

    cornerRadius: { control: "number" },
    endAngle: { control: "number" },
    innerRadius: { control: "number" },
    labelIndicator: { control: "boolean" },
    labelIndicatorInnerOffset: { control: "number" },
    labelIndicatorOuterOffset: { control: "number" },
    labelPlacement: {
      control: "select",
      options: ["parallel", "perpendicular", "vertical"],
    },
    labelPosition: {
      control: "select",
      options: ["startAngle", "endAngle", "centroid"],
    },
    labelRadius: { control: "number" },
    padAngle: { control: "number" },
    startAngle: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
