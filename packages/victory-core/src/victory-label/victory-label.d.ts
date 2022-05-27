import * as React from "react";
import {
  NumberOrCallback,
  PaddingProps,
  VerticalAnchorType,
  VictoryLabelStyleObject
} from "../victory-theme/victory-theme";
import { StringOrCallback, StringOrNumberOrCallback } from "../index";

export type TextAnchorType = "start" | "middle" | "end" | "inherit";
export type OriginType = { x: number; y: number };
export type LabelOrientationType = "parallel" | "perpendicular" | "vertical";

export interface VictoryLabelProps {
  angle?: StringOrNumberOrCallback;
  ariaLabel?: StringOrCallback;
  backgroundComponent?: React.ReactElement;
  backgroundStyle?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  backgroundPadding?: PaddingProps | PaddingProps[];
  capHeight?: StringOrNumberOrCallback;
  children?: StringOrNumberOrCallback;
  className?: string;
  datum?: {};
  data?: any[];
  desc?: string;
  direction?: string;
  disableInlineStyles?: boolean;
  events?: React.DOMAttributes<any>;
  groupComponent?: React.ReactElement;
  id?: StringOrNumberOrCallback;
  inline?: boolean;
  labelPlacement?: LabelOrientationType;
  lineHeight?: StringOrNumberOrCallback | (string | number)[];
  origin?: OriginType;
  polar?: boolean;
  renderInPortal?: boolean;
  style?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  tabIndex?: NumberOrCallback;
  text?: string[] | StringOrNumberOrCallback;
  textComponent?: React.ReactElement;
  textAnchor?: TextAnchorType | { (): TextAnchorType };
  title?: string;
  transform?: string | {} | { (): string | {} };
  verticalAnchor?: VerticalAnchorType | { (): VerticalAnchorType };
  x?: number;
  y?: number;
  dx?: StringOrNumberOrCallback;
  dy?: StringOrNumberOrCallback;
}

export default class VictoryLabel extends React.Component<
  VictoryLabelProps,
  any
> {}
