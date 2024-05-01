import React from "react";
// import { Path as PathBase, PathProps } from "react-native-svg";
import { PathProps, Path as SkiaPath } from "@shopify/react-native-skia";
import { useGetNativeStyle } from "../../helpers/native-helpers";
import { VictoryNativePrimitiveShapeProps } from "./types";

export type VictoryNativePathProps = Partial<PathProps> &
  VictoryNativePrimitiveShapeProps;

export const Path = (props: VictoryNativePathProps) => {
  // console.log("path", props.path);
  // @ts-ignore
  return <SkiaPath {...props} />;
  // const { "aria-label": accessibilityLabel, desc, style, ...rest } = props;
  // const nativeStyle = useGetNativeStyle(style);
  // return (
  //   <PathBase
  //     // @ts-expect-error Accessibility props are not supported in the version of react-native-svg being used
  //     // https://github.com/FormidableLabs/victory/issues/2744
  //     accessible={accessibilityLabel || undefined}
  //     accessibilityLabel={accessibilityLabel}
  //     accessibilityHint={accessibilityLabel && desc ? desc : undefined}
  //     {...rest}
  //     {...nativeStyle}
  //   />
  // );
};
