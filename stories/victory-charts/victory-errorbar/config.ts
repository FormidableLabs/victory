import type { Meta, StoryObj } from "@storybook/react";

import { VictoryErrorBar } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryErrorBar> & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryErrorBar,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictoryMultiLabelableProps,

    borderWidth: { control: "number" },
    errorX: { control: "text" },
    errorY: { control: "text" },
  },
};

export type Story = StoryObj<StoryProps>;
