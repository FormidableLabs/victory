import * as React from "react";

export interface VictoryPortalProps {
  children?: React.ReactElement;
  groupComponent?: React.ReactElement;
}

export default class VictoryPortal extends React.Component<
  VictoryPortalProps,
  any
> {
  render(): null;
}
