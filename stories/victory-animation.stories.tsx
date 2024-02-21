import { Meta } from "@storybook/react";
import React, { useEffect } from "react";

import { VictoryPie } from "../packages/victory-pie";
import { VictoryAnimation, VictoryLabel } from "../packages/victory-core";
import { storyContainer } from "./decorators";

const meta: Meta<typeof VictoryAnimation> = {
  title: "Victory Charts/SVG Container/VictoryAnimation",
  component: VictoryAnimation,
  tags: ["autodocs"],
  decorators: [storyContainer],
};

export default meta;

const ANIMATION_DATA = [
  [
    { x: 1, y: 0 },
    { x: 2, y: 100 },
  ],
  [
    { x: 1, y: 25 },
    { x: 2, y: 75 },
  ],
  [
    { x: 1, y: 50 },
    { x: 2, y: 50 },
  ],
  [
    { x: 1, y: 75 },
    { x: 2, y: 25 },
  ],
  [
    { x: 1, y: 100 },
    { x: 2, y: 0 },
  ],
];

const AnimationDemo = () => {
  const [data, setData] = React.useState(ANIMATION_DATA[0]);
  const [percent, setPercent] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        (ANIMATION_DATA.indexOf(data) + 1) % ANIMATION_DATA.length;
      setData(ANIMATION_DATA[nextIndex]);
      setPercent(ANIMATION_DATA[nextIndex][0].y);
    }, 2000);

    // clean up interval on unmount
    return () => clearInterval(interval);
  }, [percent]);

  return (
    <div>
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={data}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.y > 30 ? "green" : "red";
                return datum.x === 1 ? color : "transparent";
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={{ percent }}>
          {(newProps) => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={200}
                y={200}
                text={`${Math.round(Number(newProps.percent))}%`}
                style={{ fontSize: 45 }}
              />
            );
          }}
        </VictoryAnimation>
      </svg>
    </div>
  );
};

export const DefaultRendering = () => {
  return <AnimationDemo />;
};
