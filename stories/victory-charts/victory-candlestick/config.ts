import type { Meta, StoryObj } from "@storybook/react";

import { VictoryCandlestick } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryCandlestick> & {
  themeKey: string;
};

export const ComponentMeta: Meta<StoryProps> = {
  component: VictoryCandlestick,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictoryMultiLabelableProps,

    candleRatio: { control: "boolean" },
    candleWidth: { control: "number" },
    close: { control: "string" },
    closeLabels: { control: "boolean" },
    high: { control: "string" },
    highLabels: { control: "boolean" },
    low: { control: "string" },
    lowLabels: { control: "boolean" },
    open: { control: "string" },
    openLabels: { control: "boolean" },
    wickStrokeWidth: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
