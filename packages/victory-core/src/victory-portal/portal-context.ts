import React from "react";

export interface PortalContextValue {
  portalElement: SVGSVGElement | undefined;
}

/**
 * The React context object consumers may use to access the context of the
 * portal.
 */
export const PortalContext = React.createContext<
  PortalContextValue | undefined
>(undefined);

PortalContext.displayName = "PortalContext";
