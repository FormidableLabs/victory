import React from "react";
import {
  VictoryZoomContainer,
  VictoryZoomContainerProps
} from "victory-zoom-container";

export const zoomContainerMixin: (base: any) => VictoryZoomContainer;

export interface VictoryZoomContainerNativeProps
  extends VictoryZoomContainerProps {
  disableContainerEvents?: boolean;
  onTouchEnd?: Function;
  onTouchStart?: Function;
}

export default class extends React.Component<
  VictoryZoomContainerNativeProps,
  any
> {}
