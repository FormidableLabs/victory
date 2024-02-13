import React from "react";
import {
  Datum,
  Rect,
  VictoryContainerFn,
  VictoryContainerProps,
} from "victory-core";
import { SelectionHelpers } from "./selection-helpers";

type Handler = (
  event: any,
  targetProps: any,
  eventKey?: any,
  context?: any,
) => void;

export interface VictorySelectionContainerProps extends VictoryContainerProps {
  activateSelectedData?: boolean;
  allowSelection?: boolean;
  disable?: boolean;
  onSelection?: (
    points: {
      childName?: string | string[];
      eventKey?: string | number;
      data?: Datum[];
    }[],
    bounds: {
      x: number | Date;
      y: number | Date;
    }[],
    props: VictorySelectionContainerProps,
  ) => void;
  horizontal?: boolean;
  onSelectionCleared?: (props: VictorySelectionContainerProps) => void;
  selectionBlacklist?: string[];
  selectionComponent?: React.ReactElement;
  selectionDimension?: "x" | "y";
  selectionStyle?: React.CSSProperties;
}

const defaultProps = {
  activateSelectedData: true,
  allowSelection: true,
  selectionComponent: <Rect />,
  selectionStyle: {
    stroke: "transparent",
    fill: "black",
    fillOpacity: 0.1,
  },
};

export const useVictorySelectionContainer = (
  initialProps: VictorySelectionContainerProps,
) => {
  const props = { ...defaultProps, ...initialProps };

  const { x1, x2, y1, y2, selectionStyle, selectionComponent, children, name } =
    props;
  const width = Math.abs(x2 - x1) || 1;
  const height = Math.abs(y2 - y1) || 1;
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);

  const shouldRenderRect = y1 && y2 && x1 && x2;

  return {
    props,
    children: [
      children,
      shouldRenderRect &&
        React.cloneElement(selectionComponent, {
          key: `${name}-selection`,
          x,
          y,
          width,
          height,
          style: selectionStyle,
        }),
    ],
  };
};

export const VictorySelectionContainerFn = (
  initialProps: VictorySelectionContainerProps,
) => {
  const { props, children } = useVictorySelectionContainer(initialProps);
  return <VictoryContainerFn {...props}>{children}</VictoryContainerFn>;
};

VictorySelectionContainerFn.role = "container";

VictorySelectionContainerFn.defaultEvents = (
  initialProps: VictorySelectionContainerProps,
) => {
  const props = { ...defaultProps, ...initialProps };
  const createEventHandler =
    (handler: Handler, disabled?: boolean): Handler =>
    // eslint-disable-next-line max-params
    (event, targetProps, eventKey, context) =>
      disabled || props.disable
        ? {}
        : handler(event, { ...props, ...targetProps }, eventKey, context);

  return [
    {
      target: "parent",
      eventHandlers: {
        onMouseDown: createEventHandler(SelectionHelpers.onMouseDown),
        onTouchStart: createEventHandler(SelectionHelpers.onMouseDown),
        onMouseMove: createEventHandler(SelectionHelpers.onMouseMove),
        onTouchMove: createEventHandler(SelectionHelpers.onMouseMove),
        onMouseUp: createEventHandler(SelectionHelpers.onMouseUp),
        onTouchEnd: createEventHandler(SelectionHelpers.onMouseUp),
      },
    },
  ];
};
