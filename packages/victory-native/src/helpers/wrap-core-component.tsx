import React from "react";
import { defaults } from "lodash";
import hoistNonReactStatics from "hoist-non-react-statics";

/**
 * Wrap a core component, pass props through.
 */
export function wrapCoreComponent<TProps extends object>({
  Component,
  defaultProps,
}: {
  Component: React.ComponentType<TProps>;
  defaultProps: TProps;
}) {
  const WrappedComponent = (props: TProps) => {
    const propsWithDefaults = defaults({}, props, defaultProps);
    return <Component {...propsWithDefaults} />;
  };

  hoistNonReactStatics(WrappedComponent, Component);

  return WrappedComponent;
}
