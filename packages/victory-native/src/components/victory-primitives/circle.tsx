import React from "react";
import { Circle as CircleBase, CircleProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export type VictoryNativeCircleProps = CircleProps &
  VictoryNativePrimitiveShapeProps;

export const Circle = (props: VictoryNativeCircleProps) => {
  const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <CircleBase
      vectorEffect="non-scaling-stroke"
      // @ts-expect-error Accessibility props are not supported in the version of react-native-svg being used
      // https://github.com/FormidableLabs/victory/issues/2744
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    />
  );
};
