import React from "react";
import { Line as LineBase, LineProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export type VictoryNativeLineProps = LineProps &
  VictoryNativePrimitiveShapeProps;

export const Line = (props: VictoryNativeLineProps) => {
  const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);

  return (
    <LineBase
      vectorEffect="non-scaling-stroke"
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    />
  );
};
