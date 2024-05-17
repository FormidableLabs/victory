import React from "react";

export interface PortalContextValue {
  addChild: (id: string, node: React.ReactElement) => void;
  removeChild: (id: string) => void;
  children: Map<string, React.ReactElement>;
}

export const PortalContext = React.createContext<
  PortalContextValue | undefined
>(undefined);
PortalContext.displayName = "PortalContext";

export const usePortalContext = () => {
  const context = React.useContext(PortalContext);
  return context;
};

export interface PortalProviderProps {
  children?: React.ReactNode;
}

export const PortalProvider = ({ children }: PortalProviderProps) => {
  const [portalChildren, setPortalChildren] = React.useState<
    Map<string, React.ReactElement>
  >(new Map());
  const addChild = React.useCallback(
    (id: string, element: React.ReactElement) => {
      setPortalChildren((prevChildren) => {
        const nextChildren = new Map(prevChildren);
        nextChildren.set(id, element);
        return nextChildren;
      });
    },
    [setPortalChildren],
  );

  const removeChild = React.useCallback(
    (id: string) => {
      setPortalChildren((prevChildren) => {
        const nextChildren = new Map(prevChildren);
        nextChildren.delete(id);
        return nextChildren;
      });
    },
    [setPortalChildren],
  );

  const contextValue: PortalContextValue = React.useMemo(
    () => ({
      addChild,
      removeChild,
      children: portalChildren,
    }),
    [addChild, removeChild, portalChildren],
  );

  return (
    <PortalContext.Provider value={contextValue}>
      {children}
    </PortalContext.Provider>
  );
};
