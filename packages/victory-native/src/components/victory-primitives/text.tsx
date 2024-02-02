import React from "react";
import { Text as TextBase, TextProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export interface VictoryNativeTextProps
  extends TextProps,
    VictoryNativePrimitiveShapeProps {
  direction?: "inherit" | "rtl" | "ltr";
}

export const Text = (props: VictoryNativeTextProps) => {
  const {
    "aria-label": accessibilityLabel,
    children,
    desc,
    style,
    ...rest
  } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <TextBase
      // @ts-expect-error Accessibility props are not supported in the version of react-native-svg being used
      // https://github.com/FormidableLabs/victory/issues/2744
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    >
      {children}
    </TextBase>
  );
};
