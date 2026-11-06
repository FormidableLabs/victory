import type { Meta, StoryObj } from "../../utils/types";

import { VictorySharedEvents, VictorySharedEventsProps } from "victory";

import { componentContainer } from "../../utils/decorators";

type StoryProps = VictorySharedEventsProps & {
  themeKey: string;
};

export const ComponentMeta: Meta<Omit<StoryProps, "themeKey">> = {
  component: VictorySharedEvents,
  decorators: [componentContainer],
};

export type Story = StoryObj<StoryProps>;
