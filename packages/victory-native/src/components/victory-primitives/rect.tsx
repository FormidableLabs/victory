import React from "react";
import { Rect as RectBase, RectProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export type VictoryNativeRectProps = RectProps &
  VictoryNativePrimitiveShapeProps;

export const Rect = (props: VictoryNativeRectProps) => {
  const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <RectBase
      vectorEffect="non-scaling-stroke"
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    />
  );
};
