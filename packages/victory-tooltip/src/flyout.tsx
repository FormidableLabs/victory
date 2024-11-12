import React from "react";
import { defaults } from "lodash";

import {
  Helpers,
  Path,
  UserProps,
  VictoryCommonProps,
  OrientationTypes,
  VictoryStyleObject,
  StringOrNumberOrCallback,
} from "victory-core";

export interface FlyoutProps extends VictoryCommonProps {
  active?: boolean;
  center?: {
    x: number;
    y: number;
  };
  className?: string;
  clipPath?: string;
  cornerRadius?: number;
  data?: any[];
  datum?: object;
  dx?: number;
  dy?: number;
  events?: object;
  id?: StringOrNumberOrCallback;
  index?: number;
  orientation?: OrientationTypes;
  pathComponent?: React.ReactElement;
  pointerLength?: number;
  pointerWidth?: number;
  role?: string;
  shapeRendering?: string;
  style?: VictoryStyleObject;
  transform?: string;
  x?: number;
  y?: number;
}

interface FlyoutPathProps {
  center: {
    x: number;
    y: number;
  };
  cornerRadius: number;
  dx?: number;
  dy?: number;
  height: number;
  orientation: OrientationTypes;
  pointerLength: number;
  pointerWidth: number;
  width: number;
  x: number;
  y: number;
}

const getVerticalPath = (props: FlyoutPathProps) => {
  const { pointerWidth, cornerRadius, orientation, width, height, center } =
    props;
  const sign = orientation === "bottom" ? 1 : -1;
  const x = props.x + (props.dx || 0);
  const y = props.y + (props.dy || 0);
  const centerX = center.x;
  const centerY = center.y;
  const pointerEdge = centerY + sign * (height / 2);
  const oppositeEdge = centerY - sign * (height / 2);
  const rightEdge = centerX + width / 2;
  const leftEdge = centerX - width / 2;
  const pointerLength = sign * (y - pointerEdge) < 0 ? 0 : props.pointerLength;
  const direction = orientation === "bottom" ? "0 0 0" : "0 0 1";
  const arc = `${cornerRadius} ${cornerRadius} ${direction}`;
  return `M ${centerX - pointerWidth / 2}, ${pointerEdge}
    L ${pointerLength ? x : centerX + pointerWidth / 2}, ${
    pointerLength ? y : pointerEdge
  }
    L ${centerX + pointerWidth / 2}, ${pointerEdge}
    L ${rightEdge - cornerRadius}, ${pointerEdge}
    A ${arc} ${rightEdge}, ${pointerEdge - sign * cornerRadius}
    L ${rightEdge}, ${oppositeEdge + sign * cornerRadius}
    A ${arc} ${rightEdge - cornerRadius}, ${oppositeEdge}
    L ${leftEdge + cornerRadius}, ${oppositeEdge}
    A ${arc} ${leftEdge}, ${oppositeEdge + sign * cornerRadius}
    L ${leftEdge}, ${pointerEdge - sign * cornerRadius}
    A ${arc} ${leftEdge + cornerRadius}, ${pointerEdge}
    z`;
};

const getHorizontalPath = (props: FlyoutPathProps) => {
  const { pointerWidth, cornerRadius, orientation, width, height, center } =
    props;
  const sign = orientation === "left" ? 1 : -1;
  const x = props.x + (props.dx || 0);
  const y = props.y + (props.dy || 0);
  const centerX = center.x;
  const centerY = center.y;
  const pointerEdge = centerX - sign * (width / 2);
  const oppositeEdge = centerX + sign * (width / 2);
  const bottomEdge = centerY + height / 2;
  const topEdge = centerY - height / 2;
  const pointerLength = sign * (x - pointerEdge) > 0 ? 0 : props.pointerLength;
  const direction = orientation === "left" ? "0 0 0" : "0 0 1";
  const arc = `${cornerRadius} ${cornerRadius} ${direction}`;
  return `M ${pointerEdge}, ${centerY - pointerWidth / 2}
    L ${pointerLength ? x : pointerEdge}, ${
    pointerLength ? y : centerY + pointerWidth / 2
  }
    L ${pointerEdge}, ${centerY + pointerWidth / 2}
    L ${pointerEdge}, ${bottomEdge - cornerRadius}
    A ${arc} ${pointerEdge + sign * cornerRadius}, ${bottomEdge}
    L ${oppositeEdge - sign * cornerRadius}, ${bottomEdge}
    A ${arc} ${oppositeEdge}, ${bottomEdge - cornerRadius}
    L ${oppositeEdge}, ${topEdge + cornerRadius}
    A ${arc} ${oppositeEdge - sign * cornerRadius}, ${topEdge}
    L ${pointerEdge + sign * cornerRadius}, ${topEdge}
    A ${arc} ${pointerEdge}, ${topEdge + cornerRadius}
    z`;
};

const getFlyoutPath = (props: FlyoutPathProps) => {
  const orientation = props.orientation || "top";
  return orientation === "left" || orientation === "right"
    ? getHorizontalPath(props)
    : getVerticalPath(props);
};

const evaluateProps = (props: FlyoutProps) => {
  /**
   * Potential evaluated props are:
   * `id`
   * `style`
   */
  const id = Helpers.evaluateProp(props.id, props);
  const style = Helpers.evaluateStyle(props.style, props);

  return { ...props, id, style };
};

const defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto",
};

export const Flyout: React.FC<FlyoutProps> = (initialProps) => {
  const props = evaluateProps(defaults({}, initialProps, defaultProps));
  const userProps = UserProps.getSafeUserProps(props);

  // check for required props for this subcomponent
  // they should be passed in from the wrapper
  UserProps.assert(props.height, "Flyout props[height] is undefined");
  UserProps.assert(props.width, "Flyout props[width] is undefined");
  UserProps.assert(props.x, "Flyout props[x] is undefined");
  UserProps.assert(props.y, "Flyout props[y] is undefined");

  const flyoutPathProps: FlyoutPathProps = {
    center: props.center || { x: 0, y: 0 },
    cornerRadius: props.cornerRadius || 0,
    dx: props.dx,
    dy: props.dy,
    height: props.height,
    orientation: props.orientation || "top",
    pointerLength: props.pointerLength || 0,
    pointerWidth: props.pointerWidth || 0,
    width: props.width,
    x: props.x,
    y: props.y,
  };

  return React.cloneElement(props.pathComponent!, {
    ...props.events,
    ...userProps,
    style: props.style,
    d: getFlyoutPath(flyoutPathProps),
    className: props.className,
    shapeRendering: props.shapeRendering,
    role: props.role,
    transform: props.transform,
    clipPath: props.clipPath,
  });
};
