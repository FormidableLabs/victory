import type { Meta, StoryObj } from "@storybook/react";

import { VictoryLabel, VictoryScatterProps } from "@/victory";
import { componentContainer } from "../../utils/decorators";

type StoryProps = React.ComponentProps<typeof VictoryLabel>;

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictoryLabel,
  decorators: [componentContainer],

  argTypes: {
    angle: { control: "number" },
    capHeight: { control: "number" },
    className: { control: "text" },
    desc: { control: "text" },
    direction: { control: "select", options: ["inherit", "rtl", "ltr"] },
    id: { control: "text" },
    inline: { control: "boolean" },
    labelPlacement: {
      control: "select",
      options: ["parallel", "perpendicular", "vertical"],
    },
    lineHeight: { control: "number" },
    polar: { control: "boolean" },
    renderInPortal: { control: "boolean" },
    tabIndex: { control: "number" },
    text: { control: "text" },
    textAnchor: {
      control: "select",
      options: ["inherit", "start", "middle", "end"],
    },
    transform: { control: "text" },
    verticalAnchor: {
      control: "select",
      options: ["inherit", "start", "middle", "end"],
    },
  },
};

export type Story = StoryObj<StoryProps>;

export const defaultScatterProps: VictoryScatterProps = {
  style: {
    labels: { padding: 0, fontFamily: "arial" },
    data: { fill: "gold" },
  },
  width: 300,
  height: 300,
  domain: [-10, 10],
  data: [{ x: 0, y: 0 }],
  labels: () => "Label",
  size: 5,
};
