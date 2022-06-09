import { Datum, ValueOrAxes } from "../types";
import { PaddingProps } from "../victory-theme/victory-theme-definition";
import {
  D3Scale,
  DomainTuple,
  RangeTuple,
  ScalePropType
} from "../victory-util/types";

export interface VictoryProviderProps {
  children?: React.ReactNode;
  data?: Datum[];
  domain?: ValueOrAxes<DomainTuple>;
  height?: number;
  maxDomain?: ValueOrAxes<number>;
  minDomain?: ValueOrAxes<number>;
  padding?: PaddingProps;
  range?: ValueOrAxes<RangeTuple>;
  samples?: number;
  scale?: ValueOrAxes<ScalePropType | D3Scale>;
  sortKey?: string;
  sortOrder?: "ascending" | "descending";
  width?: number;
  x?: string;
  y?: string;
}
