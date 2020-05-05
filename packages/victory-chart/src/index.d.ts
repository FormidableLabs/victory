import * as React from "react";
import {
  CategoryPropType,
  EventPropTypeInterface,
  DomainPropType,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryStyleInterface
} from "victory-core";

export type AxesType = {
  independent?: React.ReactElement;
  dependent?: React.ReactElement;
};

export interface VictoryChartProps extends VictoryCommonProps {
  defaultAxes?: AxesType;
  defaultPolarAxes?: AxesType;
  categories?: CategoryPropType;
  children?: React.ReactNode | React.ReactNode[];
  domain?: DomainPropType;
  endAngle?: number;
<<<<<<< HEAD
  events?: EventPropTypeInterface<string, string[] | number[] | string | number>[];
=======
  events?: EventPropTypeInterface<string, string | number | string[] | number[]>[];
>>>>>>> Removes unused import and adds addition type definiton for events prop
  eventKey?: StringOrNumberOrCallback;
  innerRadius?: number;
  prependDefaultAxes?: boolean;
  startAngle?: number;
  style?: Pick<VictoryStyleInterface, "parent">;
}

export class VictoryChart extends React.Component<VictoryChartProps, any> {}
