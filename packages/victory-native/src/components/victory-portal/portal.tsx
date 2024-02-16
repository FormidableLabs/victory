import React, { LegacyRef } from "react";
import Svg from "react-native-svg";
import { PortalProps } from "victory-core/es";

export const Portal = React.forwardRef<SVGSVGElement, PortalProps>(
  (props, ref) => {
    return <Svg ref={ref as LegacyRef<Svg>} {...props} />;
  },
);
