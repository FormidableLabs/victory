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
  BlockProps,
  ColorScalePropType,
  EventCallbackInterface,
  EventPropTypeInterface,
  OrientationTypes,
  PaddingProps,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryLabableProps,
  VictorySingleLabableProps,
  VictoryStyleInterface,
  VictoryStyleObject
} from "victory-core";

export interface VictoryLegendProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabableProps,
    VictorySingleLabableProps {
  borderComponent?: React.ReactElement;
  borderPadding?: PaddingProps;
  centerTitle?: boolean;
  colorScale?: ColorScalePropType;
  data?: Array<{
    name?: string;
    labels?: {
      fill?: string;
    };
    symbol?: {
      fill?: string;
      type?: string;
    };
  }>;
  dataComponent?: React.ReactElement;
  eventKey?: StringOrNumberOrCallback | string[];
  events?: EventPropTypeInterface<"data" | "labels" | "parent", StringOrNumberOrCallback>[];
  externalEventMutations?: EventCallbackInterface<string | string[], StringOrNumberOrCallback> & { callback?: Function };
  gutter?: number | { left: number; right: number };
  itemsPerRow?: number;
  orientation?: "horizontal" | "vertical";
  rowGutter?: number | Omit<BlockProps, "left" | "right">;
  style?: VictoryStyleInterface & { title?: VictoryStyleObject };
  symbolSpacer?: number;
  title?: string | string[];
  titleComponent?: React.ReactElement;
  titleOrientation?: OrientationTypes;
  x?: number;
  y?: number;
}

export class VictoryLegend extends React.Component<VictoryLegendProps, any> {}
