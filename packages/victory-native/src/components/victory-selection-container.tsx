import React from "react";
import { flow } from "lodash";
import { Rect } from "react-native-svg";
import {
  VictorySelectionContainer as VictorySelectionContainerBase,
  SelectionHelpers,
  selectionContainerMixin as originalSelectionMixin,
  VictorySelectionContainerProps,
} from "victory-selection-container";
import { VictoryContainer } from "./victory-container";
import NativeHelpers from "../helpers/native-helpers";

export interface VictorySelectionContainerNativeProps
  extends VictorySelectionContainerProps {
  disableContainerEvents?: boolean;
  onTouchStart?: (
    evt?: any,
    targetProps?: any,
    eventKey?: any,
    ctx?: any,
  ) => void;
  onTouchEnd?: (
    evt?: any,
    targetProps?: any,
    eventKey?: any,
    ctx?: any,
  ) => void;
}

// ensure the selection component get native styles
const DefaultSelectionComponent = ({
  style = {},
  ...otherProps
}: {
  style?: Record<string, any>;
}) => <Rect {...otherProps} {...NativeHelpers.getStyle(style)} />;

function nativeSelectionMixin<
  TBase extends React.ComponentClass<TProps>,
  TProps extends VictorySelectionContainerNativeProps,
>(Base: TBase) {
  // @ts-expect-error "TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'."
  return class VictoryNativeSelectionContainer extends Base {
    // eslint-disable-line max-len
    // assign native specific defaultProps over web `VictorySelectionContainer` defaultProps
    static defaultProps = {
      ...VictorySelectionContainerBase.defaultProps,
      standalone: true,
      selectionComponent: <DefaultSelectionComponent />,
    };

    // overrides all web events with native specific events
    static defaultEvents = (props: TProps) => {
      return [
        {
          target: "parent",
          eventHandlers: {
            onTouchStart: (evt, targetProps) => {
              if (props.disable) {
                return {};
              }
              SelectionHelpers.onMouseMove.cancel();
              return SelectionHelpers.onMouseDown(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : SelectionHelpers.onMouseMove(evt, targetProps);
            },
            onTouchEnd: (evt, targetProps) => {
              if (props.disable) {
                return {};
              }
              SelectionHelpers.onMouseMove.cancel();
              return SelectionHelpers.onMouseUp(evt, targetProps);
            },
          },
        },
      ];
    };
  };
}

const combinedMixin: (
  base: React.ComponentClass,
) => React.ComponentClass<VictorySelectionContainerNativeProps> = flow(
  originalSelectionMixin,
  nativeSelectionMixin,
);

export const selectionContainerMixin = (base: React.ComponentClass) =>
  combinedMixin(base);

export const VictorySelectionContainer =
  selectionContainerMixin(VictoryContainer);
