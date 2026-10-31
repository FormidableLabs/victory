import React from "react";
import type { Meta } from "@storybook/react";
import range from "lodash/range";
import random from "lodash/random";

import {
  VictoryChart,
  VictoryVoronoi,
  VictoryScatter,
  VictoryTheme,
} from "@/victory";

import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryVoronoi> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryVoronoi",
};

function getData() {
  return range(20).map((i: number) => {
    return {
      x: random(600),
      y: random(600),
      i,
    };
  });
}

export const Animation: Story = {
  args: {
    themeKey: "clean",
  },
  render: function AnimationComponent(props) {
    const [data, setData] = React.useState(getData());

    React.useEffect(() => {
      const setStateInterval = window.setInterval(() => {
        setData(getData());
      }, 4000);

      return () => {
        window.clearInterval(setStateInterval);
      };
    }, []);

    return (
      <VictoryChart theme={VictoryTheme[props.themeKey]}>
        <VictoryVoronoi
          theme={VictoryTheme[props.themeKey]}
          animate={{ duration: 1000 }}
          data={data}
        />
        <VictoryScatter
          theme={VictoryTheme[props.themeKey]}
          animate={{ duration: 1000 }}
          data={data}
        />
      </VictoryChart>
    );
  },
};

export default meta;
