import React from "react";
import * as Collection from "./collection";
import { VictoryCommonProps } from "./common-props";

import type { DomainPropType, ScaleXYPropType } from "../types/prop-types";

// Private Functions

function transformTarget(
  target: number,
  matrix: DOMMatrix,
  dimension: "x" | "y",
) {
  const { a, d, e, f } = matrix;
  return dimension === "y" ? d * target + f : a * target + e;
}

function getTransformationMatrix(svg: SVGGraphicsElement): DOMMatrix {
  return svg.getScreenCTM()!.inverse();
}

interface ReactNativeTouchEvent extends Event {
  identifier?: number;
  locationX: number;
  locationY: number;
}
function isNativeTouchEvent(
  nativeEvent: Event | undefined,
): nativeEvent is ReactNativeTouchEvent {
  return !!(
    nativeEvent &&
    (nativeEvent as ReactNativeTouchEvent).identifier !== undefined
  );
}
function isReactTouchEvent(evt: React.SyntheticEvent): evt is React.TouchEvent {
  return (
    (evt as React.TouchEvent).changedTouches &&
    (evt as React.TouchEvent).changedTouches.length > 0
  );
}

// Exported Functions

export function getParentSVG(
  evt: Pick<React.SyntheticEvent, "target"> &
    Partial<Pick<React.SyntheticEvent, "nativeEvent">>,
): SVGElement {
  if (isNativeTouchEvent(evt.nativeEvent)) {
    // @ts-expect-error Seems like a superfluous check.
    return undefined;
  }
  const getParent = (target) => {
    if (target.nodeName === "svg") {
      return target;
    }
    return target.parentNode ? getParent(target.parentNode) : target;
  };
  return getParent(evt.target);
}

export function getSVGEventCoordinates(
  evt: React.SyntheticEvent,
  svg?: SVGElement,
): SVGCoordinateType {
  if (isNativeTouchEvent(evt.nativeEvent)) {
    // react-native override. relies on the RN.View being the _exact_ same size as its child SVG.
    // this should be fine: the svg is the only child of View and the View shirks to its children
    return {
      x: evt.nativeEvent.locationX,
      y: evt.nativeEvent.locationY,
    };
  }
  const location = isReactTouchEvent(evt)
    ? evt.changedTouches[0]
    : (evt as React.MouseEvent);
  svg = svg || getParentSVG(location);
  const matrix = getTransformationMatrix(svg as SVGGraphicsElement);
  return {
    x: transformTarget(location.clientX, matrix, "x"),
    y: transformTarget(location.clientY, matrix, "y"),
  };
}

export function getDomainCoordinates(
  props: Pick<VictoryCommonProps, "scale" | "horizontal">,
  domain?: DomainPropType,
) {
  const { horizontal } = props;
  const scale = props.scale as ScaleXYPropType;
  // FIXME: add support for DomainTuple: [number, number]
  const domainObj: any = domain || {
    x: scale.x.domain(),
    y: scale.y.domain(),
  };
  return {
    x: horizontal
      ? [scale.y(domainObj.y[0]), scale.y(domainObj.y[1])]
      : [scale.x(domainObj.x[0]), scale.x(domainObj.x[1])],
    y: horizontal
      ? [scale.x(domainObj.x[0]), scale.x(domainObj.x[1])]
      : [scale.y(domainObj.y[0]), scale.y(domainObj.y[1])],
  };
}

// eslint-disable-next-line max-params
export function getDataCoordinates(
  props: any,
  scale: ScaleXYPropType,
  x: number,
  y: number,
): SVGCoordinateType {
  const { polar, horizontal } = props;
  if (!polar) {
    return {
      x: horizontal ? scale.x.invert(y) : scale.x.invert(x),
      y: horizontal ? scale.y.invert(x) : scale.y.invert(y),
    };
  }
  const origin = props.origin || { x: 0, y: 0 };
  const baseX = x - origin.x;
  const baseY = y - origin.y;
  const radius = Math.abs(baseX * Math.sqrt(1 + Math.pow(-baseY / baseX, 2)));
  const angle = (-Math.atan2(baseY, baseX) + Math.PI * 2) % (Math.PI * 2);
  return {
    x: scale.x.invert(angle),
    y: scale.y.invert(radius),
  };
}

export function getBounds(props: ComputedCommonProps): SVGCoordinateBounds {
  const { x1, x2, y1, y2, scale } = props;
  const point1 = getDataCoordinates(props, scale, x1, y1);
  const point2 = getDataCoordinates(props, scale, x2, y2);
  const makeBound = (a: number, b: number) => {
    return [
      Collection.getMinValue([a, b]) as number,
      Collection.getMaxValue([a, b]) as number,
    ] as const;
  };
  return {
    x: makeBound(point1.x, point2.x),
    y: makeBound(point1.y, point2.y),
  };
}

export type SVGCoordinateType = { x: number; y: number };
export type SVGCoordinateBounds = {
  x: readonly [number, number];
  y: readonly [number, number];
};

type ComputedCommonProps = {
  scale: ScaleXYPropType;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  horizontal?: boolean;
};
