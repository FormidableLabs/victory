import * as React from "react";
import { VictoryCommonPrimitiveProps } from "../victory-util/types";
import { ScatterSymbolType } from "./types";

export interface PointProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  getPath?: (x: number, y: number, size: number) => string;
  pathComponent?: React.ReactElement;
  size?: number | Function;
  symbol?: ScatterSymbolType | Function;
  x?: number;
  y?: number;
}

export default class Point extends React.Component<PointProps> {}
