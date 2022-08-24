import React, { useRef } from "react";

export function traverseChildren(
  children: React.ReactNode,
  callback: (node: React.ReactElement) => void,
): void {
  React.Children.forEach(children, (child) => {
    if (!child || typeof child !== "object") return;
    const c = child as React.ReactElement;
    callback(c);
    if (c.props.children) {
      traverseChildren(c.props.children, callback);
    }
  });
}
export function mapChildren<TResult>(
  children: React.ReactNode,
  callback: (node: React.ReactElement) => TResult | null | undefined,
): TResult[] {
  const results = [] as TResult[];
  traverseChildren(children, (child) => {
    const result = callback(child) ?? null;
    if (result !== null) {
      results.push(result);
    }
  });
  return results;
}

export function shallowEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

export function useShallowMemo<TResult>(
  factory: () => TResult,
  dependencies: unknown[],
): TResult {
  type TRef = {
    value: TResult;
    dependencies: typeof dependencies;
  };
  const ref = useRef<TRef | null>(null);
  if (
    ref.current === null ||
    !shallowEqual(dependencies, ref.current.dependencies)
  ) {
    ref.current = {
      value: factory(),
      dependencies,
    };
  }
  return ref.current.value;
}
