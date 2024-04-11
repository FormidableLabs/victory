import React from "react";
import { defaults } from "lodash";

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

  /**
   * Any static properties existing on Component class
   *  (or tacked onto function component) should be transferred over.
   */
  for (const prop in Component) {
    if (prop !== "defaultProps") {
      WrappedComponent[prop] = Component[prop];
    }
  }

  return WrappedComponent;
}
