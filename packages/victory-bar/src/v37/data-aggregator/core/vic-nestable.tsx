import React from "react";
import { mapChildrenProps } from "../utils/traverse-children";

/* eslint-disable react/no-multi-comp */

type NestableContextValue = ReturnType<typeof getNestableContextValue>;
const NestableContext = React.createContext<NestableContextValue | null>(null);

export type NestableConfig = {
  displayName: string;
  propTypes: any;
  defaultProps: any;
  normalizeProps: any;
  aggregateProps: any;
};

/**
 * Makes a component nestable, so the props can be normalized and aggregated
 */
export function makeNestable(
  config: NestableConfig,
  Component: ((props: NestableProps) => JSX.Element) & { displayName?: string },
) {
  Component.displayName = config.displayName;

  const NestableComponent = (props: React.PropsWithChildren<NestableProps>) => {
    const allNormalizedProps = React.useContext(NestableContext);

    if (!allNormalizedProps) {
      // Nest this component in a NestableContext and render again:
      return (
        <NestableContextProvider>
          <NestableComponent {...props}>{props.children}</NestableComponent>
        </NestableContextProvider>
      );
    }

    // We are already nested; this means our props are already normalized.
    // Let's calculate our aggregate props:
    const aggregateProps = getAggregateProps(config, allNormalizedProps, props);
    return (
      <Component {...props} {...aggregateProps}>
        {props.children}
      </Component>
    );
  };
  NestableComponent.nestableConfig = config;
  // Standard React configs:
  NestableComponent.displayName = `NestableComponent(${config.displayName})`;
  NestableComponent.defaultProps = config.defaultProps;
  NestableComponent.propTypes = config.propTypes;

  return NestableComponent;
}

/**
 * Clones all children, normalizing their properties, and collecting all props
 */
function NestableContextProvider({ children }: React.PropsWithChildren) {
  // Traverse all children, normalizing their props, and collecting the results:
  const allProps: NestableProps[] = [];
  const normalizedTree = mapChildrenProps(children, (child) => {
    if (isNestableNode(child)) {
      const normalizedProps = getNormalizedProps(
        child.type.nestableConfig,
        child.props,
      );
      allProps.push({ ...child.props, ...normalizedProps });
      return normalizedProps;
    }
  });

  const value = getNestableContextValue(allProps);

  return (
    <NestableContext.Provider value={value}>
      {normalizedTree}
    </NestableContext.Provider>
  );
}

function getNestableContextValue(allProps: NestableProps[]) {
  return {
    allProps,
    memo: createMemo(),
  };
}

type NestableComponent = ReturnType<typeof makeNestable>;
type NestableProps = Record<any, unknown>;
type NestableComponentNode = React.ReactElement<
  NestableProps,
  NestableComponent
>;

/**
 * Determines whether the React child is one of our nested nodes
 */
function isNestableNode(
  child: React.ReactNode,
): child is NestableComponentNode {
  return !!(
    child &&
    typeof child === "object" &&
    (child as NestableComponentNode).type?.nestableConfig
  );
}

function getAggregateProps(
  config: NestableConfig,
  context: NestableContextValue,
  props: NestableProps,
): NestableProps {
  const aggregateResults = mapObject(config.aggregateProps, (aggregator) => {
    return aggregator(props, context.allProps, context.memo);
  });
  return aggregateResults;
}

function getNormalizedProps(
  nestableConfig: NestableConfig,
  props: NestableProps,
): NestableProps {
  const normalizedResults = mapObject(
    nestableConfig.normalizeProps,
    (normalizer) => {
      return normalizer(props);
    },
  );
  return normalizedResults;
}

function mapObject(obj, map) {
  const mapped = {};
  Object.keys(obj).forEach((key) => {
    mapped[key] = map(obj[key], key, obj);
  });
  return mapped;
}
function createMemo() {
  return function memo(callback, ...args) {
    // TODO!
    return callback(...args);
  };
}
