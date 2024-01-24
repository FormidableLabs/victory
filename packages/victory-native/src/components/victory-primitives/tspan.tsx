import React from "react";
import { TSpan, TSpanProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export type VictoryNativeTSpanProps = TSpanProps &
  VictoryNativePrimitiveShapeProps;

const NativeTSpan = (props: VictoryNativeTSpanProps) => {
  const { style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return <TSpan {...rest} {...nativeStyle} />;
};

export default NativeTSpan;
