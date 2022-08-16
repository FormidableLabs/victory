import React from "react";
import { mapChildren, memoOne, useShallowMemo } from "./helpers";
import { VictoryCommonProps, VictoryDatableProps } from "victory-core/src";

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

export type DataAggregator<DataProps extends VictoryDatableProps> =
  LazyDataAggregator<DataProps>;

class LazyDataAggregator<DataProps extends VictoryDatableProps> {
  private readonly allProps: Array<DataProps>;
  constructor(allProps: Array<DataProps>) {
    this.allProps = allProps;
  }

  private _redefine<TKey extends keyof this, TValue>(
    key: TKey,
    value: TValue,
  ): TValue {
    Object.defineProperty(this, key, {
      value,
      enumerable: true,
      writable: false,
    });
    return value;
  }

  propsAs<TProps>() {
    return this.props as unknown as Array<TProps>;
  }
  dataAs<TDatum>() {
    return this.data as Array<Array<TDatum>>;
  }

  private _memoMap = new Map<unknown, unknown>();
  get<TValue>(getter: ((aggregator: this) => TValue) & { pure: true }): TValue {
    if (this._memoMap.has(getter)) {
      return this._memoMap.get(getter) as TValue;
    }

    const value = getter(this);
    this._memoMap.set(getter, value);
    return value;
  }

  get props() {
    const props = this.allProps;
    return this._redefine("props", props);
  }
  get data() {
    const data = this.allProps.map((props) => props.data!).filter(Boolean);
    return this._redefine("data", data);
  }
  get min() {
    const min = Math.min(
      ...this.dataAs<number>().map((data) => Math.min(...data)),
    );
    return this._redefine("min", min);
  }
  get max() {
    const max = Math.max(
      ...this.dataAs<number>().map((data) => Math.max(...data)),
    );
    return this._redefine("max", max);
  }
  dump() {
    return {
      min: this.min,
      max: this.max,
      dataCounts: this.data.map((data) => data.length),
      componentCount: this.props.length,
    };
  }
}
