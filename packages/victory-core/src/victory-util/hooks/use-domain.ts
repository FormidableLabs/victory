import * as React from "react";
import { PaddingProps } from "../../victory-theme/victory-theme";

// TODO: Move this to ../types.ts
type ForAxes<T> = T | { x?: T; y?: T };
type Tuple<T> = [T, T];
type Axis = "x" | "y";
type DomainTuple = Tuple<number> | Tuple<Date>;
type ValueOrAxesObject<T> = T | ForAxes<T>;

interface DomainProps {
  domain?: ValueOrAxesObject<DomainTuple>;
  maxDomain?: ValueOrAxesObject<number>;
  minDomain?: ValueOrAxesObject<number>;
  domainPadding?: ValueOrAxesObject<number | Tuple<number>>;
  width?: number;
  height?: number;
  padding?: PaddingProps;
}

export type DomainResult = { x: DomainTuple; y: DomainTuple };

function hasValueForAxis<T = unknown>(
  value: unknown | ForAxes<T>,
  axis: Axis
): value is ForAxes<T> {
  if (typeof value === "object" && value !== null) {
    return axis in value;
  }
  return false;
}

function isTuple<T = unknown>(value: unknown): value is Tuple<T> {
  return Array.isArray(value) && value.length === 2;
}

function getValueForAxis<T = unknown>(
  value: T | ForAxes<T> | undefined,
  axis: Axis
): T | undefined {
  if (hasValueForAxis<T>(value, axis)) {
    return value[axis] as T;
  }
  return value;
}

export function useDomain(props: DomainProps): DomainResult {
  const getDomainPadding = React.useCallback(
    (axis: Axis) => {
      const domainPadding = getValueForAxis<number | Tuple<number>>(
        props.domainPadding,
        axis
      );
      if (isTuple(domainPadding)) {
        const [left, right] = domainPadding;
        return { left, right };
      }
      return { left: domainPadding, right: domainPadding };
    },
    [props.domainPadding]
  );

  const getDomainFromProps = React.useCallback(
    (axis: Axis) => {
      const domain = getValueForAxis<DomainTuple>(props.domain, axis);
      if (isTuple(domain)) {
        return domain;
      }
      // TODO: Victoy currently has some really specific logic in getDomainFromMinMax
      // that adds or subtracts a very small number from each domain to avoid the min
      // and max being the same value. This has resulted in some weird behavior in the
      // past, so we should revisit this.
      const minDomain = getValueForAxis<number>(props.minDomain, axis) || 0;
      const maxDomain = getValueForAxis<number>(props.maxDomain, axis) || 0;
      return [minDomain, maxDomain] as Tuple<number>;
    },
    [props.domain, props.minDomain, props.maxDomain]
  );

  const x = React.useMemo(() => {
    return getDomainFromProps("x");
  }, [getDomainFromProps]);

  const y = React.useMemo(() => {
    return getDomainFromProps("y");
  }, [getDomainFromProps]);

  return { x, y };
}
