import React from "react";
import { Rect } from "./rect";
import { Circle } from "./circle";
import { Background as BackgroundBase, BackgroundProps } from "victory-core/es";

export const Background = (props: BackgroundProps) => (
  <BackgroundBase
    circleComponent={<Circle />}
    rectComponent={<Rect />}
    {...props}
  />
);
