import * as React from "react";
import { createContext, useContext } from "react";
import { D3ScaleFn, DomainTuple, ForAxes } from "../../types/prop-types";
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
  updateChildProps: (id: symbol, props: VictoryProviderProps | null) => void;
}

const VictoryContext = createContext<ContextType | null>(null);

type CollectedProps = { [id: symbol]: VictoryCalculatedStateProps };

function useNormalizedProps(): ContextType {
  const [collectedProps, setCollectedProps] = React.useState<CollectedProps>(
    {},
  );

  const updateChildProps = React.useCallback(
    (id: symbol, newProps: VictoryCalculatedStateProps | null) => {
      setCollectedProps((prev) => {
        const result = { ...prev };
        if (newProps === null) {
          delete result[id];
        } else {
          result[id] = newProps;
        }
        return result;
      });
    },
    [],
  );

  // TEMP: combine all props into a single result:
  // TODO: instead, we should intelligently aggregate all these props
  const props = Object.values(
    collectedProps,
  ).reduce<VictoryCalculatedStateProps>(
    (result, childProps) => Object.assign(result, childProps),
    {},
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

  const normalizedProps = React.useMemo(
    () => ({
      scale,
      data,
      domain,
      updateChildProps,
    }),
    [scale, data, domain, updateChildProps],
  );

  return normalizedProps;
}

export function VictoryProvider({
  children,
  // Disabled due to TODO below which will require this obj. spread
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...providerProps
}: VictoryProviderProps) {
  const value = useNormalizedProps();

  // TODO: sync the providerProps

  return (
    <VictoryContext.Provider value={value}>{children}</VictoryContext.Provider>
  );
}

export function useVictoryContextMaybe<T>(
  selector: (value: ContextType | null) => T,
): T {
  const context = useContext(VictoryContext);
  return selector(context);
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
export function useVictoryProviderSync(props: VictoryCalculatedStateProps) {
  const updateChildProps = useVictoryContext((value) => value.updateChildProps);
  const [myId] = React.useState(() =>
    Symbol("UniqueIdFor(VictoryProviderChild)"),
  );

  React.useEffect(() => {
    updateChildProps(myId, props);
  }, [updateChildProps, props, myId]);
}
