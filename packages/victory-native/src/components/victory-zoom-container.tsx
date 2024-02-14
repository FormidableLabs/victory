import React from "react";
import { VictoryContainer } from "./victory-container";
import { VictoryClipContainer } from "./victory-clip-container";
import { VictoryEventHandler } from "victory-core";
import {
  VictoryZoomContainerProps,
  useVictoryZoomContainer,
  VICTORY_ZOOM_CONTAINER_DEFAULT_PROPS,
} from "victory-zoom-container";
import NativeZoomHelpers from "../helpers/native-zoom-helpers";

export interface VictoryZoomContainerNativeProps
  extends VictoryZoomContainerProps {
  disableContainerEvents?: boolean;
  onTouchStart?: VictoryEventHandler;
  onTouchEnd?: VictoryEventHandler;
}

export const VictoryZoomContainer = (
  initialProps: VictoryZoomContainerNativeProps,
) => {
  const props = useVictoryZoomContainer({
    ...initialProps,
    clipContainerComponent: initialProps.clipContainerComponent ?? (
      <VictoryClipContainer />
    ),
  });
  return <VictoryContainer {...props} />;
};

VictoryZoomContainer.role = "container";

VictoryZoomContainer.defaultEvents = (
  initialProps: VictoryZoomContainerNativeProps,
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
        onTouchStart: createEventHandler(NativeZoomHelpers.onTouchStart),
        onTouchMove: createEventHandler(NativeZoomHelpers.onTouchMove),
        onTouchEnd: createEventHandler(NativeZoomHelpers.onTouchEnd),
        onTouchPinch: createEventHandler(NativeZoomHelpers.onTouchPinch),
      },
    },
  ];
};
