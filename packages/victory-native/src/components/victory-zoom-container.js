import React from "react";
import { flow } from "lodash";
import VictoryContainer from "./victory-container";
import VictoryClipContainer from "./victory-clip-container";
import {
  VictoryZoomContainer,
  zoomContainerMixin as originalZoomMixin,
} from "victory-zoom-container";
import NativeZoomHelpers from "../helpers/native-zoom-helpers";

const nativeZoomMixin = (base) =>
  class VictoryNativeZoomContainer extends base {
    // assign native specific defaultProps over web `VictoryZoomContainer` defaultProps
    static defaultProps = {
      ...VictoryZoomContainer.defaultProps,
      clipContainerComponent: <VictoryClipContainer />,
    };

    // overrides all web events with native specific events
    static defaultEvents = (props) => {
      const { disable } = props;
      return [
        {
          target: "parent",
          eventHandlers: {
            // eslint-disable-next-line max-params
            onTouchStart: (evt, targetProps, eventKey, ctx) => {
              return disable
                ? {}
                : NativeZoomHelpers.onTouchStart(
                    evt,
                    targetProps,
                    eventKey,
                    ctx,
                  );
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
            onTouchEnd: (evt, targetProps, eventKey, ctx) => {
              return disable
                ? {}
                : NativeZoomHelpers.onTouchEnd(evt, targetProps, eventKey, ctx);
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

const combinedMixin = flow(originalZoomMixin, nativeZoomMixin);

export const zoomContainerMixin = (base) => combinedMixin(base);

export default zoomContainerMixin(VictoryContainer);
