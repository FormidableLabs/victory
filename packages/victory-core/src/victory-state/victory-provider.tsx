import * as React from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { D3ScaleFn, Datum, DomainTuple, ForAxes } from "../types/prop-types";
import { VictoryProviderProps } from "./types";
import { FormattedDatum, getData } from "./helpers/get-data";
import { getDomain } from "./helpers/get-domain";
import { getRange } from "./helpers/get-range";
import { getScale } from "./helpers/get-scale";
import { rollups } from "victory-vendor/d3-array";

type ScaleType = Required<ForAxes<D3ScaleFn>>;
type DomainType = Required<ForAxes<DomainTuple>>;

export interface ContextType {
  data: FormattedDatum[];
  setData: (data: Datum[]) => void;
  scale: ScaleType;
  domain: DomainType;
}

const VictoryContext = createContext<ContextType | null>(null);

export function VictoryProvider({
  children,
  includeZero,
  maxDomain,
  minDomain,
  x,
  y,
  sortKey,
  sortOrder,
  ...props
}: VictoryProviderProps) {
  const [data, _setData] = React.useState(getData(props));

  const setData = React.useCallback(
    (value: Datum[]) => {
      const normalizedData = getData({ data: value, x, y, sortKey, sortOrder });
      _setData(normalizedData);
    },
    [x, y, sortKey, sortOrder]
  );

  const domain = React.useMemo(() => {
    const domainProps = {
      data,
      domain: props.domain,
      maxDomain,
      minDomain
    };
    return {
      x: getDomain(domainProps, "x", includeZero),
      y: getDomain(domainProps, "y", includeZero)
    };
  }, [data, props.domain, maxDomain, minDomain, includeZero]);

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

  const value = {
    scale,
    data,
    domain,
    setData
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
  return useVictoryContext<[FormattedDatum[], (data: Datum[]) => void]>(
    (value) => [value.data, value.setData]
  );
}

export function useDomain() {
  return useVictoryContext<DomainType>((value) => value.domain);
}
