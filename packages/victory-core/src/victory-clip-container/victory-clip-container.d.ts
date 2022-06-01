import * as React from "react";
import { BlockProps } from "../victory-theme/victory-theme";
import { OriginType } from "../victory-label/victory-label";

export interface VictoryClipContainerProps {
  "aria-label"?: string;
  children?: React.ReactElement | React.ReactElement[];
  circleComponent?: React.ReactElement;
  className?: string;
  clipHeight?: number;
  clipId?: number | string;
  clipPadding?: BlockProps;
  clipPathComponent?: React.ReactElement;
  clipWidth?: number;
  events?: React.DOMAttributes<any>;
  groupComponent?: React.ReactElement;
  origin?: OriginType;
  polar?: boolean;
  radius?: number;
  rectComponent?: React.ReactElement;
  translateX?: number;
  translateY?: number;
}

export class VictoryClipContainer extends React.Component<
  VictoryClipContainerProps,
  any
> {}
