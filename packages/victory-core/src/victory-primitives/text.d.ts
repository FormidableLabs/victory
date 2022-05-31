import { VictoryCommonPrimitiveProps } from "../victory-util/types";
import * as React from "react";

export interface TextProps extends VictoryCommonPrimitiveProps {
  children?: React.ReactNode;
  desc?: string;
  title?: string;
}

export default class Text extends React.Component<TextProps> {}
