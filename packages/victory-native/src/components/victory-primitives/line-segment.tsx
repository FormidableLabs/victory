import React from "react";
import { Line } from "./line";
import {
  LineSegment as LineSegmentBase,
  LineSegmentProps,
} from "victory-core/es";

export const LineSegment = (props: LineSegmentProps) => (
  <LineSegmentBase lineComponent={<Line />} {...props} />
);
