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

/**
 * Recursively maps child props
 */
export function mapChildrenProps<TProps>(
  children: React.ReactNode,
  mapper: (child: React.ReactNode) => TProps,
) {
  return React.Children.map(children, (child) => {
    if (!child || typeof child !== "object") return child;
    if (isIterable(child)) {
      return mapChildrenProps(child, mapper);
    }

    const mappedProps = mapper(child) || child.props;
    const mappedChildren = mapChildrenProps(child.props.children, mapper);
    return React.cloneElement(child, mappedProps, mappedChildren);
  });
}

function isIterable(child: React.ReactNode): child is React.ReactFragment {
  return !!(child && child[Symbol.iterator]);
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
