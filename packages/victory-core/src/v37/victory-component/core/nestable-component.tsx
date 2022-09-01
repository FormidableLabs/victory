import React from "react";
import { mapChildrenProps } from "../utils/traverse-children";
import { createMemo, Memoizer } from "../utils/create-memo";

/* eslint-disable react/no-multi-comp */

// Start with a bunch of types:

type UnknownProps = unknown;

export type NestableConfig<TExternalProps, TNormalizeProps, TAggregateProps> = {
  normalizeProps: NormalizePropsConfig<TExternalProps, TNormalizeProps>;
  aggregateProps: AggregatePropsConfig<
    Override<TExternalProps, TNormalizeProps>,
    TAggregateProps
  >;
};

export type NormalizePropsConfig<TExternalProps, TNormalizeProps> = {
  [Prop in keyof TNormalizeProps]: Normalizer<
    TExternalProps,
    TNormalizeProps[Prop]
  >;
};

export type Normalizer<TExternalProps, TResult> = (
  props: TExternalProps,
  memo: Memoizer,
) => TResult;

export type AggregatePropsConfig<TNormalizedProps, TAggregateProps> = {
  [Prop in keyof TAggregateProps]: Aggregator<
    TNormalizedProps,
    TAggregateProps[Prop]
  >;
};

export type Aggregator<TNormalizedProps, TResult> = (
  props: TNormalizedProps,
  allProps: UnknownProps[],
  memo: Memoizer,
) => TResult;

export type ComponentImplementation<
  TExternalProps,
  TNormalizeProps,
  TAggregateProps,
> = (
  props: ComponentImplementationProps<
    TExternalProps,
    TNormalizeProps,
    TAggregateProps
  >,
) => JSX.Element;

export type NormalizedProps<TExternalProps, TNormalizeProps> = Override<
  TExternalProps,
  TNormalizeProps
>;

export type ComponentImplementationProps<
  TExternalProps,
  TNormalizeProps,
  TAggregateProps,
> = Override<Override<TExternalProps, TNormalizeProps>, TAggregateProps>;

export type Override<TOriginal, TOverrides> = Omit<
  TOriginal,
  keyof TOverrides
> &
  TOverrides;

// NestableParent:
const NestableContext = React.createContext<NestableContextValue | null>(null);
/**
 * Traverses all children, normalizes their properties, and collects all props for aggregation
 */
export function NestableParent({ children }: React.PropsWithChildren) {
  // We use memo to allow components to share calculated data:
  const memo = createMemo();

  // Traverse all children, normalizing their props, and collecting the results:
  const allProps: NestableProps[] = [];
  const normalizedTree = mapChildrenProps(children, (child) => {
    if (isNestableNode(child)) {
      const normalizedProps = getNormalizedProps(
        child.type.nestableConfig,
        child.props,
        memo,
      );
      allProps.push({ ...child.props, ...normalizedProps });
      return normalizedProps;
    }
  });
  if (allProps.length === 0) {
    // eslint-disable-next-line no-console
    console.error(
      `[Victory] [NestedParent] Did not find any nestable children`,
    );
  }

  const value = getNestableContextValue(allProps, memo);

  return (
    <NestableContext.Provider value={value}>
      {normalizedTree}
    </NestableContext.Provider>
  );
}
function getNestableContextValue(allProps: NestableProps[], memo: Memoizer) {
  return {
    allProps,
    memo,
  };
}
type NestableContextValue = ReturnType<typeof getNestableContextValue>;

// Use currying to allow for explicit TExternalProps while inferring the rest
export const makeNestableInferred =
  <TExternalProps,>() =>
  <TNormalizeProps, TAggregateProps>(
    nestableConfig: NestableConfig<
      TExternalProps,
      TNormalizeProps,
      TAggregateProps
    >,
    Component: ComponentImplementation<
      TExternalProps,
      TNormalizeProps,
      TAggregateProps
    >,
  ) =>
    makeNestable(nestableConfig, Component);

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
  const NestableComponent = (
    props: React.PropsWithChildren<TExternalProps>,
  ): JSX.Element => {
    const allNormalizedProps = React.useContext(NestableContext);

    if (!allNormalizedProps) {
      throw new Error("[NestableComponent] Did not find a NestableParent");
    }

    // We are already nested; this means our props are already normalized.
    const normalizedProps = props as unknown as NormalizedProps<
      TExternalProps,
      TNormalizeProps
    >;
    // Let's calculate our aggregate props:
    const aggregateProps = getAggregateProps(
      config,
      allNormalizedProps,
      normalizedProps,
    );
    return (
      <Component {...normalizedProps} {...aggregateProps}>
        {props.children}
      </Component>
    );
  };
  NestableComponent.nestableConfig = config;
  return NestableComponent;
}

type NestableComponent = ReturnType<typeof makeNestable>;
type NestableProps = Record<any, unknown>;
type NestableComponentNode = React.ReactElement<
  NestableProps,
  NestableComponent
>;

/**
 * Determines whether the React child is one of our nestable nodes
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
  props: Override<TExternalProps, TNormalizeProps>,
): TAggregateProps {
  const aggregateResults = mapObject(config.aggregateProps, (aggregator) => {
    return aggregator(props, context.allProps, context.memo);
  }) as TAggregateProps;
  return aggregateResults;
}

function getNormalizedProps<
  TExternalProps,
  TNormalizeProps extends object,
  TAggregateProps,
>(
  nestableConfig: NestableConfig<
    TExternalProps,
    TNormalizeProps,
    TAggregateProps
  >,
  props: TExternalProps,
  memo: Memoizer,
): TNormalizeProps {
  const normalizedResults = mapObject(
    nestableConfig.normalizeProps,
    (normalizer) => {
      return normalizer(props, memo);
    },
  ) as TNormalizeProps;
  return normalizedResults;
}

function mapObject<T>(
  obj: T,
  map: (value: T[keyof T], key: keyof T) => unknown,
) {
  const mapped = {};
  Object.keys(obj).forEach((key) => {
    mapped[key] = map(obj[key], key as keyof T);
  });
  return mapped;
}
