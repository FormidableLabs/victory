import * as React from "react";
import {
  CategoryPropType,
  DomainPropType,
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryStyleInterface,
  VictoryStyleObject
} from "victory-core";

export type AxesType = {
  dependent?: React.ReactElement;
  independent?: React.ReactElement;
};

export interface VictoryChartProps extends VictoryCommonProps {
  backgroundComponent?: React.ReactElement;
  categories?: CategoryPropType;
  children?: React.ReactNode | React.ReactNode[];
  defaultAxes?: AxesType;
  defaultPolarAxes?: AxesType;
  domain?: DomainPropType;
  endAngle?: number;
  eventKey?: StringOrNumberOrCallback;
  events?: EventPropTypeInterface<
    string,
    string[] | number[] | string | number
  >[];
  innerRadius?: number;
  prependDefaultAxes?: boolean;
  startAngle?: number;
  style?: Pick<VictoryStyleInterface, "parent"> & {
    background?: VictoryStyleObject;
  };
}

export class VictoryChart extends React.Component<VictoryChartProps, any> {}
