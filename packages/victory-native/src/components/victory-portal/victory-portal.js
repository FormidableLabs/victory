import React from "react";
import { G } from "react-native-svg";
import { VictoryPortal } from "victory-core/es";

export default class extends VictoryPortal {
  renderPortal(child) {
    if (this.renderInPlace) {
      return child || <G/>;
    }
    this.element = child;
    return <G/>;
  }
}
