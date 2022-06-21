import React from "react";
import {
  VictorySelectionContainer,
  VictorySelectionContainerProps,
} from "victory-selection-container";

export const selectionContainerMixin: (base: any) => VictorySelectionContainer;

export interface VictorySelectionContainerNativeProps
  extends VictorySelectionContainerProps {
  disableContainerEvents?: boolean;
  onTouchEnd?: Function;
  onTouchStart?: Function;
}

export default class extends React.Component<
  VictorySelectionContainerNativeProps,
  any
> {}
