import React from "react";
import {
  Selection,
  Rect,
  DomainTuple,
  VictoryContainerProps,
  VictoryContainer,
  VictoryEventHandler,
} from "victory-core";
import { BrushHelpers } from "./brush-helpers";
import defaults from "lodash/defaults";
import isEqual from "react-fast-compare";

export interface VictoryBrushContainerProps extends VictoryContainerProps {
  allowDrag?: boolean;
  allowDraw?: boolean;
  allowResize?: boolean;
  brushComponent?: React.ReactElement;
  brushDimension?: "x" | "y";
  brushDomain?: { x?: DomainTuple; y?: DomainTuple };
  brushStyle?: React.CSSProperties;
  defaultBrushArea?: "all" | "none" | "disable" | "move";
  disable?: boolean;
  handleComponent?: React.ReactElement;
  handleStyle?: React.CSSProperties;
  handleWidth?: number;
  onBrushCleared?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps,
  ) => void;
  onBrushDomainChange?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps,
  ) => void;
  onBrushDomainChangeEnd?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps,
  ) => void;
}

interface VictoryBrushContainerMutatedProps extends VictoryBrushContainerProps {
  domain: { x: DomainTuple; y: DomainTuple };
  currentDomain: { x: DomainTuple; y: DomainTuple } | undefined;
  cachedBrushDomain: { x: DomainTuple; y: DomainTuple } | undefined;
}

export const VICTORY_BRUSH_CONTAINER_DEFAULT_PROPS = {
  allowDrag: true,
  allowDraw: true,
  allowResize: true,
  brushComponent: <Rect />,
  brushStyle: {
    stroke: "transparent",
    fill: "black",
    fillOpacity: 0.1,
  },
  handleComponent: <Rect />,
  handleStyle: {
    stroke: "transparent",
    fill: "transparent",
  },
  handleWidth: 8,
  mouseMoveThreshold: 0,
};

export const useVictoryBrushContainer = (
  initialProps: VictoryBrushContainerProps,
) => {
  const props = {
    ...VICTORY_BRUSH_CONTAINER_DEFAULT_PROPS,
    ...(initialProps as VictoryBrushContainerMutatedProps),
  };
  const { children } = props;

  const getSelectBox = (coordinates) => {
    const { x, y } = coordinates;
    const { brushStyle, brushComponent, name } = props;
    const brushComponentStyle =
      brushComponent.props && brushComponent.props.style;
    const cursor = !props.allowDrag && !props.allowResize ? "auto" : "move";
    return x[0] !== x[1] && y[0] !== y[1]
      ? React.cloneElement(brushComponent, {
          key: `${name}-brush`,
          width: Math.abs(x[1] - x[0]) || 1,
          height: Math.abs(y[1] - y[0]) || 1,
          x: Math.min(x[0], x[1]),
          y: Math.min(y[0], y[1]),
          cursor,
          style: defaults({}, brushComponentStyle, brushStyle),
        })
      : null;
  };

  const getCursorPointers = () => {
    const cursors = {
      yProps: "ns-resize",
      xProps: "ew-resize",
    };
    if (!props.allowResize && props.allowDrag) {
      cursors.xProps = "move";
      cursors.yProps = "move";
    } else if (!props.allowResize && !props.allowDrag) {
      cursors.xProps = "auto";
      cursors.yProps = "auto";
    }
    return cursors;
  };

  const getHandles = (domain) => {
    const { handleWidth, handleStyle, handleComponent, name } = props;
    const domainBox = BrushHelpers.getDomainBox(props, domain);
    const { x1, x2, y1, y2 } = domainBox;
    const { top, bottom, left, right } = BrushHelpers.getHandles(
      props,
      domainBox,
    );
    const width = Math.abs(x2 - x1) || 1;
    const height = Math.abs(y2 - y1) || 1;
    const handleComponentStyle =
      (handleComponent.props && handleComponent.props.style) || {};
    const style = defaults({}, handleComponentStyle, handleStyle);

    const cursors = getCursorPointers();
    const yProps = {
      style,
      width,
      height: handleWidth,
      cursor: cursors.yProps,
    };
    const xProps = {
      style,
      width: handleWidth,
      height,
      cursor: cursors.xProps,
    };

    const handleProps = {
      top: top && Object.assign({ x: top.x1, y: top.y1 }, yProps),
      bottom: bottom && Object.assign({ x: bottom.x1, y: bottom.y1 }, yProps),
      left: left && Object.assign({ y: left.y1, x: left.x1 }, xProps),
      right: right && Object.assign({ y: right.y1, x: right.x1 }, xProps),
    };
    const handles = ["top", "bottom", "left", "right"].reduce(
      (memo, curr) =>
        handleProps[curr]
          ? memo.concat(
              React.cloneElement(
                handleComponent,
                Object.assign(
                  { key: `${name}-handle-${curr}` },
                  handleProps[curr],
                ),
              ),
            )
          : memo,
      [] as React.ReactElement[],
    );
    return handles.length ? handles : null;
  };

  const getRect = () => {
    const { currentDomain, cachedBrushDomain } = props;
    const brushDomain = defaults({}, props.brushDomain, props.domain);
    const domain = isEqual(brushDomain, cachedBrushDomain)
      ? defaults({}, currentDomain, brushDomain)
      : brushDomain;
    const coordinates = Selection.getDomainCoordinates(props, domain);
    const selectBox = getSelectBox(coordinates);
    return selectBox ? [selectBox, getHandles(domain)] : [];
  };

  return {
    props,
    children: [
      ...React.Children.toArray(children),
      ...getRect(),
    ] as React.ReactElement[],
  };
};

export const VictoryBrushContainer = (
  initialProps: VictoryBrushContainerProps,
) => {
  const { props, children } = useVictoryBrushContainer(initialProps);
  return <VictoryContainer {...props}>{children}</VictoryContainer>;
};

VictoryBrushContainer.role = "container";

VictoryBrushContainer.defaultEvents = (
  initialProps: VictoryBrushContainerProps,
) => {
  const props = { ...VICTORY_BRUSH_CONTAINER_DEFAULT_PROPS, ...initialProps };
  const createEventHandler =
    (
      handler: VictoryEventHandler,
      isDisabled?: (targetProps: any) => boolean,
    ): VictoryEventHandler =>
    // eslint-disable-next-line max-params
    (event, targetProps, eventKey, context) =>
      props.disable || isDisabled?.(targetProps)
        ? {}
        : handler(event, { ...props, ...targetProps }, eventKey, context);

  return [
    {
      target: "parent",
      eventHandlers: {
        onMouseDown: createEventHandler(BrushHelpers.onMouseDown),
        onTouchStart: createEventHandler(BrushHelpers.onMouseDown),
        onGlobalMouseMove: createEventHandler(
          BrushHelpers.onGlobalMouseMove,
          (targetProps) => !targetProps.isPanning && !targetProps.isSelecting,
        ),
        onGlobalTouchMove: createEventHandler(
          BrushHelpers.onGlobalMouseMove,
          (targetProps) => !targetProps.isPanning && !targetProps.isSelecting,
        ),
        onGlobalMouseUp: createEventHandler(BrushHelpers.onGlobalMouseUp),
        onGlobalTouchEnd: createEventHandler(BrushHelpers.onGlobalMouseUp),
        onGlobalTouchCancel: createEventHandler(BrushHelpers.onGlobalMouseUp),
      },
    },
  ];
};
