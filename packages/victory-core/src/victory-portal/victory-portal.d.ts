import * as React from "react";

export interface PortalProps {
  className?: string;
  height: number;
  style?: React.CSSProperties;
  viewBox?: string;
  width: number;
}

export class Portal extends React.Component<PortalProps, any> {}

export interface VictoryPortalProps {
  children?: React.ReactElement;
  groupComponent?: React.ReactElement;
}

export class VictoryPortal extends React.Component<VictoryPortalProps, any> {}
