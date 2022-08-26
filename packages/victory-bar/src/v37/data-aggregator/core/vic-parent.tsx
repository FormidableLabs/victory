import React from "react";
import {
  isVictoryChild,
  normalizeChildProps,
  wrapVictoryChild,
} from "./vic-child";

export function VicParent(props: React.PropsWithChildren): JSX.Element {
  const allNormalizedProps = [] as any[];
  const children = mapChildrenProps(props.children, (child) => {
    if (isVictoryChild(child)) {
      const normalizedProps = normalizeChildProps(
        child.type.victoryConfig,
        child.props,
      );
      allNormalizedProps.push(normalizedProps);
      return normalizedProps;
    }
  });

  const aggregateProps = getAggregateProps(props, allNormalizedProps);

  return (
    <AggregatePropsContext.Provider value={aggregateProps}>
      {children}
    </AggregatePropsContext.Provider>
  );
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
  return Array.isArray(child);
}

const AggregatePropsContext = React.createContext(null);
function getAggregateProps(parentProps, allChildProps) {
  // TODO
  return {
    domain: null,
    scale: null,
    range: null,
    totalDatasets: allChildProps.length,
  };
}
export function useAggregateProps() {
  const props = React.useContext(AggregatePropsContext);
  if (!props) throw new Error("Missing props aggregator");
  return props;
}
