import type { Meta, StoryObj } from "@storybook/react";

import { VictoryArea } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryArea> & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryArea,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictoryMultiLabelableProps,

    interpolation: {
      control: "select",
      options: [
        "basis",
        "basisClosed",
        "basisOpen",
        "bundle",
        "cardinal",
        "cardinalClosed",
        "cardinalOpen",
        "catmullRom",
        "catmullRomClosed",
        "catmullRomOpen",
        "linear",
        "linearClosed",
        "monotoneX",
        "monotoneY",
        "natural",
        "radial",
        "step",
        "stepAfter",
        "stepBefore",
      ],
    },
  },
};

export type Story = StoryObj<StoryProps>;
