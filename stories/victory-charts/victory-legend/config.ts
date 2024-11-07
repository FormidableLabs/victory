import type { Meta, StoryObj } from "@storybook/react";

import { VictoryLegend } from "@/victory";

import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictorySingleLabelableProps,
} from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryLegend> & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryLegend,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryCommonProps,
    ...VictoryDatableProps,
    ...VictorySingleLabelableProps,

    centerTitle: { control: "boolean" },
    itemsPerRow: { control: "number" },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    rowGutter: { control: "number" },
    symbolSpacer: { control: "number" },
    title: { control: "text" },
    titleOrientation: { control: "select", options: ["top", "bottom"] },
    x: { control: "number" },
    y: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;
