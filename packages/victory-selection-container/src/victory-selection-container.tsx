import React from "react";
import {
  Datum,
  Rect,
  VictoryContainer,
  VictoryContainerProps,
  VictoryEventHandler,
} from "victory-core";
import { SelectionHelpers } from "./selection-helpers";

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

export const VICTORY_SELECTION_CONTAINER_DEFAULT_PROPS = {
  activateSelectedData: true,
  allowSelection: true,
  selectionComponent: <Rect />,
  selectionStyle: {
    stroke: "transparent",
    fill: "black",
    fillOpacity: 0.1,
  },
};

interface VictorySelectionContainerMutatedProps
  extends VictorySelectionContainerProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export const useVictorySelectionContainer = (
  initialProps: VictorySelectionContainerProps,
) => {
  const props = {
    ...VICTORY_SELECTION_CONTAINER_DEFAULT_PROPS,
    ...(initialProps as VictorySelectionContainerMutatedProps),
  };

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
    ] as React.ReactElement[],
  };
};

export const VictorySelectionContainer = (
  initialProps: VictorySelectionContainerProps,
) => {
  const { props, children } = useVictorySelectionContainer(initialProps);
  return <VictoryContainer {...props}>{children}</VictoryContainer>;
};

VictorySelectionContainer.role = "container";

VictorySelectionContainer.defaultEvents = (
  initialProps: VictorySelectionContainerProps,
) => {
  const props = {
    ...VICTORY_SELECTION_CONTAINER_DEFAULT_PROPS,
    ...initialProps,
  };
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
