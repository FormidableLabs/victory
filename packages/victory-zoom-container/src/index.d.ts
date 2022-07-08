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
  checkDomainEquality(a, b): any;
  scale(currentDomain, evt, props, axis): any;
  getScaledDomain(currentDomain, factor, percent): any;
  getMinimumDomain(point, props, axis): any;
  zoommingOut(evt): any;
  getScaleFactor(evt): any;
  getScalePercent(evt, props, axis): any;
  getPosition(evt, props, originalDomain): any;
  pan(currentDomain, originalDomain, delta): any;
  getDomainScale(domain, scale, axis): any;
  handleAnimation(ctx): any;
  getLastDomain(targetProps, originalDomain): any;
  getDomain(props): any;
  onMouseDown(evt, targetProps): any;
  onMouseUp(evt, targetProps): any;
  onMouseLeave(evt, targetProps): any;
  onMouseMove(evt, targetProps, eventKey, ctx): any;
  onWheel(evt, targetProps, eventKey, ctx): any;
};

export const ZoomHelpers: Pick<
  RawZoomHelpers,
  | "checkDomainEquality"
  | "onMouseDown"
  | "onMouseUp"
  | "onMouseLeave"
  | "onMouseMove"
  | "onWheel"
>;

export const zoomContainerMixin: (base: Function) => Function;
