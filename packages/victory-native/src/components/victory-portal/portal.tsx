import React, { LegacyRef } from "react";
import { ViewStyle } from "react-native";
import Svg from "react-native-svg";
import { PortalProps } from "victory-core/es";

export const Portal = React.forwardRef<SVGSVGElement, PortalProps>(
  (props, ref) => {
    const { style, ...rest } = props;
    return (
      <Svg style={style as ViewStyle} ref={ref as LegacyRef<Svg>} {...rest} />
    );
  },
);
