import {
  ComponentImplementation,
  makeNestable,
  NestableConfig,
} from "./nestable-component";
import {
  TurboContainerProps,
  withTurboContainer,
} from "./with-turbo-container";
import { ValidationMap } from "react";

export type TurboComponentConfig<
  TExternalProps,
  TNormalizeProps,
  TAggregateProps,
> = NestableConfig<TExternalProps, TNormalizeProps, TAggregateProps> & {
  // Standard React fields:
  displayName: string;
  propTypes: ValidationMap<TExternalProps>;
  defaultProps: TExternalProps;
};

// Use currying to allow for explicit TExternalProps while inferring the rest
export const createTurboComponent =
  <TExternalProps extends TurboContainerProps>() =>
  <TNormalizeProps, TAggregateProps>(
    componentConfig: TurboComponentConfig<
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
    createVictoryComponentInternal(componentConfig, Component);

export function createVictoryComponentInternal<
  TExternalProps extends TurboContainerProps,
  TNormalizeProps,
  TAggregateProps,
>(
  componentConfig: TurboComponentConfig<
    TExternalProps,
    TNormalizeProps,
    TAggregateProps
  >,
  Component: ComponentImplementation<
    TExternalProps,
    TNormalizeProps,
    TAggregateProps
  >,
) {
  const {
    displayName,
    defaultProps,
    propTypes,
    aggregateProps,
    normalizeProps,
  } = componentConfig;

  const Result = withTurboContainer(
    makeNestable({ aggregateProps, normalizeProps }, Component),
  );
  return Object.assign(Result, {
    displayName,
    defaultProps,
    propTypes,
  });
}
