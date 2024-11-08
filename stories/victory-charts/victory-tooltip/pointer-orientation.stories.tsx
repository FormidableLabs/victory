import React from "react";
import type { Meta } from "@storybook/react";

import { VictoryTooltip, VictoryBar } from "@/victory";
import { defaultBarProps, polarBarProps, Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryTooltip> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryTooltip",
};

export const PointerOrientation: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            pointerOrientation={({ datum }) => (datum.y > 0 ? "bottom" : "top")}
            text={({ datum }) =>
              datum.y > 0 ? `orientation\nbottom` : `orientation\ntop`
            }
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{
              y: ({ datum }) => (datum.y > 0 ? -40 : 40),
              x: ({ datum }) => (datum.y > 0 ? -20 : 20),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "bottom" : "top")}
            text={({ datum }) =>
              datum.y > 0 ? `orientation\nbottom` : `orientation\ntop`
            }
          />
        }
      />
      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            pointerOrientation={({ index }) => (index < 3 ? "bottom" : "top")}
            text={({ index }) =>
              Number(index) < 3 ? `orientation\nbottom` : `orientation\ntop`
            }
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            centerOffset={{
              x: ({ datum }) => (datum.y > 0 ? 55 : -55),
            }}
            pointerOrientation={({ datum }) => (datum.y > 0 ? "left" : "right")}
            text={({ datum }) =>
              datum.y > 0 ? `orientation\nleft` : `orientation\nright`
            }
          />
        }
      />
      <VictoryBar
        {...defaultBarProps}
        horizontal
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            pointerOrientation={({ datum }) => (datum.y > 0 ? "left" : "right")}
            text={({ datum }) =>
              datum.y > 0 ? `orientation\nleft` : `orientation\nright`
            }
          />
        }
      />

      <VictoryBar
        {...polarBarProps}
        labelComponent={
          <VictoryTooltip
            {...props}
            active
            labelPlacement="parallel"
            pointerOrientation={({ index }) =>
              index === 2 || index === 3 ? "right" : "left"
            }
            text={({ index }) =>
              index === 2 || index === 3
                ? `orientation\nleft`
                : `orientation\nright`
            }
          />
        }
      />
    </>
  ),
};

export default meta;
