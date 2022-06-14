import * as React from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { D3ScaleFn, DomainTuple, ForAxes } from "../types/prop-types";
import { VictoryProviderProps } from "./types";
import { FormattedDatum, useData } from "./use-data";
import { useDomain } from "./use-domain";
import { useRange } from "./use-range";
import { useScale } from "./use-scale";

interface ContextType {
  data: FormattedDatum[];
  scale: Required<ForAxes<D3ScaleFn>>;
  domain: Required<ForAxes<DomainTuple>>;
}

const VictoryContext = createContext<ContextType | null>(null);

export function VictoryProvider({
  children,
  includeZero,
  ...props
}: VictoryProviderProps) {
  // TODO: Get data
  const xDomain = useDomain(props, "x", includeZero);
  const yDomain = useDomain(props, "y", includeZero);
  const domain = { x: xDomain, y: yDomain };

  const xRange = useRange(props, "x");
  const yRange = useRange(props, "y");

  const xBaseScaleFn = useScale(props, "x");
  const yBaseScaleFn = useScale(props, "y");

  // @ts-expect-error: This is a valid scale function
  const xScaleFn = xBaseScaleFn().domain(xDomain).range(xRange);
  // @ts-expect-error: This is a valid scale function
  const yScaleFn = yBaseScaleFn().domain(yDomain).range(yRange);

  const scale = {
    x: xScaleFn,
    y: yScaleFn
  };

  const data = useData(props);

  const value = {
    scale,
    data,
    domain
  };

  return (
    <VictoryContext.Provider value={value}>{children}</VictoryContext.Provider>
  );
}

export function useVictoryContext() {
  const context = useContextSelector<ContextType | null, ContextType | null>(
    VictoryContext,
    (c) => c
  );

  if (!context) {
    throw new Error("useVictoryState must be used within a VictoryProvider");
  }

  return context;
}
