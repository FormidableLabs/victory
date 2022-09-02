import {
  DomainPaddingPropType,
  DomainPropType,
  SortOrderPropType,
} from "../../../types/prop-types";
import * as React from "react";

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
