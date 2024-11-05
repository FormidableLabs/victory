import React from "react";
import type { Meta } from "@storybook/react";

import {
  VictoryAxis,
  VictoryBoxPlot,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from "@/victory";

import { getArrayData, getData, getFourQuadrantData } from "../../utils/data";
import { Story, ComponentMeta } from "./config";

const meta: Meta<typeof VictoryChart> = {
  ...ComponentMeta,
  title: "Victory Charts/VictoryChart",
};

export const DomainFromData: Story = {
  args: {},
  render: (props) => (
    <>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter size={5} symbol="plus" data={getData(10)} />
        <VictoryScatter
          size={5}
          symbol="triangleUp"
          data={getFourQuadrantData(10)}
        />
        <VictoryLine
          samples={100}
          y={(d) => 10 * Math.sin(13 * Math.PI * d.x)}
        />
      </VictoryChart>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryScatter size={5} symbol="plus" data={getData(10)} />
        <VictoryScatter
          size={5}
          symbol="triangleUp"
          data={getFourQuadrantData(10)}
        />
        <VictoryLine
          samples={100}
          y={(d) => 10 * Math.sin(13 * Math.PI * d.x)}
        />
      </VictoryChart>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]}>
        <VictoryAxis tickValues={[-10, -5, 5, 10]} />
        <VictoryAxis dependentAxis tickValues={[-5, 5]} />
        <VictoryScatter data={getData(10)} />
        <VictoryLine samples={150} y={(d) => Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryAxis tickValues={[-10, -5, 5, 10]} />
        <VictoryAxis dependentAxis tickValues={[-5, 5]} />
        <VictoryScatter data={getData(10)} />
        <VictoryLine samples={150} y={(d) => Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]}>
        <VictoryScatter
          size={6}
          symbol="star"
          data={[
            { x: "cat", y: 2 },
            { x: "dog", y: 3 },
            { x: "bird", y: 1 },
            { x: "frog", y: 4 },
          ]}
        />
        <VictoryScatter
          size={6}
          symbol="square"
          data={[
            { x: "cat", y: 3 },
            { x: "mouse", y: 3 },
            { x: "bird", y: 5 },
            { x: "frog", y: 7 },
            { x: "dog", y: 1 },
          ]}
        />
      </VictoryChart>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryScatter
          size={6}
          symbol="star"
          data={[
            { x: "cat", y: 2 },
            { x: "dog", y: 3 },
            { x: "bird", y: 1 },
            { x: "frog", y: 4 },
          ]}
        />
        <VictoryScatter
          size={6}
          symbol="square"
          data={[
            { x: "cat", y: 3 },
            { x: "mouse", y: 3 },
            { x: "bird", y: 5 },
            { x: "frog", y: 7 },
            { x: "dog", y: 1 },
          ]}
        />
      </VictoryChart>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]}>
        <VictoryBoxPlot data={getArrayData(5)} />
        <VictoryLine samples={100} y={(d) => 5 + 3 * Math.sin(Math.PI * d.x)} />
      </VictoryChart>
      <VictoryChart {...props} theme={VictoryTheme[props.themeKey]} horizontal>
        <VictoryBoxPlot data={getArrayData(5)} />
        <VictoryLine samples={100} y={(d) => 5 + 3 * Math.sin(Math.PI * d.x)} />
      </VictoryChart>
    </>
  ),
};

export default meta;
