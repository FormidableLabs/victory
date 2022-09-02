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
  // For Victory components, ALL props must have defaults:
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

  // Make the component Nestable:
  const Nestable = makeNestable({ aggregateProps, normalizeProps }, Component);
  // Ensure it always has a Container:
  const WithContainer = withTurboContainer(Nestable);
  // Add in some React configuration:
  const WithReactProps = Object.assign(WithContainer, {
    displayName,
    defaultProps,
    propTypes,
    victoryComponentConfig: componentConfig, // For future use
  });
  return WithReactProps;
}
