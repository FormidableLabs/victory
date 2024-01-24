import React from "react";
import { Path, PathProps } from "react-native-svg";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export type VictoryNativePathProps = PathProps &
  VictoryNativePrimitiveShapeProps;

const NativePath = (props: VictoryNativePathProps) => {
  const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  const nativeStyle = useGetNativeStyle(style);
  return (
    <Path
      accessible={accessibilityLabel || undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityLabel && desc ? desc : undefined}
      {...rest}
      {...nativeStyle}
    />
  );
};

export default NativePath;
