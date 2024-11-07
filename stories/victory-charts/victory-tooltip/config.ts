import type { Meta, StoryObj } from "@storybook/react";

import { VictoryTooltip } from "@/victory";

import { VictoryLabelableProps } from "../../utils/arg-types";
import { componentContainer } from "../../utils/decorators";
import { getData, getMixedData } from "../../utils/data";

type StoryProps = React.ComponentProps<typeof VictoryTooltip> & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryTooltip,
  decorators: [componentContainer],

  argTypes: {
    ...VictoryLabelableProps,

    active: { control: "boolean" },
    activateData: { control: "boolean" },
    angle: { control: "number" },
    cornerRadius: { control: "number" },
    dx: { control: "number" },
    dy: { control: "number" },
    flyoutHeight: { control: "number" },
    flyoutPadding: { control: "number" },
    flyoutWidth: { control: "number" },
    height: { control: "number" },
    horizontal: { control: "boolean" },
    index: { control: "number" },
    pointerOrientation: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    pointerWidth: { control: "number" },
    renderInPortal: { control: "boolean" },
    text: { control: "text" },
    width: { control: "number" },
    x: { control: "number" },
    y: { control: "number" },
  },
};

export type Story = StoryObj<StoryProps>;

export const defaultBarProps = {
  style: {
    labels: { fontFamily: "arial" },
    data: { fill: "gold", width: 20 },
  },
  width: 300,
  height: 300,
  domainPadding: { y: 25 },
  data: getMixedData(5),
  labels: () => "Label",
  size: 5,
};

export const polarBarProps = {
  style: {
    labels: { fontFamily: "arial" },
    data: { fill: "gold", width: 20 },
  },
  polar: true,
  width: 300,
  height: 300,
  domainPadding: { y: 25 },
  data: getData(5),
  labels: () => "Label",
  size: 5,
};
