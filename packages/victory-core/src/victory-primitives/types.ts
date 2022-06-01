/* eslint-disable react/no-multi-comp */
import * as React from "react";
import { VictoryCommonPrimitiveProps } from "../victory-util/types";

export type ScatterSymbolType =
  | "circle"
  | "cross"
  | "diamond"
  | "plus"
  | "minus"
  | "square"
  | "star"
  | "triangleDown"
  | "triangleUp";

export interface ArcProps extends VictoryCommonPrimitiveProps {
  closedPath?: boolean;
  cx?: number;
  cy?: number;
  datum?: any;
  endAngle?: number;
  pathComponent?: React.ReactElement;
  r?: number;
  startAngle?: number;
}

export class Arc extends React.Component<ArcProps> {}

export interface BackgroundProps extends VictoryCommonPrimitiveProps {
  circleComponent?: React.ReactElement;
  height?: number;
  rectComponent?: React.ReactElement;
  rx?: number;
  ry?: number;
  width?: number;
  x?: number;
  y?: number;
}

export class Background extends React.Component<BackgroundProps> {}

export interface BorderProps extends VictoryCommonPrimitiveProps {
  width?: number;
  height?: number;
  rectComponent?: React.ReactElement;
  x?: number;
  y?: number;
}

export class Border extends React.Component<BorderProps> {}

export interface ClipPathProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode[] | React.ReactNode;
  clipId?: number | string;
}

export class ClipPath extends React.Component<ClipPathProps> {}

export interface LineSegmentProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  lineComponent?: React.ReactElement;
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export class LineSegment extends React.Component<LineSegmentProps> {}

export interface PointProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  getPath?: (x: number, y: number, size: number) => string;
  pathComponent?: React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/ban-types
  size?: number | Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  symbol?: ScatterSymbolType | Function;
  x?: number;
  y?: number;
}

export class Point extends React.Component<PointProps> {}

export interface TextProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode;
  desc?: string;
  title?: string;
}

export class Text extends React.Component<TextProps> {}

export type WhiskerAxes = {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
};

export interface WhiskerProps extends VictoryCommonPrimitiveProps {
  groupComponent?: React.ReactElement;
  lineComponent?: React.ReactElement;
  majorWhisker?: WhiskerAxes;
  minorWhisker?: WhiskerAxes;
}

export class Whisker extends React.Component<WhiskerProps> {}

export interface VictoryPrimitiveShapeProps
  extends VictoryCommonPrimitiveProps {
  desc?: string;
  rx?: number;
  ry?: number;
}

export class Circle extends React.Component<VictoryPrimitiveShapeProps> {}

export class Line extends React.Component<VictoryPrimitiveShapeProps> {}

export class Path extends React.Component<VictoryPrimitiveShapeProps> {}

export class Rect extends React.Component<VictoryPrimitiveShapeProps> {}

export class TSpan extends React.Component<VictoryCommonPrimitiveProps> {}
