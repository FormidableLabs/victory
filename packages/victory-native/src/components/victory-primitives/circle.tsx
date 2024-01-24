import React from "react";
import { Circle, CircleProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export type VictoryNativeCircleProps = CircleProps &
  VictoryNativePrimitiveShapeProps;

const NativeCircle = (props: VictoryNativeCircleProps) => {
  const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <Circle
      vectorEffect="non-scaling-stroke"
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    />
  );
};

export default NativeCircle;
