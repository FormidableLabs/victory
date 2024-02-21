import React from "react";
import { PortalContextValue } from "./portal-context";

export interface PortalProps {
  className?: string;
  height?: number;
  style?: React.CSSProperties;
  viewBox?: string;
  width?: number;
}

export class Portal
  extends React.Component<PortalProps>
  implements PortalContextValue
{
  static displayName = "Portal";

  private readonly map: Record<string, React.ReactElement>;
  private index: number;

  constructor(props: PortalProps) {
    super(props);
    this.map = {};
    this.index = 1;
  }

  public portalRegister = (): number => {
    return ++this.index;
  };

  public portalUpdate = (key: number, element: React.ReactElement) => {
    this.map[key] = element;
    this.forceUpdate();
  };

  public portalDeregister = (key: number) => {
    delete this.map[key];
    this.forceUpdate();
  };

  public getChildren() {
    return Object.keys(this.map).map((key) => {
      const el = this.map[key];
      return el ? React.cloneElement(el, { key }) : el;
    });
  }

  // Overridden in victory-core-native
  render() {
    return <svg {...this.props}>{this.getChildren()}</svg>;
  }
}
