import * as React from "react";
import { VictoryContainerProps } from "victory-core";

interface PointsInterface {
  childName?: string | string[];
  eventKey?: string | number;
  data?: any;
}

interface VictorySelectionContainerProps extends VictoryContainerProps {
  activateSelectedData?: boolean;
  allowSelection?: boolean;
  disable?: boolean;
  onSelection?: (
    points: PointsInterface[],
    bounds: { x: number | Date; y: number | Date }[],
    props: VictorySelectionContainerProps,
  ) => void;
  onSelectionCleared?: (props: VictorySelectionContainerProps) => void;
  selectionBlacklist?: string[];
  selectionComponent?: React.ReactElement;
  selectionDimension?: "x" | "y";
  selectionStyle?: React.CSSProperties;
}

export class VictorySelectionContainer extends React.Component<
  VictorySelectionContainerProps,
  any
> {}

export const SelectionHelpers: {
  getDimension(props): any;
  getDatasets(props): any;
  filterDatasets(props, datasets, bounds): any;
  getSelectedData(props, dataset): any;
  onMouseDown(evt, targetProps): any;
  onMouseMove(evt, targetProps): any;
  onMouseUp(evt, targetProps): any;
};

export const selectionContainerMixin: (base: Function) => Function;
