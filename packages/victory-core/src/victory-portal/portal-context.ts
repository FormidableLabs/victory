import React from "react";

export interface PortalContextValue {
  portalRegister(): number;
  portalUpdate(key: number, element: React.ReactElement): void;
  portalDeregister(key: number): void;
}

/**
 * The React context object consumers may use to access the context of the
 * portal.
 */
export const PortalContext = React.createContext({} as PortalContextValue);
PortalContext.displayName = "PortalContext";
