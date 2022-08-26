import React, { useMemo } from "react";
import { traverseChildren } from "../utils/traverse-children";
import { DataSelector } from "../utils/data-selector";
import { VictoryDatableProps } from "victory-core";

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
    const allProps = [] as VictoryDatableProps[];
    traverseChildren(children, (child) => {
      allProps.push(child.props);
    });
    return new DataSelector(allProps);
  }, [children]);
}
