import React from "react";
import { mapChildren, useShallowMemo } from "./utils/helpers";
import { LazyDataAggregator } from "./utils/lazy-data-aggregator";

const DataAggregatorContext = React.createContext<ReturnType<
  typeof useDataAggregator
> | null>(null);

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
  const allProps = mapChildren(children, (child) => {
    return child.props;
  });
  return useShallowMemo(() => new LazyDataAggregator(allProps), allProps);
}
