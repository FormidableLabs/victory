import * as React from "react";
import { OriginType } from "../victory-label/victory-label";
import { PaddingProps, VictoryThemeDefinition } from "../victory-theme/types";
import {
  AnimatePropTypeInterface,
  CategoryPropType,
  ColorScalePropType,
  D3Scale,
  DataGetterPropType,
  DomainPaddingPropType,
  DomainPropType,
  EventCallbackInterface,
  RangePropType,
  ScalePropType,
  SortOrderPropType,
  StringOrNumberOrList,
} from "../types/prop-types";
import { NumberOrCallback, StringOrCallback } from "../types/callbacks";

export interface VictoryDatableProps {
  categories?: CategoryPropType;
  data?: readonly any[];
  dataComponent?: React.ReactElement;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  samples?: number;
  sortKey?: DataGetterPropType;
  sortOrder?: SortOrderPropType;
  x?: DataGetterPropType;
  y?: DataGetterPropType;
  y0?: DataGetterPropType;
}
export interface VictoryCommonThemeProps {
  animate?: boolean | AnimatePropTypeInterface;
  colorScale?: ColorScalePropType;
  containerComponent?: React.ReactElement;
  disableInlineStyles?: boolean;
  domainPadding?: DomainPaddingPropType;
  externalEventMutations?: EventCallbackInterface<
    string | string[],
    StringOrNumberOrList
  >[];
  groupComponent?: React.ReactElement;
  height?: number;
  horizontal?: boolean;
  maxDomain?: number | { x?: number; y?: number };
  minDomain?: number | { x?: number; y?: number };
  name?: string;
  origin?: OriginType;
  padding?: PaddingProps;
  polar?: boolean;
  range?: RangePropType;
  scale?:
    | ScalePropType
    | D3Scale
    | {
        x?: ScalePropType | D3Scale;
        y?: ScalePropType | D3Scale;
      };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  sharedEvents?: { events: any[]; getEventState: Function };
  singleQuadrantDomainPadding?: boolean | { x?: boolean; y?: boolean };
  standalone?: boolean;
  width?: number;
}
export interface VictoryCommonProps extends VictoryCommonThemeProps {
  theme?: VictoryThemeDefinition;
}
export interface VictoryCommonPrimitiveProps {
  active?: boolean;
  ariaLabel?: StringOrCallback;
  className?: string;
  clipPath?: string;
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  desc?: string | Function;
  disableInlineStyles?: boolean;
  events?: object;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  id?: number | string | Function;
  index?: number | string;
  origin?: OriginType;
  polar?: boolean;
  role?: string;
  scale?: any;
  shapeRendering?: string;
  style?: any;
  tabIndex?: NumberOrCallback;
  transform?: string;
}
