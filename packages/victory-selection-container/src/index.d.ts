import * as React from "react";
import { VictoryContainerProps } from "victory-core";

interface VictorySelectionContainerProps extends VictoryContainerProps {
  activateSelectedData?: boolean;
  allowSelection?: boolean;
  disable?: boolean;
  onSelection?: Function;
  onSelectionCleared?: Function;
  selectionBlacklist?: string[];
  selectionComponent?: React.ReactElement;
  selectionDimension?: "x" | "y";
  selectionStyle?: React.CSSProperties;
}

export class VictorySelectionContainer extends React.Component<
  VictorySelectionContainerProps,
  any
> {}
