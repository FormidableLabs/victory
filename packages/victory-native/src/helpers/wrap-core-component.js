import React from "react";

/**
 * Wrap a core component, pass props through.
 * @param {any} Component Core Component
 * @param {object} defaultProps Default props for component
 * @returns {React.FC} WrappedComponent Wrapped component (passes props through)
 */
export const wrapCoreComponent = ({ Component, defaultProps }) => {
  const WrappedComponent = (props) => <Component {...props} />;

  /**
   * Any static properties existing on Component class
   *  (or tacked onto function component) should be transferred over.
   */
  for (const prop in Component) {
    if (prop !== "defaultProps") {
      WrappedComponent[prop] = Component[prop];
    }
  }
  WrappedComponent.defaultProps = defaultProps;

  return WrappedComponent;
};
