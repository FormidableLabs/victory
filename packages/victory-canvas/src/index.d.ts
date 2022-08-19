import { VictoryBarAlignmentType } from "victory-bar";
import {
  VictoryCommonPrimitiveProps,
  NumberOrCallback,
  StringOrCallback,
  ScatterSymbolType,
  PaddingProps,
} from "victory-core";
import * as React from "react";

export interface CanvasBarProps extends VictoryCommonPrimitiveProps {
  alignment?: VictoryBarAlignmentType;
  barOffset?: number[];
  barRatio?: number;
  barWidth?: NumberOrCallback;
  cornerRadius?:
    | NumberOrCallback
    | {
        top?: NumberOrCallback;
        topLeft?: NumberOrCallback;
        topRight?: NumberOrCallback;
        bottom?: NumberOrCallback;
        bottomLeft?: NumberOrCallback;
        bottomRight?: NumberOrCallback;
      };
  datum?: any;
  getPath?: Function;
  horizontal?: boolean;
  width?: number;
  x?: number;
  y?: number;
  y0?: number;
}

export class CanvasBar extends React.Component<CanvasBarProps, any> {}

export interface CanvasCurveProps extends VictoryCommonPrimitiveProps {
  ariaLabel?: StringOrCallback;
  interpolation?: string | Function;
  openCurve?: boolean;
  tabIndex?: NumberOrCallback;
}

export class CanvasCurve extends React.Component<CanvasCurveProps> {}

export interface CanvasPointProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  getPath?: (x: number, y: number, size: number) => string;
  size?: number | Function;
  symbol?: ScatterSymbolType | Function;
  x?: number;
  y?: number;
}

export class CanvasPoint extends React.Component<CanvasPointProps> {}

export interface CanvasGroupProps {
  children?: React.ReactNode | React.ReactNode[];
  clipWidth?: number;
  height?: number;
  padding?: PaddingProps;
  width?: number;
}

export class CanvasGroup extends React.Component<CanvasGroupProps, any> {}

export interface CanvasContextValue {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  clear(ctx: CanvasRenderingContext2D): void;
  clip(ctx: CanvasRenderingContext2D): void;
}

export const useCanvasContext: () => CanvasContextValue;
