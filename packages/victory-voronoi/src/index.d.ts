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
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export interface VictoryVoronoiProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  events?: EventPropTypeInterface<string, string | number | (string | number)[]>[];
  type?: number;
  sortKey?: StringOrNumberOrCallback | string[];
  sortOrder?: "ascending" | "descending";
  size?: number | { (data: any): number };
  style?: VictoryStyleInterface;
  polar?: boolean;
}

export class VictoryVoronoi extends React.Component<VictoryVoronoiProps, any> {}
