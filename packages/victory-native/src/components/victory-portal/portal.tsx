import React from "react";
import Svg from "react-native-svg";
import { Portal as PortalBase } from "victory-core/es";

export class Portal extends PortalBase {
  render() {
    return <Svg {...this.props}>{this.getChildren()}</Svg>;
  }
}
