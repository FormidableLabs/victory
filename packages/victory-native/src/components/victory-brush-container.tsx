/* eslint-disable react/no-multi-comp */
import React from "react";
import { Rect } from "react-native-svg";
import { VictoryEventHandler } from "victory-core";
import {
  BrushHelpers,
  VictoryBrushContainerProps,
  useVictoryBrushContainer,
  VICTORY_BRUSH_CONTAINER_DEFAULT_PROPS,
} from "victory-brush-container";
import { VictoryContainer } from "./victory-container";
import NativeHelpers from "../helpers/native-helpers";

export interface VictoryBrushContainerNativeProps
  extends VictoryBrushContainerProps {
  disableContainerEvents?: boolean;
  onTouchStart?: VictoryEventHandler;
  onTouchEnd?: VictoryEventHandler;
}

// ensure the selection component get native styles
const RectWithStyle = ({
  style = {},
  ...otherProps
}: {
  style?: Record<string, any>;
}) => <Rect {...otherProps} {...NativeHelpers.getStyle(style)} />;

export const VictoryBrushContainer = (
  initialProps: VictoryBrushContainerNativeProps,
) => {
  const props = useVictoryBrushContainer({
    ...initialProps,
    brushComponent: initialProps.brushComponent ?? <RectWithStyle />,
    handleComponent: initialProps.handleComponent ?? <RectWithStyle />,
  });
  return <VictoryContainer {...props} />;
};

VictoryBrushContainer.role = "container";

VictoryBrushContainer.defaultEvents = (
  initialProps: VictoryBrushContainerNativeProps,
) => {
  const props = { ...VICTORY_BRUSH_CONTAINER_DEFAULT_PROPS, ...initialProps };
  const createEventHandler =
    (handler: VictoryEventHandler, cancel: boolean): VictoryEventHandler =>
    // eslint-disable-next-line max-params
    (event, targetProps, eventKey, context) => {
      if (props.disable) {
        return {};
      }

      if (cancel) {
        BrushHelpers.onGlobalMouseMove.cancel();
      }

      return handler(event, { ...props, ...targetProps }, eventKey, context);
    };

  return [
    {
      target: "parent",
      eventHandlers: {
        onTouchStart: createEventHandler(BrushHelpers.onMouseDown, true),
        onTouchMove: createEventHandler(BrushHelpers.onGlobalMouseMove, false),
        onTouchEnd: createEventHandler(BrushHelpers.onGlobalMouseUp, true),
      },
    },
  ];
};
