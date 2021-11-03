import React from "react";
import Line from "./line";
import { LineSegment } from "victory-core/es";

const NativeLineSegment = (props) => (
  <LineSegment lineComponent={<Line />} {...props} />
);

export default NativeLineSegment;
