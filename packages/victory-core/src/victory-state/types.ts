import {
  D3ScaleFn,
  Datum,
  DomainTuple,
  RangeTuple,
  ScalePropType,
  ValueOrAxes,
} from "../types/prop-types";
import { PaddingProps } from "../victory-theme/types";

export interface VictoryProviderProps {
  children?: React.ReactNode;
  data?: Datum[];
  domain?: ValueOrAxes<DomainTuple>;
  height?: number;
  includeZero?: boolean;
  maxDomain?: ValueOrAxes<number>;
  minDomain?: ValueOrAxes<number>;
  padding?: PaddingProps;
  range?: ValueOrAxes<RangeTuple>;
  samples?: number;
  scale?: ValueOrAxes<ScalePropType | D3ScaleFn>;
  sortKey?: string;
  sortOrder?: "ascending" | "descending";
  width?: number;
  x?: string;
  y?: string;
}
