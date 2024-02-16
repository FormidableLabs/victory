/* eslint-disable react/no-multi-comp */
import React from "react";
import { Rect } from "react-native-svg";
import { VictoryEventHandler } from "victory-core";
import {
  SelectionHelpers,
  VictorySelectionContainerProps,
  VICTORY_SELECTION_CONTAINER_DEFAULT_PROPS,
  useVictorySelectionContainer,
} from "victory-selection-container";
import { VictoryContainer } from "./victory-container";
import NativeHelpers from "../helpers/native-helpers";

export interface VictorySelectionContainerNativeProps
  extends VictorySelectionContainerProps {
  disableContainerEvents?: boolean;
  onTouchStart?: VictoryEventHandler;
  onTouchEnd?: VictoryEventHandler;
}

// ensure the selection component get native styles
const DefaultSelectionComponent = ({
  style = {},
  ...otherProps
}: {
  style?: Record<string, any>;
}) => <Rect {...otherProps} {...NativeHelpers.getStyle(style)} />;

export const VictorySelectionContainer = (
  initialProps: VictorySelectionContainerNativeProps,
) => {
  const props = useVictorySelectionContainer({
    ...initialProps,
    // @ts-expect-error TODO: standalone is not a valid prop for VictoryContainer, figure out why this is here
    standalone: initialProps.standalone ?? true,
    selectionComponent: initialProps.selectionComponent ?? (
      <DefaultSelectionComponent />
    ),
  });
  return <VictoryContainer {...props} />;
};

VictorySelectionContainer.role = "container";

VictorySelectionContainer.defaultEvents = (
  initialProps: VictorySelectionContainerNativeProps,
) => {
  const props = {
    ...VICTORY_SELECTION_CONTAINER_DEFAULT_PROPS,
    ...initialProps,
  };
  const createEventHandler =
    (handler: VictoryEventHandler, cancel: boolean): VictoryEventHandler =>
    // eslint-disable-next-line max-params
    (event, targetProps, eventKey, context) => {
      if (props.disable) {
        return {};
      }

      if (cancel) {
        SelectionHelpers.onMouseMove.cancel();
      }

      return handler(event, { ...props, ...targetProps }, eventKey, context);
    };

  return [
    {
      target: "parent",
      eventHandlers: {
        onTouchStart: createEventHandler(SelectionHelpers.onMouseMove, true),
        onTouchMove: createEventHandler(SelectionHelpers.onMouseMove, false),
        onTouchEnd: createEventHandler(SelectionHelpers.onMouseUp, true),
      },
    },
  ];
};
