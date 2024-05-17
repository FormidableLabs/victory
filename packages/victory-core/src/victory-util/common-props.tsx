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
  // eslint-disable-next-line @typescript-eslint/ban-types
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
  /**
   * Applies a clipping path to the rendered element.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/clip-path}
   */
  clipPath?: string | undefined;
  data?: any;
  desc?: StringOrCallback;
  disableInlineStyles?: boolean;
  events?: object;
  /**
   * The unique identifier for the element. Can be a number, string, or function.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/id}
   */
  id?: StringOrCallback;
  index?: number | string;
  polar?: boolean;
  role?: React.AriaRole | undefined;
  scale?: any;
  /**
   * Provides hints to the renderer about what tradeoffs to make when rendering shapes.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering}
   */
  shapeRendering?: string;
  style?: any;
  tabIndex?: NumberOrCallback;
  /**
   * Applies a transform to the rendered element.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform}
   */
  transform?: string;
}
