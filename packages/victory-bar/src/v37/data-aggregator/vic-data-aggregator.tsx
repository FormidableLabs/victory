import React, { useMemo } from "react";
import { mapChildren, useShallowMemo } from "./utils/helpers";
import { DataSelector } from "./utils/data-selector";

const DataAggregatorContext = React.createContext<DataSelector | null>(null);

export const VicDataAggregator = ({ children }: React.PropsWithChildren) => {
  const value = useDataAggregator(children);
  return (
    <DataAggregatorContext.Provider value={value}>
      {children}
    </DataAggregatorContext.Provider>
  );
};

export const useAggregateData = () => {
  const value = React.useContext(DataAggregatorContext);
  if (!value) throw new Error("Missing DataProvider!");
  return value;
};

function useDataAggregator(children: React.ReactNode) {
  return useMemo(() => {
    const allProps = mapChildren(children, (child) => {
      return child.props;
    });
    return new DataSelector(allProps);
  }, [children]);
}
