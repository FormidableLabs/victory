import React from "react";
import { Rect } from "react-native-svg";
import { flow } from "lodash";
import {
  VictoryBrushContainer as VictoryBrushContainerBase,
  BrushHelpers,
  brushContainerMixin as originalBrushMixin,
  VictoryBrushContainerProps,
} from "victory-brush-container";
import { VictoryContainer } from "./victory-container";
import NativeHelpers from "../helpers/native-helpers";

export interface VictoryBrushContainerNativeProps
  extends VictoryBrushContainerProps {
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
const RectWithStyle = ({
  style = {},
  ...otherProps
}: {
  style?: Record<string, any>;
}) => <Rect {...otherProps} {...NativeHelpers.getStyle(style)} />;

function nativeBrushMixin<
  TBase extends React.ComponentClass<TProps>,
  TProps extends VictoryBrushContainerNativeProps,
>(Base: TBase) {
  // @ts-expect-error "TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'."
  return class VictoryNativeBrushContainer extends Base {
    // eslint-disable-line max-len
    // assign native specific defaultProps over web `VictoryBrushContainer` defaultProps
    static defaultProps = {
      ...VictoryBrushContainerBase.defaultProps,
      brushComponent: <RectWithStyle />,
      handleComponent: <RectWithStyle />,
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
              BrushHelpers.onGlobalMouseMove.cancel();
              return BrushHelpers.onMouseDown(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : BrushHelpers.onGlobalMouseMove(evt, targetProps);
            },
            onTouchEnd: (evt, targetProps) => {
              if (props.disable) {
                return {};
              }
              BrushHelpers.onGlobalMouseMove.cancel();
              return BrushHelpers.onGlobalMouseUp(evt, targetProps);
            },
          },
        },
      ];
    };
  };
}

const combinedMixin: (
  base: React.ComponentClass,
) => React.ComponentClass<VictoryBrushContainerNativeProps> = flow(
  originalBrushMixin,
  nativeBrushMixin,
);

export const brushContainerMixin = (base: React.ComponentClass) =>
  combinedMixin(base);

export const VictoryBrushContainer = brushContainerMixin(VictoryContainer);
