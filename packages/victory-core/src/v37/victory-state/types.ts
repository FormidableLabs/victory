import {
  D3ScaleFn,
  Datum,
  DomainTuple,
  RangeTuple,
  ScalePropType,
  ValueOrAxes,
} from "../../types/prop-types";
import { PaddingProps } from "../../victory-theme/types";

// These are all the props that are used to calculate data, domain, range, and scale
export interface VictoryCalculatedStateProps {
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

export interface VictoryProviderProps extends VictoryCalculatedStateProps {
  children?: React.ReactNode;
}
