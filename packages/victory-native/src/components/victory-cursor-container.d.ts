import React from "react";
import {
  VictoryCursorContainer,
  VictoryCursorContainerProps,
} from "victory-cursor-container";

export const cursorContainerMixin: (base: any) => VictoryCursorContainer;

export interface VictoryCursorContainerNativeProps
  extends VictoryCursorContainerProps {
  disableContainerEvents?: boolean;
  onTouchEnd?: Function;
  onTouchStart?: Function;
}

export default class extends React.Component<
  VictoryCursorContainerNativeProps,
  any
> {}
