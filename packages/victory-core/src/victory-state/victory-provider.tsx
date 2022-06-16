import * as React from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { D3ScaleFn, DomainTuple, ForAxes } from "../types/prop-types";
import { VictoryProviderProps } from "./types";
import { FormattedDatum, getData } from "./helpers/get-data";
import { getDomain } from "./helpers/get-domain";
import { getRange } from "./helpers/get-range";
import { getScale } from "./helpers/get-scale";

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
  const domain = React.useMemo(
    () => ({
      x: getDomain(props, "x", includeZero),
      y: getDomain(props, "y", includeZero)
    }),
    [props, includeZero]
  );

  const range = React.useMemo(
    () => ({
      x: getRange(props, "x"),
      y: getRange(props, "y")
    }),
    [props]
  );

  const scale = React.useMemo(() => {
    const xBaseScaleFn = getScale(props, "x");
    const yBaseScaleFn = getScale(props, "y");

    // @ts-expect-error: This is a valid scale function
    const xScaleFn = xBaseScaleFn().domain(domain.x).range(range.x);
    // @ts-expect-error: This is a valid scale function
    const yScaleFn = yBaseScaleFn().domain(domain.y).range(range.y);

    return {
      x: xScaleFn,
      y: yScaleFn
    };
  }, [props, domain, range]);

  const data = React.useMemo(() => getData(props), [props]);

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
