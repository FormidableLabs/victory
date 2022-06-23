import PropTypes from "prop-types";
import * as CustomPropTypes from "./prop-types";
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
const dataProps: React.WeakValidationMap<VictoryDatableProps> = {
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.string),
      y: PropTypes.arrayOf(PropTypes.string),
    }),
  ]),
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dataComponent: PropTypes.element,
  disableInlineStyles: PropTypes.bool,
  labelComponent: PropTypes.element,
  labels: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  samples: CustomPropTypes.nonNegative,
  sortKey: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([
      CustomPropTypes.integer,
      CustomPropTypes.nonNegative,
    ]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  sortOrder: PropTypes.oneOf(["ascending", "descending"]),
  style: PropTypes.shape({
    parent: PropTypes.object,
    data: PropTypes.object,
    labels: PropTypes.object,
  }),
  x: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([
      CustomPropTypes.integer,
      CustomPropTypes.nonNegative,
    ]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  y: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([
      CustomPropTypes.integer,
      CustomPropTypes.nonNegative,
    ]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  y0: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([
      CustomPropTypes.integer,
      CustomPropTypes.nonNegative,
    ]),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
};
export interface VictoryCommonThemeProps {
  animate?: boolean | AnimatePropTypeInterface;
  colorScale?: ColorScalePropType;
  containerComponent?: React.ReactElement;
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
const baseProps: React.WeakValidationMap<VictoryCommonProps> = {
  animate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  containerComponent: PropTypes.element,
  domain: PropTypes.oneOfType([
    CustomPropTypes.domain,
    PropTypes.shape({ x: CustomPropTypes.domain, y: CustomPropTypes.domain }),
  ]),
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  maxDomain: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
    }),
  ]),
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  minDomain: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
    }),
  ]),
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  domainPadding: PropTypes.oneOfType([
    PropTypes.shape({
      x: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
      ]),
      y: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
      ]),
    }),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  eventKey: PropTypes.oneOfType([
    PropTypes.func,
    CustomPropTypes.allOfType([
      CustomPropTypes.integer,
      CustomPropTypes.nonNegative,
    ]),
    PropTypes.string,
  ]),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([
          CustomPropTypes.integer,
          CustomPropTypes.nonNegative,
        ]),
        PropTypes.string,
      ]),
      eventHandlers: PropTypes.object,
    }),
  ),
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  externalEventMutations: PropTypes.arrayOf(
    PropTypes.shape({
      callback: PropTypes.func,
      childName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([
          CustomPropTypes.integer,
          CustomPropTypes.nonNegative,
        ]),
        PropTypes.string,
      ]),
      mutation: PropTypes.func,
      target: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    }),
  ),
  groupComponent: PropTypes.element,
  height: CustomPropTypes.nonNegative,
  name: PropTypes.string,
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
  ]),
  polar: PropTypes.bool,
  range: PropTypes.oneOfType([
    CustomPropTypes.domain,
    PropTypes.shape({
      x: CustomPropTypes.domain.isRequired,
      y: CustomPropTypes.domain.isRequired,
    }),
  ]),
  scale: PropTypes.oneOfType([
    CustomPropTypes.scale,
    PropTypes.shape({
      x: CustomPropTypes.scale.isRequired,
      y: CustomPropTypes.scale.isRequired,
    }),
  ]),
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  sharedEvents: PropTypes.shape({
    events: PropTypes.array,
    getEventState: PropTypes.func,
  }),
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  singleQuadrantDomainPadding: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.bool]),
      y: PropTypes.oneOfType([PropTypes.bool]),
    }),
  ]),
  standalone: PropTypes.bool,
  theme: PropTypes.object,
  width: CustomPropTypes.nonNegative,
};

export interface VictoryCommonPrimitiveProps {
  active?: boolean;
  ariaLabel?: StringOrCallback;
  className?: string;
  clipPath?: string;
  data?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  desc?: string | Function;
  disableInlineStyles?: boolean;
  events?: object;
  // eslint-disable-next-line @typescript-eslint/ban-types
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
const primitiveProps: React.WeakValidationMap<VictoryCommonPrimitiveProps> = {
  active: PropTypes.bool,
  ariaLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  clipPath: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  desc: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  disableInlineStyles: PropTypes.bool,
  events: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // @ts-expect-error TODO: synchronize the type with this PropTypes
  origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  polar: PropTypes.bool,
  role: PropTypes.string,
  scale: PropTypes.oneOfType([
    CustomPropTypes.scale,
    PropTypes.shape({ x: CustomPropTypes.scale, y: CustomPropTypes.scale }),
  ]),
  shapeRendering: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  transform: PropTypes.string,
};

export const CommonProps = {
  dataProps,
  baseProps,
  primitiveProps,
};
