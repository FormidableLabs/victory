// Definitions by: Alexey Svetliakov <https://github.com/asvetliakov>
//                 snerks <https://github.com/snerks>
//                 Krzysztof Cebula <https://github.com/Havret>
//                 Vitaliy Polyanskiy <https://github.com/alreadyExisted>
//                 James Lismore <https://github.com/jlismore>
//                 Stack Builders <https://github.com/stackbuilders>
//                 Esteban Ibarra <https://github.com/ibarrae>
//                 Dominic Lee <https://github.com/dominictwlee>
//                 Dave Vedder <https://github.com/veddermatic>
//                 Alec Flett <https://github.com/alecf>

import * as React from "react";
import {
  EventPropTypeInterface,
  DomainPropType,
  DomainPaddingPropType,
  OrientationTypes,
  StringOrNumberOrCallback,
  VictoryDatableProps,
  VictoryCommonProps,
  VictoryStyleInterface,
  VictoryStyleObject
} from "victory-core";

export type VictoryBoxPlotLabelType = boolean | any[] | Function | { (data: any): string | null };

export interface VictoryBoxPlotStyleInterface extends VictoryStyleInterface {
  max?: VictoryStyleObject;
  maxLabels?: VictoryStyleObject;
  min?: VictoryStyleObject;
  minLabels?: VictoryStyleObject;
  median?: VictoryStyleObject;
  medianLabels?: VictoryStyleObject;
  q1?: VictoryStyleObject;
  q1Labels?: VictoryStyleObject;
  q3?: VictoryStyleObject;
  q3Labels?: VictoryStyleObject;
}

export interface VictoryBoxPlotLabelOrientationInterface extends VictoryStyleInterface {
  max?: OrientationTypes;
  min?: OrientationTypes;
  median?: OrientationTypes;
  q1?: OrientationTypes;
  q3?: OrientationTypes;
}

export interface VictoryBoxPlotProps extends VictoryCommonProps, VictoryDatableProps {
  boxWidth?: number;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  events?: EventPropTypeInterface<string, StringOrNumberOrCallback>[];
  eventKey?: StringOrNumberOrCallback;
  horizontal?: boolean;
  labelOrientation?: OrientationTypes | VictoryBoxPlotLabelOrientationInterface;
  labels?: boolean;
  max?: StringOrNumberOrCallback | string[];
  maxComponent?: React.ReactElement;
  maxLabelComponent?: React.ReactElement;
  maxLabels?: VictoryBoxPlotLabelType;
  median?: StringOrNumberOrCallback | string[];
  medianComponent?: React.ReactElement;
  medianLabelComponent?: React.ReactElement;
  medianLabels?: VictoryBoxPlotLabelType;
  min?: StringOrNumberOrCallback | string[];
  minComponent?: React.ReactElement;
  minLabelComponent?: React.ReactElement;
  minLabels?: VictoryBoxPlotLabelType;
  q1?: StringOrNumberOrCallback | string[];
  q1Component?: React.ReactElement;
  q1LabelComponent?: React.ReactElement;
  q1Labels?: VictoryBoxPlotLabelType;
  q3?: StringOrNumberOrCallback | string[];
  q3Component?: React.ReactElement;
  q3LabelComponent?: React.ReactElement;
  q3Labels?: VictoryBoxPlotLabelType;
  style?: VictoryBoxPlotStyleInterface;
  whiskerWidth?: number;
}

export class VictoryBoxPlot extends React.Component<VictoryBoxPlotProps, any> {}
