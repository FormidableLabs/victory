import React from "react";
import { flow } from "lodash";
import {
  VictoryCursorContainer as VictoryCursorContainerBase,
  CursorHelpers,
  cursorContainerMixin as originalCursorMixin,
  VictoryCursorContainerProps,
} from "victory-cursor-container";
import { VictoryLabel } from "./victory-label";
import { VictoryContainer } from "./victory-container";
import { LineSegment } from "./victory-primitives/line-segment";

export interface VictoryCursorContainerNativeProps
  extends VictoryCursorContainerProps {
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

function nativeCursorMixin<
  TBase extends React.ComponentClass<TProps>,
  TProps extends VictoryCursorContainerNativeProps,
>(Base: TBase) {
  // @ts-expect-error "TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'."
  return class VictoryNativeCursorContainer extends Base {
    static displayName = "VictoryCursorContainer";
    // assign native specific defaultProps over web `VictoryCursorContainer` defaultProps
    static defaultProps = {
      ...VictoryCursorContainerBase.defaultProps,
      cursorLabelComponent: <VictoryLabel />,
      cursorComponent: <LineSegment />,
    };

    // overrides all web events with native specific events
    static defaultEvents = (props: TProps) => {
      return [
        {
          target: "parent",
          eventHandlers: {
            onTouchStart: (evt, targetProps) => {
              return props.disable
                ? {}
                : CursorHelpers.onMouseMove(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : CursorHelpers.onMouseMove(evt, targetProps);
            },
            onTouchEnd: (evt, targetProps) => {
              return props.disable
                ? {}
                : CursorHelpers.onTouchEnd(evt, targetProps);
            },
          },
        },
      ];
    };
  };
}

const combinedMixin: (
  base: React.ComponentClass,
) => React.ComponentClass<VictoryCursorContainerNativeProps> = flow(
  originalCursorMixin,
  nativeCursorMixin,
);

export const cursorContainerMixin = (base: React.ComponentClass) =>
  combinedMixin(base);

export const VictoryCursorContainer = cursorContainerMixin(VictoryContainer);
