import React from "react";
import {
  isVictoryChild,
  normalizeChildProps,
  wrapVictoryChild,
} from "./vic-child";
import { mapChildrenProps } from "../utils/traverse-children";

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
