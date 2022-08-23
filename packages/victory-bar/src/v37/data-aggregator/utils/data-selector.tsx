import { VictoryDatableProps } from "victory-core";

export type Selector<TValue> = (data: DataSelector) => TValue;

type TProps = VictoryDatableProps;

export class DataSelector {
  public readonly props: Array<TProps>;

  constructor(props: Array<TProps>) {
    this.props = props;
  }
  propsAs<TPropsNew>() {
    return this.props as unknown as Array<TPropsNew>;
  }

  private _selectorResults = new Map<Selector<unknown>, unknown>();

  select<TValue>(selector: Selector<TValue>): TValue {
    if (this._selectorResults.has(selector)) {
      return this._selectorResults.get(selector) as TValue;
    }

    const value = selector(this);
    this._selectorResults.set(selector, value);
    return value;
  }

  dump() {
    return Object.fromEntries(
      [...this._selectorResults.entries()].map(([key, value]) => [
        key.name,
        value,
      ]),
    );
  }
}
