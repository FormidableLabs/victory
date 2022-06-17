import * as React from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { D3ScaleFn, DomainTuple, ForAxes } from "../types/prop-types";
import { VictoryProviderProps } from "./types";
import { FormattedDatum, getData } from "./helpers/get-data";
import { getDomain } from "./helpers/get-domain";
import { getRange } from "./helpers/get-range";
import { getScale } from "./helpers/get-scale";

type ScaleType = Required<ForAxes<D3ScaleFn>>;
type DomainType = Required<ForAxes<DomainTuple>>;

export interface ContextType {
  data: FormattedDatum[];
  scale: ScaleType;
  domain: DomainType;
}

const VictoryContext = createContext<ContextType | null>(null);

export function VictoryProvider({
  children,
  includeZero,
  ...props
}: VictoryProviderProps) {
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

type ContextValue = ContextType | null;

export function useVictoryContext<T>(selector: (value: ContextType) => T): T {
  return useContextSelector<ContextValue, T>(VictoryContext, (context) => {
    if (!context) {
      throw new Error(
        "useVictoryContext must be used within a VictoryProvider"
      );
    }
    return selector(context);
  });
}

export function useScale() {
  return useVictoryContext<ScaleType>((value) => value.scale);
}

export function useData() {
  return useVictoryContext<FormattedDatum[]>((value) => value.data);
}

export function useDomain() {
  return useVictoryContext<DomainType>((value) => value.domain);
}
