import React from "react";
import Rect from "./rect";
import Circle from "./circle";
import { Background } from "victory-core/es";

const NativeBackground = (props) => (
  <Background
    circleComponent={<Circle />}
    rectComponent={<Rect />}
    {...props}
  />
);

export default NativeBackground;
