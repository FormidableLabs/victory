import React from "react";

/**
 * Wrap a core component, pass props through.
 * @param {any} Component Core Component
 * @param {object} defaultProps Default props for component
 * @returns {React.FC} WrappedComponent Wrapped component (passes props through)
 */
export const wrapCoreComponent = ({ Component, defaultProps }) => {
  const WrappedComponent = (props) => <Component {...props} />;
  WrappedComponent.defaultProps = defaultProps;

  /**
   * Any static properties existing on Component class
   *  (or tacked onto function component) should be transferred over.
   */
  for (const prop in Component) {
    if (Component.hasOwnProperty(prop)) {
      WrappedComponent[prop] = Component[prop];
    }
  }

  return WrappedComponent;
};
