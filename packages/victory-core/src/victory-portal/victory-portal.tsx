import React from "react";
import { defaults } from "lodash";
import * as Log from "../victory-util/log";
import * as Helpers from "../victory-util/helpers";
import { PortalContext } from "./portal-context";
import { createPortal } from "react-dom";

export interface VictoryPortalProps {
  children?: React.ReactElement;
  groupComponent?: React.ReactElement;
}

const defaultProps: VictoryPortalProps = {
  groupComponent: <g />,
};

export const VictoryPortal = (initialProps: VictoryPortalProps) => {
  const props = { ...defaultProps, ...initialProps };
  const portalContext = React.useContext(PortalContext);

  if (!portalContext) {
    const msg =
      "`renderInPortal` is not supported outside of `VictoryContainer`. " +
      "Component will be rendered in place";
    Log.warn(msg);
  }

  const children = (
    Array.isArray(props.children) ? props.children[0] : props.children
  ) as React.ReactElement;
  const { groupComponent } = props;
  const childProps = (children && children.props) || {};
  const standardProps = childProps.groupComponent
    ? { groupComponent, standalone: false }
    : {};
  const newProps = defaults(
    standardProps,
    childProps,
    Helpers.omit(props, ["children", "groupComponent"]),
  );
  const child = children && React.cloneElement(children, newProps);

  // If there is no portal context, render the child in place
  return portalContext?.portalElement
    ? createPortal(child, portalContext.portalElement)
    : child;
};

VictoryPortal.role = "portal";
