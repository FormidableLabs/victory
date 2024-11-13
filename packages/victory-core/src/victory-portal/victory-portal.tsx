import React, { useState } from "react";
import defaults from "lodash/defaults";
import uniqueId from "lodash/uniqueId";

import * as Log from "../victory-util/log";
import * as Helpers from "../victory-util/helpers";
import { usePortalContext } from "./portal-context";

export interface VictoryPortalProps {
  children: React.ReactElement;
  groupComponent?: React.ReactElement;
}

const defaultProps: Partial<VictoryPortalProps> = {
  groupComponent: <g />,
};

export const VictoryPortal = (initialProps: VictoryPortalProps) => {
  const props = { ...defaultProps, ...initialProps };
  const [id] = useState(uniqueId());
  const portalContext = usePortalContext();

  if (!portalContext) {
    const msg =
      "`renderInPortal` is not supported outside of `VictoryContainer`. " +
      "Component will be rendered in place";
    Log.warn(msg);
  }

  const children = Array.isArray(props.children)
    ? props.children[0]
    : props.children;
  const { groupComponent } = props;
  const childProps = (children && children.props) || {};
  const standardProps = childProps.groupComponent
    ? { groupComponent, standalone: false }
    : {};
  const newProps = defaults(
    standardProps,
    childProps,
    Helpers.omit(props, ["children", "groupComponent"]),
    { key: childProps.key ?? id },
  );
  const child = children && React.cloneElement(children, newProps);

  React.useEffect(() => {
    portalContext?.addChild(id, child);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  React.useEffect(() => {
    return () => portalContext?.removeChild(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return portalContext ? null : child;
};

VictoryPortal.role = "portal";
