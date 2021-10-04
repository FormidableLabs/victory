import React from "react";
import { flow } from "lodash";
import VictoryContainer from "./victory-container";
import VictoryClipContainer from "./victory-clip-container";
import {
  VictoryZoomContainer, zoomContainerMixin as originalZoomMixin
} from "victory-zoom-container";
import NativeZoomHelpers from "../helpers/native-zoom-helpers";

const nativeZoomMixin = (base) => class VictoryNativeZoomContainer extends base {
  // assign native specific defaultProps over web `VictoryZoomContainer` defaultProps
  static defaultProps = {
    ...VictoryZoomContainer.defaultProps,
    clipContainerComponent: <VictoryClipContainer/>
  };

  // overrides all web events with native specific events
  static defaultEvents = (props) => {
    const { disable } = props;
    return [{
      target: "parent",
      eventHandlers: {
        onTouchStart: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
          return disable ? {} : NativeZoomHelpers.onTouchStart(evt, targetProps, eventKey, ctx);
        },
        onTouchMove: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
          return disable ? {} : NativeZoomHelpers.onTouchMove(evt, targetProps, eventKey, ctx);
        },
        onTouchEnd: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
          return disable ? {} : NativeZoomHelpers.onTouchEnd(evt, targetProps, eventKey, ctx);
        },
        onTouchPinch: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
          return disable ? {} : NativeZoomHelpers.onTouchPinch(evt, targetProps, eventKey, ctx);
        }
      }
    }];
  };
};

const combinedMixin = flow(originalZoomMixin, nativeZoomMixin);

export const zoomContainerMixin = (base) => combinedMixin(base);

export default zoomContainerMixin(VictoryContainer);
