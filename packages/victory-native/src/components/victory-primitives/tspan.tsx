import React from "react";
import { TSpan as TSpanBase, TSpanProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export type VictoryNativeTSpanProps = TSpanProps &
  VictoryNativePrimitiveShapeProps;

export const TSpan = (props: VictoryNativeTSpanProps) => {
  const { style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return <TSpanBase {...rest} {...nativeStyle} />;
};
