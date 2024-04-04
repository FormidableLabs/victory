import React from "react";
import {
  Helpers,
  Path,
  NumberOrCallback,
  SliceNumberOrCallback,
  StringOrCallback,
  VictoryCommonProps,
  VictoryStyleInterface,
} from "victory-core";
import { defaults } from "lodash";
import * as d3Shape from "victory-vendor/d3-shape";

export type VictorySliceLabelPositionType =
  | "startAngle"
  | "centroid"
  | "endAngle";
export type VictorySliceLabelPlacementType =
  | "vertical"
  | "parallel"
  | "perpendicular";
export type VictorySliceTTargetType = "data" | "labels" | "parent";

export interface SliceProps extends VictoryCommonProps {
  ariaLabel?: StringOrCallback;
  cornerRadius?: SliceNumberOrCallback<SliceProps, "cornerRadius">;
  datum?: any;
  innerRadius?: NumberOrCallback;
  padAngle?: SliceNumberOrCallback<SliceProps, "padAngle">;
  pathComponent?: React.ReactElement;
  pathFunction?: (props: SliceProps) => string;
  radius?: SliceNumberOrCallback<SliceProps, "radius">;
  slice?: {
    startAngle?: number;
    endAngle?: number;
    padAngle?: number;
    data?: any[];
  };
  sliceEndAngle?: SliceNumberOrCallback<SliceProps, "sliceEndAngle">;
  sliceStartAngle?: SliceNumberOrCallback<SliceProps, "sliceStartAngle">;
  style?: VictoryStyleInterface;
  tabIndex?: NumberOrCallback;
  role?: string;
  shapeRendering?: string;
}

const getPath = (props) => {
  const { slice, radius, innerRadius, cornerRadius } = props;
  if (Helpers.isFunction(props.pathFunction)) {
    return props.pathFunction(slice);
  }
  const padAngle = Helpers.degreesToRadians(props.padAngle);
  const startAngle = Helpers.degreesToRadians(props.sliceStartAngle);
  const endAngle = Helpers.degreesToRadians(props.sliceEndAngle);
  const pathFunction = d3Shape
    .arc()
    .cornerRadius(cornerRadius)
    .outerRadius(radius)
    .innerRadius(innerRadius || 0);
  return pathFunction(defaults({ startAngle, endAngle, padAngle }, slice));
};

const evaluateProps = (props) => {
  /**
   * * Potential evaluated props of following must be evaluated in this order:
   * 1) `style`
   * 2) `radius`
   * 3) `innerRadius`
   *
   * Everything else does not have to be evaluated in a particular order:
   * `ariaLabel`
   * `id`
   * `cornerRadius`
   * `padAngle`
   * `sliceStartAngle`
   * `sliceEndAngle`
   * `tabIndex`
   */
  const style = Helpers.evaluateStyle(props.style, props);
  const radius = Helpers.evaluateProp(
    props.radius,
    Object.assign({}, props, { style }),
  );
  const innerRadius = Helpers.evaluateProp(
    props.innerRadius,
    Object.assign({}, props, { style, radius }),
  );

  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const id = Helpers.evaluateProp(props.id, props);
  const cornerRadius = Helpers.evaluateProp(props.cornerRadius, props);
  const padAngle = Helpers.evaluateProp(props.padAngle, props);
  const sliceStartAngle = Helpers.evaluateProp(props.sliceStartAngle, props);
  const sliceEndAngle = Helpers.evaluateProp(props.sliceEndAngle, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return Object.assign({}, props, {
    ariaLabel,
    style,
    radius,
    innerRadius,
    id,
    cornerRadius,
    padAngle,
    sliceStartAngle,
    sliceEndAngle,
    tabIndex,
  });
};

const defaultProps: SliceProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Slice = (initialProps: SliceProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));
  const defaultTransform = props.origin
    ? `translate(${props.origin.x}, ${props.origin.y})`
    : undefined;

  return React.cloneElement(props.pathComponent, {
    ...props.events,
    "aria-label": props.ariaLabel,
    d: getPath(props),
    style: props.style,
    transform: props.transform || defaultTransform,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    clipPath: props.clipPath,
    tabIndex: props.tabIndex,
  });
};
