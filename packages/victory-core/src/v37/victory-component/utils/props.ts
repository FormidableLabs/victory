import {
  DomainPaddingPropType,
  DomainPropType,
  SortOrderPropType,
} from "../../../types/prop-types";
import * as React from "react";
import {
  VictoryTheme,
  VictoryThemeDefinition,
} from "../../../victory-theme/victory-theme";
import { satisfies } from "./satisfies";

export type { TurboContainerProps } from "../core/with-turbo-container";

export type TurboDataProps<TDatum = any> = {
  data: TDatum[];
  dataComponent: React.ReactElement;
  domain?: DomainPropType;
  domainPadding?: DomainPaddingPropType;
  samples?: number;
  sortKey?: keyof TDatum;
  sortOrder?: SortOrderPropType;
  x?: keyof TDatum;
  y?: keyof TDatum;
  y0?: keyof TDatum;
};
export const TurboDataProps = {
  defaultProps: satisfies<Partial<TurboDataProps>>()({
    data: [
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 8 },
    ],
  }),
};

export type TurboCommonProps = {
  title?: string;
  width: number;
  height: number;
  padding: number;
  theme: VictoryThemeDefinition;
};
export const CommonProps = {
  defaultProps: satisfies<Partial<TurboCommonProps>>()({
    title: "",
    width: 450,
    height: 300,
    padding: 50,
    theme: VictoryTheme.grayscale,
  }),
};
