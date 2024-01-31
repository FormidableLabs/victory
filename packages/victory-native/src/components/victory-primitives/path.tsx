import React from "react";
import { Path as PathBase, PathProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export type VictoryNativePathProps = PathProps &
  VictoryNativePrimitiveShapeProps;

export const Path = (props: VictoryNativePathProps) => {
  const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <PathBase
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
