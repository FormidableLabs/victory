import * as React from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { D3ScaleFn, DomainTuple, ForAxes } from "../types/prop-types";
import { FormattedDatum, getData } from "./helpers/get-data";
import { getDomain } from "./helpers/get-domain";
import { getRange } from "./helpers/get-range";
import { getScale } from "./helpers/get-scale";
import { VictoryComponentProps, VictoryProviderProps } from "./types";

type ScaleType = Required<ForAxes<D3ScaleFn>>;
type DomainType = Required<ForAxes<DomainTuple>>;

export interface ContextType {
  data: FormattedDatum[];
  scale: ScaleType;
  domain: DomainType;
  setProps: (props: VictoryProviderProps) => void;
}

const VictoryContext = createContext<ContextType | null>(null);

export function VictoryProvider({ children, ...props }: VictoryProviderProps) {
  // We need to store the props in state so they can be overwritten by child components
  const [_props, _setProps] = React.useState(props);

  const setProps = React.useCallback((newProps: VictoryComponentProps) => {
    _setProps((prevProps) => ({ ...prevProps, ...newProps }));
  }, []);

  const data = React.useMemo(() => {
    return getData(_props);
  }, [_props]);

  const domain = React.useMemo(() => {
    return {
      x: getDomain(_props, "x"),
      y: getDomain(_props, "y")
    };
  }, [_props]);

  const range = React.useMemo(
    () => ({
      x: getRange(_props, "x"),
      y: getRange(_props, "y")
    }),
    [_props]
  );

  const scale = React.useMemo(() => {
    const xBaseScaleFn = getScale(_props, "x");
    const yBaseScaleFn = getScale(_props, "y");

    // @ts-expect-error: This is a valid scale function
    const xScaleFn = xBaseScaleFn().domain(domain.x).range(range.x);
    // @ts-expect-error: This is a valid scale function
    const yScaleFn = yBaseScaleFn().domain(domain.y).range(range.y);

    return {
      x: xScaleFn,
      y: yScaleFn
    };
  }, [_props, domain, range]);

  const value = {
    scale,
    data,
    domain,
    setProps
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

// This function keeps props in sync betwen the VictoryProvider and child components
export function useVictoryProps<
  T extends VictoryComponentProps,
  TRequired extends keyof T
>(id: string, props: T, defaults: T & Required<Pick<T, TRequired>>) {
  const setProps = useVictoryContext((value) => value.setProps);

  const propsWithDefaults = {
    ...defaults,
    ...props
  };

  React.useEffect(() => {
    setProps(propsWithDefaults);
  }, []);

  return propsWithDefaults;
}
