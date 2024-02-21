import React, { ComponentClass } from "react";
import { flow } from "lodash";
import { VictoryContainer } from "./victory-container";
import { VictoryClipContainer } from "./victory-clip-container";
import {
  VictoryZoomContainer as VictoryZoomContainerBase,
  VictoryZoomContainerProps,
  zoomContainerMixin as originalZoomMixin,
} from "victory-zoom-container";
import NativeZoomHelpers from "../helpers/native-zoom-helpers";

export interface VictoryZoomContainerNativeProps
  extends VictoryZoomContainerProps {
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

function nativeZoomMixin<
  TBase extends ComponentClass<TProps>,
  TProps extends VictoryZoomContainerNativeProps,
>(Base: TBase) {
  // @ts-expect-error "TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'."
  return class VictoryNativeZoomContainer extends Base {
    // assign native specific defaultProps over web `VictoryZoomContainer` defaultProps
    static defaultProps = {
      ...VictoryZoomContainerBase.defaultProps,
      clipContainerComponent: <VictoryClipContainer />,
    };

    // overrides all web events with native specific events
    static defaultEvents = (props: TProps) => {
      const { disable } = props;
      return [
        {
          target: "parent",
          eventHandlers: {
            // eslint-disable-next-line max-params
            onTouchStart: (evt, targetProps) => {
              return disable
                ? {}
                : NativeZoomHelpers.onTouchStart(evt, targetProps);
            },
            // eslint-disable-next-line max-params
            onTouchMove: (evt, targetProps, eventKey, ctx) => {
              return disable
                ? {}
                : NativeZoomHelpers.onTouchMove(
                    evt,
                    targetProps,
                    eventKey,
                    ctx,
                  );
            },
            // eslint-disable-next-line max-params
            onTouchEnd: () => {
              return disable ? {} : NativeZoomHelpers.onTouchEnd();
            },
            // eslint-disable-next-line max-params
            onTouchPinch: (evt, targetProps, eventKey, ctx) => {
              return disable
                ? {}
                : NativeZoomHelpers.onTouchPinch(
                    evt,
                    targetProps,
                    eventKey,
                    ctx,
                  );
            },
          },
        },
      ];
    };
  };
}

const combinedMixin: (
  base: React.ComponentClass,
) => React.ComponentClass<VictoryZoomContainerNativeProps> = flow(
  originalZoomMixin,
  nativeZoomMixin,
);

export const zoomContainerMixin = (base: React.ComponentClass) =>
  combinedMixin(base);

export const VictoryZoomContainer = zoomContainerMixin(VictoryContainer);
