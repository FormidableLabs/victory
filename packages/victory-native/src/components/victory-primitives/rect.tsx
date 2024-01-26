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
