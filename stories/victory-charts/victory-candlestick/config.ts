import type { Meta, StoryObj } from "@storybook/react";

import { VictoryCandlestick, VictoryCandlestickProps } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = VictoryCandlestickProps & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryCandlestick,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictoryMultiLabelableProps,

    candleRatio: { control: "boolean" },
    candleWidth: { control: "number" },
    close: { control: "text" },
    closeLabels: { control: "boolean" },
    high: { control: "text" },
    highLabels: { control: "boolean" },
    low: { control: "text" },
    lowLabels: { control: "boolean" },
    open: { control: "text" },
    openLabels: { control: "boolean" },
    wickStrokeWidth: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
