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

  if (Component.name) {
    WrappedComponent.name = Component.name;
  }
  if (Component.role) {
    WrappedComponent.role = Component.role;
  }

  return WrappedComponent;
};
