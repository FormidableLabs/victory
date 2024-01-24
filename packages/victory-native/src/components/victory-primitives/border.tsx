import React from "react";
import Rect from "./rect";
import { Border, BorderProps } from "victory-core/es";

const NativeBorder = (props: BorderProps) => (
  <Border rectComponent={<Rect />} {...props} />
);

export default NativeBorder;
