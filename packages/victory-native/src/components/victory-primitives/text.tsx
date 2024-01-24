import React from "react";
import { Text, TextProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export interface VictoryNativeTextProps
  extends TextProps,
    VictoryNativePrimitiveShapeProps {
  direction?: "inherit" | "rtl" | "ltr";
}

const NativeText = (props: VictoryNativeTextProps) => {
  const {
    "aria-label": accessibilityLabel,
    children,
    desc,
    style,
    ...rest
  } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <Text
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    >
      {children}
    </Text>
  );
};

export default NativeText;
