import * as React from "react";

export interface PortalProps {
  className?: string;
  height: number;
  style?: React.CSSProperties;
  viewBox?: string;
  width: number;
}

export default class Portal extends React.Component<PortalProps, any> {}
