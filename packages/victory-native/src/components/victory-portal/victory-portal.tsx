import React from "react";
import { G } from "react-native-svg";
import { VictoryPortal as VictoryPortalBase } from "victory-core/es";

export class VictoryPortal extends VictoryPortalBase {
  renderPortal(child) {
    if (this.renderInPlace) {
      return child || <G />;
    }
    this.element = child;
    return <G />;
  }
}
