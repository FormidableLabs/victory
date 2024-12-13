import React, { useState } from "react";
import type { Meta } from "@storybook/react";

import { VictoryPie, VictoryTheme } from "@/victory";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryPie> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryPie",
};

const AFTER_VALUES = [
  { x: 1, y: 9 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
];

const INITIAL_VALUES = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 5 },
  { x: 6, y: 2 },
];

const App = (props) => {
  const [data, setData] = useState(INITIAL_VALUES);

  const handleUpdate = () => {
    setData(AFTER_VALUES);
  };

  const handleReset = () => {
    setData(INITIAL_VALUES);
  };

  return (
    <>
      <div>
        <VictoryPie
          animate={{
            duration: 2000,
          }}
          colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
          data={data}
          theme={VictoryTheme[props.themeKey]}
        />

        <button onClick={handleUpdate}>update</button>
        <button onClick={handleReset}>reset</button>
      </div>

      {/* <VictoryPie
        animate={{
          duration: 2000,
        }}
        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
        data={postUpdateValues}
        theme={VictoryTheme[props.themeKey]}
      /> */}
    </>
  );
};

export const Test: Story = {
  args: {},
  render: (props) => (
    <>
      <App {...props} />
    </>
  ),
};

export default meta;
