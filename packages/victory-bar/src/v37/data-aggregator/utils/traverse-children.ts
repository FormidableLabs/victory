import React from "react";

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
