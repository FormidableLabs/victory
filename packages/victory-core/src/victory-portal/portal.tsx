import React from "react";

export interface PortalProps {
  className?: string;
  height?: number;
  style?: React.CSSProperties;
  viewBox?: string;
  width?: number;
}

export const Portal = React.forwardRef<SVGSVGElement, PortalProps>(
  (props, ref) => {
    return <svg ref={ref} {...props} />;
  },
);
