import React from "react";
import { VictoryContainerProps } from "victory-core";

export interface VictoryContainerNativeProps extends VictoryContainerProps {
  disableContainerEvents?: boolean;
  onTouchEnd?: Function;
  onTouchStart?: Function;
}

export default class extends React.Component<
  VictoryContainerNativeProps,
  any
> {}
