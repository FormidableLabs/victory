import React from "react";
import { ZoomHelpers } from "./zoom-helpers";
import {
  VictoryClipContainer,
  VictoryContainerProps,
  DomainTuple,
  VictoryContainer,
  Data,
  VictoryEventHandler,
} from "victory-core";
import defaults from "lodash/defaults";

const DEFAULT_DOWNSAMPLE = 150;

export type ZoomDimensionType = "x" | "y";

export type ZoomDomain = {
  x: DomainTuple;
  y: DomainTuple;
};

export interface VictoryZoomContainerProps extends VictoryContainerProps {
  allowPan?: boolean;
  allowZoom?: boolean;
  clipContainerComponent?: React.ReactElement;
  disable?: boolean;
  downsample?: number | boolean;
  minimumZoom?: { x?: number; y?: number };
  onZoomDomainChange?: (
    domain: ZoomDomain,
    props: VictoryZoomContainerProps,
  ) => void;
  zoomDimension?: ZoomDimensionType;
  zoomDomain?: Partial<ZoomDomain>;
  horizontal?: boolean;
}

interface VictoryZoomContainerMutatedProps extends VictoryZoomContainerProps {
  domain: ZoomDomain;
  originalDomain: ZoomDomain;
  currentDomain: ZoomDomain;
  cachedZoomDomain: ZoomDomain;
  scale: any;
  polar: boolean;
  origin: { x: number; y: number };
}

export const VICTORY_ZOOM_CONTAINER_DEFAULT_PROPS = {
  clipContainerComponent: <VictoryClipContainer />,
  allowPan: true,
  allowZoom: true,
  zoomActive: false,
};

export const useVictoryZoomContainer = (
  initialProps: VictoryZoomContainerProps,
) => {
  const props = {
    ...VICTORY_ZOOM_CONTAINER_DEFAULT_PROPS,
    ...(initialProps as VictoryZoomContainerMutatedProps),
  };
  const {
    children,
    currentDomain,
    zoomActive,
    allowZoom,
    downsample,
    scale,
    clipContainerComponent,
    polar,
    origin,
    horizontal,
  } = props;

  const downsampleZoomData = (child: React.ReactElement, domain) => {
    const getData = (childProps) => {
      const { data, x, y } = childProps;
      const defaultGetData =
        child.type && typeof (child.type as any).getData === "function"
          ? (child.type as any).getData
          : () => undefined;
      // skip costly data formatting if x and y accessors are not present
      return Array.isArray(data) && !x && !y
        ? data
        : defaultGetData(childProps);
    };

    const data = getData(child.props);

    // return undefined if downsample is not run, then default() will replace with child.props.data
    if (!downsample || !domain || !data) {
      return undefined;
    }

    const maxPoints = downsample === true ? DEFAULT_DOWNSAMPLE : downsample;
    const dimension = props.zoomDimension || "x";

    // important: assumes data is ordered by dimension
    // get the start and end of the data that is in the current visible domain
    let startIndex = data.findIndex(
      (d) => d[dimension] >= domain[dimension][0],
    );
    let endIndex = data.findIndex((d) => d[dimension] > domain[dimension][1]);
    // pick one more point (if available) at each end so that VictoryLine, VictoryArea connect
    if (startIndex !== 0) {
      startIndex -= 1;
    }
    if (endIndex !== -1) {
      endIndex += 1;
    }

    const visibleData = data.slice(startIndex, endIndex);

    return Data.downsample(visibleData, maxPoints, startIndex);
  };

  const modifiedChildren = (
    React.Children.toArray(children) as React.ReactElement[]
  ).map((child) => {
    const role = (child as any).type && (child as any).type.role;
    const isDataComponent = Data.isDataComponent(child);
    const originalDomain = defaults({}, props.originalDomain, props.domain);
    const zoomDomain = defaults({}, props.zoomDomain, props.domain);
    const cachedZoomDomain = defaults({}, props.cachedZoomDomain, props.domain);

    let domain: ZoomDomain;

    if (!ZoomHelpers.checkDomainEquality(zoomDomain, cachedZoomDomain)) {
      // if zoomDomain has been changed, use it
      domain = zoomDomain;
    } else if (allowZoom && !zoomActive) {
      // if user has zoomed all the way out, use the child domain
      domain = child.props.domain;
    } else {
      // default: use currentDomain, set by the event handlers
      domain = defaults({}, currentDomain, originalDomain);
    }

    let newDomain = props.polar
      ? {
          x: originalDomain.x,
          y: [0, domain.y[1]],
        }
      : domain;

    if (newDomain && props.zoomDimension) {
      // if zooming is restricted to a dimension, don't squash changes to zoomDomain in other dim
      newDomain = {
        ...zoomDomain,
        [props.zoomDimension]: newDomain[props.zoomDimension],
      };
    }

    // don't downsample stacked data
    const childProps =
      isDataComponent && role !== "stack"
        ? {
            domain: newDomain,
            data: downsampleZoomData(child, newDomain),
          }
        : { domain: newDomain };

    const newChild = React.cloneElement(
      child,
      defaults(childProps, child.props),
    );

    // Clip data components
    if (Data.isDataComponent(newChild)) {
      const rangeX = horizontal ? scale.y.range() : scale.x.range();
      const rangeY = horizontal ? scale.x.range() : scale.y.range();
      const plottableWidth = Math.abs(rangeX[0] - rangeX[1]);
      const plottableHeight = Math.abs(rangeY[0] - rangeY[1]);
      const radius = Math.max(...rangeY);
      const groupComponent = React.cloneElement(clipContainerComponent, {
        clipWidth: plottableWidth,
        clipHeight: plottableHeight,
        translateX: Math.min(...rangeX),
        translateY: Math.min(...rangeY),
        polar,
        origin: polar ? origin : undefined,
        radius: polar ? radius : undefined,
        ...clipContainerComponent.props,
      });

      return React.cloneElement(newChild, {
        groupComponent,
      });
    }

    return newChild;
  });

  return { props, children: modifiedChildren };
};

export const VictoryZoomContainer = (
  initialProps: VictoryZoomContainerProps,
) => {
  const { props, children } = useVictoryZoomContainer(initialProps);
  return <VictoryContainer {...props}>{children}</VictoryContainer>;
};

VictoryZoomContainer.role = "container";

VictoryZoomContainer.defaultEvents = (
  initialProps: VictoryZoomContainerProps,
) => {
  const props = { ...VICTORY_ZOOM_CONTAINER_DEFAULT_PROPS, ...initialProps };
  const createEventHandler =
    (handler: VictoryEventHandler, disabled?: boolean): VictoryEventHandler =>
    // eslint-disable-next-line max-params
    (event, targetProps, eventKey, context) =>
      disabled || props.disable
        ? {}
        : handler(event, { ...props, ...targetProps }, eventKey, context);

  return [
    {
      target: "parent",
      eventHandlers: {
        onMouseDown: createEventHandler(ZoomHelpers.onMouseDown),
        onTouchStart: createEventHandler(ZoomHelpers.onMouseDown),
        onMouseUp: createEventHandler(ZoomHelpers.onMouseUp),
        onTouchEnd: createEventHandler(ZoomHelpers.onMouseUp),
        onMouseLeave: createEventHandler(ZoomHelpers.onMouseLeave),
        onTouchCancel: createEventHandler(ZoomHelpers.onMouseLeave),
        onMouseMove: createEventHandler(ZoomHelpers.onMouseMove),
        onTouchMove: createEventHandler(ZoomHelpers.onMouseMove),
        onWheel: createEventHandler(ZoomHelpers.onWheel, !props.allowZoom),
      },
    },
  ];
};
