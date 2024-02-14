import React from "react";
import { VictoryEventHandler } from "victory-core";
import {
  useVictoryCursorContainer,
  CursorHelpers,
  VICTORY_CURSOR_CONTAINER_DEFAULT_PROPS,
  VictoryCursorContainerProps,
} from "victory-cursor-container";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { LineSegment } from "./victory-primitives/line-segment";

export interface VictoryCursorContainerNativeProps
  extends VictoryCursorContainerProps {
  disableContainerEvents?: boolean;
  onTouchStart?: VictoryEventHandler;
  onTouchEnd?: VictoryEventHandler;
}

export const VictoryCursorContainer = (
  initialProps: VictoryCursorContainerNativeProps,
) => {
  const props = useVictoryCursorContainer({
    ...initialProps,
    cursorLabelComponent: initialProps.cursorLabelComponent ?? <VictoryLabel />,
    cursorComponent: initialProps.cursorComponent ?? <LineSegment />,
  });
  return <VictoryContainer {...props} />;
};

VictoryCursorContainer.role = "container";

VictoryCursorContainer.defaultEvents = (
  initialProps: VictoryCursorContainerNativeProps,
) => {
  const props = { ...VICTORY_CURSOR_CONTAINER_DEFAULT_PROPS, ...initialProps };
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
        onTouchStart: createEventHandler(CursorHelpers.onMouseMove),
        onTouchMove: createEventHandler(CursorHelpers.onMouseMove),
        onTouchEnd: createEventHandler(CursorHelpers.onTouchEnd),
      },
    },
  ];
};
