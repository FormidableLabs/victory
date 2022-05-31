import { VictoryCommonPrimitiveProps } from "../victory-util/types";
import * as React from "react";

export interface ClipPathProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode[] | React.ReactNode;
  clipId?: number | string;
}

export default class ClipPath extends React.Component<ClipPathProps> {}
