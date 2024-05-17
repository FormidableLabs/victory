import React from "react";
import { usePortalContext } from "./portal-context";

export interface PortalOutletProps {
  as: React.ReactElement;
  width?: number;
  height?: number;
  viewBox?: string;
  preserveAspectRatio?: string;
  style?: React.CSSProperties;
  children?: (children: React.ReactElement[]) => React.ReactNode | undefined;
}

export const PortalOutlet = ({
  as: portalComponent,
  ...props
}: PortalOutletProps) => {
  const portalContext = usePortalContext();

  if (!portalContext) {
    return null;
  }

  const children = Array.from(portalContext.children.values());
  return React.cloneElement(portalComponent, props, children);
};
