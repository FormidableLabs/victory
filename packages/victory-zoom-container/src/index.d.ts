import * as React from "react";
import { DomainTuple, VictoryContainerProps } from "victory-core";

export type ZoomDimensionType = "x" | "y";

export interface VictoryZoomContainerProps extends VictoryContainerProps {
  allowPan?: boolean;
  allowZoom?: boolean;
  clipContainerComponent?: React.ReactElement;
  disable?: boolean;
  downsample?: number | boolean;
  minimumZoom?: { x?: number; y?: number };
  onZoomDomainChange?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryZoomContainerProps,
  ) => void;
  zoomDimension?: ZoomDimensionType;
  zoomDomain?: { x?: DomainTuple; y?: DomainTuple };
}

export class VictoryZoomContainer extends React.Component<
  VictoryZoomContainerProps,
  any
> {}

export const RawZoomHelpers: {
  checkDomainEquality(a: any, b: any): any;
  scale(currentDomain: any, evt: any, props: any, axis: any): any;
  getScaledDomain(currentDomain: any, factor: any, percent: any): any;
  getMinimumDomain(point: any, props: any, axis: any): any;
  zoommingOut(evt: any): any;
  getScaleFactor(evt: any): any;
  getScalePercent(evt: any, props: any, axis: any): any;
  getPosition(evt: any, props: any, originalDomain: any): any;
  pan(currentDomain: any, originalDomain: any, delta: any): any;
  getDomainScale(domain: any, scale: any, axis: any): any;
  handleAnimation(ctx: any): any;
  getLastDomain(targetProps: any, originalDomain: any): any;
  getDomain(props: any): any;
  onMouseDown(evt: any, targetProps: any): any;
  onMouseUp(evt: any, targetProps: any): any;
  onMouseLeave(evt: any, targetProps: any): any;
  onMouseMove(evt: any, targetProps: any, eventKey: any, ctx: any): any;
  onWheel(evt: any, targetProps: any, eventKey: any, ctx: any): any;
};

export const ZoomHelpers: Pick<
  typeof RawZoomHelpers,
  | "checkDomainEquality"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseLeave"
  | "onMouseMove"
  | "onWheel"
>;

export const zoomContainerMixin: (base: Function) => Function;
