import * as React from "react";
import { createContext, useContext } from "react";
import { D3ScaleFn, DomainTuple, ForAxes } from "../types/prop-types";
import { FormattedDatum, getData } from "./helpers/get-data";
import { getDomain } from "./helpers/get-domain";
import { getRange } from "./helpers/get-range";
import { getScale } from "./helpers/get-scale";
import { VictoryCalculatedStateProps, VictoryProviderProps } from "./types";

type ScaleType = Required<ForAxes<D3ScaleFn>>;
type DomainType = Required<ForAxes<DomainTuple>>;

export interface ContextType {
  data: FormattedDatum[];
  scale: ScaleType;
  domain: DomainType;
  setChildProps: (id: string, props: VictoryProviderProps) => void;
}

const VictoryContext = createContext<ContextType | null>(null);

export function VictoryProvider({
  children,
  ...initialProps
}: VictoryProviderProps) {
  // We need to store the props in state so they can be overwritten by child components
  const [props, setProps] = React.useState(initialProps);

  const setChildProps = React.useCallback(
    (id: string, newProps: VictoryCalculatedStateProps) => {
      setProps((prevProps) => {
        return { ...prevProps, ...newProps };
      });
    },
    [],
  );

  const data = React.useMemo(() => {
    return getData(props);
  }, [props]);

  const domain = React.useMemo(() => {
    return {
      x: getDomain(props, "x"),
      y: getDomain(props, "y"),
    };
  }, [props]);

  const range = React.useMemo(
    () => ({
      x: getRange(props, "x"),
      y: getRange(props, "y"),
    }),
    [props],
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
      y: yScaleFn,
    };
  }, [props, domain, range]);

  const value = {
    scale,
    data,
    domain,
    setChildProps,
  };

  return (
    <VictoryContext.Provider value={value}>{children}</VictoryContext.Provider>
  );
}

export function useVictoryContext<T>(selector: (value: ContextType) => T): T {
  const context = useContext(VictoryContext);
  if (!context) {
    throw new Error("useVictoryContext must be used within a VictoryProvider");
  }
  return selector(context);
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
export function useVictoryProviderSync(
  id: string,
  props: VictoryCalculatedStateProps,
) {
  const setChildProps = useVictoryContext((value) => value.setChildProps);

  React.useEffect(() => {
    setChildProps(id, props);
  }, []);

  return props;
}
