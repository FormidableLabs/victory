import React from "react";
import {
  VictoryBrushContainer,
  VictoryBrushContainerProps
} from "victory-brush-container";

export const brushContainerMixin: (base: any) => VictoryBrushContainer;

export interface VictoryBrushContainerNativeProps
  extends VictoryBrushContainerProps {
  disableContainerEvents?: boolean;
  onTouchEnd?: Function;
  onTouchStart?: Function;
}

export default class extends React.Component<
  VictoryBrushContainerNativeProps,
  any
> {}
