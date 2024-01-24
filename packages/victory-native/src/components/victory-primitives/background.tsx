import React from "react";
import Rect from "./rect";
import Circle from "./circle";
import { Background, BackgroundProps } from "victory-core/es";

const NativeBackground = (props: BackgroundProps) => (
  <Background
    circleComponent={<Circle />}
    rectComponent={<Rect />}
    {...props}
  />
);

export default NativeBackground;
