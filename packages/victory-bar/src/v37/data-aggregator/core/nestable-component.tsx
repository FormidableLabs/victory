import React, { ValidationMap } from "react";
import { mapChildrenProps } from "../utils/traverse-children";

/* eslint-disable react/no-multi-comp */

type NestableContextValue = ReturnType<typeof getNestableContextValue>;
const NestableContext = React.createContext<NestableContextValue | null>(null);

type UnknownProps = unknown;

export type NestableConfig<TExternalProps, TNormalizeProps, TAggregateProps> = {
  displayName: string;
  propTypes: ValidationMap<TExternalProps>;
  defaultProps: TExternalProps;
  normalizeProps: NormalizePropsConfig<TExternalProps, TNormalizeProps>;
  aggregateProps: AggregatePropsConfig<TExternalProps, TAggregateProps>;
};
export type NormalizePropsConfig<TExternalProps, TNormalizeProps> = {
  [Prop in keyof TNormalizeProps]: (
    props: TExternalProps,
  ) => TNormalizeProps[Prop];
};
export type AggregatePropsConfig<TExternalProps, TAggregateProps> = {
  [Prop in keyof TAggregateProps]: (
    props: TExternalProps,
    allProps: UnknownProps[],
  ) => TAggregateProps[Prop];
};

export type ComponentImplementation<
  TExternalProps,
  TNormalizeProps,
  TAggregateProps,
> = ((
  props: NormalizedProps<TExternalProps, TNormalizeProps, TAggregateProps>,
) => JSX.Element) & { displayName?: string };

export type NormalizedProps<TExternalProps, TNormalizeProps, TAggregateProps> =
  Omit<TExternalProps, keyof TNormalizeProps | keyof TAggregateProps> &
    TNormalizeProps &
    TAggregateProps;

// Use currying to allow for explicit TExternalProps while inferring the rest
export const makeNestableInferred =
  <TExternalProps,>() =>
  <TNormalizeProps, TAggregateProps>(
    config: NestableConfig<TExternalProps, TNormalizeProps, TAggregateProps>,
    Component: ComponentImplementation<
      TExternalProps,
      TNormalizeProps,
      TAggregateProps
    >,
  ) =>
    makeNestable(config, Component);

/**
 * Makes a component nestable, so the props can be normalized and aggregated
 */
export function makeNestable<TExternalProps, TNormalizeProps, TAggregateProps>(
  config: NestableConfig<TExternalProps, TNormalizeProps, TAggregateProps>,
  Component: ComponentImplementation<
    TExternalProps,
    TNormalizeProps,
    TAggregateProps
  >,
) {
  Component.displayName = config.displayName;

  const NestableComponent = (
    props: React.PropsWithChildren<TExternalProps>,
  ): JSX.Element => {
    const allNormalizedProps = React.useContext(NestableContext);

    if (!allNormalizedProps) {
      // Nest this component in a NestableContext and render again:
      return (
        <NestableContextProvider>
          {/* @ts-expect-error These props are fine, the generics are hard */}
          <NestableComponent {...props}>{props.children}</NestableComponent>
        </NestableContextProvider>
      );
    }

    // We are already nested; this means our props are already normalized.
    // Let's calculate our aggregate props:
    const aggregateProps = getAggregateProps(config, allNormalizedProps, props);
    return (
      // @ts-expect-error These props are fine, the generics are hard
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
      // @ts-expect-error "Can only spread objects"
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

function getAggregateProps<TExternalProps, TNormalizeProps, TAggregateProps>(
  config: NestableConfig<TExternalProps, TNormalizeProps, TAggregateProps>,
  context: NestableContextValue,
  props: NestableProps,
): TAggregateProps {
  const aggregateResults = mapObject(config.aggregateProps, (aggregator) => {
    return aggregator(props, context.allProps, context.memo);
  }) as TAggregateProps;
  return aggregateResults;
}

function getNormalizedProps<TExternalProps, TNormalizeProps, TAggregateProps>(
  nestableConfig: NestableConfig<
    TExternalProps,
    TNormalizeProps,
    TAggregateProps
  >,
  props: NestableProps,
): TNormalizeProps {
  const normalizedResults = mapObject(
    nestableConfig.normalizeProps,
    (normalizer) => {
      return normalizer(props);
    },
  ) as TNormalizeProps;
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
