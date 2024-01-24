import React from "react";
import Line from "./line";
import { LineSegment, LineSegmentProps } from "victory-core/es";

const NativeLineSegment = (props: LineSegmentProps) => (
  <LineSegment lineComponent={<Line />} {...props} />
);

export default NativeLineSegment;
