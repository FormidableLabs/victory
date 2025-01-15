import { NAV_ITEMS, NavItem } from "../_components/sidenav";
import React, { createContext, useContext, useState } from "react";

type SideNavContextType = {
  activeSideNavItem: NavItem;
  setActiveSideNavItem: (navItem: NavItem) => void;
};

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export const SideNavProvider = ({ children }) => {
  const [activeSideNavItem, setActiveSideNavItem] = useState(NAV_ITEMS[0]);

  return (
    <SideNavContext.Provider
      value={{
        activeSideNavItem,
        setActiveSideNavItem,
      }}
    >
      {children}
    </SideNavContext.Provider>
  );
};

export const useSideNavContext = () => {
  const context = useContext(SideNavContext);
  if (context === undefined) {
    throw new Error("useSideNavContext must be used within a SideNavProvider");
  }
  return context;
};
